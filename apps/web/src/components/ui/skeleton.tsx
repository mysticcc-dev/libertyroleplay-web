import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

/** Torch-themed loading placeholder — a faint ember shimmer. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "motion-safe:animate-pulse-glow rounded-md bg-linear-to-r from-gunmetal via-card to-gunmetal",
        className,
      )}
      {...props}
    />
  )
}
