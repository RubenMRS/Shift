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
npm test
```

O build gera HTML estático para as rotas públicas em `dist/` e hidrata a aplicação React quando o JavaScript está disponível. A configuração está em `scripts/prerender.mjs` e os metadados das páginas em `src/data/routes.ts`.

O relatório da auditoria está em [SHIFT-WEBSITE-AUDIT.md](./SHIFT-WEBSITE-AUDIT.md).

## Formulário de contacto

O formulário usa proteção anti-spam própria, sem CAPTCHA externo. Para envio direto por email, configura o Resend ou um webhook seguro no ambiente Cloudflare Pages.

- `RESEND_API_KEY`: chave privada do Resend.
- `CONTACT_FROM_EMAIL`: remetente verificado no Resend, opcional.
- `CONTACT_WEBHOOK_URL`: endpoint seguro que recebe pedidos já validados.

Os pedidos são enviados para `geral@shiftai.pt`. Sem Resend ou webhook configurado, o formulário abre um email pré-preenchido como fallback.

## Publicação

O projeto inclui uma Cloudflare Pages Function em `functions/api/contact.js` e uma regra SPA em `public/_redirects`.
