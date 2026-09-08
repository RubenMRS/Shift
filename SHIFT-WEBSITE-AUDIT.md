# SHIFT Website Audit & Refactor

## Executive Summary

A auditoria confirmou que a produção era uma SPA React/Vite CSR: o documento HTML servido em `https://shiftai.pt/` tinha apenas `<div id="root"></div>`. O conteúdo crítico dependia de JavaScript.

A refatoração mantém React, Vite, Tailwind e Cloudflare Pages, mas passa a gerar HTML estático para a homepage, páginas de produto, solução, empresa e legais. A navegação usa links reais, existe uma página 404 estática e o conteúdo continua disponível sem JavaScript.

## Stack encontrada

- React 19 + TypeScript.
- Vite + Tailwind CSS 4.
- Cloudflare Pages, com Function em `functions/api/contact.js`.
- Proteção anti-spam própria no formulário, sem serviço externo.
- Fontes locais Bricolage Grotesque e Manrope.
- Antes: Framer Motion e Lenis no bundle. Foram removidos por não serem necessários ao resultado e para reduzir JavaScript.

## Problemas mapeados

| ID | Problema | Severidade | Estado |
|---:|---|:---:|---|
| 01 | Conteúdo principal não estava no HTML inicial | P0 | Corrigido: prerender SSG com hidratação opcional |
| 02 | robots.txt | P0 | Já estava correto; validado no build |
| 03 | sitemap.xml incompleto | P0 | Corrigido: gerado com todas as páginas públicas |
| 04 | Canonical por página | P0 | Corrigido |
| 05 | Domínio canónico e redirects | P0 | Parcial: slash redirects preparados; `www`/HTTP requer regra na zona Cloudflare |
| 06 | robots/noindex acidental | P0 | Corrigido; 404 usa `noindex` |
| 07 | Links rastreáveis | P0 | Corrigido; navegação usa `<a href>` |
| 08 | Arquitetura de páginas | P0 | Corrigido: homepage scroll-only com secções Smart Call, automações, FAQ e contacto; apenas páginas legais fora da homepage |
| 09 | Clareza do hero | P1 | Corrigido |
| 10 | CTAs claros | P1 | Corrigido: “Marcar demonstração” |
| 11 | Demonstração de voz | P1 | Corrigido: `DemoCall` preparado; sem áudio inventado, estado “Demo em breve” |
| 12 | Fluxo Smart Call | P1 | Corrigido: `CallFlow` com seis etapas |
| 13 | Produtos claros | P1 | Corrigido |
| 14 | Prova sem claims falsos | P1 | Corrigido: exemplos estão identificados como demonstração |
| 15 | Caso demonstrativo | P1 | Corrigido: `CaseStudy` marcado como exemplo |
| 16 | Falhas e escalation | P1 | Corrigido: secção e FAQ sem prometer transferência universal |
| 17 | Integrações reais | P1 | Corrigido: linguagem condicional; nenhuma integração é apresentada como ativa sem validação |
| 18 | Privacidade/RGPD | P1 | Parcial: estrutura e proteção anti-spam documentadas; identificação jurídica e subcontratantes ainda requerem dados da entidade |
| 19 | Cookies | P1 | Corrigido: sem analytics, publicidade ou CAPTCHA externo por defeito |
| 20 | Informação legal | P1 | Parcial: placeholders explícitos para razão social, NIF, morada e conservação |
| 21 | Analytics de conversão | P1 | Preparado: helper sem fornecedor nem PII; requer escolha/credenciais antes de ativar |
| 22 | Branding responsivo | P1 | Corrigido: `Brand` usa `public/shift.svg`; favicon SVG e social card |
| 23 | Identidade sem UI genérica | P1 | Corrigido: foco em chamadas, transcrição, calendário e fluxos |
| 24 | Mobile | P1 | Corrigido e validado em 430, 393, 390 e 360 px |
| 25 | Acessibilidade | P1 | Corrigido: lang pt-PT, labels, foco, skip link, headings e alt |
| 26 | Reduced motion | P1 | Corrigido e validado com Playwright |
| 27 | Imagens | P2 | Parcial: dimensões e alt definidos; imagens decorativas continuam locais PNG grandes |
| 28 | Fontes | P2 | Corrigido: duas famílias locais, variable, `font-display: swap` |
| 29 | JavaScript | P2 | Corrigido: bundle inicial caiu de ~414 KB para ~282 KB |
| 30 | Animações | P2 | Corrigido: removido RAF/smooth scroll e animações sem valor funcional |
| 31 | Vídeo/áudio | P2 | Corrigido: áudio não é descarregado sem asset real |
| 32 | Core Web Vitals | P2 | Parcial: estrutura otimizada; não foram publicados números Lighthouse falsos |
| 33 | Open Graph/social | P2 | Corrigido: metadata por página e `public/social-card.png` 1200×630 |
| 34 | Meta description | P2 | Corrigido: descrições únicas por rota |
| 35 | Structured data | P2 | Corrigido: Organization, WebSite e Service em JSON-LD |
| 36 | AI search/GEO | P2 | Corrigido: HTML semântico, headings, FAQ, schema e links internos |
| 37 | Arquitetura SEO futura | P2 | Parcial: rotas base prontas; não foram criados artigos vazios |
| 38 | Como funciona | P2 | Já estava implementado; copy e links foram melhorados |
| 39 | Operação existente | P2 | Corrigido: integração é avaliada, não prometida universalmente |
| 40 | CTA final e formulário | P1 | Corrigido: formulário curto, estados, consentimento, honeypot e proteção temporal sem CAPTCHA externo |

