const SPARKS = [
  /* Mobile — bien visibles */
  { t: "8%", l: "7%", d: "0s", dur: "2.8s", s: 4, tone: "ember" },
  { t: "16%", l: "88%", d: "0.9s", dur: "2.4s", s: 3.5, tone: "chrome" },
  { t: "28%", l: "10%", d: "0.4s", dur: "3s", s: 4, tone: "violet" },
  { t: "38%", l: "78%", d: "1.6s", dur: "2.6s", s: 3.5, tone: "ember" },
  { t: "48%", l: "5%", d: "1.1s", dur: "3.2s", s: 4, tone: "chrome" },
  { t: "58%", l: "92%", d: "0.2s", dur: "2.5s", s: 3.5, tone: "ember" },
  { t: "68%", l: "14%", d: "2s", dur: "2.9s", s: 4, tone: "violet" },
  { t: "78%", l: "72%", d: "0.7s", dur: "2.3s", s: 3.5, tone: "chrome" },
  { t: "12%", l: "42%", d: "1.4s", dur: "2.7s", s: 3.5, tone: "ember" },
  { t: "34%", l: "54%", d: "2.2s", dur: "3.1s", s: 4, tone: "violet" },
  { t: "52%", l: "36%", d: "0.5s", dur: "2.6s", s: 3.5, tone: "chrome" },
  { t: "72%", l: "48%", d: "1.8s", dur: "2.8s", s: 4, tone: "ember" },
  { t: "22%", l: "26%", d: "2.5s", dur: "3s", s: 3.5, tone: "violet" },
  { t: "44%", l: "64%", d: "1.3s", dur: "2.4s", s: 4, tone: "ember" },
  { t: "86%", l: "30%", d: "0.8s", dur: "2.9s", s: 3.5, tone: "chrome" },
  { t: "6%", l: "62%", d: "2.1s", dur: "2.5s", s: 4, tone: "ember" },

  /* PC — densité supplémentaire */
  { t: "20%", l: "14%", d: "2.1s", dur: "3.2s", s: 3.5, tone: "violet", pc: true },
  { t: "44%", l: "96%", d: "0.6s", dur: "2.8s", s: 3, tone: "ember", pc: true },
  { t: "58%", l: "2%", d: "1.7s", dur: "3.6s", s: 3.5, tone: "chrome", pc: true },
  { t: "70%", l: "38%", d: "2.8s", dur: "3s", s: 3, tone: "violet", pc: true },
  { t: "12%", l: "96%", d: "1.2s", dur: "2.6s", s: 4, tone: "ember", pc: true },
  { t: "90%", l: "88%", d: "0.1s", dur: "3.4s", s: 3, tone: "chrome", pc: true },
  { t: "26%", l: "32%", d: "2.5s", dur: "2.9s", s: 3.5, tone: "ember", pc: true },
  { t: "64%", l: "66%", d: "1.5s", dur: "3.8s", s: 3, tone: "violet", pc: true },
] as const;

/** Étincelles CSS — visibles sur téléphone, densifiées sur PC. */
export function HeroSparks() {
  return (
    <div className="hero-sparks" aria-hidden="true">
      {SPARKS.map((p, i) => (
        <span
          key={i}
          className={`hero-spark hero-spark--${p.tone}${"pc" in p && p.pc ? " hero-spark--pc" : ""}`}
          style={{
            top: p.t,
            left: p.l,
            width: p.s,
            height: p.s,
            animationDelay: p.d,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}
