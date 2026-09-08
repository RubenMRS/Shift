import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

async function findSsrEntry(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      const nested = await findSsrEntry(file);
      if (nested) return nested;
    } else if (entry.isFile() && entry.name.startsWith('entry-server') && entry.name.endsWith('.js')) {
      return file;
    }
  }
  return null;
}

const ssrEntry = await findSsrEntry(resolve('dist-ssr'));
if (!ssrEntry) throw new Error('SSR entry not found in dist-ssr');
const { render, routes, routeMeta, structuredData, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

// Wrangler's Vite auto-configuration can produce a client-flavoured SSR
// bundle where named route metadata exports are tree-shaken. Keep the deploy
// build usable in that mode while preserving the normal metadata path.
const fallbackSiteUrl = 'https://shiftai.pt';
const fallbackRoutes = [
  { path: '/', title: 'SHIFT Solutions', description: 'Agentes de voz com IA para empresas em Portugal. Conhece o Smart Call para atender chamadas e gerir marcações. Marca uma demonstração com a SHIFT.' },
  { path: '/privacidade', title: 'Política de Privacidade — SHIFT AI SOLUTIONS', description: 'Informação sobre os dados recolhidos no website da SHIFT, o formulário, os fornecedores e os direitos de proteção de dados.' },
  { path: '/termos', title: 'Termos de utilização — SHIFT AI SOLUTIONS', description: 'Condições de utilização do website da SHIFT AI Solutions e informação sobre pedidos de contacto e demonstração.' },
];
const siteUrl = typeof SITE_URL === 'string' ? SITE_URL : fallbackSiteUrl;
const siteRoutes = Array.isArray(routes) ? routes : fallbackRoutes;
const getRouteMeta = typeof routeMeta === 'function' ? routeMeta : (path) => siteRoutes.find((route) => route.path === path) ?? {
  path: '/404',
  title: 'Página não encontrada — SHIFT AI SOLUTIONS',
  description: 'A página pedida não existe. Regressa à SHIFT para conhecer as soluções ou entrar em contacto.',
};
const getStructuredData = typeof structuredData === 'function' ? structuredData : () => ({
  '@context': 'https://schema.org',
  '@graph': [{
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'SHIFT AI Solutions',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/shift-mark.png`,
    contactPoint: { '@type': 'ContactPoint', email: 'geral@shift.pt', contactType: 'sales', availableLanguage: 'Portuguese' },
  }],
});

if (typeof render !== 'function') {
  console.warn('SSR render export unavailable; leaving the Wrangler client build as-is.');
  process.exit(0);
}

const template = await readFile('dist/index.html', 'utf8');
const hashes = new Set();
const escape = (value) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
for (const path of [...siteRoutes.map((route) => route.path), '/404']) {
  const meta = getRouteMeta(path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`);
  for (const key of ['description', 'og:description', 'twitter:description']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), (_, prefix) => prefix + escape(meta.description));
  for (const key of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), (_, prefix) => prefix + escape(meta.title));
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${siteUrl}${meta.path}`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*/, `$1${siteUrl}${meta.path}`);
  if (path === '/404') html = html.replace('content="index, follow"', 'content="noindex, follow"');
  else {
    const json = JSON.stringify(getStructuredData(path)).replace(/</g, '\\u003c');
    hashes.add(`'sha256-${createHash('sha256').update(json).digest('base64')}'`);
    html = html.replace('</head>', `<script type="application/ld+json">${json}</script>\n</head>`);
  }
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await writeFile(file, html);
  console.log(`SSG ${path}: ${Buffer.byteLength(html)} bytes`);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${siteRoutes.map(({ path }) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
const csp = `default-src 'self'; script-src 'self' ${[...hashes].join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.resend.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`;
await writeFile('dist/_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Strict-Transport-Security: max-age=31536000\n  Content-Security-Policy: ${csp}\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
