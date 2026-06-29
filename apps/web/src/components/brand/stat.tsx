import { cn } from "@/lib/utils"

export function Stat({
  value,
  label,
  accent,
  className,
}: {
  value: string
  label: string
  accent?: string
  className?: string
}) {
  return (
    <div className={cn("text-center sm:text-left", className)}>
      <div
        className="font-display text-4xl leading-none tracking-tight text-bone sm:text-5xl"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-concrete">
        {label}
      </div>
    </div>
  )
}
