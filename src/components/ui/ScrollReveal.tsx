import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
