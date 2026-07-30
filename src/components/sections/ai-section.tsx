"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { Globe, MessageCircle, Mail, BarChart3, Workflow, Users } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { RevealLabel, RevealLine } from "@/components/visual/text-reveal";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const nodes = [
  { icon: Globe, label: "Site web", angle: 0 },
  { icon: MessageCircle, label: "WhatsApp", angle: 60 },
  { icon: Mail, label: "Email", angle: 120 },
  { icon: BarChart3, label: "Analytics", angle: 180 },
  { icon: Workflow, label: "Automatisation", angle: 240 },
  { icon: Users, label: "CRM", angle: 300 },
];

function getPosition(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function ConvergingLine({ angle, progress }: { angle: number; progress: MotionValue<number> }) {
  const x2 = useTransform(progress, (p) => {
    const radius = 150 - p * 65;
    return 200 + getPosition(angle, radius).x;
  });
  const y2 = useTransform(progress, (p) => {
    const radius = 150 - p * 65;
    return 200 + getPosition(angle, radius).y;
  });

  return (
    <motion.line
      x1="200"
      y1="200"
      x2={x2}
      y2={y2}
      stroke="#FF4D23"
      strokeOpacity={0.35}
      strokeWidth="1"
    />
  );
}

function ConvergingNode({
  angle,
  progress,
  icon: Icon,
  label,
}: {
  angle: number;
  progress: MotionValue<number>;
  icon: typeof Globe;
  label: string;
}) {
  const left = useTransform(progress, (p) => {
    const radius = 150 - p * 65;
    return `calc(50% + ${getPosition(angle, radius).x}px - 28px)`;
  });
  const top = useTransform(progress, (p) => {
    const radius = 150 - p * 65;
    return `calc(50% + ${getPosition(angle, radius).y}px - 28px)`;
  });

  return (
    <motion.div className="absolute z-10" style={{ left, top }}>
      <div className="flex flex-col items-center gap-2">
        <div className="h-14 w-14 rounded-full bg-paper/10 border border-paper/15 flex items-center justify-center">
          <Icon className="h-6 w-6 text-paper" />
        </div>
        <span className="text-xs font-medium text-paper/60 whitespace-nowrap">{label}</span>
      </div>
    </motion.div>
  );
}

export function AiSection() {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const staticProgress = useMotionValue(1);

  return (
    <section id="ia" ref={ref} className="relative overflow-hidden bg-ink section-padding">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <MotionSection parallax>
            <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
              Automatisation
            </RevealLabel>
            <h2 className="font-display font-extrabold text-paper text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Tout ce qui vous relie à vos clients, connecté
            </h2>
            <p className="text-paper/60 leading-relaxed font-light mb-5 max-w-lg">
              Nous connectons vos canaux digitaux — site, messagerie, email et CRM —
              pour automatiser les tâches à faible valeur et accélérer vos résultats.
            </p>
            <ul className="space-y-3 text-paper/70 text-sm">
              {[
                "Qualification automatique des leads",
                "Relances et notifications intelligentes",
                "Suivi unifié de vos échanges clients",
              ].map((item, i) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-kinetic shrink-0" />
                  <RevealLine delay={0.1 + i * 0.06}>{item}</RevealLine>
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
              {nodes.map((node) => (
                <ConvergingLine
                  key={node.label}
                  angle={node.angle}
                  progress={effectsEnabled && !reduced ? progress : staticProgress}
                />
              ))}
            </svg>

            <div className="relative z-10 h-24 w-24 rounded-full bg-kinetic flex items-center justify-center shadow-2xl shadow-kinetic/30">
              <span className="font-display font-extrabold text-2xl text-paper">IA</span>
            </div>

            {nodes.map((node) => (
              <ConvergingNode
                key={node.label}
                angle={node.angle}
                icon={node.icon}
                label={node.label}
                progress={effectsEnabled && !reduced ? progress : staticProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
