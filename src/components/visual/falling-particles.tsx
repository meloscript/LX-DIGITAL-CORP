const FALLING_PARTICLES = [
  { left: "3%", delay: "0s", duration: "6.5s", size: 6, drift: "-18px", tone: "paper" },
  { left: "9%", delay: "0.7s", duration: "7.8s", size: 5, drift: "22px", tone: "violet" },
  { left: "15%", delay: "0.2s", duration: "5.8s", size: 7, drift: "-10px", tone: "kinetic" },
  { left: "22%", delay: "1.4s", duration: "8.2s", size: 5, drift: "16px", tone: "paper" },
  { left: "28%", delay: "0.5s", duration: "6.9s", size: 6, drift: "-24px", tone: "violet" },
  { left: "35%", delay: "1.9s", duration: "7.2s", size: 5, drift: "12px", tone: "paper" },
  { left: "42%", delay: "0.9s", duration: "8s", size: 7, drift: "-28px", tone: "kinetic" },
  { left: "49%", delay: "0.1s", duration: "5.5s", size: 6, drift: "10px", tone: "violet" },
  { left: "56%", delay: "1.6s", duration: "7.5s", size: 5, drift: "-14px", tone: "paper" },
  { left: "63%", delay: "1.1s", duration: "8.6s", size: 6, drift: "20px", tone: "violet" },
  { left: "70%", delay: "0.4s", duration: "6.2s", size: 7, drift: "-16px", tone: "kinetic" },
  { left: "77%", delay: "2.1s", duration: "7.9s", size: 5, drift: "14px", tone: "paper" },
  { left: "84%", delay: "0.8s", duration: "6.4s", size: 6, drift: "-22px", tone: "violet" },
  { left: "91%", delay: "1.3s", duration: "8.1s", size: 5, drift: "18px", tone: "kinetic" },
  { left: "6%", delay: "2.6s", duration: "9s", size: 5, drift: "8px", tone: "paper" },
  { left: "18%", delay: "2.9s", duration: "7.1s", size: 6, drift: "-30px", tone: "violet" },
  { left: "31%", delay: "3.2s", duration: "8.4s", size: 7, drift: "24px", tone: "kinetic" },
  { left: "45%", delay: "2.4s", duration: "6.7s", size: 5, drift: "-8px", tone: "paper" },
  { left: "59%", delay: "3.5s", duration: "7.6s", size: 6, drift: "26px", tone: "violet" },
  { left: "72%", delay: "2.8s", duration: "8.8s", size: 5, drift: "-12px", tone: "paper" },
  { left: "86%", delay: "3.1s", duration: "6.8s", size: 7, drift: "15px", tone: "kinetic" },
  { left: "12%", delay: "3.8s", duration: "9.2s", size: 5, drift: "-20px", tone: "violet" },
  { left: "38%", delay: "4.1s", duration: "7.4s", size: 6, drift: "11px", tone: "paper" },
  { left: "67%", delay: "4.4s", duration: "8.3s", size: 5, drift: "-26px", tone: "kinetic" },
  { left: "95%", delay: "3.6s", duration: "7s", size: 6, drift: "9px", tone: "violet" },
] as const;

/** Pluie de particules depuis le haut du hero. */
export function FallingParticles() {
  return (
    <div className="hero-falling-particles" aria-hidden="true">
      {FALLING_PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`hero-fall-particle hero-fall-particle--${p.tone}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ["--fall-drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
