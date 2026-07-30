"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { kineticEase } from "@/lib/motion-config";

export const PUMP_STROKE = 0.55;
export const PUMP_GAP = 2;
export const PUMP_COUNT = 3;
export const PUMP_STARTS = [0, PUMP_GAP, PUMP_GAP * 2] as const;
/** Grossissement réel et cumulatif */
export const TITLE_PUMP_SCALES = [1, 1.2, 1.42, 1.68] as const;
/** Vol fluide vers le logo LX (navbar) */
export const RETURN_TO_LX_MS = 980;
/** Refermer le slot haut après départ / retour LX */
export const SLOT_COLLAPSE_MS = 720;
const SLOT_HEIGHT_PX = { base: 108, sm: 128 } as const;

type TitlePumpCharacterProps = {
  className?: string;
  pumpStep?: number;
  active?: boolean;
  /** Après les pompes : morph + vol vers le logo navbar */
  returning?: boolean;
  onReturned?: () => void;
};

type Flight = {
  from: { left: number; top: number; width: number; height: number };
  to: { x: number; y: number; scale: number };
};

function buildPumpMotion(from: number, to: number) {
  const values: number[] = [];
  const times: number[] = [];
  const total = PUMP_STARTS[2] + PUMP_STROKE;

  const push = (t: number, v: number) => {
    times.push(t / total);
    values.push(v);
  };

  push(0, from);
  for (const start of PUMP_STARTS) {
    push(start, from);
    push(start + PUMP_STROKE * 0.42, to);
    push(start + PUMP_STROKE, from);
  }
  return { values, times, duration: total };
}

function LxMonogram({ drawing }: { drawing: boolean }) {
  return (
    <svg
      viewBox="0 0 320 150"
      width="100%"
      height="100%"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0"
    >
      <motion.path
        d="M60,25 C48,45 46,75 50,100 C52,110 55,116 60,118 C75,124 95,120 108,110"
        stroke="#F5F3EE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          drawing
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.45, ease: kineticEase }}
      />
      <motion.path
        d="M150,35 C175,60 205,85 245,115"
        stroke="#F5F3EE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          drawing
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.35, delay: 0.08, ease: kineticEase }}
      />
      <motion.path
        d="M250,30 C220,58 190,85 148,112"
        stroke="#F5F3EE"
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          drawing
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.35, delay: 0.16, ease: kineticEase }}
      />
      <motion.path
        d="M45,132 C110,148 220,148 270,128"
        stroke="#FF4D23"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          drawing
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{ duration: 0.4, delay: 0.22, ease: kineticEase }}
      />
    </svg>
  );
}

