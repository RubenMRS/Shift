import React from 'react';
import { content } from '../../data/content';
import { Card } from '../ui/Card';
import { ControlIcon } from '../ui/ControlIcon';
import { Phone, MessageCircle, Settings } from 'lucide-react';
import { Section } from './Section';
import { ScrollReveal } from '../ui/ScrollReveal';

const icons = {
  Phone,
  MessageCircle,
  Settings,
};

export function Services() {
  return (
    <Section id="servicos" className="bg-bg-primary">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <ScrollReveal direction="up" delay={0}>
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-text-primary">
              {content.services.title}
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl">
              {content.services.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {content.services.items.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons];
            // Stagger delay by 50ms per card (max 150ms)
            const staggerDelay = Math.min(index * 0.05, 0.2);
            
            return (
              <ScrollReveal key={index} direction="up" delay={staggerDelay}>
                <Card className="h-full">
                  <div className="mb-6 flex justify-between items-start">
                    <ControlIcon icon={Icon} />
                    <span className="text-text-secondary text-xs font-mono">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading text-text-primary tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
