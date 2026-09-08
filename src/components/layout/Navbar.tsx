import { useEffect, useRef } from 'react';
import { Brand } from './Brand';
const links = [
  { href: '/#servicos', label: 'Soluções' },
  { href: '/#processo', label: 'Como funciona' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contacto', label: 'Contacto' },
];
export function Navbar() {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && menu.current?.open) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <nav aria-label="Navegação principal" className="nav-shell">
      <a href="/" aria-label="SHIFT — início" className="inline-flex min-h-11 items-center"><Brand /></a>
      <div className="hidden items-center gap-1 xl:flex">{links.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}</div>
      <a href="/#contacto" className="nav-cta hidden xl:inline-flex">Marcar demo ↗</a>
      <details ref={menu} className="mobile-navigation xl:hidden">
        <summary aria-label="Menu de navegação" className="nav-link cursor-pointer">Menu <span aria-hidden="true">☰</span></summary>
        <div className="mobile-links">{links.map((link) => <a key={link.href} href={link.href} onClick={() => { if (menu.current) menu.current.open = false; }}>{link.label}<span aria-hidden="true">↗</span></a>)}<a href="/#contacto" className="nav-cta">Marcar demonstração</a></div>
      </details>
    </nav>
  </header>;
}
