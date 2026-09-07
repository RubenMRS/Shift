import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../lib/useReducedMotion';

function ArrowMark() {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-[#071021]/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5" aria-hidden="true">
      ↗
    </span>
  );
}

function CallConsole() {
  const bars = [7, 13, 20, 11, 28, 17, 9, 23, 31, 14, 26, 10, 18, 30, 15, 8, 22, 27, 12, 19, 8, 25, 16, 10];

  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto" role="img" aria-label="Demonstração visual de uma chamada atendida pelo Smart Call">
      <div className="absolute -inset-8 -z-10 rounded-full bg-signal/[0.075] blur-3xl" aria-hidden="true" />
      <div className="rounded-[1.9rem] border border-white/[0.09] bg-white/[0.035] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
        <div className="console-grid overflow-hidden rounded-[1.45rem] border border-white/[0.075] bg-[#0a101c] shadow-[inset_0_1px_0_rgba(255,255,255,0.055)]">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
              <span className="text-sm font-semibold text-text-primary">Chamada em curso</span>
            </div>
            <span className="font-mono text-xs tabular-nums text-text-muted">00:42</span>
          </div>

          <div className="px-5 py-7 sm:px-7 sm:py-8">
            <div className="mb-8 flex h-16 items-center justify-center gap-1" aria-hidden="true">
              {bars.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="voice-bar block w-1 rounded-full bg-signal"
                  style={{ height: `${height}px`, animationDelay: `${index * -55}ms` }}
                />
              ))}
            </div>

            <div className="space-y-3">
              <div className="mr-8 rounded-2xl rounded-bl-md bg-white/[0.055] px-4 py-3 text-sm leading-relaxed text-text-secondary">
                Gostava de marcar uma visita para quinta-feira.
              </div>
              <div className="ml-8 rounded-2xl rounded-br-md border border-signal/20 bg-signal/[0.09] px-4 py-3 text-sm leading-relaxed text-text-primary">
                Tenho disponibilidade às 15:30. Posso confirmar?
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-5">
              <p className="mb-4 text-xs font-semibold text-text-muted">O que acontece durante a chamada</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {['Atende', 'Compreende', 'Agenda'].map((step, index) => (
                  <div key={step} className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                    <span className="grid size-5 place-items-center rounded-full bg-signal/12 font-mono text-[10px] text-signal">{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/[0.09] bg-bg-surface px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.32)] sm:-left-8">
        <p className="text-[11px] text-text-muted">Calendário</p>
        <p className="mt-0.5 text-sm font-semibold text-text-primary">Visita reservada · 15:30</p>
      </div>
    </div>
  );
}

export function Hero() {
  const prefersReduced = useReducedMotion();
  const entrance = prefersReduced ? {} : { opacity: 1, y: 0 };

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" aria-hidden="true" />
      <div className="page-shell">
        <div className="grid items-center gap-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-20">
          <div className="max-w-[48rem]">
            <motion.div initial={prefersReduced ? false : { opacity: 0, y: 16 }} animate={entrance} transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }} className="mb-7 flex items-center gap-3 text-sm font-medium text-text-secondary">
              <span className="size-2 rounded-full bg-success shadow-[0_0_0_5px_rgba(101,214,166,0.08)]" />
              {content.hero.status}
            </motion.div>

            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              animate={entrance}
              transition={{ duration: 0.82, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
              className="text-display max-w-[13ch] text-balance"
            >
              {content.hero.title}
            </motion.h1>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={entrance}
              transition={{ duration: 0.78, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
              className="text-lead mt-8 max-w-[40rem] text-text-secondary"
            >
              {content.hero.subtitle}
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={entrance}
              transition={{ duration: 0.72, delay: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            >
              <Button variant="primary" asChild>
                <a href="#contacto">{content.hero.ctaPrimary}<ArrowMark /></a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#servicos">{content.hero.ctaSecondary}<span aria-hidden="true">↓</span></a>
              </Button>
            </motion.div>

            <motion.ul
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: prefersReduced ? 0 : 0.4 }}
              className="mt-11 flex max-w-[40rem] flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-xs text-text-muted"
            >
              {content.hero.notes.map((note) => (
                <li key={note} className="flex items-center gap-2"><span className="size-1 rounded-full bg-signal" />{note}</li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 34, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.95, delay: prefersReduced ? 0 : 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="pb-5"
          >
            <CallConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
