"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FlapLetters } from "@/components/visual/flap-letters";
import { HoverSwapText } from "@/components/visual/hover-swap";
import { KineticCursorLight } from "@/components/visual/kinetic-cursor-light";
import { LiquidGlass } from "@/components/visual/liquid-glass";
import {
  PUMP_COUNT,
  PUMP_GAP,
  PUMP_STROKE,
  TitlePumpCharacter,
  titleScaleForStep,
} from "@/components/visual/title-pump-character";
import { contactHref } from "@/lib/navigation";
import { kineticEase } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const OLD_HEADLINE = "Trouvent vos concurrents";
const NEW_HEADLINE = "Vous trouvent d'abord";

/** Début des pompes après l'apparition du titre */
const PUMP_SEQUENCE_DELAY_MS = 900;
/** Fin des pompes → bascule split-flap */
const AFTER_PUMPS_MS =
  PUMP_SEQUENCE_DELAY_MS + (PUMP_COUNT - 1) * PUMP_GAP * 1000 + PUMP_STROKE * 1000 + 200;

/** Timing du tableau à bascule (façon panneau Solari) */
const FLAP_OUT_DURATION_MS = 300;
const FLAP_OUT_STAGGER_MS = 14;
const FLAP_GAP_MS = 160;
const FLAP_IN_DURATION_MS = 340;
const FLAP_IN_STAGGER_MS = 20;
const FLAP_OUT_TOTAL_MS =
  (OLD_HEADLINE.length - 1) * FLAP_OUT_STAGGER_MS + FLAP_OUT_DURATION_MS;
/** Le mot neuf ne commence à apparaître qu'une fois l'ancien totalement disparu — jamais de chevauchement */
const REVEAL_DELAY_MS = AFTER_PUMPS_MS + FLAP_OUT_TOTAL_MS + FLAP_GAP_MS;

