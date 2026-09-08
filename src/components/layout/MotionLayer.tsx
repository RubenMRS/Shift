import { useEffect } from 'react';

export function MotionLayer() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty('--scroll-progress', max > 0 ? String(window.scrollY / max) : '0');
      });
    };
    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return <><div className="scroll-progress" aria-hidden="true" /><div className="cursor-glow" aria-hidden="true" /></>;
}
