"use client";

import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { MotionSection, MotionCard } from "@/components/motion";
import { LiquidGlass } from "@/components/visual/liquid-glass";
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
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const hasPlaceholder = testimonials.some((t) => t.isPlaceholder);

  return (
    <section id="temoignages" className="section-padding bg-surface dark:bg-night/50">
      <div className="container-max mx-auto">
        <MotionSection className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-premium font-semibold text-sm uppercase tracking-wider mb-3">
            Témoignages
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-night dark:text-white tracking-tight mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-muted">
            Des entreprises qui ont accéléré leur croissance grâce à des solutions
            digitales concrètes.
          </p>
          {hasPlaceholder && (
            <p className="mt-4 text-xs text-muted/80 italic">
              Exemples temporaires — remplacez par vos avis clients réels.
            </p>
          )}
        </MotionSection>

        {/* Desktop: horizontal scroll / grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <MotionCard key={item.id} delay={index * 0.08}>
              <LiquidGlass interactive className="rounded-2xl p-6 h-full flex flex-col">
                <StarRating rating={item.rating} />
                <blockquote className="mt-4 text-sm text-night dark:text-white leading-relaxed flex-1">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10">
                  <p className="font-semibold text-night dark:text-white text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted">{item.company}</p>
                  <p className="text-xs text-premium mt-1">{item.service}</p>
                </div>
              </LiquidGlass>
            </MotionCard>
          ))}
        </div>

        {/* Mobile: carousel scroll-snap */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {testimonials.map((item) => (
            <LiquidGlass
              key={item.id}
              className="rounded-2xl p-6 min-w-[85vw] sm:min-w-[320px] snap-center shrink-0"
            >
              <StarRating rating={item.rating} />
              <blockquote className="mt-4 text-sm text-night dark:text-white leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10">
                <p className="font-semibold text-night dark:text-white text-sm">
                  {item.name}
                </p>
                <p className="text-xs text-muted">{item.company}</p>
                <p className="text-xs text-premium mt-1">{item.service}</p>
              </div>
            </LiquidGlass>
          ))}
        </div>

        {reviewsSourceUrl && (
          <div className="text-center mt-10">
            <Link
              href={reviewsSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-premium font-medium hover:underline"
            >
              {reviewsSourceLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