## Ficheiros principais alterados

- `src/entry-server.tsx`, `scripts/prerender.mjs`: SSG e metadata/schema por rota.
- `src/data/routes.ts`: catálogo de rotas, títulos, descrições e JSON-LD.
- `src/App.tsx`: routing mínimo para homepage scroll-only e páginas legais.
- `src/components/product/DemoCall.tsx`, `CallFlow.tsx`, `CaseStudy.tsx`: demonstração e fluxos.
- `src/components/layout/Brand.tsx`, `Navbar.tsx`, `Footer.tsx`: navegação, marca e links internos.
- `functions/api/contact.js`: limites de corpo, validação de origem, privacy acknowledgement, proteção anti-spam, Resend/webhook, timeouts e headers.
- `public/shift.svg`, `public/social-card.png`, `public/_redirects` e `index.html`: branding, partilha e canonicalização.
- `tests/contact.test.mjs`, `tests/ssg.test.mjs`: testes de segurança do formulário e saída SSG.

## Validação

- `npm run build` — passou; gera 8 páginas públicas + 404 em HTML.
- `npm run lint` — exit code 0; warnings apenas em bundles temporários gerados pelo Wrangler.
- `npm test` — 7 testes, todos passaram.
- Playwright — 54 combinações de rotas/viewports verificadas, sem overflow, H1 oculto ou alt em falta.
- Playwright — menu mobile, Escape, skip link, links internos, reduced motion e modo sem JavaScript passaram.
- Viewports: 1920×1080, 1440×900, 430×932, 393×852, 390×844 e 360×800.
- 404 testado com status HTTP 404 no Cloudflare Pages local.

## Ações manuais necessárias

1. Confirmar razão social, NIF, morada, responsável pelo tratamento, subcontratantes e prazos legais.
2. Configurar `RESEND_API_KEY` e `CONTACT_FROM_EMAIL` (ou `CONTACT_WEBHOOK_URL`) no ambiente Cloudflare Pages.
3. Criar regra Cloudflare para `http → https` e `www → shiftai.pt`.
4. Escolher fornecedor de analytics, configurar consentimento e ligar `configureAnalytics` apenas depois desse consentimento.
5. Substituir o estado “Demo em breve” por áudio real quando existir.
6. Medir Lighthouse/Core Web Vitals em produção depois do deploy.
7. Registar sitemap no Google Search Console e confirmar SPF, DKIM e DMARC do domínio de email.

## Understand Anything

Foi criado `.ua/knowledge-graph.json` com 35 nós, 39 relações, 3 camadas e 3 passos de tour para o snapshot inicial. A análise semântica completa foi interrompida pelo limite de utilização do agente auxiliar; o grafo está marcado como parcial e não inclui a refatoração posterior.
