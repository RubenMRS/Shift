import React from 'react';
import { content } from '../../data/content';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Process() {
  return (
    <Section id="processo" className="bg-bg-surface border-y border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">
              {content.process.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Main vertical line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-border-strong -translate-x-1/2"></div>
          
          <div className="space-y-16 md:space-y-32">
            {content.process.items.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <ScrollReveal key={index} direction="up" delay={0}>
                  <div className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}>
                    
                    {/* Node on the line */}
                    <div className="absolute left-[15px] md:left-1/2 w-[11px] h-[11px] rounded-full bg-signal shadow-[0_0_12px_#4A7EF5] -translate-x-1/2 mt-1.5 md:mt-2 z-10"></div>
                    
                    {/* Empty space for desktop layout balance */}
                    <div className="hidden md:block w-1/2"></div>
                    
                    {/* Content */}
                    <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="inline-block px-3 py-1 bg-bg-primary border border-border-strong rounded-sm mb-4">
                        <span className="font-mono text-xs font-bold text-signal tracking-widest">
                          STEP 0{index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 font-heading text-text-primary">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </Section>
  );
}
