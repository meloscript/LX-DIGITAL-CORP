"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, kineticEase } from "@/lib/motion-config";

type BrandGenealogyTreeProps = {
  canAnimate?: boolean;
};

const LINE_DURATION = 0.7;
const LINE_STAGGER = 0.125;
const TREE_START = 0.12;

/** Ordre d’animation : Solutions → Services → Méthode → Différenciation */
const FEEDS = [
  {
    id: "solutions",
    path: "M 200 10 C 150 10, 120 70, 60 118",
    tipX: 60,
    tipY: 118,
    gradient: "g1",
    tipColor: "#ff6b3d",
    opacity: 0.9,
    particleDur: "4.4s",
  },
  {
    id: "services",
    path: "M 200 10 C 185 26, 160 74, 145 118",
    tipX: 145,
    tipY: 118,
    gradient: "g2",
    tipColor: "#8873b8",
    opacity: 0.75,
    particleDur: "4.9s",
  },
  {
    id: "methode",
    path: "M 200 10 C 215 26, 240 74, 255 118",
    tipX: 255,
    tipY: 118,
    gradient: "g2",
    tipColor: "#8873b8",
    opacity: 0.75,
    particleDur: "4.6s",
  },
  {
    id: "diff",
    path: "M 200 10 C 250 10, 280 70, 340 118",
    tipX: 340,
    tipY: 118,
    gradient: "g1",
    tipColor: "#ff6b3d",
    opacity: 0.9,
    particleDur: "5.1s",
  },
] as const;

const LABELS = [
  "Solutions",
  "Services",
  "Méthode",
  "Différenciation",
] as const;

/** Schéma exact du mockup — miroirs autour de x=200. */
export function BrandGenealogyTree({ canAnimate = true }: BrandGenealogyTreeProps) {
  const reduced = useReducedMotion();
  const animate = canAnimate && !reduced;

  return (
    <motion.div
      className="hero-branch-tree"
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.45, ease: kineticEase }}
      aria-label="LX Digital Corp — branches qui alimentent le titre"
    >
      <div className="hero-diagram">
        <svg
          className="hero-branch-tree-svg"
          viewBox="0 0 400 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="g1"
              x1="200"
              y1="10"
              x2="200"
              y2="118"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#ff6b3d" />
              <stop offset="1" stopColor="#ff6b3d" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient
              id="g2"
              x1="200"
              y1="10"
              x2="200"
              y2="118"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#8873b8" />
              <stop offset="1" stopColor="#8873b8" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {FEEDS.map((b, i) => {
            const delay = TREE_START + 0.2 + i * LINE_STAGGER;
            const dripStart = delay + LINE_DURATION + 0.15;

            return (
              <g key={b.id}>
                <motion.path
                  d={b.path}
                  stroke={`url(#${b.gradient})`}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={
                    animate
                      ? { pathLength: 0, opacity: 0 }
                      : { pathLength: 1, opacity: b.opacity }
                  }
                  animate={{ pathLength: 1, opacity: b.opacity }}
                  transition={{
                    duration: LINE_DURATION,
                    delay,
                    ease: easeOutExpo,
                  }}
                />

                {animate &&
                  [0, 1].map((n) => (
                    <circle
                      key={`${b.id}-drip-${n}`}
                      r={n === 0 ? 2.2 : 1.6}
                      fill={b.tipColor}
                      opacity="0"
                    >
                      <animateMotion
                        dur={b.particleDur}
                        begin={`${dripStart + n * 1.35}s`}
                        repeatCount="indefinite"
                        path={b.path}
                        rotate="auto"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.55;0.4;0"
                        keyTimes="0;0.12;0.75;1"
                        dur={b.particleDur}
                        begin={`${dripStart + n * 1.35}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}

                <motion.circle
                  cx={b.tipX}
                  cy={b.tipY}
                  r="2.5"
                  fill={b.tipColor}
                  initial={
                    animate ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }
                  }
                  animate={
                    animate
                      ? { opacity: [0, 1, 1], scale: [0.5, 1.1, 1] }
                      : undefined
                  }
                  transition={
                    animate
                      ? {
                          duration: 0.4,
                          delay: delay + LINE_DURATION - 0.05,
                          ease: easeOutExpo,
                          times: [0, 0.5, 1],
                        }
                      : undefined
                  }
                  style={{ transformOrigin: `${b.tipX}px ${b.tipY}px` }}
                />
              </g>
            );
          })}

          <circle cx="200" cy="10" r="3" fill="#ff6b3d" />
        </svg>
      </div>

      <div className="hero-branch-labels" aria-hidden="true">
        {LABELS.map((label, i) => (
          <motion.span
            key={label}
            initial={animate ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: TREE_START + 0.2 + i * LINE_STAGGER + LINE_DURATION * 0.55,
              ease: "easeOut",
            }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