export function HeroSection() {
  const reduced = useReducedMotion();
  const { animateEntrance, effectsEnabled } = usePerformanceMode();
  const [mounted, setMounted] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [pumpStep, setPumpStep] = useState(0);
  const [pumping, setPumping] = useState(false);
  const [returningToLx, setReturningToLx] = useState(false);
  const [flappingOut, setFlappingOut] = useState(false);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const [titleNaturalH, setTitleNaturalH] = useState(0);

  const canAnimate = mounted && animateEntrance && !reduced;
  const titleScale = titleScaleForStep(pumpStep);
  /** Le scale CSS ne pousse pas le flux : on réserve la hauteur visuelle */
  const titleLayoutH = titleNaturalH > 0 ? titleNaturalH * titleScale : undefined;

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    const el = titleInnerRef.current;
    if (!el) return;

    const measure = () => setTitleNaturalH(el.offsetHeight);

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [mounted, resolved]);

  useEffect(() => {
    if (!mounted) return;
    if (!animateEntrance || reduced) {
      setResolved(true);
      setFlappingOut(true);
      setPumpStep(PUMP_COUNT);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => {
        setPumping(true);
        for (let i = 0; i < PUMP_COUNT; i++) {
          timers.push(
            setTimeout(() => {
              setPumpStep(i + 1);
            }, i * PUMP_GAP * 1000 + PUMP_STROKE * 450)
          );
        }
      }, PUMP_SEQUENCE_DELAY_MS)
    );

    timers.push(
      setTimeout(() => {
        setPumping(false);
        setReturningToLx(true);
        setFlappingOut(true);
      }, AFTER_PUMPS_MS)
    );

    /** Le mot neuf n'entame son flap-in qu'une fois l'ancien totalement replié */
    timers.push(setTimeout(() => setResolved(true), REVEAL_DELAY_MS));

    return () => timers.forEach(clearTimeout);
  }, [mounted, animateEntrance, reduced]);

  return (
    <section
      id="accueil"
      className="relative min-h-[88dvh] sm:min-h-[85dvh] flex flex-col justify-start overflow-hidden bg-ink pt-28 pb-28 sm:pt-32 sm:pb-32 lg:pt-36"
    >
      <KineticCursorLight className="hidden lg:block" />

      <div className="container-max mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col">
        <div className="relative max-w-5xl shrink-0">
          {/* Atmosphère liquid glass zone haute — décorative, coûteuse en peinture (blur) :
              rendue uniquement quand les effets complets sont activés (desktop / bonne machine) */}
          {effectsEnabled && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-8 h-40 sm:-top-10 sm:h-48 overflow-visible"
            >
              <span className="absolute left-[12%] top-2 h-28 w-28 rounded-full bg-kinetic/20 blur-3xl sm:h-36 sm:w-36" />
              <span className="absolute right-[18%] top-6 h-24 w-32 rounded-full bg-paper/10 blur-3xl sm:h-32 sm:w-40" />
              <span className="absolute left-1/2 top-10 h-px w-[min(72%,20rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-paper/25 to-transparent" />
            </div>
          )}

          <TitlePumpCharacter
            active={pumping}
            pumpStep={pumpStep}
            returning={returningToLx}
          />

          <h1 className="relative z-10 origin-top text-center sm:text-left">
            <span className="sr-only">
              LX Digital Corp — Vos clients vous trouvent d&apos;abord.
            </span>

            <motion.span
              aria-hidden="true"
              initial={canAnimate ? { opacity: 0, y: 8 } : false}
              animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="block text-xs sm:text-sm font-semibold tracking-[0.28em] sm:tracking-[0.35em] uppercase text-paper/50 mb-3 sm:mb-4"
            >
              LX Digital Corp
            </motion.span>

            {/* Slot de hauteur = taille visuelle → sous-texte ne se fait pas écraser */}
            <motion.div
              aria-hidden="true"
              animate={
                titleLayoutH != null
                  ? { height: titleLayoutH }
                  : undefined
              }
              transition={{ duration: 0.55, ease: kineticEase }}
              className="relative overflow-visible"
            >
              <motion.div
                ref={titleInnerRef}
                initial={canAnimate ? { opacity: 0, scale: 0.7 } : false}
                animate={
                  canAnimate
                    ? { opacity: 1, scale: titleScale }
                    : { scale: 1 }
                }
                transition={
                  pumpStep === 0
                    ? { duration: 0.55, delay: 0.2, ease: kineticEase }
                    : { duration: 0.55, ease: kineticEase }
                }
                className="relative origin-top sm:origin-top-left will-change-transform"
              >
                {/* Orbes proches — refraction du liquid glass, coûteuses en peinture */}
                {effectsEnabled && (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-6 top-1 h-24 w-24 rounded-full bg-kinetic/25 blur-2xl sm:h-32 sm:w-32"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-4 bottom-0 h-20 w-28 rounded-full bg-paper/15 blur-2xl sm:h-28 sm:w-36"
                    />
                  </>
                )}

                <LiquidGlass
                  variant="ink"
                  className="corner-cut-br inline-block w-full max-w-full px-4 py-4 sm:px-6 sm:py-5 text-center sm:text-left"
                >
                  <span className="block font-display font-extrabold uppercase text-paper leading-[0.92] tracking-[-0.04em] text-[clamp(1.85rem,9.5vw,5rem)]">
                    Vos clients
                  </span>

                <span className="relative mt-1 inline-grid max-w-full font-display font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-[clamp(0.95rem,4.6vw,3.1rem)]">
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

                  <FlapLetters
                    text={NEW_HEADLINE}
                    mode="in"
                    reveal={resolved}
                    canAnimate={canAnimate}
                    staggerMs={FLAP_IN_STAGGER_MS}
                    durationMs={FLAP_IN_DURATION_MS}
                    className="col-start-1 row-start-1 whitespace-nowrap text-kinetic"
                  />
                </span>
                </LiquidGlass>
              </motion.div>
            </motion.div>
          </h1>
        </div>

        {/* Zone sous-titre + CTA — place libérée par le titre remonté */}
        <div className="mt-10 sm:mt-12 lg:mt-14 max-w-xl min-h-[5.5rem] sm:min-h-[6.5rem]">
          <motion.p
            initial={canAnimate ? { opacity: 0, y: 12 } : false}
            animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.55,
              delay: 1.1,
              ease: "easeOut",
            }}
            className="font-medium text-lg lg:text-xl text-paper/75 leading-relaxed"
          >
            Nous créons des sites web, optimisons votre visibilité sur Google et
            automatisons votre acquisition pour transformer les recherches en
            clients.
          </motion.p>
        </div>

        <motion.div
          initial={canAnimate ? { opacity: 0, y: 12 } : false}
          animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.5,
            delay: AFTER_PUMPS_MS / 1000 + 0.7,
            ease: "easeOut",
          }}
          className="mt-auto pt-12 sm:pt-16 lg:pt-20 flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
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
      </div>

      <motion.div
        aria-hidden="true"
        initial={canAnimate ? { opacity: 0 } : false}
        animate={canAnimate ? { opacity: 1 } : undefined}
        transition={{
          duration: 0.6,
          delay: AFTER_PUMPS_MS / 1000 + 1,
          ease: "easeOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 xl:hidden"
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
