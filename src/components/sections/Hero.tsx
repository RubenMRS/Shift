import React, { useRef } from 'react';
import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { SplitText } from '../bits/SplitText';
import { BlurText } from '../bits/BlurText';
import { MagnetButton } from '../bits/MagnetButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../lib/useReducedMotion';

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();
  
  // Usar opacity baseado no scrollY em vez de ler .get() no render
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  if (prefersReduced) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-text-secondary flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="font-medium tracking-wide text-xs uppercase">Scroll</span>
      <motion.svg
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-5 text-signal"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </motion.svg>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();
  
  // Parallax: at 0px scroll stays 0, at 400px moves down 100px
  const parallaxY = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section ref={containerRef} id="hero" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column - Text */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left pt-20 lg:pt-0">
            <div className="inline-block border border-border rounded-sm px-3 py-1 mb-8 bg-bg-primary/50 backdrop-blur-sm">
              <span className="font-body text-xs font-bold tracking-[0.2em] text-text-secondary uppercase">
                {content.hero.badge}
              </span>
            </div>

            <h1 className="text-hero mb-6 text-text-primary text-balance w-full">
              <SplitText 
                text={content.hero.title}
                delay={0.03}
                duration={0.6}
                className="justify-center lg:justify-start"
              />
            </h1>

            <div className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl leading-relaxed">
              <BlurText 
                text={content.hero.subtitle}
                delay={0.6} 
                className="justify-center lg:justify-start"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <MagnetButton>
                <Button variant="primary" asChild>
                  <a href="#contacto">{content.hero.ctaPrimary}</a>
                </Button>
              </MagnetButton>
              
              <Button variant="ghost" asChild>
                <a href="#servicos" className="group">
                  {content.hero.ctaSecondary}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-1"><path d="m6 9 6 6 6-6"/></svg>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Parallax Element */}
          <motion.div
            style={prefersReduced ? undefined : { y: parallaxY }}
            className="hidden lg:flex h-full items-center justify-center relative w-full"
          >
            {/* Abstract Gradient Orb for Depth/Parallax */}
            <div className="relative w-full aspect-square max-w-[500px]">
              <div className="absolute inset-0 bg-gradient-brand rounded-full opacity-20 blur-[100px] animate-pulse-shift"></div>
              
              {/* Premium wireframe elements inside the orb */}
              <div className="absolute inset-10 border border-signal/20 rounded-full"></div>
              <div className="absolute inset-20 border border-signal/40 rounded-full border-dashed"></div>
              <div className="absolute inset-32 border border-signal/10 rounded-full"></div>
              
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-signal shadow-[0_0_20px_#4A7EF5]"></div>
            </div>
          </motion.div>

        </div>

      </div>

      <ScrollIndicator />
    </section>
  );
}
