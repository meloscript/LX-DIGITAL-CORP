"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "btn-glass-reflect bg-premium text-white shadow-lg shadow-premium/25 hover:bg-premium-hover hover:shadow-xl hover:shadow-premium/30 hover:-translate-y-0.5",
        secondary:
          "btn-glass-reflect bg-white text-night border border-slate-200 shadow-sm hover:bg-surface hover:border-slate-300 hover:-translate-y-0.5 dark:bg-night/50 dark:text-white dark:border-white/10 dark:hover:bg-night/70",
        outline:
          "border border-premium/30 text-premium bg-transparent hover:bg-premium/5 hover:border-premium/50",
        ghost: "hover:bg-surface hover:text-night dark:hover:bg-white/5",
        accent:
          "bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent/90 hover:-translate-y-0.5",
        link: "text-premium underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 px-8 py-3 text-base rounded-xl",
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
