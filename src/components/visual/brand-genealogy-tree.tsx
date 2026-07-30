"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, kineticEase } from "@/lib/motion-config";

type BrandGenealogyTreeProps = {
  canAnimate?: boolean;
};

const LINE_DURATION = 0.7;
const LINE_STAGGER = 0.125;
const TREE_START = 0.12;

/** Branches LX → cadre titre — séquence Solutions → Services → Méthode → Différenciation */
const FEEDS = [
  {
    id: "solutions",
    label: "Solutions",
    labelAt: { x: 210, y: 150 },
    tipX: 170,
    path: "M480 42 C450 90 360 130 280 170 C230 200 190 250 170 318",
    color: "#FF4D23",
    particleDur: "4.4s",
  },
  {
    id: "services",
    label: "Services",
    labelAt: { x: 360, y: 175 },
    tipX: 340,
    path: "M480 42 C465 95 420 140 390 190 C365 230 350 270 340 318",
    color: "#E89A7A",
    particleDur: "4.9s",
  },
  {
    id: "methode",
    label: "Méthode",
    labelAt: { x: 600, y: 175 },
    tipX: 620,
    path: "M480 42 C495 95 540 140 570 190 C595 230 610 270 620 318",
    color: "#D8C8F5",
    particleDur: "4.6s",
  },
  {
    id: "diff",
    label: "Différenciation",
    labelAt: { x: 750, y: 150 },
    tipX: 790,
    path: "M480 42 C510 90 600 130 680 170 C730 200 770 250 790 318",
    color: "#C4A8F0",
    particleDur: "5.1s",
  },
] as const;

/** Arbre → cadre : draw séquentiel + perfusion lumineuse vers le titre. */
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
      <svg
        className="hero-branch-tree-svg"
        viewBox="0 0 960 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="branch-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="branch-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="trunk-grad"
            x1="480"
            y1="20"
            x2="480"
            y2="55"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF4D23" stopOpacity="1" />
            <stop offset="1" stopColor="#D8C8F5" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        <path
          d="M480 28 L480 42"
          stroke="rgba(245,243,238,0.16)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <motion.path
          d="M480 28 L480 42"
          stroke="url(#trunk-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#branch-glow-strong)"
          initial={animate ? { pathLength: 0, opacity: 0.4 } : { pathLength: 1, opacity: 0.85 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{
            duration: 0.45,
            delay: TREE_START,
            ease: easeOutExpo,
          }}
        />

        {FEEDS.map((b, i) => {
          const delay = TREE_START + 0.2 + i * LINE_STAGGER;
          const dripStart = delay + LINE_DURATION + 0.15;

          return (
            <g key={b.id}>
              <path
                d={b.path}
                stroke="rgba(245,243,238,0.1)"
                strokeWidth="1.55"
                strokeLinecap="round"
              />

              <motion.path
                d={b.path}
                stroke={b.color}
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#branch-glow)"
                style={{ opacity: 0.28 }}
                initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: LINE_DURATION,
                  delay,
                  ease: easeOutExpo,
                }}
              />

              <motion.path
                d={b.path}
                stroke={b.color}
                strokeWidth="1.55"
                strokeLinecap="round"
                filter="url(#branch-glow)"
                initial={
                  animate
                    ? { pathLength: 0, opacity: 0.35 }
                    : { pathLength: 1, opacity: 0.72 }
                }
                animate={{ pathLength: 1, opacity: 0.72 }}
                transition={{
                  duration: LINE_DURATION,
                  delay,
                  ease: easeOutExpo,
                }}
              />

              {/* Perfusion — lumières qui descendent vers le cadre */}
              {animate &&
                [0, 1, 2].map((n) => (
                  <circle
                    key={`${b.id}-drip-${n}`}
                    className="hero-branch-droplet"
                    r={n === 1 ? 2.8 : 1.9}
                    fill={b.color}
                    filter="url(#branch-glow)"
                    opacity="0"
                  >
                    <animateMotion
                      dur={b.particleDur}
                      begin={`${dripStart + n * 1.2}s`}
                      repeatCount="indefinite"
                      path={b.path}
                      rotate="auto"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.5;0.58;0.35;0"
                      keyTimes="0;0.1;0.72;0.9;1"
                      dur={b.particleDur}
                      begin={`${dripStart + n * 1.2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}

              <motion.circle
                cx={b.tipX}
                cy="318"
                r="3.4"
                fill={b.color}
                filter="url(#branch-glow)"
                initial={animate ? { opacity: 0, scale: 0.5 } : { opacity: 0.45, scale: 1 }}
                animate={
                  animate
                    ? { opacity: [0, 0.65, 0.4], scale: [0.5, 1.2, 1] }
                    : undefined
                }
                transition={
                  animate
                    ? {
                        duration: 0.55,
                        delay: delay + LINE_DURATION - 0.05,
                        ease: easeOutExpo,
                        times: [0, 0.45, 1],
                      }
                    : undefined
                }
                style={{ transformOrigin: `${b.tipX}px 318px` }}
              />

              <motion.text
                x={b.labelAt.x}
                y={b.labelAt.y}
                textAnchor="middle"
                className="hero-branch-label"
                initial={animate ? { opacity: 0 } : { opacity: 0.72 }}
                animate={{ opacity: 0.72 }}
                transition={{
                  duration: 0.4,
                  delay: delay + LINE_DURATION * 0.55,
                  ease: "easeOut",
                }}
              >
                {b.label}
              </motion.text>
            </g>
          );
        })}

        {/* Jonction douce — sans second monogramme LX (le logo violet reste en navbar) */}
        <motion.circle
          cx="480"
          cy="22"
          r="5"
          fill="rgba(255,77,35,0.55)"
          filter="url(#branch-glow)"
          style={{ transformOrigin: "480px 22px" }}
          animate={
            animate
              ? { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }
              : { opacity: 0.65 }
          }
          transition={
            animate
              ? { duration: 8, repeat: Infinity, ease: [0.37, 0, 0.63, 1] }
              : undefined
          }
        />
      </svg>
    </motion.div>
  );
}
