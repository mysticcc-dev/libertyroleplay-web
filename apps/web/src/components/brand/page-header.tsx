import type { ReactNode } from "react"
import { Container, Eyebrow } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+4.5rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-ignition) 70%, transparent), transparent)",
        }}
      />
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-bone sm:text-6xl">
            {title}
          </h1>
          {lead ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-concrete">{lead}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  )
}
