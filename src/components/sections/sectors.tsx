"use client";

import Link from "next/link";
import {
  Hotel,
  UtensilsCrossed,
  Stethoscope,
  Building,
  Car,
  ShoppingBag,
  Briefcase,
  Factory,
} from "lucide-react";
import { MotionSection, MotionCard } from "@/components/motion";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import { contactHref } from "@/lib/navigation";

const sectors = [
  {
    icon: Hotel,
    title: "Hôtellerie",
    description: "Réservations directes et visibilité en ligne renforcées.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restauration",
    description: "Attirez les clients au moment où ils cherchent où manger.",
  },
  {
    icon: Stethoscope,
    title: "Santé",
    description: "Présence digitale et prise de rendez-vous simplifiées.",
  },
  {
    icon: Building,
    title: "Immobilier",
    description: "Leads qualifiés et valorisation de vos biens.",
  },
  {
    icon: Car,
    title: "Automobile",
    description: "Visibilité locale quand le besoin se fait sentir.",
  },
  {
    icon: ShoppingBag,
    title: "Commerce",
    description: "Plus de trafic et meilleur taux de conversion.",
  },
  {
    icon: Briefcase,
    title: "Services",
    description: "Clientèle élargie grâce à une présence digitale forte.",
  },
  {
    icon: Factory,
    title: "Industrie",
    description: "Processus modernisés et croissance accélérée.",
  },
];

export function SectorsSection() {
  return (
    <section id="secteurs" className="section-padding">
      <div className="container-max mx-auto">
        <MotionSection className="text-center mb-16 max-w-3xl mx-auto">
          <p className="section-label">Secteurs</p>
          <h2 className="section-title mb-4">
            Des solutions adaptées à chaque activité
          </h2>
          <p className="text-lg text-muted">
            Nous adaptons notre approche à votre secteur, vos clients et vos objectifs
            de croissance.
          </p>
        </MotionSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sectors.map((sector, index) => (
            <MotionCard key={sector.title} delay={index * 0.06}>
              <Link href={contactHref} className="block h-full group">
                <LiquidGlass interactive className="p-6 rounded-2xl h-full">
                  <div className="inline-flex p-3 rounded-xl bg-premium/10 text-premium mb-4 group-hover:scale-110 transition-transform duration-300">
                    <sector.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-night dark:text-white mb-2 group-hover:text-premium transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{sector.description}</p>
                </LiquidGlass>
              </Link>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