function CharacterBody({
  run,
  morphing,
}: {
  run: boolean;
  morphing: boolean;
}) {
  const handle = buildPumpMotion(0, 18);
  const bodyBob = buildPumpMotion(0, 3);

  return (
    <motion.div
      className="relative h-full w-full"
      animate={{
        opacity: morphing ? 0 : 1,
        scale: morphing ? 0.72 : 1,
        filter: morphing ? "blur(4px)" : "blur(0px)",
      }}
      transition={{ duration: 0.42, ease: kineticEase }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ y: run && !morphing ? bodyBob.values : 0 }}
        transition={
          run && !morphing
            ? { duration: bodyBob.duration, times: bodyBob.times, ease: kineticEase }
            : { duration: 0.3 }
        }
      >
        <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full border border-paper/40 bg-paper/10 sm:h-9 sm:w-9">
          <span className="absolute left-[26%] top-[42%] h-1 w-1 rounded-full bg-paper/65" />
          <span className="absolute right-[26%] top-[42%] h-1 w-1 rounded-full bg-paper/65" />
        </div>

        <div className="absolute left-1/2 top-8 h-11 w-9 -translate-x-1/2 rounded-2xl border border-paper/30 bg-paper/[0.08] sm:top-9 sm:h-12 sm:w-10" />

        <div className="absolute left-[0.35rem] top-10 h-1.5 w-7 rounded-full bg-paper/25 sm:top-11" />
        <div className="absolute bottom-5 left-[1.15rem] h-9 w-3.5 overflow-hidden rounded-full border border-kinetic/55 bg-kinetic/15 sm:h-10">
          <motion.div
            className="absolute inset-x-0.5 top-0.5 h-2.5 rounded-full bg-paper/45"
            animate={run && !morphing ? { y: handle.values } : { y: 0 }}
            transition={
              run && !morphing
                ? { duration: handle.duration, times: handle.times, ease: kineticEase }
                : undefined
            }
          />
        </div>
        <motion.div
          className="absolute left-[0.85rem] top-8 z-10 flex flex-col items-center sm:top-9"
          animate={run && !morphing ? { y: handle.values } : { y: 0 }}
          transition={
            run && !morphing
              ? { duration: handle.duration, times: handle.times, ease: kineticEase }
              : undefined
          }
        >
          <div className="h-2 w-6 rounded-full border border-paper/40 bg-paper/25" />
          <div className="h-3 w-0.5 bg-paper/30" />
        </motion.div>

        <div className="absolute bottom-0 left-[1.85rem] h-5 w-2 rounded-full bg-paper/15" />
        <div className="absolute bottom-0 right-[1.85rem] h-5 w-2 rounded-full bg-paper/15" />

        <svg
          className="absolute left-1/2 top-[5.4rem] h-10 w-16 -translate-x-1/2 overflow-visible sm:top-[6.1rem] sm:h-11"
          viewBox="0 0 64 44"
          fill="none"
        >
          <motion.path
            d="M32 2 C32 16, 32 28, 32 42"
            stroke="rgba(255,77,35,0.75)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: morphing ? 0 : 1, opacity: morphing ? 0 : 1 }}
            transition={{ duration: 0.35, ease: kineticEase }}
          />
          {PUMP_STARTS.map((start, i) => (
            <motion.circle
              key={i}
              r={2.4}
              fill="#FF4D23"
              cx={32}
              initial={{ opacity: 0, cy: 4 }}
              animate={
                run && !morphing
                  ? { opacity: [0, 1, 0], cy: [4, 40] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: start + 0.15,
                ease: kineticEase,
              }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

/**
 * Personnage verre léger (CSS + SVG) face au titre.
 * Fil du bas de la pompe → titre. 3 pompes espacées de 2 s.
 * Puis morph fluide en monogramme LX et vol vers le logo navbar.
 */
export function TitlePumpCharacter({
  className,
  active = true,
  returning = false,
  onReturned,
}: TitlePumpCharacterProps) {
  const reduced = useReducedMotion();
  const run = active && !reduced && !returning;
  const slotRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [gone, setGone] = useState(false);
  const [slotOpen, setSlotOpen] = useState(true);
  const [portalReady, setPortalReady] = useState(false);
  const [isSm, setIsSm] = useState(false);
  const onReturnedRef = useRef(onReturned);
  onReturnedRef.current = onReturned;

  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsSm(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!returning || reduced || gone) {
      if (returning && reduced) {
        setSlotOpen(false);
        setGone(true);
        onReturnedRef.current?.();
      }
      return;
    }

    /** Morph LX en place, puis décollage fluide */
    const morphThenFly = window.setTimeout(() => {
      const slot = slotRef.current;
      const logo = document.getElementById("brand-logo-anchor");
      if (!slot) return;

      const from = slot.getBoundingClientRect();
      const logoRect = logo?.getBoundingClientRect();
      const toCenterX = logoRect
        ? logoRect.left + logoRect.width / 2
        : 44;
      const toCenterY = logoRect
        ? logoRect.top + logoRect.height / 2
        : 34;
      const toW = logoRect?.width ?? 32;
      const fromCenterX = from.left + from.width / 2;
      const fromCenterY = from.top + from.height / 2;

      /** Refermer le trou pendant le vol — le titre remonte fluide */
      setSlotOpen(false);
      setFlight({
        from: {
          left: from.left,
          top: from.top,
          width: from.width,
          height: from.height,
        },
        to: {
          x: toCenterX - fromCenterX,
          y: toCenterY - fromCenterY,
          scale: Math.min(toW / from.width, 0.28),
        },
      });
    }, 320);

    return () => window.clearTimeout(morphThenFly);
  }, [returning, reduced, gone]);

  const morphing = returning && !reduced;
  const openH = (isSm ? SLOT_HEIGHT_PX.sm : SLOT_HEIGHT_PX.base) + (isSm ? 36 : 32);

  const flyer =
    flight && portalReady && typeof document !== "undefined" && !gone
      ? createPortal(
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed z-[120]"
            style={{
              left: flight.from.left,
              top: flight.from.top,
              width: flight.from.width,
              height: flight.from.height,
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: flight.to.x,
              y: flight.to.y,
              scale: flight.to.scale,
              opacity: [1, 1, 0],
            }}
            transition={{
              x: { duration: RETURN_TO_LX_MS / 1000, ease: kineticEase },
              y: { duration: RETURN_TO_LX_MS / 1000, ease: kineticEase },
              scale: { duration: RETURN_TO_LX_MS / 1000, ease: kineticEase },
              opacity: {
                duration: RETURN_TO_LX_MS / 1000,
                ease: "easeIn",
                times: [0, 0.72, 1],
              },
            }}
            onAnimationComplete={() => {
              setGone(true);
              onReturnedRef.current?.();
            }}
          >
            <div className="relative h-full w-full">
              <CharacterBody run={false} morphing />
              <motion.div
                className="absolute inset-0 flex items-center justify-center px-1"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: kineticEase }}
              >
                <div className="relative h-[42%] w-[92%]">
                  <LxMonogram drawing />
                </div>
              </motion.div>
            </div>
          </motion.div>,
          document.body
        )
      : null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={[
          "pointer-events-none relative flex w-full flex-col items-center overflow-hidden",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        initial={false}
        animate={{
          height: slotOpen ? openH : 0,
          opacity: slotOpen ? 1 : 0,
          marginTop: slotOpen ? (isSm ? -16 : -8) : 0,
          marginBottom: slotOpen ? (isSm ? 4 : 0) : 0,
        }}
        transition={{
          duration: SLOT_COLLAPSE_MS / 1000,
          ease: kineticEase,
        }}
      >
        <div className="relative mx-auto flex w-full max-w-md justify-center sm:max-w-lg">
          <div
            ref={slotRef}
            className="relative h-[108px] w-[88px] pb-8 sm:h-[128px] sm:w-[104px] sm:pb-9"
            style={{ visibility: flight || !slotOpen ? "hidden" : "visible" }}
          >
            <AnimatePresence>
              {!flight && slotOpen && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: kineticEase }}
                >
                  <CharacterBody run={run} morphing={morphing && !flight} />
                  {morphing && !flight && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center px-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="relative h-[42%] w-[92%]">
                        <LxMonogram drawing />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      {flyer}
    </>
  );
}

export function titleScaleForStep(step: number) {
  const i = Math.min(Math.max(step, 0), TITLE_PUMP_SCALES.length - 1);
  return TITLE_PUMP_SCALES[i];
}
