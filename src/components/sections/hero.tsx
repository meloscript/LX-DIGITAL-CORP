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
import {
  easeInOutSine,
  easeOutQuart,
  kineticEase,
} from "@/lib/motion-config";
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

/** Fin approx. des lignes + titre avant CTAs */
const CTA_DELAY_S = REVEAL_DELAY_MS / 1000 + 0.55;

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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 56]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0.6, 0]
  );
  const ambientScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduced ? 1 : 1.12]
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
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden hero-gradient-bg pt-20 pb-24 sm:pt-24 sm:pb-20"
    >
      <span className="hero-vignette" aria-hidden="true" />

      {!reduced && effectsEnabled && <FallingParticles />}

      {effectsEnabled && (
        <>
          <KineticCursorLight
            className="hidden lg:block z-[2]"
            size={640}
            color="rgba(255, 77, 35, 0.38)"
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient left-[-14%] top-[-8%] h-[48vmin] w-[48vmin] bg-[#4a345c]/5"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.38, 0.55, 0.4] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient right-[-12%] top-[-6%] h-[40vmin] w-[40vmin] bg-[#443054]/45"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.28, 0.45, 0.32] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient left-[-10%] bottom-[-10%] h-[44vmin] w-[44vmin] bg-[#3a284c]/48"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.32, 0.5, 0.36] }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
          />
          <motion.span
            aria-hidden="true"
            className="hero-ambient right-[-12%] bottom-[-8%] h-[46vmin] w-[46vmin] bg-[#402c58]/45"
            style={{ scale: ambientScale }}
            animate={{ opacity: [0.3, 0.48, 0.34] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          />
        </>
      )}

      <motion.div
        className="container-max mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center"
        style={
          canAnimate ? { y: contentY, opacity: contentOpacity } : undefined
        }
      >
        <div className="relative max-w-5xl mx-auto shrink-0 w-full">
          <motion.span
            aria-hidden="true"
            initial={canAnimate ? { opacity: 0, y: 8 } : false}
            animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="block text-xs sm:text-sm font-semibold tracking-[0.28em] sm:tracking-[0.35em] uppercase text-paper/50 mb-1.5 sm:mb-2 text-center"
          >
            LX Digital Corp
          </motion.span>

          <div className="hero-perfusion">
            <BrandGenealogyTree canAnimate={canAnimate} />

            <h1 className="relative z-[1] text-center">
              <span className="sr-only">
                LX Digital Corp — Vos clients vous trouvent d&apos;abord.
              </span>

              {/* Halo orange qui respire — derrière le titre */}
              <motion.span
                aria-hidden="true"
                className="hero-title-halo"
                animate={
                  canAnimate
                    ? { scale: [1, 1.03, 1], opacity: [0.55, 0.72, 0.55] }
                    : { opacity: 0.6 }
                }
                transition={
                  canAnimate
                    ? {
                        duration: 8,
                        repeat: Infinity,
                        ease: easeInOutSine,
                      }
                    : undefined
                }
              />

              <motion.div
                aria-hidden="true"
                initial={
                  canAnimate
                    ? { opacity: 0, y: 20, scale: 0.97 }
                    : false
                }
                animate={
                  canAnimate
                    ? { opacity: 1, y: 0, scale: 1.06 }
                    : undefined
                }
                transition={{
                  opacity: { duration: 0.7, delay: 0.55, ease: easeOutQuart },
                  y: { duration: 0.7, delay: 0.55, ease: easeOutQuart },
                  scale: {
                    duration: 5.5,
                    delay: 1.1,
                    ease: "linear",
                  },
                }}
                className="hero-title-depth hero-title-glass hero-title-glass--fed text-center origin-center"
              >
                <span className="hero-title-infusion" aria-hidden="true" />

                {/* Glow orange entrée — pulse unique 0.4s */}
                {canAnimate && (
                  <motion.span
                    aria-hidden="true"
                    className="hero-title-entry-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.55, 0] }}
                    transition={{
                      duration: 0.4,
                      delay: 1.25,
                      ease: "easeOut",
                      times: [0, 0.4, 1],
                    }}
                  />
                )}

                <div className="relative z-[1]">
                  <span className="hero-title-line hero-letter-glass hero-title-shimmer-rare block font-display font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-[clamp(2.4rem,11vw,6.25rem)]">
                    Vos clients
                  </span>

                  <span className="relative mt-1 block w-full font-display font-extrabold uppercase leading-[1.02] tracking-[-0.045em] text-[clamp(1.15rem,5.5vw,3.7rem)]">
                    <span className="relative inline-grid max-w-full">
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
                        className="col-start-1 row-start-1 whitespace-nowrap"
                        letterClassName="hero-letter-glass hero-letter-glass--faded"
                      />

                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 self-center h-[0.12em] w-full bg-paper/45"
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
                        className="hero-title-line-kinetic col-start-1 row-start-1 whitespace-nowrap"
                        letterClassName="hero-letter-glass-kinetic"
                      />
                    </span>
                  </span>
                </div>
              </motion.div>
            </h1>
          </div>
        </div>

        <div className="hero-subtitle-wrap mt-8 sm:mt-10 lg:mt-11 mx-auto w-full max-w-[36rem] sm:max-w-[40rem] px-1 pr-16 sm:pr-1">
          <motion.p
            initial={canAnimate ? { opacity: 0, y: 14 } : false}
            animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.55,
              delay: canAnimate ? 1.35 : 0,
              ease: "easeOut",
            }}
            className="hero-subtitle text-center"
          >
            <span className="hero-subtitle-lead">
              Sites web, visibilité Google, acquisition automatisée.
            </span>
            <span className="hero-subtitle-body">
              Nous transformons les recherches en clients — avec une méthode
              claire et mesurable.
            </span>
          </motion.p>
        </div>

        <motion.div
          initial={canAnimate ? { opacity: 0, y: 16 } : false}
          animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.55,
            delay: CTA_DELAY_S,
            ease: easeOutQuart,
          }}
          className="mt-8 sm:mt-10 flex w-full flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pr-16 sm:pr-0"
        >
          <Link
            href={contactHref}
            className="hero-cta-primary corner-cut-br-sm group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-kinetic px-7 py-3.5 text-base font-semibold text-paper"
          >
            <HoverSwapText>Parler à un expert</HoverSwapText>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#solutions"
            className="hero-cta-secondary corner-cut-br-sm group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-paper"
          >
            <HoverSwapText>Découvrir nos solutions</HoverSwapText>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-70 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={canAnimate ? { opacity: 0 } : false}
        animate={canAnimate ? { opacity: 1 } : undefined}
        transition={{
          duration: 0.5,
          delay: CTA_DELAY_S + 0.15,
          ease: "easeOut",
        }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2.5"
      >
        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-paper/35">
          Scroll
        </span>
        <span className="relative h-8 w-px overflow-hidden bg-paper/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-kinetic"
            animate={canAnimate ? { y: ["-100%", "220%"] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: kineticEase }}
          />
        </span>
      </motion.div>
    </section>
  );
}
