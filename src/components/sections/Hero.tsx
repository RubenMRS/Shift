import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { trackEvent } from '../../lib/analytics';

export function Hero() {
  return <section id="hero" className="hero-section">
    <div className="page-shell grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
      <div className="hero-copy">
        <p className="eyebrow flex items-center gap-3"><span className="size-2 rounded-full bg-success" />{content.hero.status}</p>
        <h1 className="text-display max-w-[14ch] text-balance">{content.hero.title}</h1>
        <p className="text-lead mt-7 max-w-[40rem] text-text-secondary">{content.hero.subtitle}</p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild><a href="#contacto" onClick={() => trackEvent('hero_primary_cta_click')}>{content.hero.ctaPrimary}<span aria-hidden="true">↗</span></a></Button>
          <a href="#demo" className="text-link">{content.hero.ctaSecondary}<span aria-hidden="true">↓</span></a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-5 text-xs text-text-secondary">{content.hero.notes.map((note) => <li key={note}>{note}</li>)}</ul>
      </div>
      <figure className="hero-visual mx-auto w-full max-w-[34rem]">
        <figcaption className="mb-4 text-sm text-text-secondary">Smart Call · Exemplo ilustrativo de atendimento</figcaption>
        <div className="hero-console rounded-[1.9rem] border border-white/10 bg-white/[0.035] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
          <div className="console-grid overflow-hidden rounded-[1.45rem] border border-white/[0.075] bg-[#0a101c]">
            <div className="flex justify-between gap-4 border-b border-border px-5 py-4 text-sm"><span className="font-semibold">Pedido de marcação</span><span className="text-signal">Exemplo</span></div>
            <div className="p-5 sm:p-7">
              <div className="mb-7 flex h-16 items-center justify-center gap-1.5" aria-hidden="true">{[7, 13, 20, 11, 28, 17, 9, 23, 31, 14, 26, 10, 18, 30, 15, 8, 22, 27, 12, 19, 8, 25, 16, 10].map((h, i) => <span key={i} className="voice-bar w-1 rounded-full bg-signal" style={{ height: h, animationDelay: `${i * -45}ms` }} />)}</div>
              <div className="space-y-4 text-sm leading-7"><p className="mr-5 rounded-2xl rounded-bl-md bg-white/[0.055] p-4 text-text-secondary"><span className="mb-1 block text-xs font-semibold">Cliente</span>Gostava de marcar uma visita para quinta-feira.</p><p className="ml-5 rounded-2xl rounded-br-md border border-signal/20 bg-signal/[0.09] p-4"><span className="mb-1 block text-xs font-semibold text-signal">Smart Call</span>Tenho disponibilidade às 15:30. Posso confirmar?</p></div>
              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-border pt-5 text-xs text-text-secondary">{['Atende', 'Compreende', 'Agenda'].map((s, i) => <p key={s}><span className="mr-1 text-signal">0{i + 1}</span>{s}</p>)}</div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs leading-6 text-text-secondary">Demonstração de fluxo. A marcação depende da integração e das regras do negócio.</p>
      </figure>
    </div>
  </section>;
}
