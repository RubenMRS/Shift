import { Button } from '../ui/Button';
import { PageMeta } from './PageMeta';

export function NotFound() {
  return (
    <>
      <PageMeta
        title="Página não encontrada — SHIFT AI SOLUTIONS"
        description="A página pedida não existe."
        path="/404"
        noIndex
      />
      <section className="flex min-h-[78dvh] items-center pt-28">
        <div className="page-shell py-20">
          <p className="font-heading text-sm font-semibold text-signal">404</p>
          <h1 className="mt-5 max-w-[10ch] font-heading text-[clamp(3.5rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Esta página saiu do fluxo.
          </h1>
          <p className="mt-7 max-w-[34rem] text-lead text-text-secondary">
            O endereço pode ter mudado ou já não existir. Regressa à página principal.
          </p>
          <div className="mt-9">
            <Button asChild><a href="/">Voltar ao início</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
