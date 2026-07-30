"use client";

import { motion, useReducedMotion } from "framer-motion";
import { kineticEase } from "@/lib/motion-config";

type BrandGenealogyTreeProps = {
  canAnimate?: boolean;
};

/** Branches du root LX vers le haut du cadre titre (perfusion). */
const FEEDS = [
  {
    id: "solutions",
    label: "Solutions",
    labelAt: { x: 210, y: 150 },
    tipX: 170,
    path: "M480 42 C450 90 360 130 280 170 C230 200 190 250 170 318",
    color: "#FF4D23",
    delay: 0.15,
    particleDur: "4.2s",
  },
  {
    id: "services",
    label: "Services",
    labelAt: { x: 360, y: 175 },
    tipX: 340,
    path: "M480 42 C465 95 420 140 390 190 C365 230 350 270 340 318",
    color: "#E89A7A",
    delay: 0.35,
    particleDur: "4.8s",
  },
  {
    id: "methode",
    label: "Méthode",
    labelAt: { x: 600, y: 175 },
    tipX: 620,
    path: "M480 42 C495 95 540 140 570 190 C595 230 610 270 620 318",
    color: "#D8C8F5",
    delay: 0.55,
    particleDur: "4.5s",
  },
  {
    id: "diff",
    label: "Différenciation",
    labelAt: { x: 750, y: 150 },
    tipX: 790,
    path: "M480 42 C510 90 600 130 680 170 C730 200 770 250 790 318",
    color: "#C4A8F0",
    delay: 0.75,
    particleDur: "5s",
  },
] as const;

/** Arbre → cadre titre : branches + particules en perfusion. */
export function BrandGenealogyTree({ canAnimate = true }: BrandGenealogyTreeProps) {
  const reduced = useReducedMotion();
  const animate = canAnimate && !reduced;

  return (
    <motion.div
      className="hero-branch-tree"
      initial={animate ? { opacity: 0 } : false}
      animate={animate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: kineticEase }}
      aria-label="Branches LX qui alimentent le titre"
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
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="branch-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
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
            <stop offset="1" stopColor="#D8C8F5" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <path
          d="M480 28 L480 42"
          stroke="rgba(245,243,238,0.2)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          className={`hero-branch-lit hero-branch-lit-trunk${animate ? " is-on" : ""}`}
          d="M480 28 L480 42"
          stroke="url(#trunk-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#branch-glow-strong)"
        />

        {FEEDS.map((b) => (
          <g key={b.id}>
            <path
              d={b.path}
              stroke="rgba(245,243,238,0.12)"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              className={`hero-branch-lit${animate ? " is-on" : ""}`}
              d={b.path}
              stroke={b.color}
              strokeWidth="1.7"
              strokeLinecap="round"
              filter="url(#branch-glow)"
              style={{ animationDelay: `${b.delay}s` }}
            />

            {animate &&
              [0, 1, 2].map((n) => (
                <circle
                  key={`${b.id}-p${n}`}
                  className="hero-branch-droplet"
                  r={n === 1 ? 2.6 : 1.8}
                  fill={b.color}
                  filter="url(#branch-glow)"
                  opacity="0.55"
                >
                  <animateMotion
                    dur={b.particleDur}
                    begin={`${b.delay + n * 1.15}s`}
                    repeatCount="indefinite"
                    path={b.path}
                    rotate="auto"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.45;0.55;0.4;0"
                    keyTimes="0;0.1;0.7;0.9;1"
                    dur={b.particleDur}
                    begin={`${b.delay + n * 1.15}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

            <circle
              className={`hero-branch-port${animate ? " is-on" : ""}`}
              cx={b.tipX}
              cy="318"
              r="3.5"
              fill={b.color}
              filter="url(#branch-glow)"
              style={{ animationDelay: `${b.delay + 1}s` }}
            />

            <text
              className={`hero-branch-label${animate ? " is-on" : ""}`}
              x={b.labelAt.x}
              y={b.labelAt.y}
              textAnchor="middle"
              style={{ animationDelay: `${b.delay + 0.5}s` }}
            >
              {b.label}
            </text>
          </g>
        ))}

        <circle
          className={`hero-branch-root-glow${animate ? " is-on" : ""}`}
          cx="480"
          cy="22"
          r="11"
          fill="rgba(255,77,35,0.35)"
          filter="url(#branch-glow-strong)"
          style={{ transformOrigin: "480px 22px" }}
        />
        <circle cx="480" cy="22" r="7.5" fill="#FF4D23" />
        <text x="480" y="25.5" textAnchor="middle" className="hero-branch-root-text">
          LX
        </text>
      </svg>
    </motion.div>
  );
}
