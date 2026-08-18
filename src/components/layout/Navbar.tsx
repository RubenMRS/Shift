import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from "../../lib/utils";
import { LiveBadge } from '../ui/LiveBadge';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-bg-primary border-b border-border py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 z-50 relative" onClick={closeMenu}>
          {/* O logo real será substituído pela imagem do utilizador */}
          <img src="/src/assets/logo.png" alt="Shift AI Logo" className="h-16 md:h-20 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-medium text-text-secondary">
            <a href="#servicos" className="hover:text-signal transition-colors focus-visible:outline-none focus-visible:text-signal">Serviços</a>
            <a href="#sobre" className="hover:text-signal transition-colors focus-visible:outline-none focus-visible:text-signal">Sobre</a>
            <a href="#contacto" className="hover:text-signal transition-colors focus-visible:outline-none focus-visible:text-signal">Contacto</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Removido Early Access e LiveBadge como pedido pelo utilizador */}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative p-2 -mr-2 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Alternar menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-bg-primary flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden z-40",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <a href="#servicos" className="text-2xl font-heading font-semibold text-text-primary" onClick={closeMenu}>Serviços</a>
          <a href="#sobre" className="text-2xl font-heading font-semibold text-text-primary" onClick={closeMenu}>Sobre</a>
          <a href="#contacto" className="text-2xl font-heading font-semibold text-text-primary" onClick={closeMenu}>Contacto</a>
        </div>
      </div>
    </nav>
  );
}
