"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDashboard } from "@/components/sections/hero-dashboard";
import { HeroSceneLazy } from "@/components/visual/hero-scene-lazy";
import { HeroTitleReveal } from "@/components/visual/hero-title-reveal";
import { TiltContainer } from "@/components/visual/tilt-container";
import { contactHref } from "@/lib/navigation";
import {
  heroEase,
  heroTiming,
  usePerformanceMode,
} from "@/hooks/use-performance-mode";

export function HeroSection() {
  const reduced = useReducedMotion();
  const { effectsEnabled, animateEntrance } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, effectsEnabled ? 60 : 0]);
  const yLeft = useTransform(scrollY, [0, 500], [0, effectsEnabled ? -30 : 0]);
  const opacity = useTransform(scrollY, [0, 300], [1, effectsEnabled ? 0.35 : 1]);
  const contentY = useTransform(scrollY, [0, 400], [0, effectsEnabled ? 24 : 0]);

  useEffect(() => setMounted(true), []);

  const fadeUp = (delay: number) =>
    mounted && animateEntrance && !reduced
      ? {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.45, ease: heroEase },
        }
      : {};

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-surface dark:from-night dark:via-night dark:to-night/95" />

      <HeroSceneLazy />

      {effectsEnabled && !reduced && (
        <>
          <motion.div
            style={{ y }}
            className="absolute top-20 -right-32 w-96 h-96 bg-premium/10 rounded-full blur-3xl will-change-transform"
          />
          <motion.div
            style={{ y: yLeft }}
            className="absolute -bottom-20 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl will-change-transform"
          />
        </>
      )}

      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">
          <motion.div
            style={effectsEnabled ? { opacity, y: contentY } : undefined}
            className="max-w-2xl"
          >
            <motion.div {...fadeUp(heroTiming.badge)}>
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premium/5 border border-premium/10 text-premium text-sm font-medium mb-6 liquid-glass-subtle ${
                  animateEntrance && !reduced ? "animate-float-gentle" : ""
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Solutions digitales &amp; IA
              </div>
            </motion.div>

            <HeroTitleReveal />

            <motion.p
              {...fadeUp(heroTiming.paragraph)}
              className="text-lg text-muted leading-relaxed mb-8 max-w-xl"
            >
              Nous développons des solutions digitales qui attirent plus de clients,
              optimisent vos processus et transforment votre présence en ligne en
              véritable moteur de croissance.
            </motion.p>

            <motion.div
              {...fadeUp(heroTiming.buttons)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="btn-premium-hover">
                <Button asChild size="lg">
                  <Link href={contactHref}>
                    Parler à un expert
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="btn-premium-hover">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/#solutions">Découvrir nos solutions</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            {...(mounted && animateEntrance && !reduced
              ? {
                  initial: { opacity: 0, y: 32 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    delay: heroTiming.dashboard,
                    duration: 0.55,
                    ease: heroEase,
                  },
                }
              : {})}
            className={`relative hero-dashboard-depth rounded-2xl ${
              animateEntrance && !reduced ? "animate-float-gentle-slow" : ""
            }`}
          >
            <TiltContainer maxTilt={effectsEnabled ? 5 : 0}>
              <HeroDashboard />
            </TiltContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
