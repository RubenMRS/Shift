import React, { useState } from 'react';
import { Mail, Clock, Zap } from 'lucide-react';
import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ControlIcon } from '../ui/ControlIcon';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, introduz o teu nome.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, introduz o teu email.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, introduz um email válido.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, escreve uma mensagem.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', message: 'Mensagem enviada com sucesso! Vamos entrar em contacto em breve.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Ocorreu um erro ao enviar a mensagem. Tenta novamente.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de ligação. Verifica a tua internet e tenta novamente.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user types
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <Section id="contacto" className="border-t border-border bg-bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-16 md:text-center">
            <span className="font-heading font-bold text-sm tracking-widest uppercase text-text-secondary mb-4 block">
              Contacto
            </span>
            <h2 className="text-2xl font-bold mb-4 text-text-primary md:mx-auto max-w-2xl">
              Vamos conversar
            </h2>
            <p className="text-lg text-text-secondary md:mx-auto max-w-2xl">
              Estamos a aceitar parceiros para a fase beta do Smart Call. Envia-nos uma mensagem e respondemos em 24 horas.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Form */}
          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <h3 className="text-xl font-bold mb-2 text-text-primary font-heading">
                Envia-nos uma mensagem
              </h3>
              <p className="text-text-secondary mb-8">
                Preenche o formulário e entraremos em contacto rapidamente.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <ScrollReveal direction="up" delay={0} className="space-y-2">
                  <label htmlFor="name" className="block font-heading font-semibold text-sm text-text-primary">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="O teu nome"
                    className={`w-full px-4 py-3 bg-bg-primary border rounded-md text-text-primary focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors ${errors.name ? 'border-error' : 'border-border'}`}
                  />
                  {errors.name && <span className="text-error text-xs block" role="alert">{errors.name}</span>}
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.08} className="space-y-2">
                  <label htmlFor="email" className="block font-heading font-semibold text-sm text-text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="o.teu@email.com"
                    className={`w-full px-4 py-3 bg-bg-primary border rounded-md text-text-primary focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors ${errors.email ? 'border-error' : 'border-border'}`}
                  />
                  {errors.email && <span className="text-error text-xs block" role="alert">{errors.email}</span>}
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.16} className="space-y-2">
                  <label htmlFor="message" className="block font-heading font-semibold text-sm text-text-primary">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Conta-nos sobre o teu negócio e como podemos ajudar..."
                    rows={5}
                    className={`w-full px-4 py-3 bg-bg-primary border rounded-md text-text-primary focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors resize-y min-h-[120px] ${errors.message ? 'border-error' : 'border-border'}`}
                  />
                  {errors.message && <span className="text-error text-xs block" role="alert">{errors.message}</span>}
                </ScrollReveal>

                {status.message && (
                  <div className={`p-4 rounded-md text-sm font-medium ${status.type === 'success' ? 'bg-signal/10 text-signal border border-signal/20' : 'bg-error/10 text-error border border-error/20'}`} role="alert">
                    {status.message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full sm:w-auto"
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Enviar mensagem
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="up" delay={0.2}>
            <div>
              <h3 className="text-xl font-bold mb-2 text-text-primary font-heading">
                Informação de contacto
              </h3>
              <p className="text-text-secondary mb-10">
                Podes também contactar-nos diretamente por email.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <ControlIcon icon={Mail} />
                  <div>
                    <p className="font-heading font-semibold text-base mb-1 text-text-primary">Email</p>
                    <p className="text-sm text-text-secondary">
                      <a href={`mailto:${content.contact.email}`} className="text-signal hover:text-signal-hover transition-colors">
                        {content.contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <ControlIcon icon={Clock} />
                  <div>
                    <p className="font-heading font-semibold text-base mb-1 text-text-primary">Tempo de resposta</p>
                    <p className="text-sm text-text-secondary max-w-xs">
                      {content.contact.responseTime}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <ControlIcon icon={Zap} />
                  <div>
                    <p className="font-heading font-semibold text-base mb-1 text-text-primary">Fase beta</p>
                    <p className="text-sm text-text-secondary max-w-xs">
                      {content.contact.betaNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="mt-12">
                <Card className="bg-bg-primary border-border-strong">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-signal/10 flex items-center justify-center text-signal">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                        </div>
                        <h4 className="font-heading font-bold text-lg text-text-primary">
                          Falar no WhatsApp
                        </h4>
                      </div>
                      <p className="text-text-secondary text-sm">
                        Preferes uma resposta mais rápida? Manda-nos mensagem diretamente.
                      </p>
                    </div>
                    <Button variant="secondary" className="shrink-0" asChild>
                      <a href="https://wa.me/351900000000" target="_blank" rel="noopener noreferrer">
                        Mensagem Rápida
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </Section>
  );
}
