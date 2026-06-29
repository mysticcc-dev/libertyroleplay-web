import { FACTION_TYPE_LABELS, type FactionDefinition } from "@liberty/shared"
import Link from "next/link"
import { ArrowRight } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

const RECRUITING_LABEL: Record<FactionDefinition["recruitingStatus"], string> = {
  open: "Recruiting",
  selective: "Selective",
  closed: "Closed",
}

export function FactionCard({
  faction,
  className,
}: {
  faction: FactionDefinition
  className?: string
}) {
  const accent = faction.colorAccent
  // Lift the accent toward bone for small foreground text, so even the darkest
  // faction accent (ember red) clears WCAG AA contrast on the card surface.
  const textAccent = `color-mix(in oklab, ${accent} 62%, var(--color-bone))`
  return (
    <Link
      href={`/factions/${faction.slug}`}
      className={cn(
        "group surface-card relative block overflow-hidden p-6 transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-flare/60 motion-safe:hover:-translate-y-1",
        className,
      )}
      style={{ ["--accent" as string]: faction.colorAccent }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 opacity-80"
        style={{ background: faction.colorAccent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: faction.colorAccent }}
      />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-concrete">
          {FACTION_TYPE_LABELS[faction.type]}
        </span>
        <span
          className="rounded-full border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider"
          style={{
            color: textAccent,
            borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
          }}
        >
          {RECRUITING_LABEL[faction.recruitingStatus]}
        </span>
      </div>

      <h3 className="mt-4 font-head text-xl font-semibold text-bone">{faction.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-concrete">{faction.tagline}</p>

      <span
        className="mt-5 inline-flex items-center gap-1.5 font-head text-sm font-medium transition-transform group-hover:translate-x-1"
        style={{ color: textAccent }}
      >
        Enter the file
        <ArrowRight width={16} height={16} />
      </span>
    </Link>
  )
}
