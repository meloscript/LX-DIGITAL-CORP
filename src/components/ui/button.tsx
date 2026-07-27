"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium/30 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "btn-glow btn-glass-reflect bg-premium text-white shadow-md shadow-premium/20 hover:bg-premium-hover hover:shadow-lg hover:shadow-premium/25 hover:-translate-y-px border border-transparent",
        secondary:
          "btn-glass-reflect bg-white text-night border border-slate-200/60 shadow-sm hover:bg-surface hover:border-slate-300/70 hover:-translate-y-px dark:bg-night/50 dark:text-white dark:border-white/[0.08] dark:hover:bg-night/70 dark:hover:border-white/[0.14]",
        outline:
          "border border-premium/20 text-premium bg-transparent hover:bg-premium/5 hover:border-premium/35",
        ghost: "border border-transparent hover:bg-surface hover:text-night dark:hover:bg-white/5",
        accent:
          "btn-glow bg-accent text-white shadow-md shadow-accent/20 hover:bg-accent/90 hover:-translate-y-px border border-transparent",
        link: "text-premium underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base rounded-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function useMagnetic(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!enabled || !ref.current) return;

    const el = ref.current;
    const strength = 0.18;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    };

    const onLeave = () => setOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, ref]);

  return offset;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const reduced = useReducedMotion();
    const { effectsEnabled } = usePerformanceMode();
    const innerRef = React.useRef<HTMLElement>(null);
    const magneticEnabled = effectsEnabled && !reduced && !asChild;
    const offset = useMagnetic(innerRef, magneticEnabled);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

    const Comp = asChild ? Slot : "button";

    if (asChild || reduced) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={innerRef as React.Ref<HTMLButtonElement>}
          {...props}
        />
      );
    }

    return (
      <motion.span
        className="inline-flex"
        style={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.45 }}
        whileTap={{ scale: 0.98 }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={innerRef as React.Ref<HTMLButtonElement>}
          {...props}
        />
      </motion.span>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
