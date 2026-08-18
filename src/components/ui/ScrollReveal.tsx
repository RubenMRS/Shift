import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '../../lib/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true, // Only animate once as per strict guidelines
  });

  const directionVariants = {
    up: { opacity: 0, y: 40 },
    down: { opacity: 0, y: -40 },
    left: { opacity: 0, x: 40 },
    right: { opacity: 0, x: -40 },
    none: { opacity: 0, x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={
        inView 
          ? { opacity: 1, x: 0, y: 0 } 
          : directionVariants[direction]
      }
      transition={{
        duration: prefersReduced ? 0 : 0.5,
        delay: prefersReduced ? 0 : delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
