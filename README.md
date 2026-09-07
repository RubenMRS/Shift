# SHIFT AI Solutions

Website institucional da SHIFT, desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Verificação

```bash
npm run lint
npm run build
```

## Formulário de contacto

Cria uma conta gratuita no hCaptcha e configura as variáveis documentadas em `.env.example`.

- `VITE_HCAPTCHA_SITE_KEY`: chave pública incluída no build.
- `HCAPTCHA_SECRET`: segredo guardado no ambiente Cloudflare Pages.
- `HCAPTCHA_SITE_KEY`: chave pública validada também no servidor.
- `CONTACT_WEBHOOK_URL`: endpoint seguro que recebe pedidos já validados.

O segredo nunca deve usar o prefixo `VITE_`.

Em desenvolvimento, o frontend usa a chave oficial de teste do hCaptcha. A chave de teste não protege produção.

## Publicação

O projeto inclui uma Cloudflare Pages Function em `functions/api/contact.js` e uma regra SPA em `public/_redirects`.
