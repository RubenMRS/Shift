import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const paths = ['', 'privacidade', 'termos'];
test('all public pages expose headings, unique metadata, canonical and schema without JS', async () => {
  const titles = new Set();
  for (const path of paths) {
    const html = await readFile(`dist/${path || 'index'}.html`, 'utf8');
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.match(html, /<html lang="pt-PT">/);
    if (!path) assert.match(html, /href="#contacto"/);
    assert.ok(html.includes(`rel="canonical" href="https://shiftai.pt/${path}"`));
    assert.doesNotMatch(html, /content="noindex/);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title)); titles.add(title);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema['@context'], 'https://schema.org');
    assert.ok(schema['@graph'].some((node) => node['@type'] === 'Organization'));
    assert.doesNotMatch(html, /opacity:0[;"}]/);
  }
});
test('sitemap contains exactly the generated canonical pages and 404 is noindex', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, paths.length);
  for (const path of paths) assert.ok(sitemap.includes(`<loc>https://shiftai.pt/${path}</loc>`));
  assert.match(await readFile('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/shiftai.pt\/sitemap.xml/);
  assert.match(await readFile('dist/404.html', 'utf8'), /noindex, follow/);
});
