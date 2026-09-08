import { Section } from '../sections/Section';
import { CallFlow } from './CallFlow';

export function CaseStudy({ clinic = false }: { clinic?: boolean }) {
  return <Section id="exemplo" className="border-t border-border bg-bg-primary">
    <div className="page-shell">
      <p className="eyebrow">Exemplo de implementação · Não é um caso de cliente</p>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
        <h2 className="text-section">{clinic ? 'O que acontece numa chamada?' : 'Uma marcação, do primeiro toque à confirmação.'}</h2>
        <div className="space-y-5 text-lead text-text-secondary"><p>Uma pessoa liga para pedir uma marcação enquanto a receção está ocupada. O fluxo começa por perceber o pedido e recolher apenas a informação necessária.</p><p>Com o calendário integrado e as regras confirmadas, o atendimento pode avançar para uma marcação. Se o pedido exigir avaliação da equipa, o fluxo deve encaminhá-lo.</p></div>
      </div>
      <CallFlow />
      {!clinic && <a href="#contacto" className="text-link mt-7">Falar sobre o teu atendimento <span aria-hidden="true">↗</span></a>}
    </div>
  </Section>;
}
