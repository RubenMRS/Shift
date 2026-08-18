import React from 'react';
import { content } from '../../data/content';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

export function About() {
  return (
    <Section id="sobre" className="bg-bg-primary">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* A Nossa História */}
          <ScrollReveal direction="up" delay={0}>
            <div>
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-text-secondary mb-4 block">
                Sobre nós
              </span>
              <h2 className="text-2xl font-bold mb-8 text-text-primary">
                {content.about.title}
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-text-secondary leading-relaxed">
                  {content.about.intro1}
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {content.about.intro2}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Missão */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="bg-bg-surface border border-border rounded-lg p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-signal/5 blur-[50px] rounded-full pointer-events-none"></div>
              
              <div className="w-12 h-1 bg-signal mb-8 rounded-full"></div>
              <h3 className="text-2xl font-bold font-heading mb-6 text-text-primary">
                {content.about.mission}
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                {content.about.description}
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </Section>
  );
}
