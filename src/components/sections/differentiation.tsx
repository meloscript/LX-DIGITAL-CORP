"use client";

import Link from "next/link";
import {
  Award,
  Lightbulb,
  Puzzle,
  Cpu,
  Target,
  HeartHandshake,
} from "lucide-react";
import { MotionSection, MotionCard } from "@/components/motion";
import { SectionHeader, RevealSubtitle, RevealWords } from "@/components/visual/text-reveal";
import { AnimatedIcon } from "@/components/visual/animated-icon";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import { contactHref } from "@/lib/navigation";

const cards = [
  {
    icon: Award,
    title: "Expertise",
    description: "Maîtrise des leviers de croissance digitale, de la stratégie à l'exécution.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Solutions à la pointe, intégrant IA et automatisation là où elles créent de la valeur.",
  },
  {
    icon: Puzzle,
    title: "Solutions personnalisées",
    description: "Chaque projet est calibré sur vos objectifs, votre secteur et votre rythme.",
  },
  {
    icon: Cpu,
    title: "Technologies modernes",
    description: "Stack performante et évolutive pour rester compétitif sur le long terme.",
  },
  {
    icon: Target,
    title: "Approche orientée résultats",
    description: "Chaque action est mesurée pour maximiser votre retour sur investissement.",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement humain",
    description: "Un interlocuteur dédié qui comprend votre activité et vos ambitions.",
  },
];

export function DifferentiationSection() {
  return (
    <section id="apropos" className="section-padding section-alt">
      <div className="container-max mx-auto">
        <MotionSection className="text-center section-header-space max-w-3xl mx-auto" parallax>
          <SectionHeader
            centered
            label="À propos"
            titleClassName="section-title mb-6"
            titleSegments={[
              { text: "Plus qu'un prestataire, un " },
              {
                text: "partenaire de croissance",
                className: "text-gradient",
                shine: true,
              },
            ]}
            description="LX Digital Corp conçoit des systèmes digitaux qui génèrent de la visibilité, de l'efficacité et de la croissance durable — pas des livrables isolés."
            descriptionClassName="text-lg text-muted leading-relaxed"
          />
        </MotionSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <MotionCard key={card.title} delay={index * 0.08}>
              <LiquidGlass interactive className="p-6 lg:p-8 rounded-2xl h-full group">
                <AnimatedIcon
                  icon={card.icon}
                  delay={index * 0.06}
                  wrapperClassName="h-12 w-12 rounded-xl bg-premium/10 mb-5 group-hover:bg-premium/15 transition-colors"
                  className="h-6 w-6 text-premium"
                />
                <RevealSubtitle
                  delay={index * 0.04}
                  className="text-lg font-bold text-night dark:text-white mb-2"
                >
                  {card.title}
                </RevealSubtitle>
                <RevealWords
                  text={card.description}
                  compact
                  delay={0.06 + index * 0.04}
                  className="text-muted text-sm leading-relaxed block"
                  as="span"
                />
              </LiquidGlass>
            </MotionCard>
          ))}
        </div>

        <MotionSection className="text-center">
          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 text-premium font-semibold hover:underline"
          >
            Discuter de votre projet avec notre équipe →
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
