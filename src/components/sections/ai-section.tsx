"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Globe, MessageCircle, Mail, BarChart3, Workflow } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const nodes = [
  { icon: Globe, label: "Site web", angle: 0 },
  { icon: MessageCircle, label: "WhatsApp", angle: 60 },
  { icon: Mail, label: "Email", angle: 120 },
  { icon: BarChart3, label: "Analytics", angle: 180 },
  { icon: Workflow, label: "Automatisation", angle: 240 },
  { icon: Sparkles, label: "CRM", angle: 300 },
];

function getPosition(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export function AiSection() {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const loopAnim = effectsEnabled && !reduced;

  return (
    <section id="ia" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-night" />
      <div className="absolute inset-0 bg-gradient-to-br from-premium/15 via-transparent to-accent/15" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-premium/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <MotionSection>
            <p className="text-premium font-semibold text-sm uppercase tracking-wider mb-3">
              Intelligence artificielle
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              L&apos;IA au service de vos opérations
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Nous connectons vos canaux digitaux — site, messagerie, email, analytics
              et CRM — pour automatiser les tâches à faible valeur et accélérer vos
              résultats.
            </p>
            <ul className="space-y-3 text-slate-300 text-sm">
              {[
                "Qualification automatique des leads",
                "Relances et notifications intelligentes",
                "Tableaux de bord unifiés",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-premium" />
                  {item}
                </li>
              ))}
            </ul>
          </MotionSection>

          <div className="relative flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
              aria-hidden="true"
            >
              {nodes.map((node, i) => {
                const pos = getPosition(node.angle, 140);
                return (
                  <motion.line
                    key={node.label}
                    x1="200"
                    y1="200"
                    x2={200 + pos.x}
                    y2={200 + pos.y}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                  />
                );
              })}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 h-24 w-24 rounded-2xl bg-gradient-to-br from-premium to-accent flex items-center justify-center shadow-2xl shadow-premium/30"
            >
              <Sparkles className="h-10 w-10 text-white" />
              {loopAnim && (
                <motion.div
                  className="absolute -inset-3 rounded-3xl border border-premium/30"
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.15, opacity: 0 }}
                  transition={{ duration: 2, repeat: 2, ease: "easeOut" }}
                />
              )}
            </motion.div>

            {nodes.map((node, i) => {
              const pos = getPosition(node.angle, 140);
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="absolute z-10"
                  style={{
                    left: `calc(50% + ${pos.x}px - 40px)`,
                    top: `calc(50% + ${pos.y}px - 32px)`,
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-14 w-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <node.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
                      {node.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
