import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className, delay = 0.5 }: BlurTextProps) {
  const words = text.split(' ');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    }
  }, [isInView]);

  if (prefersReducedMotion) {
    return <div className={className}>{text}</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    },
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '0.25em', display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
