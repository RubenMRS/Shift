import { content } from '../../data/content';
import { Brand } from './Brand';
export function Footer() {
  return <footer className="border-t border-border bg-bg-primary py-12"><div className="page-shell">
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
      <div><a href="/" aria-label="SHIFT — início"><Brand variant="full" /></a><p className="mt-5 max-w-64 text-sm leading-7 text-text-secondary">Agentes de voz e automações à medida, ligados à operação da tua empresa.</p></div>
      <nav aria-label="Soluções" className="footer-links"><p>Soluções</p><a href="/#servicos">Smart Call</a><a href="/#servicos">Automações à medida</a><a href="/#processo">Como funciona</a></nav>
      <nav aria-label="Empresa" className="footer-links"><p>Empresa</p><a href="/#sobre">Sobre</a><a href="/#contacto">Contacto</a><a href="/#faq">Perguntas frequentes</a><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></nav>
      <nav aria-label="Legal" className="footer-links"><p>Legal</p><a href="/privacidade">Privacidade</a><a href="/termos">Termos de utilização</a></nav>
    </div><p className="mt-10 border-t border-border pt-6 text-xs text-text-secondary">{content.footer.copyright} · Portugal</p>
  </div></footer>;
}
