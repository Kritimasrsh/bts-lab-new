import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-brand text-paper hover:bg-brand-deep",
        outline:
          "border-brand/40 bg-background text-ink hover:border-brand hover:bg-brand/5 hover:text-brand",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        ghost: "hover:bg-brand/5 hover:text-brand",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-brand underline-offset-4 hover:underline",
        /* Animated Uiverse-style CTA. Styling lives in globals.css (.animated-button);
           this variant strips the base classes so the CSS fully controls the look. */
        animated:
          "animated-button [&]:border-transparent [&]:bg-transparent [&]:p-0 [&]:rounded-full",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 rounded-full px-7 text-sm",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const ARROW_PATH =
  "M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d={ARROW_PATH} />
    </svg>
  )
}

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Use the light-on-dark treatment (for the animated variant over dark backgrounds). */
    onDark?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  onDark = false,
  children,
  ...props
}: ButtonProps) {
  // The animated variant needs a specific inner markup (arrows + circle + text),
  // so we wrap the children automatically instead of expecting callers to supply it.
  if (variant === "animated") {
    return (
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant, className }), onDark && "on-dark")}
        {...props}
      >
        <ArrowIcon className="arr-2" />
        <span className="text">{children}</span>
        <span className="circle" aria-hidden />
        <ArrowIcon className="arr-1" />
      </ButtonPrimitive>
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
