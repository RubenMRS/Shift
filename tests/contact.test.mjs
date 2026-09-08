import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/contact.js';
const valid = { name: 'Teste', email: 'teste@example.com', company: '', message: 'Pedido de teste sem envio real.', formElapsedMs: 2000, privacyAcknowledged: true };
const request = (body, headers = {}) => new Request('https://shiftai.pt/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
test('rejects invalid JSON shapes without throwing', async () => {
  for (const body of [null, [], 'text', 12]) assert.equal((await onRequestPost({ request: request(body), env: {} })).status, 400);
});
test('rejects unacknowledged privacy, invalid input and cross-origin submissions', async () => {
  for (const body of [{ ...valid, privacyAcknowledged: false }, { ...valid, email: 'invalid' }, { ...valid, message: 'short' }]) assert.equal((await onRequestPost({ request: request(body), env: {} })).status, 400);
  assert.equal((await onRequestPost({ request: request(valid, { Origin: 'https://other.example' }), env: {} })).status, 403);
});
test('rejects oversized body even without Content-Length', async () => {
  assert.equal((await onRequestPost({ request: request({ ...valid, message: 'x'.repeat(40000) }), env: {} })).status, 413);
});
test('honeypot never forwards and missing configuration fails closed', async () => {
  const result = await onRequestPost({ request: request({ ...valid, website: 'bot' }), env: {} });
  assert.deepEqual(await result.json(), { success: true });
  assert.equal((await onRequestPost({ request: request(valid), env: {} })).status, 503);
});
test('forwards to the configured webhook without CAPTCHA', async () => {
  const original = globalThis.fetch;
  const env = { CONTACT_WEBHOOK_URL: 'https://delivery.example/contact' };
  const calls = [];
  try {
    globalThis.fetch = async (url, options) => { calls.push({ url, options }); return new Response(JSON.stringify({ success: true }), { status: 200 }); };
    assert.equal((await onRequestPost({ request: request(valid), env })).status, 200);
    assert.equal(calls.length, 1);
    const delivered = JSON.parse(calls[0].options.body);
    assert.equal(delivered.to, 'geral@shift.pt');
    assert.equal(delivered.email, valid.email);
    globalThis.fetch = async () => new Response(JSON.stringify({ success: false }), { status: 500 });
    assert.equal((await onRequestPost({ request: request(valid), env })).status, 502);
    globalThis.fetch = async () => { throw new Error('private network details'); };
    const failure = await onRequestPost({ request: request(valid), env });
    assert.equal(failure.status, 502);
    assert.doesNotMatch(await failure.text(), /private network details/);
  } finally { globalThis.fetch = original; }
});
