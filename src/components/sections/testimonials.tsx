"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { RevealLabel } from "@/components/visual/text-reveal";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import {
  testimonials,
  reviewsSourceUrl,
  reviewsSourceLabel,
} from "@/lib/testimonials-data";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < rating ? "fill-kinetic text-kinetic" : "text-paper/20")}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <div className="corner-cut-tl shrink-0 w-[85vw] sm:w-[420px] bg-paper/[0.04] border border-paper/10 p-7 flex flex-col h-[320px]">
      <StarRating rating={item.rating} />
      <blockquote className="mt-4 text-sm text-paper/85 leading-relaxed flex-1">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <div className="mt-5 pt-4 border-t border-paper/10">
        <p className="font-semibold text-paper text-sm">{item.name}</p>
        <p className="text-xs text-paper/50">{item.company}</p>
        <p className="text-xs text-kinetic mt-1">{item.service}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const reduced = useReducedMotion();
  const { effectsEnabled } = usePerformanceMode();
  const hasPlaceholder = testimonials.some((t) => t.isPlaceholder);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const trackWidth = testimonials.length * 440;
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -(trackWidth - 600)]);
  const trackXpx = useTransform(trackX, (v) => `${v}px`);

  const simple = !effectsEnabled || !!reduced;

  return (
    <section id="temoignages" className="bg-ink relative">
      <div className="pt-16 lg:pt-20 pb-10 text-center max-w-2xl mx-auto px-4">
        <RevealLabel className="text-kinetic font-semibold text-sm uppercase tracking-wider mb-3">
          Témoignages
        </RevealLabel>
        <h2 className="font-display font-extrabold text-paper text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
          Ils nous font confiance
        </h2>
        <p className="text-paper/60 leading-relaxed font-light">
          Des entreprises qui ont accéléré leur croissance grâce à des solutions concrètes.
        </p>
        {hasPlaceholder && (
          <p className="mt-4 text-xs text-paper/35 italic">
            Exemples temporaires — remplacez par vos avis clients réels.
          </p>
        )}
      </div>

      {simple ? (
        <div className="flex gap-4 overflow-x-auto pb-16 snap-x snap-mandatory scrollbar-hide px-4">
          {testimonials.map((item) => (
            <div key={item.id} className="snap-center">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div ref={wrapperRef} className="relative" style={{ height: "250vh" }}>
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div style={{ x: trackXpx }} className="flex gap-8 pl-[8vw]">
              {testimonials.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {reviewsSourceUrl && (
        <div className="text-center pb-16 lg:pb-20 relative z-10">
          <Link
            href={reviewsSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-kinetic font-medium hover:underline"
          >
            {reviewsSourceLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
