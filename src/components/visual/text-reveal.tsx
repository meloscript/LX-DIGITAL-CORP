"use client";

import { Fragment, type ElementType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easePremium, letterStagger, wordStagger, bodyWordStagger, compactWordStagger } from "@/lib/motion-config";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

type RevealLabelProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function RevealLabel({ children, className, delay = 0 }: RevealLabelProps) {
  const reduced = useReducedMotion();

  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: reduced ? 0 : delay, ease: easePremium }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export type TitleSegment = {
  text: string;
  className?: string;
  shine?: boolean;
};

type RevealTitleProps = {
  children?: string;
  segments?: TitleSegment[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  mode?: "word" | "letter";
  delay?: number;
};

function renderSegmentUnits(text: string, mode: "word" | "letter") {
  return mode === "letter" ? text.split("") : text.split(" ");
}

export function RevealTitle({
  children,
  segments,
  className,
  as: Tag = "h2",
  mode = "word",
  delay = 0,
}: RevealTitleProps) {
  const reduced = useReducedMotion();
  const allSegments: TitleSegment[] =
    segments ?? (children ? [{ text: children }] : []);

  const flatLabel = allSegments.map((s) => s.text).join("");

  if (reduced) {
    return (
      <Tag className={className}>
        {allSegments.map((segment, si) =>
          segment.className ? (
            <span key={si} className={segment.className}>
              {segment.text}
              {segment.shine ? <span className="gradient-word-shine" aria-hidden="true" /> : null}
            </span>
          ) : (
            <span key={si}>{segment.text}</span>
          )
        )}
      </Tag>
    );
  }

  let unitIndex = 0;

  return (
    <Tag className={className} aria-label={flatLabel}>
      {allSegments.map((segment, si) => {
        const units = renderSegmentUnits(segment.text, mode);
        return units.map((unit, i) => {
          const current = unitIndex++;
          const isLastInSegment = i === units.length - 1;
          const spacer =
            mode === "word" && !isLastInSegment
              ? " "
              : mode === "word" && isLastInSegment && si < allSegments.length - 1
                ? ""
                : null;

          return (
            <Fragment key={`${si}-${i}-${unit}`}>
              <motion.span
                initial={{ opacity: 0, y: mode === "letter" ? 8 : 14, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: mode === "letter" ? 0.32 : 0.42,
                  delay: delay + current * (mode === "letter" ? letterStagger : wordStagger),
                  ease: easePremium,
                }}
                className={cn(
                  "inline-block",
                  segment.className,
                  segment.shine && "gradient-word-shine-wrap relative"
                )}
                aria-hidden="true"
              >
                {unit}
                {segment.shine && isLastInSegment ? (
                  <span className="gradient-word-shine" aria-hidden="true" />
                ) : null}
              </motion.span>
              {spacer}
            </Fragment>
          );
        });
      })}
    </Tag>
  );
}

type RevealParagraphProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** fade = bloc entier | words = mot par mot (string uniquement) */
  dynamic?: "fade" | "words";
};

export function RevealParagraph({
  children,
  className,
  delay = 0.08,
  dynamic = "fade",
}: RevealParagraphProps) {
  const reduced = useReducedMotion();

  if (dynamic === "words" && typeof children === "string") {
    return (
      <RevealWords
        text={children}
        className={className}
        delay={delay}
        as="div"
      />
    );
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: reduced ? 0 : delay, ease: easePremium }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type RevealWordsProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "p" | "span" | "div" | "h3" | "blockquote";
  compact?: boolean;
  trigger?: "view" | "mount";
};

