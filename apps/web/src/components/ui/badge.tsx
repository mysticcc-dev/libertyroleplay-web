import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-line bg-gunmetal text-concrete",
        ignition: "border-ignition/40 bg-ignition/10 text-flare",
        teal: "border-teal/40 bg-teal/10 text-teal",
        gold: "border-gold/40 bg-gold/10 text-gold",
        magenta: "border-magenta/40 bg-magenta/10 text-magenta",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
