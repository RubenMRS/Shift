import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../lib/useReducedMotion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', asChild = false, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const Component = asChild ? Slot : 'button';
    const base = 'group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
    const variants = {
      primary: 'bg-signal text-[#071021] shadow-[0_12px_40px_rgba(70,103,194,0.24)] hover:bg-signal-hover',
      secondary: 'border border-border-strong bg-white/[0.035] text-text-primary hover:border-signal/60 hover:bg-white/[0.065]',
      ghost: 'px-2 text-text-secondary hover:text-text-primary',
    };

    const element = (
      <Component ref={ref} className={cn(base, variants[variant], className)} {...(props as Record<string, unknown>)} />
    );

    if (!asChild) {
      return (
        <motion.button
          ref={ref}
          whileHover={prefersReduced ? undefined : { y: -2 }}
          whileTap={prefersReduced ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          className={cn(base, variants[variant], className)}
          {...props}
        />
      );
    }

    return (
      <motion.span
        className="inline-flex"
        whileHover={prefersReduced ? undefined : { y: -2 }}
        whileTap={prefersReduced ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
      >
        {element}
      </motion.span>
    );
  },
);

Button.displayName = 'Button';
