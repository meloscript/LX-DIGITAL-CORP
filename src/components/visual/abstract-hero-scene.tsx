"use client";

import { motion } from "framer-motion";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { heroEase, usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

const PARTICLES = [
  { top: "18%", left: "72%", size: 10, delay: 0.15 },
  { top: "62%", left: "78%", size: 8, delay: 0.25 },
  { top: "45%", left: "88%", size: 8, delay: 0.35, hiddenMobile: true },
];

export function AbstractHeroScene() {
  const { effectsEnabled, reduced } = usePerformanceMode();
  const pointer = usePointerParallax(14);

  if (!effectsEnabled || reduced) return null;

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: heroEase }}
    >
      {/* Glass disc — parallax wrapper + CSS spin */}
      <div
        className="absolute top-[8%] right-[-4%] w-[240px] h-[240px] md:w-[380px] md:h-[380px]"
        style={{
          transform: `translate(${pointer.x * 0.4}px, ${pointer.y * 0.4}px)`,
        }}
      >
        <div className="w-full h-full animate-spin-slow">
          <div
            className={cn(
              "w-full h-full rounded-full border border-white/30 dark:border-white/10",
              "bg-gradient-to-br from-premium/10 via-transparent to-accent/10",
              "shadow-[inset_0_0_60px_rgba(255,255,255,0.12)]"
            )}
            style={{ transform: "perspective(900px) rotateX(58deg) rotateZ(15deg)" }}
          />
        </div>
      </div>

      {/* Glass ring */}
      <div
        className="absolute bottom-[14%] left-[-2%] w-[160px] h-[160px] md:w-[260px] md:h-[260px] hidden sm:block"
        style={{
          transform: `translate(${pointer.x * -0.5}px, ${pointer.y * -0.3}px)`,
        }}
      >
        <div className="w-full h-full animate-spin-slow-reverse">
          <div
            className="w-full h-full rounded-full border-2 border-white/25 dark:border-white/10 liquid-glass-subtle"
            style={{ transform: "perspective(700px) rotateX(68deg)" }}
          />
        </div>
      </div>

      {/* Soft orbs */}
      <div
        className="absolute top-[32%] left-[8%] w-28 h-28 md:w-40 md:h-40 rounded-full bg-premium/10 blur-2xl"
        style={{ transform: `translate(${pointer.x * 0.8}px, ${pointer.y * 0.8}px)` }}
      />
      <div
        className="absolute bottom-[28%] right-[32%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-accent/10 blur-2xl hidden md:block"
        style={{ transform: `translate(${pointer.x * -0.6}px, ${pointer.y * 0.4}px)` }}
      />

      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className={cn(
            "hero-scene-particle animate-float-gentle",
            p.hiddenMobile && "hidden md:block"
          )}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay + i * 0.3}s`,
            transform: `translate(${pointer.x * (0.5 + i * 0.1)}px, ${pointer.y * (0.4 + i * 0.08)}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: p.delay, duration: 0.5, ease: heroEase }}
        />
      ))}
    </motion.div>
  );
}
