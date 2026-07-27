"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Hammer, LineChart } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { SectionHeader, RevealSubtitle, RevealWords } from "@/components/visual/text-reveal";
import { AnimatedIcon } from "@/components/visual/animated-icon";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Analyse",
    description: "Comprendre votre activité, vos objectifs et vos défis.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Construction",
    description: "Développer une stratégie et des solutions adaptées.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Optimisation",
    description: "Améliorer continuellement les performances.",
  },
];

export function MethodSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { effectsEnabled } = usePerformanceMode();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section id="methode" className="section-padding">
      <div className="container-max mx-auto">
        <MotionSection className="text-center section-header-space max-w-3xl mx-auto" parallax>
          <SectionHeader
            centered
            label="Méthode"
            title="Une approche simple pour des résultats mesurables"
          />
        </MotionSection>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          {/* Desktop horizontal progress */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-white/10">
            {effectsEnabled && (
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-premium to-accent"
                style={{ scaleX: lineScale }}
              />
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center lg:text-left"
              >
                <div className="inline-flex relative z-10 mb-6 mx-auto lg:mx-0">
                  <AnimatedIcon
                    icon={step.icon}
                    delay={index * 0.12}
                    wrapperClassName="h-16 w-16 rounded-2xl bg-gradient-to-br from-premium to-accent shadow-lg shadow-premium/25"
                    className="h-7 w-7 text-white"
                    size="lg"
                  />
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-premium bg-white dark:bg-night px-2 py-0.5 rounded-full border border-premium/20">
                    {step.number}
                  </span>
                </div>
                <RevealSubtitle
                  delay={index * 0.08}
                  className="text-xl font-bold text-night dark:text-white mb-2"
                >
                  {step.title}
                </RevealSubtitle>
                <RevealWords
                  text={step.description}
                  compact
                  delay={0.1 + index * 0.08}
                  className="text-muted leading-relaxed block"
                  as="span"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
