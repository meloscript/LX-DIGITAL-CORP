"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { LiquidGlass } from "@/components/visual/liquid-glass";

const optimized = [
  "Présence digitale forte",
  "Site professionnel",
  "Visibilité Google",
  "Processus automatisés",
  "Données exploitables",
];

const limited = [
  "Faible visibilité",
  "Processus manuels",
  "Clients perdus",
  "Croissance ralentie",
];

export function ProblemSection() {
  return (
    <section className="section-padding section-alt">
      <div className="container-max mx-auto">
        <MotionSection className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="section-title mb-4">
            Chaque opportunité non saisie devient une opportunité pour vos{" "}
            <span className="text-gradient">concurrents</span>
          </h2>
          <p className="text-lg text-muted">
            L&apos;écart entre une entreprise optimisée et une entreprise limitée se
            mesure en clients perdus et en croissance manquée.
          </p>
        </MotionSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <LiquidGlass className="relative rounded-2xl p-8 lg:p-10 h-full border border-premium/20">
              <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-premium to-accent text-white text-sm font-semibold rounded-full">
                Entreprise optimisée
              </div>
              <ul className="space-y-5 mt-4">
                {optimized.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-premium/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-premium" />
                    </div>
                    <span className="text-night dark:text-white font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </LiquidGlass>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <LiquidGlass className="relative rounded-2xl p-8 lg:p-10 h-full opacity-90">
              <div className="absolute -top-3 left-6 px-4 py-1 bg-slate-500 text-white text-sm font-semibold rounded-full">
                Entreprise limitée
              </div>
              <ul className="space-y-5 mt-4">
                {limited.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center">
                      <X className="h-4 w-4 text-slate-400" />
                    </div>
                    <span className="text-muted font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </LiquidGlass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
