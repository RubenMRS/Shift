const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function verifyCaptcha({ token, secret, siteKey, remoteIp }) {
  const payload = new URLSearchParams({ secret, response: token });
  if (siteKey) payload.set('sitekey', siteKey);
  if (remoteIp) payload.set('remoteip', remoteIp);

  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: payload,
  });

  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true;
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Pedido inválido.' }, 400);
  }

  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const company = cleanText(body.company);
  const message = cleanText(body.message);
  const captchaToken = cleanText(body.captchaToken);
  const website = cleanText(body.website);

  // Honeypot: report success without forwarding automated submissions.
  if (website) return json({ success: true });

  if (!name || !email || !message || !captchaToken) {
    return json({ success: false, error: 'Preenche os campos obrigatórios e confirma a verificação.' }, 400);
  }

  if (name.length > 120 || email.length > 254 || company.length > 160 || message.length > 5000) {
    return json({ success: false, error: 'Um ou mais campos excedem o limite permitido.' }, 400);
  }

  if (message.length < 20 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, error: 'Confirma o email e acrescenta algum contexto ao pedido.' }, 400);
  }

  if (!env.HCAPTCHA_SECRET) {
    return json({ success: false, error: 'O formulário ainda não está configurado. Contacta-nos por email.' }, 503);
  }

  let captchaValid = false;
  try {
    captchaValid = await verifyCaptcha({
      token: captchaToken,
      secret: env.HCAPTCHA_SECRET,
      siteKey: env.HCAPTCHA_SITE_KEY,
      remoteIp: request.headers.get('CF-Connecting-IP'),
    });
  } catch {
    return json({ success: false, error: 'O serviço de verificação não respondeu. Tenta novamente.' }, 502);
  }

  if (!captchaValid) {
    return json({ success: false, error: 'A verificação de segurança expirou ou não é válida.' }, 400);
  }

  if (!env.CONTACT_WEBHOOK_URL) {
    return json({ success: false, error: 'O envio ainda não está configurado. Contacta-nos por email.' }, 503);
  }

  let delivery;
  try {
    delivery = await fetch(env.CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, message, source: 'shiftai.pt' }),
    });
  } catch {
    return json({ success: false, error: 'O serviço de contacto não respondeu. Tenta novamente ou usa o email.' }, 502);
  }

  if (!delivery.ok) {
    return json({ success: false, error: 'Não foi possível enviar o pedido. Tenta novamente ou usa o email.' }, 502);
  }

  return json({ success: true });
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
}
