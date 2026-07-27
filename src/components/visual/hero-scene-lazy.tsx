"use client";

import dynamic from "next/dynamic";
import { useDeferredEffects, usePerformanceMode } from "@/hooks/use-performance-mode";

const AbstractHeroScene = dynamic(
  () =>
    import("@/components/visual/abstract-hero-scene").then((m) => ({
      default: m.AbstractHeroScene,
    })),
  { ssr: false }
);

/** CSS backdrop — visible immediately while full scene loads */
function HeroSceneLite() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="absolute top-[8%] right-[-4%] w-[240px] h-[240px] md:w-[380px] md:h-[380px] animate-spin-slow opacity-60">
        <div
          className="w-full h-full rounded-full border border-white/30 dark:border-white/10 bg-gradient-to-br from-premium/10 via-transparent to-accent/10 shadow-[inset_0_0_60px_rgba(255,255,255,0.12)]"
          style={{ transform: "perspective(900px) rotateX(58deg) rotateZ(15deg)" }}
        />
      </div>
      <div className="absolute bottom-[14%] left-[-2%] w-[160px] h-[160px] md:w-[260px] md:h-[260px] hidden sm:block animate-spin-slow-reverse opacity-50">
        <div
          className="w-full h-full rounded-full border-2 border-white/25 dark:border-white/10 liquid-glass-subtle"
          style={{ transform: "perspective(700px) rotateX(68deg)" }}
        />
      </div>
      <div className="absolute top-[15%] right-[5%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-premium/10 blur-3xl" />
      <div className="absolute bottom-[20%] left-[0%] w-40 h-40 rounded-full bg-accent/10 blur-3xl hidden sm:block" />
      <div className="absolute top-[32%] left-[8%] w-28 h-28 md:w-40 md:h-40 rounded-full bg-premium/10 blur-2xl" />
    </div>
  );
}

export function HeroSceneLazy() {
  const { effectsEnabled } = usePerformanceMode();
  const deferReady = useDeferredEffects();

  if (!effectsEnabled) return <HeroSceneLite />;
  if (!deferReady) return <HeroSceneLite />;

  return <AbstractHeroScene />;
}