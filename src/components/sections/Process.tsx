import { content } from '../../data/content';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Process() {
  return (
    <Section id="processo" className="border-y border-border bg-bg-surface">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <ScrollReveal>
            <div className="lg:sticky lg:top-36">
              <p className="mb-5 text-sm font-semibold text-signal">Como trabalhamos</p>
              <h2 className="text-section max-w-[12ch]">{content.process.title}</h2>
              <p className="mt-7 max-w-[34rem] text-base leading-relaxed text-text-secondary sm:text-lg">{content.process.subtitle}</p>
            </div>
          </ScrollReveal>

          <ol className="border-t border-border">
            {content.process.items.map((step, index) => (
                <li key={step.id} className="group grid gap-4 border-b border-border py-7 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:py-9">
                  <span className="font-mono text-xs tabular-nums text-signal">0{index + 1}</span>
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                    <h3 className="font-heading text-2xl font-semibold tracking-[-0.04em] text-text-primary">{step.title}</h3>
                    <p className="mt-3 max-w-[38rem] leading-relaxed text-text-secondary">{step.description}</p>
                  </div>
                </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
