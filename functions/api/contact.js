/**
 * Cloudflare Pages Function — Contact Form Endpoint
 * POST /api/contact
 * 
 * Receives { name, email, message } and validates.
 * Email sending to be configured after domain is active
 * (MailChannels or n8n webhook).
 */

export async function onRequestPost(context) {
  try {
    const { request } = context;

    // CORS headers
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Pedido inválido.' }),
        { status: 400, headers }
      );
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Todos os campos são obrigatórios.' }),
        { status: 400, headers }
      );
    }

    // Validate name length
    if (name.length > 200) {
      return new Response(
        JSON.stringify({ success: false, error: 'Nome demasiado longo.' }),
        { status: 400, headers }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email inválido.' }),
        { status: 400, headers }
      );
    }

    // Validate message length
    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Mensagem demasiado longa (máximo 5000 caracteres).' }),
        { status: 400, headers }
      );
    }

    // --- Email sending placeholder ---
    // TODO: Configure email delivery after domain is active.
    // Option 1: MailChannels (free with CF Workers, requires SPF/DKIM DNS setup)
    // Option 2: Forward to n8n webhook URL
    //
    // Example for MailChannels:
    // await fetch('https://api.mailchannels.net/tx/v1/send', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email: 'geral@shiftai.pt' }] }],
    //     from: { email: 'noreply@shiftai.pt', name: 'Shift AI Website' },
    //     subject: `Nova mensagem de ${name}`,
    //     content: [{
    //       type: 'text/plain',
    //       value: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
    //     }]
    //   })
    // });

    console.log('Contact form submission:', { name, email, message: message.substring(0, 100) });

    return new Response(
      JSON.stringify({ success: true, message: 'Mensagem recebida com sucesso.' }),
      { status: 200, headers }
    );

  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Erro interno do servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Handle OPTIONS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
