import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>
}

export function Section({
  id,
  className,
  children,
  container = true,
  ...props
}: HTMLAttributes<HTMLElement> & { container?: boolean }) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)} {...props}>
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.22em] text-flare", className)}>
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance font-head text-3xl font-semibold text-bone sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-pretty text-base leading-relaxed text-concrete">{lead}</p>
      ) : null}
    </div>
  )
}
