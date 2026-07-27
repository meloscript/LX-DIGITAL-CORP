"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionSection, MotionCard } from "@/components/motion";
import { SectionHeader, RevealSubtitle, RevealWords } from "@/components/visual/text-reveal";
import { AnimatedIcon } from "@/components/visual/animated-icon";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import { services } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="services" className="section-padding section-alt">
      <div className="container-max mx-auto">
        <MotionSection className="text-center section-header-space max-w-3xl mx-auto" parallax>
          <SectionHeader
            centered
            label="Services"
            title="Des solutions digitales conçues pour la croissance"
            description="Six expertises complémentaires pour attirer, convertir et fidéliser vos clients."
            descriptionClassName="text-lg text-muted"
          />
        </MotionSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const href = `/services/${service.slug}`;
            return (
              <MotionCard key={service.slug} delay={index * 0.08}>
                <Link
                  href={href}
                  aria-label={`En savoir plus sur ${service.title}`}
                  className={cn(
                    "block w-full h-full text-left rounded-2xl p-6 group",
                    "liquid-glass dark:liquid-glass-dark liquid-glass-interactive",
                    "border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/40"
                  )}
                >
                  <AnimatedIcon
                    icon={Icon}
                    delay={index * 0.06}
                    wrapperClassName={`rounded-xl bg-gradient-to-br ${service.color} mb-4 w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    className="h-6 w-6 text-white"
                    size="sm"
                  />
                  <RevealSubtitle
                    delay={index * 0.03}
                    className="text-lg font-semibold text-night dark:text-white group-hover:text-premium transition-colors mb-2"
                  >
                    {service.title}
                  </RevealSubtitle>
                  <RevealWords
                    text={service.cardDescription}
                    compact
                    delay={0.05 + index * 0.03}
                    className="text-sm text-muted leading-relaxed mb-4 block"
                    as="span"
                  />
                  <span className="inline-flex items-center gap-1 text-premium text-sm font-medium">
                    En savoir plus
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </MotionCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
