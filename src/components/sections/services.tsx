"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealLabel } from "@/components/visual/text-reveal";
import { services } from "@/lib/services-data";
import { kineticEase } from "@/lib/motion-config";
import { cn } from "@/lib/utils";

/**
 * Masonry asymétrique — les cartes n'ont pas toutes la même taille.
 * La taille reflète l'importance réelle du service, pas une grille 3x2 uniforme.
 */
const SPANS = [
  "lg:col-span-2 lg:row-span-2", // Référencement local — feature
  "lg:col-span-2 lg:row-span-1", // Création de sites web — bannière
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
];

/** Trait fin qui se dessine au scroll — remplace la boîte fermée */
function ServiceLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.5"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="h-px w-full bg-ink/10">
      <motion.div style={{ scaleX }} className="h-px w-full origin-left bg-kinetic" />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-paper">
      <div className="container-max mx-auto">
        <div className="text-center section-header-space max-w-2xl mx-auto">
          <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
            Services
          </RevealLabel>
          <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Six expertises, un seul objectif : votre croissance
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:grid-flow-dense gap-8 lg:gap-x-10 lg:gap-y-8 lg:auto-rows-[minmax(200px,auto)]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const href = `/services/${service.slug}`;
            const featured = index === 0;

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: kineticEase }}
                className={cn(SPANS[index] ?? "")}
              >
                <Link
                  href={href}
                  aria-label={`En savoir plus sur ${service.title}`}
                  className="group flex h-full w-full flex-col justify-between py-2 text-ink transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <span
                        className={cn(
                          "font-display font-extrabold leading-none text-ink/10 group-hover:text-kinetic/25 transition-colors duration-500",
                          featured ? "text-5xl sm:text-7xl lg:text-8xl" : "text-4xl sm:text-5xl lg:text-6xl"
                        )}
                      >
                        0{index + 1}
                      </span>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-kinetic">
                        <Icon className="h-5 w-5 text-paper" />
                      </div>
                    </div>

                    <ServiceLine />

                    <h3
                      className={cn(
                        "font-display font-bold mt-6 mb-2 transition-colors group-hover:text-kinetic",
                        featured ? "text-2xl lg:text-3xl" : "text-lg"
                      )}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={cn(
                        "leading-relaxed font-light text-ink/60",
                        featured ? "text-base max-w-sm" : "text-sm"
                      )}
                    >
                      {service.cardDescription}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-kinetic">
                    En savoir plus
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
