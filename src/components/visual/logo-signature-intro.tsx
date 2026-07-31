"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { kineticEase } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const SIGN_EASE = [0.65, 0, 0.35, 1] as const;

type Stage = "idle" | "draw" | "settle" | "done";
type Target = { x: number; y: number; scale: number };

/**
 * Intro one-shot : le monogramme "LX" se dessine comme une signature au
 * chargement, puis rétrécit et glisse jusqu'à la position réelle du logo
 * dans la navbar — la signature "devient" le logo, elle ne décore pas la
 * page, elle introduit la marque avant de rendre la main au site.
 * Une seule fois par session, désactivée si mouvement réduit / mode léger.
 */
export function LogoSignatureIntro() {
  const reduced = useReducedMotion();
  const { animateEntrance } = usePerformanceMode();
  const [shouldRun, setShouldRun] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [target, setTarget] = useState<Target | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced || !animateEntrance) return;

    /* Mobile first : pas d’intro bloquante — LCP plus rapide */
    if (window.matchMedia("(max-width: 768px)").matches) return;

    try {
      if (sessionStorage.getItem("lx-logo-intro") === "1") return;
      sessionStorage.setItem("lx-logo-intro", "1");
    } catch {
      /* private mode — run once anyway */
    }

    setShouldRun(true);
    setStage("draw");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const toSettle = setTimeout(() => {
      const anchor = document.getElementById("brand-logo-anchor");
      const wrap = wrapRef.current;

      if (anchor && wrap) {
        const a = anchor.getBoundingClientRect();
        const w = wrap.getBoundingClientRect();
        setTarget({
          x: a.left + a.width / 2 - (w.left + w.width / 2),
          y: a.top + a.height / 2 - (w.top + w.height / 2),
          scale: a.width / w.width,
        });
      } else {
        setTarget({
          x: -(window.innerWidth / 2 - 44),
          y: -(window.innerHeight / 2 - 34),
          scale: 0.16,
        });
      }
      setStage("settle");
    }, 900);

    return () => {
      clearTimeout(toSettle);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage !== "settle") return;
    const toDone = setTimeout(() => {
      setStage("done");
      document.body.style.overflow = "";
    }, 420);
    return () => clearTimeout(toDone);
  }, [stage]);

  if (!shouldRun || stage === "idle" || stage === "done") return null;

  const drawing = stage === "draw";
  const settling = stage === "settle";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: settling ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: settling ? 0.08 : 0 }}
    >
      <motion.div
        ref={wrapRef}
        className="relative w-[min(72vw,200px)] sm:w-[min(58vw,220px)]"
        style={{ aspectRatio: "320 / 150" }}
        animate={
          settling && target
            ? { x: target.x, y: target.y, scale: target.scale, opacity: [1, 1, 0] }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={
          settling
            ? {
                x: { duration: 0.4, ease: kineticEase },
                y: { duration: 0.4, ease: kineticEase },
                scale: { duration: 0.4, ease: kineticEase },
                opacity: { duration: 0.4, ease: "easeIn", times: [0, 0.55, 1] },
              }
            : { duration: 0 }
        }
      >
        <svg
          viewBox="0 0 320 150"
          width="100%"
          height="100%"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* L */}
          <motion.path
            d="M60,25 C48,45 46,75 50,100 C52,110 55,116 60,118 C75,124 95,120 108,110"
            stroke="#F5F3EE"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={drawing || settling ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.35, ease: SIGN_EASE, delay: 0 }}
          />
          {/* X — premier trait */}
          <motion.path
            d="M150,35 C175,60 205,85 245,115"
            stroke="#F5F3EE"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={drawing || settling ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.28, ease: SIGN_EASE, delay: 0.22 }}
          />
          {/* X — second trait */}
          <motion.path
            d="M250,30 C220,58 190,85 148,112"
            stroke="#F5F3EE"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={drawing || settling ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.28, ease: SIGN_EASE, delay: 0.32 }}
          />
          {/* Paraphe — trait de soulignement, seule touche de couleur */}
          <motion.path
            d="M45,132 C110,148 220,148 270,128"
            stroke="#FF4D23"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={drawing || settling ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.3, ease: SIGN_EASE, delay: 0.48 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
