import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  asChild?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    const base = 'button-shine group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-[color,background-color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:transform-none disabled:pointer-events-none disabled:opacity-50';
    const variants = {
      primary: 'bg-signal text-[#071021] shadow-[0_12px_40px_rgba(70,103,194,0.24)] hover:bg-signal-hover',
      secondary: 'border border-border-strong bg-white/[0.035] text-text-primary hover:border-signal/60',
      ghost: 'px-2 text-text-secondary hover:text-text-primary',
    };
    return <Component ref={ref} className={cn(base, variants[variant], className)} {...props} />;
  },
);
Button.displayName = 'Button';
