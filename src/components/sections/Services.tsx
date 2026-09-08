import { content } from '../../data/content';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

function RouteDiagram({ type }: { type: 'voice' | 'automation' }) {
  if (type === 'voice') {
    return (
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/[0.075] bg-[#080d17] p-5 sm:p-6">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(110,145,255,0.12),transparent_64%)]" />
        <div className="relative grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="rounded-xl bg-white/[0.045] p-4">
            <p className="text-xs text-text-muted">Entrada</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">Chamada do cliente</p>
          </div>
          <div className="hidden h-px w-10 signal-rule sm:block" aria-hidden="true" />
          <div className="rounded-xl border border-signal/20 bg-signal/[0.08] p-4">
            <p className="text-xs text-signal">Smart Call</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">Resposta e marcação</p>
          </div>
        </div>
      </div>
    );
  }

  const automation = type === 'automation';
  return (
    <div className="mt-8 flex items-center gap-2" aria-hidden="true">
      {[0, 1, 2].map((item) => (
        <div key={item} className="flex flex-1 items-center gap-2">
          <span className={`block size-3 rounded-full ${item === 1 ? 'bg-signal' : 'border border-border-strong bg-bg-primary'}`} />
          {item < 2 && <span className={`h-px flex-1 ${automation ? 'border-t border-dashed border-border-strong' : 'bg-border-strong'}`} />}
        </div>
      ))}
    </div>
  );
}

export function Services() {
  const [smartCall, automation] = content.services.items;

  return (
    <Section id="servicos" className="border-t border-border bg-bg-primary">
      <div className="page-shell">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
          <ScrollReveal>
            <p className="mb-5 text-sm font-semibold text-signal">Soluções SHIFT</p>
            <h2 className="text-section max-w-[12ch]">{content.services.title}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-lead max-w-[42rem] text-text-secondary lg:ml-auto">{content.services.subtitle}</p>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7 lg:row-span-2" direction="right">
            <article className="h-full rounded-[1.9rem] border border-white/[0.08] bg-white/[0.03] p-2">
              <div className="flex h-full flex-col rounded-[1.45rem] border border-white/[0.07] bg-bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-3 text-xs font-semibold text-signal">{smartCall.label}</p>
                    <h3 className="font-heading text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{smartCall.title}</h3>
                  </div>
                  <span className="rounded-full border border-success/20 bg-success/[0.07] px-3 py-1.5 text-xs font-medium text-success">Acesso antecipado</span>
                </div>
                <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-text-secondary sm:text-lg">{smartCall.description}</p>
                <RouteDiagram type="voice" />
                <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-white/[0.065] bg-white/[0.065] sm:grid-cols-3">
                  {[
                    ['Atende', 'Perguntas frequentes'],
                    ['Organiza', 'Pedidos e contexto'],
                    ['Marca', 'Direto no calendário'],
                  ].map(([term, detail]) => (
                    <div key={term} className="bg-[#0a101c] p-4">
                      <dt className="text-xs font-semibold text-signal">{term}</dt>
                      <dd className="mt-1 text-sm leading-6 text-text-secondary">{detail}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-auto max-w-[34rem] pt-7 text-sm font-semibold leading-relaxed text-text-primary">{smartCall.outcome}</p>
                <a href="#contacto" className="text-link mt-4">Conhecer o Smart Call ↗</a>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={0.12} direction="left">
            <article className="h-full rounded-[1.65rem] border border-white/[0.08] bg-white/[0.03] p-1.5">
              <div className="flex h-full flex-col rounded-[1.3rem] border border-white/[0.065] bg-bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-7">
                <p className="mb-3 text-xs font-semibold text-signal">{automation.label}</p>
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em]">{automation.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">{automation.description}</p>
                <RouteDiagram type="automation" />
                <p className="mt-auto pt-5 text-sm font-semibold text-text-primary">{automation.outcome}</p>
                <a href="#contacto" className="text-link mt-4">Avaliar uma automação ↗</a>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
