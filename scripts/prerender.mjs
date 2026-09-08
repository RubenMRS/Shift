import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const ssrEntry = (await readdir('dist-ssr')).find((file) => /^entry-server(?:-[\w-]+)?\.js$/.test(file));
if (!ssrEntry) throw new Error('SSR entry not found in dist-ssr');
const { render, routes, routeMeta, structuredData, SITE_URL } = await import(new URL(`../dist-ssr/${ssrEntry}`, import.meta.url));

const template = await readFile('dist/index.html', 'utf8');
const hashes = new Set();
const escape = (value) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
for (const path of [...routes.map((route) => route.path), '/404']) {
  const meta = routeMeta(path);
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`);
  for (const key of ['description', 'og:description', 'twitter:description']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), (_, prefix) => prefix + escape(meta.description));
  for (const key of ['og:title', 'twitter:title']) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), (_, prefix) => prefix + escape(meta.title));
  html = html.replace(/(<link rel="canonical" href=")[^"]*/, `$1${SITE_URL}${meta.path}`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*/, `$1${SITE_URL}${meta.path}`);
  if (path === '/404') html = html.replace('content="index, follow"', 'content="noindex, follow"');
  else {
    const json = JSON.stringify(structuredData(path)).replace(/</g, '\\u003c');
    hashes.add(`'sha256-${createHash('sha256').update(json).digest('base64')}'`);
    html = html.replace('</head>', `<script type="application/ld+json">${json}</script>\n</head>`);
  }
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await writeFile(file, html);
  console.log(`SSG ${path}: ${Buffer.byteLength(html)} bytes`);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(({ path }) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
const csp = `default-src 'self'; script-src 'self' ${[...hashes].join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.resend.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`;
await writeFile('dist/_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Strict-Transport-Security: max-age=31536000\n  Content-Security-Policy: ${csp}\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
