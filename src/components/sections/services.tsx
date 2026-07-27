"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionSection, MotionCard } from "@/components/motion";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import { services } from "@/lib/services-data";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="services" className="section-padding section-alt">
      <div className="container-max mx-auto">
        <MotionSection className="text-center mb-16 max-w-3xl mx-auto">
          <p className="section-label">Services</p>
          <h2 className="section-title mb-4">
            Des solutions digitales conçues pour la croissance
          </h2>
          <p className="text-lg text-muted">
            Six expertises complémentaires pour attirer, convertir et fidéliser vos
            clients.
          </p>
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
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4 w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-night dark:text-white group-hover:text-premium transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {service.cardDescription}
                  </p>
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
