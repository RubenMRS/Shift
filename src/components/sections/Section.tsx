import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section-shell relative py-[var(--section-space)] ${className}`}>
      {children}
    </section>
  );
}
