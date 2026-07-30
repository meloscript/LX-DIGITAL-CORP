"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Hammer, LineChart } from "lucide-react";
import { RevealLabel } from "@/components/visual/text-reveal";
import { kineticEase } from "@/lib/motion-config";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Analyse",
    description: "Comprendre votre activité, vos objectifs et vos concurrents sur Google.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Construction",
    description: "Concevoir le site, le référencement et les automatisations nécessaires.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Optimisation",
    description: "Mesurer, ajuster et améliorer les résultats en continu.",
  },
];

/** Chemin en S reliant approximativement les 3 étapes (positions 8% / 50% / 92%) */
const PATH_D = "M 40,70 C 260,10 340,130 500,70 C 660,10 740,130 960,70";

export function MethodSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dashOffset = useTransform(pathProgress, (v) => 1 - v);

  return (
    <section id="methode" className="section-padding bg-ink">
      <div className="container-max mx-auto">
        <div className="text-center section-header-space max-w-2xl mx-auto">
          <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
            Méthode
          </RevealLabel>
          <h2 className="font-display font-extrabold text-paper text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Une approche simple pour des résultats mesurables
          </h2>
        </div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Chemin SVG qui se dessine au scroll — relie les 3 étapes */}
          <svg
            className="hidden lg:block absolute top-8 left-0 w-full h-[140px] pointer-events-none"
            viewBox="0 0 1000 140"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={PATH_D}
              stroke="rgba(245, 243, 238, 0.12)"
              strokeWidth="2"
              pathLength={1}
            />
            <motion.path
              d={PATH_D}
              stroke="#FF4D23"
              strokeWidth="2"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: dashOffset,
              }}
            />
          </svg>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: kineticEase }}
                className="relative text-center lg:text-left"
              >
                <div className="relative inline-flex mb-6 mx-auto lg:mx-0">
                  <div className="h-16 w-16 rounded-full bg-kinetic flex items-center justify-center shadow-lg shadow-kinetic/20">
                    <step.icon className="h-7 w-7 text-paper" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-kinetic bg-ink px-2 py-0.5 rounded-full border border-kinetic/30">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-paper mb-2">{step.title}</h3>
                <p className="text-paper/60 leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
