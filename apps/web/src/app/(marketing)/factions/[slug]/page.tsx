import { FACTION_TYPE_LABELS, FACTIONS, getFaction } from "@liberty/shared"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FactionCard } from "@/components/brand/faction-card"
import { Container, Section } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "@/components/ui/icons"
import { createMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

type Params = { params: Promise<{ slug: string }> }

const RECRUITING_LABEL = {
  open: "Recruiting now",
  selective: "Selective intake",
  closed: "Closed",
} as const

export function generateStaticParams() {
  return FACTIONS.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const faction = getFaction(slug)
  if (!faction) return {}
  return createMetadata({
    title: faction.name,
    description: faction.tagline,
    path: `/factions/${slug}`,
  })
}

export default async function FactionDetailPage({ params }: Params) {
  const { slug } = await params
  const faction = getFaction(slug)
  if (!faction) notFound()

  const others = FACTIONS.filter((f) => f.slug !== faction.slug).slice(0, 3)
  const accent = faction.colorAccent
  // Lifted accent for small foreground text so the darkest accent still clears AA.
  const textAccent = `color-mix(in oklab, ${accent} 62%, var(--color-bone))`

  return (
    <>
      <section
        className="relative overflow-hidden pb-14 pt-[calc(var(--header-h)+4.5rem)]"
        style={{ ["--accent" as string]: accent }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-25 blur-3xl"
          style={{
            background: `radial-gradient(60% 100% at 30% 0%, ${accent}, transparent 70%)`,
          }}
        />
        <Container>
          <Reveal>
            <Link
              href="/factions"
              className="font-mono text-xs uppercase tracking-wider text-concrete transition hover:text-flare"
            >
              ← All factions
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider"
                style={{
                  color: textAccent,
                  borderColor: `color-mix(in oklab, ${accent} 45%, transparent)`,
                }}
              >
                {FACTION_TYPE_LABELS[faction.type]}
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-concrete">
                {RECRUITING_LABEL[faction.recruitingStatus]}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.95] text-bone sm:text-6xl">
              {faction.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-concrete">
              {faction.tagline}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="!pt-4">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-8">
            <div>
              <h2 className="font-head text-sm uppercase tracking-[0.18em] text-flare">
                The brief
              </h2>
              <p className="mt-3 text-base leading-relaxed text-bone/90">{faction.description}</p>
            </div>
            <div>
              <h2 className="font-head text-sm uppercase tracking-[0.18em] text-flare">
                In the city
              </h2>
              <p className="mt-3 text-base leading-relaxed text-concrete">{faction.lore}</p>
            </div>
          </Reveal>

          <Reveal>
            <aside className="surface-card sticky top-24 space-y-5 p-6">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-concrete">
                  What it takes
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bone/90">{faction.requirements}</p>
              </div>
              <div className="h-px rule-ember" />
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-concrete">
                  Intake
                </p>
                <p className="mt-2 font-head text-base font-semibold" style={{ color: textAccent }}>
                  {RECRUITING_LABEL[faction.recruitingStatus]}
                </p>
              </div>
              <Link href="/apply" className={cn(buttonVariants(), "w-full")}>
                Apply to Liberty
                <ArrowRight width={18} height={18} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line">
        <h2 className="font-head text-sm uppercase tracking-[0.18em] text-flare">
          Other powers in play
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((f) => (
            <FactionCard key={f.slug} faction={f} />
          ))}
        </div>
      </Section>
    </>
  )
}
