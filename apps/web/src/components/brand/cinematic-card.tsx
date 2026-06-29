import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * The signature feature card: warm glass, a hairline edge, and an accent glow
 * that warms on hover.
 */
export function CinematicCard({
  title,
  children,
  icon,
  accent = "var(--color-ignition)",
  className,
}: {
  title: ReactNode
  children: ReactNode
  icon?: ReactNode
  accent?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "group surface-card relative overflow-hidden p-7 transition-transform duration-300 motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: accent }}
      />
      {icon ? (
        <div
          className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-asphalt/60"
          style={{ color: accent }}
        >
          {icon}
        </div>
      ) : null}
      <h3 className="font-head text-xl font-semibold text-bone">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-concrete">{children}</div>
    </div>
  )
}
