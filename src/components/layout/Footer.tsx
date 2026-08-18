import React from 'react';
import { content } from '../../data/content';
import { Button } from '../ui/Button';
import logo from '../../assets/logo.png';

export function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-bg-surface border-t border-border relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-brand opacity-[0.05] blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section: Premium CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pb-16 border-b border-border">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">
              Pronto para automatizar <span className="text-gradient">o seu negócio?</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-md">
              Junta-te ao nosso Early Access e transforma o teu atendimento.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" asChild>
              <a href="#contacto">Falar Connosco</a>
            </Button>
            <Button variant="secondary" className="border-border hover:border-signal" asChild>
              <a href="https://wa.me/351900000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom Section: Links & Logo */}
        <div className="pt-16 flex flex-col md:flex-row gap-12 items-center md:justify-between text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#hero" className="inline-block transition-transform hover:scale-105">
              <img src={logo} alt="Shift AI Logo" className="h-16 md:h-24 w-auto object-contain" />
            </a>
            <p className="text-sm text-text-secondary max-w-[280px]">
              {content.footer.tagline}
            </p>
          </div>

          <nav className="flex gap-8" aria-label="Links do rodapé">
            <a href="#servicos" className="text-sm text-text-secondary hover:text-signal transition-colors focus-visible:outline-none focus-visible:text-signal">Serviços</a>
            <a href="#sobre" className="text-sm text-text-secondary hover:text-signal transition-colors focus-visible:outline-none focus-visible:text-signal">Sobre</a>
            <a href="#contacto" className="text-sm text-text-secondary hover:text-signal transition-colors focus-visible:outline-none focus-visible:text-signal">Contacto</a>
          </nav>

        </div>

        <div className="mt-16 pt-8 text-center text-xs text-text-secondary">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
