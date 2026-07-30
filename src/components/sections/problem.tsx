"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, X, MoveHorizontal } from "lucide-react";
import { RevealLabel } from "@/components/visual/text-reveal";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

const optimized = [
  "Présence digitale forte",
  "Site professionnel et rapide",
  "Visibilité Google",
  "Processus automatisés",
  "Accompagnement continu",
];

const limited = [
  "Faible visibilité",
  "Site lent ou daté",
  "Invisible sur Google",
  "Processus manuels",
  "Clients perdus",
];

function ListPanel({
  items,
  variant,
  compact = false,
}: {
  items: string[];
  variant: "optimized" | "limited";
  compact?: boolean;
}) {
  const isOptimized = variant === "optimized";
  const alignEnd = !isOptimized && !compact;
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-center gap-4 sm:gap-5 p-6 sm:p-12",
        alignEnd && "items-end text-right"
      )}
    >
      <span
        className={
          isOptimized
            ? "text-xs font-semibold uppercase tracking-wider text-kinetic mb-2"
            : "text-xs font-semibold uppercase tracking-wider text-paper/35 mb-2"
        }
      >
        {isOptimized ? "Entreprise trouvée sur Google" : "Entreprise invisible"}
      </span>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-3",
              !isOptimized && !compact && "flex-row-reverse"
            )}
          >
            <div
              className={
                isOptimized
                  ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kinetic"
                  : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper/10"
              }
            >
              {isOptimized ? (
                <Check className="h-4 w-4 text-paper" />
              ) : (
                <X className="h-4 w-4 text-paper/40" />
              )}
            </div>
            <span
              className={
                isOptimized
                  ? "font-medium text-paper text-base sm:text-lg"
                  : "font-medium text-paper/40 text-base sm:text-lg"
              }
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProblemSection() {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const reveal = useTransform(scrollYProgress, [0, 1], [2, 98]);
  const clipPath = useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(reveal, (v) => `${v}%`);

  const simple = !effectsEnabled || !!reduced;

  return (
    <section className="section-padding bg-ink">
      <div className="container-max mx-auto">
        <div className="text-center section-header-space max-w-2xl mx-auto">
          <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
            Le constat
          </RevealLabel>
          <h2 className="font-display font-extrabold text-paper text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Chaque recherche non captée profite à un concurrent
          </h2>
          <p className="text-paper/60 leading-relaxed font-light">
            L&apos;écart entre une entreprise trouvée sur Google et une entreprise invisible
            se mesure en clients perdus, chaque jour.
          </p>
        </div>

        {simple ? (
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            <div className="corner-cut-br border border-paper/10 bg-ink overflow-hidden min-h-[260px]">
              <ListPanel items={limited} variant="limited" compact />
            </div>
            <div className="corner-cut-br border border-kinetic/30 bg-ink overflow-hidden min-h-[260px]">
              <ListPanel items={optimized} variant="optimized" compact />
            </div>
          </div>
        ) : (
          <div
            ref={ref}
            className="corner-cut-br relative mx-auto max-w-4xl border border-paper/10 bg-ink overflow-hidden h-[420px] sm:h-[380px]"
          >
            {/* Panneau de fond : limité */}
            <div className="absolute inset-0">
              <ListPanel items={limited} variant="limited" />
            </div>

            {/* Panneau révélé progressivement : optimisé */}
            <motion.div
              className="absolute inset-0 bg-ink border-r border-kinetic/40"
              style={{ clipPath }}
            >
              <ListPanel items={optimized} variant="optimized" />
            </motion.div>

            {/* Curseur / slider visuel */}
            <motion.div
              className="absolute top-0 bottom-0 z-10 flex items-center"
              style={{ left: dividerLeft }}
            >
              <div className="h-full w-px bg-kinetic/60" />
              <div className="absolute flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-kinetic shadow-lg">
                <MoveHorizontal className="h-4 w-4 text-paper" />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
