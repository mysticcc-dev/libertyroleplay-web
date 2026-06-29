import { FACTIONS } from "@liberty/shared"
import { FactionCard } from "@/components/brand/faction-card"
import { PageHeader } from "@/components/brand/page-header"
import { Section, SectionHeading } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Factions",
  description:
    "The founding institutions of Liberty — law and outlaws, government and press, business and the streets. Pick a side, or build your own.",
  path: "/factions",
})

export default function FactionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Institutions"
        title={
          <>
            Seven powers. <span className="text-gradient">One city.</span>
          </>
        }
        lead="Every story in Liberty pulls against another. These are the forces you'll join, fight, report on, or quietly avoid."
      />

      <Section className="!pt-6">
        <SectionHeading
          eyebrow="The founding institutions"
          title="Pick a side, or build your own."
          lead="Each faction is an engine of stories — and a different way into the city."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACTIONS.map((faction, i) => (
            <Reveal key={faction.slug} delay={(i % 3) * 0.06}>
              <FactionCard faction={faction} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
