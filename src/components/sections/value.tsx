"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eye, TrendingUp, Workflow, ArrowUpRight } from "lucide-react";
import { RevealLabel } from "@/components/visual/text-reveal";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Eye,
    title: "Visibilité",
    benefit: "Soyez trouvé au bon moment",
    description: "Présence locale et digitale là où vos clients cherchent, sur Google en premier lieu.",
    href: "/services/referencement-local",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    benefit: "Convertissez plus de prospects",
    description: "Un site rapide et clair, pensé pour transformer l'intérêt en demandes concrètes.",
    href: "/services/marketing-digital",
  },
  {
    icon: Workflow,
    title: "Automatisation",
    benefit: "Gagnez du temps chaque semaine",
    description: "Des processus connectés qui suppriment les tâches manuelles et les leads perdus.",
    href: "/services/automatisation",
  },
];

const CARD_VW = 68;
const GAP_VW = 5;
const STEP = CARD_VW + GAP_VW;

function ValueCard({
  item,
  index,
  fullWidth = false,
}: {
  item: (typeof values)[number];
  index: number;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={item.href}
      style={fullWidth ? undefined : { width: `${CARD_VW}vw` }}
      className={cn(
        "corner-cut-br group flex flex-col justify-between bg-ink text-paper p-6 sm:p-10 lg:p-12 h-[48vh] max-h-[420px] min-h-[280px] sm:min-h-[320px] hover:bg-ink/95 transition-colors",
        fullWidth ? "w-full" : "shrink-0 h-[52vh]"
      )}
    >
      <div>
        <span className="text-xs font-semibold tracking-wide text-paper/40">0{index + 1}</span>
        <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-kinetic">
          <item.icon className="h-6 w-6 text-paper" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-kinetic mb-2">
          {item.benefit}
        </p>
        <h3 className="font-display text-3xl sm:text-4xl font-extrabold mb-3">{item.title}</h3>
        <p className="text-paper/60 leading-relaxed font-light max-w-md mb-5">
          {item.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium">
          En savoir plus
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Version statique (mobile / reduced motion / lite) — pile pleine largeur */
function ValueStack() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6">
      {values.map((item, index) => (
        <ValueCard key={item.title} item={item} index={index} fullWidth />
      ))}
    </div>
  );
}

export function ValueSection() {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const n = values.length;
  const positions: number[] = [];
  const stops: number[] = [];
  for (let i = 0; i < n; i++) {
    const start = i / n;
    const holdEnd = start + (1 / n) * 0.55;
    stops.push(start, holdEnd);
    positions.push(-i * STEP, -i * STEP);
  }

  const trackX = useTransform(scrollYProgress, stops, positions);
  const trackXvw = useTransform(trackX, (v) => `${v}vw`);

  const simple = !effectsEnabled || !!reduced;

  return (
    <section id="solutions" className="relative bg-paper">
      <div className="pt-16 lg:pt-20 pb-10 text-center max-w-2xl mx-auto px-4">
        <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
          Solutions
        </RevealLabel>
        <h2 className="font-display font-extrabold text-ink text-3xl sm:text-4xl lg:text-5xl tracking-tight">
          Trois leviers, une seule croissance
        </h2>
      </div>

      {simple ? (
        <div className="pb-16 lg:pb-20">
          <ValueStack />
        </div>
      ) : (
        <div ref={wrapperRef} className="relative" style={{ height: `${n * 100}vh` }}>
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div
              style={{ x: trackXvw }}
              className={cn("flex gap-[5vw] pl-[16vw] pr-[16vw]")}
            >
              {values.map((item, index) => (
                <ValueCard key={item.title} item={item} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
