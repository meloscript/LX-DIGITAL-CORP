"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FlapLetters } from "@/components/visual/flap-letters";
import { BrandGenealogyTree } from "@/components/visual/brand-genealogy-tree";
import { FallingParticles } from "@/components/visual/falling-particles";
import { HoverSwapText } from "@/components/visual/hover-swap";
import { KineticCursorLight } from "@/components/visual/kinetic-cursor-light";
import { contactHref } from "@/lib/navigation";
import { kineticEase } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const OLD_HEADLINE = "Trouvent vos concurrents";
const NEW_HEADLINE = "Vous trouvent d'abord";

/** Hold barré, puis split-flap */
const HOLD_MS = 3200;
const FLAP_OUT_DURATION_MS = 340;
const FLAP_OUT_STAGGER_MS = 18;
const FLAP_GAP_MS = 180;
const FLAP_IN_DURATION_MS = 380;
const FLAP_IN_STAGGER_MS = 22;
const FLAP_OUT_TOTAL_MS =
  (OLD_HEADLINE.length - 1) * FLAP_OUT_STAGGER_MS + FLAP_OUT_DURATION_MS;
const REVEAL_DELAY_MS = HOLD_MS + FLAP_OUT_TOTAL_MS + FLAP_GAP_MS;

export function HeroSection() {
  const reduced = useReducedMotion();
  const { animateEntrance, effectsEnabled } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [flappingOut, setFlappingOut] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const canAnimate = mounted && animateEntrance && !reduced;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0.55, 0]
  );
  const ambientScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduced ? 1 : 1.18]
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (!animateEntrance || reduced) {
      setResolved(true);
      setFlappingOut(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setFlappingOut(true), HOLD_MS));
    timers.push(setTimeout(() => setResolved(true), REVEAL_DELAY_MS));

    return () => timers.forEach(clearTimeout);
  }, [mounted, animateEntrance, reduced]);

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden hero-gradient-bg pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      {/* Profondeur immersive — lumière + vignette */}
      <span className="hero-vignette" aria-hidden="true" />

      {!reduced && <FallingParticles />}

      {effectsEnabled && (
        <>
          <KineticCursorLight className="hidden lg:block z-[2]" size={640} color="rgba(255, 77, 35, 0.42)" />
          <motion.span
            aria-hidden="true"
            className="hero-ambient left-[-14%] top-[-8%] h-[52vmin] w-[52vmin] bg-[#4a345c]/55"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.4, 0.62, 0.45] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient right-[-12%] top-[-6%] h-[44vmin] w-[44vmin] bg-[#443054]/5"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.32, 0.55, 0.38] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient left-[-10%] bottom-[-10%] h-[48vmin] w-[48vmin] bg-[#3a284c]/55"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.36, 0.58, 0.42] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient right-[-12%] bottom-[-8%] h-[50vmin] w-[50vmin] bg-[#402c58]/5"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.34, 0.56, 0.4] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient left-[18%] top-[22%] h-[36vmin] w-[36vmin] bg-kinetic/28"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.28, 0.48, 0.32] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="hero-scintillation" aria-hidden="true">
            <span className="hero-scintil hero-scintil-1" />
            <span className="hero-scintil hero-scintil-2" />
            <span className="hero-scintil hero-scintil-3" />
            <span className="hero-scintil hero-scintil-4" />
            <span className="hero-scintil hero-scintil-5" />
            <span className="hero-scintil hero-scintil-6" />
            <span className="hero-scintil hero-scintil-7" />
            <span className="hero-scintil hero-scintil-8" />
            <span className="hero-scintil hero-scintil-9" />
            <span className="hero-scintil hero-scintil-10" />
            <span className="hero-scintil hero-scintil-11" />
            <span className="hero-scintil hero-scintil-12" />
          </span>
        </>
      )}

      <motion.div
        className="container-max mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center"
        style={
          canAnimate
            ? { y: contentY, opacity: contentOpacity }
            : undefined
        }
      >
        <div className="relative max-w-5xl shrink-0">
          <motion.span
            aria-hidden="true"
            initial={canAnimate ? { opacity: 0, y: 10 } : false}
            animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="block text-xs sm:text-sm font-semibold tracking-[0.28em] sm:tracking-[0.35em] uppercase text-paper/50 mb-2 sm:mb-3 text-center sm:text-left"
          >
            LX Digital Corp
          </motion.span>

          <div className="hero-perfusion">
            <BrandGenealogyTree canAnimate={canAnimate} />

            <h1 className="relative z-[1] text-center sm:text-left">
              <span className="sr-only">
                LX Digital Corp — Vos clients vous trouvent d&apos;abord.
              </span>

              <motion.div
                aria-hidden="true"
                initial={
                  canAnimate
                    ? { opacity: 0, y: 28, scale: 1.06, filter: "blur(8px)" }
                    : false
                }
                animate={
                  canAnimate
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : undefined
                }
                transition={{ duration: 0.85, delay: 0.12, ease: kineticEase }}
                className="hero-title-depth hero-title-glass hero-title-glass--fed text-center sm:text-left origin-center sm:origin-left"
              >
                <span className="hero-title-glass-edge" aria-hidden="true" />
                <span className="hero-title-glass-shine" aria-hidden="true" />
                <span className="hero-title-glass-specular" aria-hidden="true" />
                <span className="hero-title-infusion" aria-hidden="true" />
                {effectsEnabled && (
                  <span className="hero-title-scintils" aria-hidden="true">
                    <span className="hero-title-scintil s1" />
                    <span className="hero-title-scintil s2" />
                    <span className="hero-title-scintil s3" />
                    <span className="hero-title-scintil s4" />
                    <span className="hero-title-scintil s5" />
                    <span className="hero-title-scintil s6" />
                    <span className="hero-title-scintil s7" />
                    <span className="hero-title-scintil s8" />
                  </span>
                )}

                <motion.div
                  className="relative z-[1] origin-center sm:origin-left will-change-transform"
                  initial={canAnimate ? { scale: 1 } : false}
                  animate={canAnimate ? { scale: 1.14 } : undefined}
                  transition={{ duration: 10, ease: "linear", delay: 0.4 }}
                >
                  <span className="hero-title-line hero-title-shimmer block font-display font-extrabold uppercase text-paper leading-[0.9] tracking-[-0.045em] text-[clamp(2.55rem,12vw,6.5rem)]">
                    Vos clients
                  </span>

                  <span className="relative mt-1.5 inline-grid max-w-full font-display font-extrabold uppercase leading-[1.02] tracking-[-0.05em] text-[clamp(1.2rem,5.8vw,3.85rem)]">
                    <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
                      {OLD_HEADLINE}
                    </span>

                    <FlapLetters
                      text={OLD_HEADLINE}
                      mode="out"
                      reveal={flappingOut}
                      canAnimate={canAnimate}
                      staggerMs={FLAP_OUT_STAGGER_MS}
                      durationMs={FLAP_OUT_DURATION_MS}
                      className="col-start-1 row-start-1 whitespace-nowrap text-paper/40"
                    />

                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 self-center h-[0.12em] w-full bg-paper/45 shadow-[0_0_20px_rgba(245,243,238,0.35)]"
                      initial={false}
                      animate={{ opacity: flappingOut || resolved ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    />

                    <FlapLetters
                      text={NEW_HEADLINE}
                      mode="in"
                      reveal={resolved}
                      canAnimate={canAnimate}
                      staggerMs={FLAP_IN_STAGGER_MS}
                      durationMs={FLAP_IN_DURATION_MS}
                      className="hero-title-line-kinetic col-start-1 row-start-1 whitespace-nowrap text-kinetic"
                    />
                  </span>
                </motion.div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[4%] right-[4%] -bottom-[30%] h-[56%] rounded-[100%] bg-black/80 blur-3xl -z-10 opacity-70"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[20%] right-[20%] -top-[10%] h-[40%] rounded-[100%] bg-white/15 blur-2xl -z-10 opacity-40"
                />
              </motion.div>
            </h1>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-14 max-w-xl">
          <motion.p
            initial={canAnimate ? { opacity: 0, y: 16 } : false}
            animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.55, ease: "easeOut" }}
            className="font-medium text-lg lg:text-xl text-paper/75 leading-relaxed"
          >
            Nous créons des sites web, optimisons votre visibilité sur Google et
            automatisons votre acquisition pour transformer les recherches en
            clients.
          </motion.p>
        </div>

        <motion.div
          initial={canAnimate ? { opacity: 0, y: 16 } : false}
          animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.55,
            delay: REVEAL_DELAY_MS / 1000 + 0.35,
            ease: "easeOut",
          }}
          className="mt-12 sm:mt-14 flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <Link
            href={contactHref}
            className="corner-cut-br-sm group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-kinetic px-7 py-3.5 text-base font-semibold text-paper transition-colors duration-300 hover:bg-kinetic-hover"
          >
            <HoverSwapText>Parler à un expert</HoverSwapText>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#solutions"
            className="corner-cut-br-sm group inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-paper/25 px-7 py-3.5 text-base font-semibold text-paper transition-colors duration-300 hover:border-paper/50"
          >
            <HoverSwapText>Découvrir nos solutions</HoverSwapText>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={canAnimate ? { opacity: 0 } : false}
        animate={canAnimate ? { opacity: 1 } : undefined}
        transition={{
          duration: 0.6,
          delay: REVEAL_DELAY_MS / 1000 + 0.45,
          ease: "easeOut",
        }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-paper/35">
          Scroll
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-paper/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-kinetic"
            animate={canAnimate ? { y: ["-100%", "220%"] } : undefined}
            transition={{ duration: 1.6, repeat: Infinity, ease: kineticEase }}
          />
        </span>
      </motion.div>
    </section>
  );
}
