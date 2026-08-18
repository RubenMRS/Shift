import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useReducedMotion } from '../../lib/useReducedMotion';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export function Section({ children, id, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  const blurValue = useTransform(scrollYProgress, [0.6, 1], [0, 8]);
  const opacityValue = useTransform(scrollYProgress, [0.7, 1], [1, 0.4]);
  
  // Create a template string for blur that Framer Motion can safely interpolate
  const filterTemplate = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.section
      ref={ref}
      id={id}
      style={
        prefersReduced 
          ? undefined 
          : { filter: filterTemplate, opacity: opacityValue, willChange: 'filter, opacity' }
      }
      className={`py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}
