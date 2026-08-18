import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function SplitText({ text, className, delay = 0.03, duration = 0.6 }: SplitTextProps) {
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
      transition: { staggerChildren: delay, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      className={className}
      variants={container}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      ref={ref}
    >
      {words.map((word, index) => {
        // Special logic for "nunca mais fica" to be highlighted
        const isHighlight = word === "nunca" || word === "mais" || word === "fica";
        return (
          <motion.span
            variants={child}
            style={{ marginRight: '0.25em', display: 'inline-block' }}
            key={index}
            className={isHighlight ? "text-signal" : ""}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
