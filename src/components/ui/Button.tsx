import React from "react";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "../../lib/useReducedMotion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    
    const Comp = asChild ? Slot : "button";
    
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-signal text-white",
      secondary: "bg-bg-surface text-text-primary border border-border hover:bg-bg-surface/80",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-surface",
    };

    // Radix Slot doesn't accept Framer Motion props directly well when using asChild without a motion wrapper.
    // If it's a child (like an <a>), we'll wrap it in a motion span.
    if (asChild) {
      return (
        <motion.span
          whileHover={prefersReduced ? {} : { scale: 0.98, boxShadow: variant === 'primary' ? '0 0 20px rgba(74, 126, 245, 0.4)' : 'none' }}
          whileTap={prefersReduced ? {} : { scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-block"
        >
          <Comp
            ref={ref}
            className={cn(baseStyles, variants[variant], className)}
            {...(props as any)}
          />
        </motion.span>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={prefersReduced ? {} : { scale: 0.98, boxShadow: variant === 'primary' ? '0 0 20px rgba(74, 126, 245, 0.4)' : 'none' }}
        whileTap={prefersReduced ? {} : { scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
