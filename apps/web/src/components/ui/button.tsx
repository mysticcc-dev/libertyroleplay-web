import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-head font-semibold tracking-tight whitespace-nowrap transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-flare/70 disabled:pointer-events-none disabled:opacity-50 motion-safe:active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-linear-to-br from-flare to-ember text-asphalt shadow-ember hover:from-gold hover:to-ignition",
        outline:
          "border border-line bg-transparent text-bone hover:border-ignition/60 hover:text-flare",
        ghost: "bg-transparent text-bone hover:bg-gunmetal hover:text-flare",
        subtle: "bg-gunmetal text-bone hover:bg-card",
        danger: "bg-magenta/90 text-asphalt hover:bg-magenta",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} type={type} {...props} />
  )
}
