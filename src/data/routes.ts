export const SITE_URL = 'https://shiftai.pt';

export const routes = [
  { path: '/', title: 'SHIFT Solutions', description: 'Agentes de voz com IA para empresas em Portugal. Conhece o Smart Call para atender chamadas e gerir marcações. Marca uma demonstração com a SHIFT.' },
  { path: '/privacidade', title: 'Política de Privacidade — SHIFT AI SOLUTIONS', description: 'Informação sobre os dados recolhidos no website da SHIFT, o formulário, os fornecedores e os direitos de proteção de dados.' },
  { path: '/termos', title: 'Termos de utilização — SHIFT AI SOLUTIONS', description: 'Condições de utilização do website da SHIFT AI Solutions e informação sobre pedidos de contacto e demonstração.' },
];

export function normalizePath(path: string) { return path.replace(/\/+$/, '') || '/'; }

export function routeMeta(path: string) {
  return routes.find((route) => route.path === normalizePath(path)) ?? { path: '/404', title: 'Página não encontrada — SHIFT AI SOLUTIONS', description: 'A página pedida não existe. Regressa à SHIFT para conhecer as soluções ou entrar em contacto.' };
}

export function structuredData(_path: string) {
  const organization = { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'SHIFT AI Solutions', url: `${SITE_URL}/`, logo: `${SITE_URL}/shift-mark.png`, contactPoint: { '@type': 'ContactPoint', email: 'geral@shiftai.pt', contactType: 'sales', availableLanguage: 'Portuguese' } };
  return { '@context': 'https://schema.org', '@graph': [organization, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'SHIFT AI Solutions', url: `${SITE_URL}/`, inLanguage: 'pt-PT', publisher: { '@id': organization['@id'] } }] };
}
