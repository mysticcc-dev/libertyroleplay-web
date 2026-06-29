import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("surface-card p-6", className)} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 space-y-1.5", className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-head text-lg font-semibold text-bone", className)} {...props} />
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-concrete", className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm text-concrete", className)} {...props} />
}
