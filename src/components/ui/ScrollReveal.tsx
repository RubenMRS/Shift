import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = { '--reveal-delay': `${delay}s` } as CSSProperties;
  return <div ref={ref} style={style} className={`scroll-reveal scroll-reveal-${direction} ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}
