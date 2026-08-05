import Link from "next/link";
import { contactHref } from "@/lib/navigation";
import { HeroHeadlineSwap } from "@/components/sections/hero-headline-swap";

const BRANCHES = [
  {
    id: "solutions",
    path: "M 200 10 C 150 10, 120 70, 60 118",
    tipX: 60,
    tipY: 118,
    gradient: "hero-g1",
    tipColor: "#ff6b3d",
    opacity: 0.9,
    pair: 0,
  },
  {
    id: "diff",
    path: "M 200 10 C 250 10, 280 70, 340 118",
    tipX: 340,
    tipY: 118,
    gradient: "hero-g1",
    tipColor: "#ff6b3d",
    opacity: 0.9,
    pair: 0,
  },
  {
    id: "services",
    path: "M 200 10 C 185 26, 160 74, 145 118",
    tipX: 145,
    tipY: 118,
    gradient: "hero-g2",
    tipColor: "#8873b8",
    opacity: 0.75,
    pair: 1,
  },
  {
    id: "methode",
    path: "M 200 10 C 215 26, 240 74, 255 118",
    tipX: 255,
    tipY: 118,
    gradient: "hero-g2",
    tipColor: "#8873b8",
    opacity: 0.75,
    pair: 1,
  },
] as const;

const LABELS = [
  "Solutions",
  "Services",
  "Méthode",
  "Différenciation",
] as const;

/** Hero SSR — HTML immédiat, animations CSS, swap titre en îlot client. */
export function HeroSection() {
  return (
    <section id="accueil" className="hero-mock hero-mock--animate">
      <div className="hero-mock-eyebrow hero-mock-enter" style={{ ["--d" as string]: "0ms" }}>
        LX DIGITAL CORP
      </div>

      <div className="hero-mock-tree">
        <div className="hero-mock-diagram">
          <svg viewBox="0 0 400 130" fill="none" aria-hidden="true">
            <defs>
              <linearGradient
                id="hero-g1"
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
                id="hero-g2"
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

            {BRANCHES.map((b) => (
              <g key={b.id}>
                <path
                  className={`hero-mock-branch hero-mock-branch--pair-${b.pair}`}
                  d={b.path}
                  stroke={`url(#${b.gradient})`}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity={b.opacity}
                  pathLength={1}
                />
                <circle
                  className={`hero-mock-tip hero-mock-tip--pair-${b.pair}`}
                  cx={b.tipX}
                  cy={b.tipY}
                  r="2.5"
                  fill={b.tipColor}
                />
              </g>
            ))}

            <circle cx="200" cy="10" r="3" fill="#ff6b3d" />
          </svg>
        </div>

        <div className="hero-mock-labels" aria-hidden="true">
          {LABELS.map((label, i) => {
            const pair = i === 0 || i === 3 ? 0 : 1;
            return (
              <span
                key={label}
                className={`hero-mock-label-enter hero-mock-label-enter--pair-${pair}`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="hero-mock-rule hero-mock-enter" style={{ ["--d" as string]: "280ms" }} />

      <h1 className="sr-only">
        LX Digital Corp — Vos clients vous trouvent d&apos;abord.
      </h1>

      <div className="hero-mock-title">
        <div
          className="hero-mock-h1 hero-mock-enter"
          aria-hidden="true"
          style={{ ["--d" as string]: "320ms" }}
        >
          VOS CLIENTS
        </div>

        <HeroHeadlineSwap />
      </div>

      <div
        className="hero-mock-divider hero-mock-enter"
        style={{ ["--d" as string]: "520ms" }}
      />

      <p
        className="hero-mock-sub hero-mock-enter"
        style={{ ["--d" as string]: "580ms" }}
      >
        Sites web, visibilité Google, acquisition automatisée.
      </p>
      <p
        className="hero-mock-body hero-mock-enter"
        style={{ ["--d" as string]: "680ms" }}
      >
        Nous transformons les recherches en clients — avec une méthode claire et
        mesurable.
      </p>

      <div
        className="hero-mock-ctas hero-mock-enter"
        style={{ ["--d" as string]: "780ms" }}
      >
        <Link href={contactHref} className="hero-mock-btn-primary">
          Parler à un expert →
        </Link>
        <Link href="/#solutions" className="hero-mock-btn-secondary">
          Découvrir nos solutions →
        </Link>
      </div>

      <div
        className="hero-mock-scroll hero-mock-enter"
        aria-hidden="true"
        style={{ ["--d" as string]: "900ms" }}
      >
        SCROLL
      </div>
      <div
        className="hero-mock-scroll-line hero-mock-enter"
        aria-hidden="true"
        style={{ ["--d" as string]: "900ms" }}
      >
        <span className="hero-mock-scroll-pulse" />
      </div>
    </section>
  );
}