/** Paragraphe dynamique — révélation mot par mot */
export function RevealWords({
  text,
  className,
  delay = 0,
  as: Tag = "p",
  compact = false,
  trigger = "view",
}: RevealWordsProps) {
  const reduced = useReducedMotion();
  const { animateEntrance, isLite } = usePerformanceMode();
  const words = text.split(" ");
  const stagger = compact ? compactWordStagger : bodyWordStagger;

  if (reduced || (isLite && trigger === "view")) {
    return <Tag className={className}>{text}</Tag>;
  }

  const useMount = trigger === "mount" && animateEntrance;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => {
        const motionProps = useMount
          ? {
              initial: { opacity: 0, y: 10, filter: "blur(3px)" as const },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" as const },
              transition: {
                duration: 0.36,
                delay: delay + i * stagger,
                ease: easePremium,
              },
            }
          : {
              initial: { opacity: 0, y: 10, filter: "blur(3px)" as const },
              whileInView: { opacity: 1, y: 0, filter: "blur(0px)" as const },
              viewport: { once: true, margin: "-40px" as const },
              transition: {
                duration: 0.36,
                delay: delay + i * stagger,
                ease: easePremium,
              },
            };

        return (
          <motion.span
            key={`${word}-${i}`}
            {...motionProps}
            className="inline-block"
            aria-hidden="true"
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </Tag>
  );
}

type RevealSubtitleProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: "h3" | "h4" | "span";
};

/** Titres de cartes — mot par mot, rythme plus vif */
export function RevealSubtitle({
  children,
  className,
  delay = 0,
  as = "h3",
}: RevealSubtitleProps) {
  return (
    <RevealTitle as={as} className={className} mode="word" delay={delay}>
      {children}
    </RevealTitle>
  );
}

type RevealLineProps = {
  children: string;
  className?: string;
  delay?: number;
};

/** Ligne de liste — apparition fluide mot par mot */
export function RevealLine({ children, className, delay = 0 }: RevealLineProps) {
  return (
    <RevealWords
      text={children}
      className={className}
      delay={delay}
      as="span"
      compact
    />
  );
}

type HighlightWordProps = {
  children: React.ReactNode;
  className?: string;
  shine?: boolean;
};

/** Mots clés — lueur / surlignage animé sans changer la charte */
export function HighlightWord({ children, className, shine = true }: HighlightWordProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={cn(
        "relative inline-block text-premium",
        shine && "gradient-word-shine-wrap",
        className
      )}
      initial={reduced ? false : { opacity: 0.85 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: easePremium }}
    >
      {children}
      {shine && !reduced && <span className="gradient-word-shine" aria-hidden="true" />}
    </motion.span>
  );
}

type SectionHeaderProps = {
  label?: string;
  title?: string;
  titleSegments?: TitleSegment[];
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleMode?: "word" | "letter";
  centered?: boolean;
};

export function SectionHeader({
  label,
  title,
  titleSegments,
  description,
  className,
  titleClassName,
  descriptionClassName,
  titleMode = "word",
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {label ? <RevealLabel className="section-label">{label}</RevealLabel> : null}
      <RevealTitle
        className={cn("section-title", titleClassName)}
        mode={titleMode}
        delay={label ? 0.06 : 0}
        segments={titleSegments}
      >
        {title}
      </RevealTitle>
      {description ? (
        <RevealParagraph
          className={cn(
            "text-lg text-muted leading-relaxed mt-3",
            centered && "mx-auto max-w-2xl",
            descriptionClassName
          )}
          delay={0.14}
          dynamic="words"
        >
          {description}
        </RevealParagraph>
      ) : null}
    </div>
  );
}

type ParallaxTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxBlock({ children, className, speed = 0.06 }: ParallaxTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false, margin: "-20%" }}
      transition={{ type: "spring", stiffness: 120, damping: 24 }}
      style={{ willChange: "transform" }}
      // subtle scroll-linked shift via CSS custom property set by parent if needed
      data-parallax-speed={speed}
    >
      {children}
    </motion.div>
  );
}

/** Titres hors pattern section-title (CTA, contact, etc.) */
export function AnimatedHeading({
  children,
  segments,
  className,
  as: Tag = "h2",
  mode = "word",
}: AnimatedHeadingProps) {
  return (
    <RevealTitle
      as={Tag as "h1" | "h2" | "h3" | "h4" | "span"}
      className={className}
      mode={mode}
      segments={segments}
    >
      {children}
    </RevealTitle>
  );
}

type AnimatedHeadingProps = {
  children?: string;
  segments?: TitleSegment[];
  className?: string;
  as?: ElementType;
  mode?: "word" | "letter";
};
