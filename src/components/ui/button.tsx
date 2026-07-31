import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-ink text-bg shadow-[4px_4px_0_0_var(--color-primary)] hover:bg-ink-soft hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0_0_var(--color-primary)]",
        primary:
          "rounded-full bg-primary text-primary-fg shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-primary-hover hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0_0_var(--color-ink)]",
        secondary:
          "rounded-full border-2 border-ink bg-card text-fg hover:bg-bg-warm",
        outline:
          "rounded-full border-2 border-ink/20 bg-transparent text-fg hover:border-ink hover:bg-card",
        ghost: "rounded-full text-fg-muted hover:bg-ink/5 hover:text-fg",
        ink: "rounded-full bg-bg text-ink shadow-[4px_4px_0_0_var(--color-pulse)] hover:translate-x-px hover:translate-y-px",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-sm sm:text-base",
        xl: "h-14 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
