import { content } from '../../data/content';
import logo from '../../assets/logo.png';

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary py-10">
      <div className="page-shell">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <a href="/#hero" aria-label="SHIFT — voltar ao início" className="inline-flex transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5">
              <img src={logo} alt="SHIFT AI Solutions" className="h-14 w-auto object-contain" />
            </a>
            <p className="mt-4 text-sm text-text-secondary">{content.footer.tagline}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary md:justify-end">
            <a href="/#servicos" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text-primary">Soluções</a>
            <a href="/#faq" className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text-primary">FAQ</a>
            <a href={`mailto:${content.contact.email}`} className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-text-primary">Email</a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{content.footer.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/privacidade" className="transition-colors hover:text-text-primary">Privacidade</a>
            <a href="/termos" className="transition-colors hover:text-text-primary">Termos de utilização</a>
            <span>Portugal · Projetos em acesso antecipado</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
