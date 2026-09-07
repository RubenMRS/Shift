import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

const links = [
  { href: '/#servicos', label: 'Soluções', id: 'servicos' },
  { href: '/#processo', label: 'Processo', id: 'processo' },
  { href: '/#sobre', label: 'Sobre', id: 'sobre' },
  { href: '/#contacto', label: 'Contacto', id: 'contacto' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-28% 0px -60% 0px', threshold: [0.01, 0.25, 0.5] },
    );

    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex w-full max-w-[84rem] items-center justify-between rounded-full border border-white/[0.08] bg-[#080c15]/90 px-4 py-2 shadow-[0_14px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:px-5"
      >
        <a href="/#hero" onClick={closeMenu} className="relative z-50 flex items-center" aria-label="SHIFT — início">
          <img src={logo} alt="SHIFT AI Solutions" className="h-10 w-auto object-contain sm:h-11" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-[color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                activeSection === link.id ? 'bg-white/[0.065] text-text-primary' : 'text-text-secondary hover:text-text-primary',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/#contacto"
          className="hidden min-h-10 items-center rounded-full bg-signal px-5 text-sm font-semibold text-[#071021] transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-signal-hover md:inline-flex"
        >
          Pedir demonstração
        </a>

        <button
          type="button"
          className="relative z-50 grid size-11 place-items-center rounded-full border border-border-strong bg-bg-surface text-text-primary md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={cn('absolute left-0 top-1 block h-px w-5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]', mobileMenuOpen && 'translate-y-[3px] rotate-45')} />
            <span className={cn('absolute bottom-1 left-0 block h-px w-5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]', mobileMenuOpen && '-translate-y-[3px] -rotate-45')} />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-30 flex flex-col justify-end bg-[#070a12]/96 px-6 pb-10 pt-28 backdrop-blur-2xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden',
          mobileMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-6 opacity-0',
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mb-auto flex flex-col border-t border-border pt-5">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="flex items-center justify-between border-b border-border py-5 font-heading text-4xl font-semibold tracking-[-0.045em] text-text-primary transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-2"
              style={{ transitionDelay: mobileMenuOpen ? `${80 + index * 45}ms` : '0ms' }}
            >
              {link.label}
              <span className="text-base font-normal text-text-muted">0{index + 1}</span>
            </a>
          ))}
        </div>
        <a
          href="/#contacto"
          onClick={closeMenu}
          tabIndex={mobileMenuOpen ? 0 : -1}
          className="flex min-h-14 items-center justify-center rounded-full bg-signal px-6 font-semibold text-[#071021]"
        >
          Pedir demonstração
        </a>
      </div>
    </header>
  );
}
