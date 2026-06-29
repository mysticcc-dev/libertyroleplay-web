import Link from "next/link"
import { PageHeader } from "@/components/brand/page-header"
import { Section, SectionHeading } from "@/components/brand/section"
import { Skyline } from "@/components/brand/skyline"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, MapPin } from "@/components/ui/icons"
import { DISTRICTS } from "@/lib/content"
import { createMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: "The City",
  description:
    "Six districts, one city. From the lights of Vinewood to the dark of the docks, this is the Liberty you'll call home.",
  path: "/the-city",
})

export default function TheCityPage() {
  return (
    <>
      <PageHeader
        eyebrow="The City"
        title={
          <>
            Los Santos, <span className="text-gradient">after hours.</span>
          </>
        }
        lead="One map, six worlds. Each district has its own rhythm, its own money, its own trouble. Find the corner that feels like yours."
      />

      <Section className="!pt-6">
        <SectionHeading eyebrow="The Districts" title="Every block has a story it isn't telling." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DISTRICTS.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.06}>
              <article className="surface-card h-full p-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-flare">
                  {d.kind}
                </p>
                <h3 className="mt-2 font-head text-xl font-semibold text-bone">{d.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-concrete">{d.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="surface-card relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-40">
            <Skyline layer="front" className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-card via-card/70 to-transparent" />
          <div className="relative px-8 py-16 sm:px-14 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-asphalt/60 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-flare">
              <MapPin width={14} height={14} />
              Interactive map — coming soon
            </span>
            <h3 className="mt-5 max-w-xl font-display text-4xl uppercase leading-[0.95] text-bone">
              The whole city, on one living map.
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-concrete">
              Faction territory, businesses you can visit, events as they happen — every pin pulled
              live from the city's records. It's on the way. For now, the streets are best learned
              on foot.
            </p>
            <Link href="/apply" className={cn(buttonVariants(), "mt-7")}>
              Get your key to the city
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
