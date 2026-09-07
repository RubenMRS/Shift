import { content } from '../../data/content';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from './Section';

export function Faq() {
  return (
    <Section id="faq" className="border-t border-border bg-bg-primary">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <ScrollReveal>
            <div className="lg:sticky lg:top-36">
              <p className="mb-5 text-sm font-semibold text-signal">Perguntas frequentes</p>
              <h2 className="text-section max-w-[10ch]">{content.faq.title}</h2>
              <p className="mt-7 max-w-[31rem] text-base leading-relaxed text-text-secondary">
                {content.faq.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="border-t border-border">
            {content.faq.items.map((item, index) => (
              <ScrollReveal key={item.question} delay={Math.min(index * 0.04, 0.12)}>
                <article className="grid gap-4 border-b border-border py-7 sm:grid-cols-[2rem_0.82fr_1.18fr] sm:gap-6 sm:py-9">
                  <span className="font-heading text-sm font-semibold tabular-nums text-signal" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="max-w-[24rem] font-heading text-xl font-semibold tracking-[-0.03em] text-text-primary">
                    {item.question}
                  </h3>
                  <p className="max-w-[38rem] text-sm leading-7 text-text-secondary sm:text-base">
                    {item.answer}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
