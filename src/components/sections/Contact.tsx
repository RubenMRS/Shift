import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { trackEvent } from '../../lib/analytics';
import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { ScrollReveal } from '../ui/ScrollReveal';
import { Section } from './Section';

type FormFields = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

type FormErrors = Pick<FormFields, 'name' | 'email' | 'company' | 'message'>;
type FormStatus = { type: 'idle' | 'loading' | 'success' | 'error'; message: string };

const initialFields: FormFields = { name: '', email: '', company: '', message: '', website: '' };
const initialErrors: FormErrors = { name: '', email: '', company: '', message: '' };

function buildMailto(fields: FormFields) {
  const subject = encodeURIComponent('Pedido de demonstração SHIFT');
  const body = encodeURIComponent(`Nome: ${fields.name}\nEmail: ${fields.email}\nEmpresa: ${fields.company || '—'}\n\n${fields.message}`);
  return `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
}

function SubmitMark() {
  return (
    <span className="grid size-8 place-items-center rounded-full bg-[#071021]/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5" aria-hidden="true">
      ↗
    </span>
  );
}

export function Contact() {
  const [formData, setFormData] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState('');
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const formStartedAt = useRef<number | null>(null);
  useEffect(() => { formStartedAt.current = Date.now(); }, []);

  const validate = useCallback(() => {
    const nextErrors: FormErrors = { ...initialErrors };
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) nextErrors.name = 'Introduz o teu nome.';
    else if (name.length > 120) nextErrors.name = 'Usa no máximo 120 caracteres.';
    if (!email) nextErrors.email = 'Introduz o teu email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Introduz um email válido.';
    if (formData.company.trim().length > 160) nextErrors.company = 'Usa no máximo 160 caracteres.';
    if (!message) nextErrors.message = 'Explica-nos brevemente o que precisas.';
    else if (message.length < 20) nextErrors.message = 'Acrescenta algum contexto: pelo menos 20 caracteres.';

    setErrors(nextErrors);
    setPrivacyError(privacyChecked ? '' : 'Confirma que leste a Política de Privacidade.');
    return !Object.values(nextErrors).some(Boolean) && privacyChecked;
  }, [formData, privacyChecked]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.type === 'loading') return;
    if (!validate()) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    setStatus({ type: 'loading', message: 'A enviar pedido…' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formElapsedMs: Date.now() - (formStartedAt.current ?? Date.now()), privacyAcknowledged: privacyChecked }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Não foi possível enviar o pedido. Tenta novamente.');
      }

      setStatus({ type: 'success', message: 'Pedido enviado. Entraremos em contacto em breve.' });
      trackEvent('contact_form_submit');
      setFormData(initialFields);
      setPrivacyChecked(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';
      const isApiError = Boolean(errorMessage) && !['Failed to fetch', 'Load failed', 'Network request failed'].includes(errorMessage);
      if (isApiError) {
        setStatus({ type: 'error', message: `${errorMessage} Se preferires, envia diretamente para ${content.contact.email}.` });
        return;
      }
      window.location.href = buildMailto(formData);
      setStatus({
        type: 'success',
        message: `Abrimos o teu email. Confirma o envio para ${content.contact.email}.`,
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof FormFields;
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    if (field in errors && errors[field as keyof FormErrors]) {
      setErrors((current) => ({ ...current, [field]: '' }));
    }
    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
  };

  const fieldClass = (hasError: boolean) => `field-shell ${hasError ? '!border-error/70' : ''}`;
  return (
    <Section id="contacto" className="border-t border-border bg-bg-surface">
      <div className="page-shell">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 xl:gap-28">
          <ScrollReveal>
            <div className="lg:sticky lg:top-36">
              <p className="mb-5 text-sm font-semibold text-signal">Demonstração</p>
              <h2 className="text-section max-w-[11ch]">{content.contact.title}</h2>
              <p className="mt-7 max-w-[34rem] text-base leading-relaxed text-text-secondary sm:text-lg">{content.contact.subtitle}</p>

              <div className="mt-10 space-y-5 border-t border-border pt-7">
                <div>
                  <p className="text-xs text-text-muted">Email</p>
                  <a href={`mailto:${content.contact.email}`} className="mt-1 inline-block font-semibold text-text-primary transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-signal">
                    {content.contact.email}
                  </a>
                </div>
                <button type="button" className="whatsapp-button mt-6" aria-disabled="true" title="WhatsApp em breve">WhatsApp <span>Em breve</span></button>
                <p className="max-w-[30rem] text-sm leading-relaxed text-text-secondary">{content.contact.responseTime}</p>
                <p className="max-w-[30rem] text-sm leading-relaxed text-text-muted">{content.contact.betaNote}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-[1.9rem] border border-white/[0.08] bg-white/[0.03] p-2">
              <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={() => { if (!started.current) { started.current = true; trackEvent('contact_form_start'); } }} noValidate aria-busy={status.type === 'loading'} className="rounded-[1.45rem] border border-white/[0.065] bg-bg-primary p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:p-9">
                <noscript><p>Para enviar o formulário, ativa JavaScript ou contacta geral@shiftai.pt por email.</p></noscript>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-text-primary">Nome</label>
                    <div className={fieldClass(Boolean(errors.name))}>
                      <input className="field-control" id="name" name="name" type="text" autoComplete="name" maxLength={120} value={formData.name} onChange={handleChange} placeholder="Como te devemos tratar?" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                    </div>
                    {errors.name && <p id="name-error" className="mt-2 text-xs text-error" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-text-primary">Email profissional</label>
                    <div className={fieldClass(Boolean(errors.email))}>
                      <input className="field-control" id="email" name="email" type="email" autoComplete="email" maxLength={254} value={formData.email} onChange={handleChange} placeholder="nome@empresa.pt" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                    </div>
                    {errors.email && <p id="email-error" className="mt-2 text-xs text-error" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="company" className="mb-2 block text-sm font-semibold text-text-primary">Empresa <span className="font-normal text-text-muted">(opcional)</span></label>
                  <div className={fieldClass(Boolean(errors.company))}>
                    <input className="field-control" id="company" name="company" type="text" autoComplete="organization" maxLength={160} value={formData.company} onChange={handleChange} placeholder="Nome da empresa" aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'company-error' : undefined} />
                  </div>
                  {errors.company && <p id="company-error" className="mt-2 text-xs text-error" role="alert">{errors.company}</p>}
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-text-primary">O que gostarias de automatizar?</label>
                  <div className={fieldClass(Boolean(errors.message))}>
                    <textarea className="field-control min-h-40 resize-y" id="message" name="message" maxLength={5000} value={formData.message} onChange={handleChange} placeholder="Descreve o atendimento atual, os canais usados e onde sentes mais dificuldade." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : 'message-help'} />
                  </div>
                  {errors.message ? <p id="message-error" className="mt-2 text-xs text-error" role="alert">{errors.message}</p> : <p id="message-help" className="mt-2 text-xs text-text-muted">Não partilhes palavras-passe nem dados pessoais de clientes.</p>}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-white/[0.025] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">Proteção anti-spam automática</p>
                      <p className="mt-1 max-w-[19rem] text-xs leading-relaxed text-text-muted">Proteção invisível, sem CAPTCHA externo nem recolha adicional de dados.</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-success">Ativo</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-text-secondary">Usamos um campo armadilha invisível e um tempo mínimo de preenchimento para bloquear envios automáticos.</p>
                </div>

                <div className="mt-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <span className="relative mt-0.5 flex shrink-0">
                      <input type="checkbox" id="privacy" checked={privacyChecked} onChange={(event) => { setPrivacyChecked(event.target.checked); if (event.target.checked) setPrivacyError(''); }} className="peer sr-only" aria-invalid={Boolean(privacyError)} aria-describedby={privacyError ? 'privacy-error' : undefined} />
                      <span className="flex size-5 items-center justify-center rounded-md border border-border-strong bg-white/[0.04] text-transparent transition-all duration-300 peer-checked:border-signal/60 peer-checked:bg-signal/20 peer-checked:text-signal peer-focus-visible:ring-2 peer-focus-visible:ring-signal peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-primary">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </span>
                    <span className="text-xs leading-relaxed text-text-muted">Li a <a href="/privacidade" className="text-signal underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidade</a> e compreendo como os dados serão tratados para responder a este pedido.</span>
                  </label>
                  {privacyError && <p id="privacy-error" className="mt-2 text-xs text-error" role="alert">{privacyError}</p>}
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div aria-live="polite" className="min-h-5 text-sm">
                    {status.message && <p className={status.type === 'error' ? 'text-error' : status.type === 'success' ? 'text-success' : 'text-text-muted'}>{status.message}</p>}
                  </div>
                  <Button type="submit" variant="primary" disabled={status.type === 'loading'} className="w-full shrink-0 sm:w-auto">
                    {status.type === 'loading' ? 'A enviar…' : 'Marcar demonstração'}
                    {status.type !== 'loading' && <SubmitMark />}
                  </Button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
