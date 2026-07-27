"use client";

import Link from "next/link";
import { Eye, TrendingUp, Workflow, ArrowUpRight } from "lucide-react";
import { MotionSection, MotionCard } from "@/components/motion";
import { LiquidGlass } from "@/components/visual/liquid-glass";

const values = [
  {
    icon: Eye,
    title: "Visibilité",
    benefit: "Soyez trouvé au bon moment",
    description: "Présence locale et digitale là où vos clients cherchent.",
    gradient: "from-premium/20 to-premium/5",
    iconColor: "text-premium",
    href: "/services/referencement-local",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    benefit: "Convertissez plus de prospects",
    description: "Parcours optimisés pour transformer l'intérêt en demandes.",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
    href: "/services/marketing-digital",
  },
  {
    icon: Workflow,
    title: "Automatisation",
    benefit: "Gagnez du temps chaque semaine",
    description: "Processus intelligents qui libèrent vos équipes.",
    gradient: "from-premium/15 to-accent/10",
    iconColor: "text-premium",
    href: "/services/automatisation",
  },
];

export function ValueSection() {
  return (
    <section id="solutions" className="section-padding">
      <div className="container-max mx-auto">
        <MotionSection className="text-center mb-16 max-w-3xl mx-auto">
          <p className="section-label">Solutions</p>
          <h2 className="section-title">
            Des leviers concrets pour développer votre entreprise
          </h2>
        </MotionSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((item, index) => (
            <MotionCard key={item.title} delay={index * 0.1}>
              <Link href={item.href} className="block h-full group">
                <LiquidGlass interactive className="rounded-2xl p-8 lg:p-10 h-full">
                  <div
                    className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${item.gradient} mb-6 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-premium mb-2">
                    {item.benefit}
                  </p>
                  <h3 className="text-2xl font-bold text-night dark:text-white mb-3 group-hover:text-premium transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-premium text-sm font-medium">
                    En savoir plus
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </LiquidGlass>
              </Link>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
