const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ success: false, error: 'Origem do pedido inválida.' }, 403);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ success: false, error: 'Formato inválido.' }, 415);
  // Rate limiting can be configured at the edge; the honeypot and time trap apply here.
  const limit = 32768;
  if (Number(request.headers.get('Content-Length')) > limit) return json({ success: false, error: 'Pedido demasiado grande.' }, 413);
  let body;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ success: false, error: 'Pedido inválido.' }, 400);
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); return json({ success: false, error: 'Pedido demasiado grande.' }, 413); }
      chunks.push(value);
    }
    const data = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { data.set(chunk, offset); offset += chunk.byteLength; }
    body = JSON.parse(new TextDecoder().decode(data));
  } catch {
    return json({ success: false, error: 'Pedido inválido.' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ success: false, error: 'Pedido inválido.' }, 400);

  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const company = cleanText(body.company);
  const message = cleanText(body.message);
  const website = cleanText(body.website);
  const formElapsedMs = Number(body.formElapsedMs);

  // Honeypot: report success without forwarding automated submissions.
  if (website) return json({ success: true });

  if (!name || !email || !message || body.privacyAcknowledged !== true) {
    return json({ success: false, error: 'Preenche os campos obrigatórios e aceita a política de privacidade.' }, 400);
  }

  if (name.length > 120 || email.length > 254 || company.length > 160 || message.length > 5000) {
    return json({ success: false, error: 'Um ou mais campos excedem o limite permitido.' }, 400);
  }

  if (message.length < 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, error: 'Confirma o email e acrescenta algum contexto ao pedido.' }, 400);
  }

  if (!Number.isFinite(formElapsedMs) || formElapsedMs < 1200 || formElapsedMs > 86400000) {
    return json({ success: false, error: 'Preenche o formulário normalmente e tenta novamente.' }, 400);
  }

  const payload = { to: 'geral@shift.pt', name, email, company, message, source: 'shiftai.pt', privacyAcknowledged: true };
  let delivery;
  if (env.RESEND_API_KEY) {
    try {
      delivery = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL || 'SHIFT Website <onboarding@resend.dev>',
          to: ['geral@shift.pt'],
          reply_to: email,
          subject: `Novo pedido de demonstração — ${name}`,
          text: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company || '—'}\n\n${message}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      return json({ success: false, error: 'O serviço de email não respondeu. Tenta novamente ou usa o email.' }, 502);
    }
  } else if (env.CONTACT_WEBHOOK_URL) {
    try {
      if (new URL(env.CONTACT_WEBHOOK_URL).protocol !== 'https:') throw new Error('Invalid webhook protocol');
      delivery = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
        redirect: 'error',
      });
    } catch {
      return json({ success: false, error: 'O serviço de contacto não respondeu. Tenta novamente ou usa o email.' }, 502);
    }
  } else {
    return json({ success: false, error: 'O envio ainda não está configurado. Usa o email geral@shift.pt.' }, 503);
  }

  if (!delivery.ok) {
    return json({ success: false, error: 'Não foi possível enviar o pedido. Tenta novamente ou usa o email.' }, 502);
  }

  return json({ success: true });
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}

export function onRequestGet() { return json({ success: false, error: 'Método não permitido.' }, 405); }
