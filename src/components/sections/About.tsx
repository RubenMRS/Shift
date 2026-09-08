import { content } from '../../data/content';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function About() {
  return (
    <Section id="sobre" className="bg-bg-primary">
      <div className="page-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-5">
            <p className="mb-5 text-sm font-semibold text-signal">Sobre a SHIFT</p>
            <h2 className="text-section max-w-[11ch]">{content.about.title}</h2>
          </ScrollReveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <ScrollReveal delay={0.08}>
              <p className="text-lead text-text-primary">{content.about.intro}</p>
              <p className="mt-7 max-w-[42rem] leading-relaxed text-text-secondary">{content.about.detail}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div className="mt-12 rounded-[1.65rem] border border-white/[0.08] bg-white/[0.03] p-1.5">
                <blockquote className="rounded-[1.3rem] border border-white/[0.065] bg-bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-9">
                  <div className="mb-7 h-px w-20 signal-rule" aria-hidden="true" />
                  <p className="font-heading text-xl font-medium leading-snug tracking-[-0.025em] text-text-primary sm:text-2xl">
                    “{content.about.principle}”
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-7">
                <div>
                  <dt className="text-xs text-text-muted">Estrutura</dt>
                  <dd className="mt-2 font-heading text-xl font-semibold text-text-primary">Equipa SHIFT · Portugal</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-muted">Foco atual</dt>
                  <dd className="mt-2 font-heading text-xl font-semibold text-text-primary">Smart Call</dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
