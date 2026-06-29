import { FACTIONS } from "@liberty/shared"
import Link from "next/link"
import { CinematicCard } from "@/components/brand/cinematic-card"
import { FactionCard } from "@/components/brand/faction-card"
import { LiveCityWidget } from "@/components/brand/live-city-widget"
import { Container, Eyebrow, Section, SectionHeading } from "@/components/brand/section"
import { Skyline } from "@/components/brand/skyline"
import { Stat } from "@/components/brand/stat"
import { Parallax } from "@/components/motion/parallax"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, Flame, MapPin, Shield, Users } from "@/components/ui/icons"
import { HOME_SECTIONS, HOW_IT_WORKS } from "@/lib/content"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <WorldSections />
      <FactionsPreview />
      <HowItWorksPreview />
      <FinalCta />
    </>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-[var(--header-h)]">
      {/* sun / horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[20%] mx-auto h-72 max-w-3xl rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-ignition) 45%, transparent), transparent)",
        }}
      />

      {/* parallax skyline */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[60%]">
        <Parallax speed={0.18} className="absolute inset-x-0 bottom-0">
          <Skyline layer="back" className="h-[36vh] w-full" />
        </Parallax>
        <Parallax speed={-0.04} className="absolute inset-x-0 bottom-0">
          <Skyline layer="front" className="h-[44vh] w-full" />
        </Parallax>
        <div className="absolute inset-0 bg-linear-to-t from-asphalt via-asphalt/40 to-transparent" />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-5 inline-flex items-center gap-2">
              <Flame width={14} height={14} />
              Console-true GTA-V Roleplay
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-6xl uppercase leading-[0.92] tracking-tight text-bone sm:text-7xl md:text-8xl">
              A city that
              <br />
              <span className="text-gradient text-glow">remembers you.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-concrete">
              Liberty is a persistent world for Xbox and PlayStation. Build a character, earn your
              place, and live a second life in a city that keeps going long after you log off.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/apply" className={cn(buttonVariants({ size: "lg" }))}>
                Apply to Liberty
                <ArrowRight width={18} height={18} />
              </Link>
              <Link
                href="/the-city"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Explore the city
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10">
              <LiveCityWidget />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function StatsBand() {
  return (
    <Section className="!py-14">
      <div className="grid grid-cols-2 gap-8 border-y border-line py-10 sm:grid-cols-4">
        <Stat value="24/7" label="The city never sleeps" accent="var(--color-flare)" />
        <Stat value="7" label="Founding factions" />
        <Stat value="100%" label="Console-native" accent="var(--color-teal)" />
        <Stat value="0" label="Pay-to-win, ever" accent="var(--color-gold)" />
      </div>
    </Section>
  )
}

function WorldSections() {
  const icons = [
    <MapPin key="m" width={22} height={22} />,
    <Users key="u" width={22} height={22} />,
    <Shield key="s" width={22} height={22} />,
  ]
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Liberty"
        title="Not a server. A second life."
        lead="Most roleplay is a lobby you drop into and forget. Liberty is built to be a place — continuous, consequential, and console-true."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {HOME_SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <CinematicCard title={s.title} accent={s.accent} icon={icons[i]} className="h-full">
              {s.body}
            </CinematicCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function FactionsPreview() {
  const featured = FACTIONS.slice(0, 6)
  return (
    <Section className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="The Institutions"
          title="Pick a side. Or build your own."
          lead="From the badge to the block, Liberty's factions are the engines of its stories. Join one, fight one, or stay a civilian and watch them clash."
        />
        <Link href="/factions" className={cn(buttonVariants({ variant: "ghost" }), "shrink-0")}>
          All factions
          <ArrowRight width={16} height={16} />
        </Link>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((faction, i) => (
          <Reveal key={faction.slug} delay={(i % 3) * 0.06}>
            <FactionCard faction={faction} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function HowItWorksPreview() {
  return (
    <Section className="border-t border-line">
      <SectionHeading eyebrow="How it works" title="From the outside in, in four moves." />
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.06}>
            <li className="surface-card h-full p-6">
              <span className="font-display text-3xl text-ignition">{step.n}</span>
              <h3 className="mt-3 font-head text-lg font-semibold text-bone">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-concrete">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="mt-10">
        <Link href="/how-it-works" className={cn(buttonVariants({ variant: "outline" }))}>
          The full walkthrough
          <ArrowRight width={16} height={16} />
        </Link>
      </div>
    </Section>
  )
}

function FinalCta() {
  return (
    <Section className="border-t border-line">
      <div className="surface-card relative overflow-hidden px-8 py-16 text-center sm:px-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-24 mx-auto h-64 max-w-xl rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--color-ember) 60%, transparent), transparent)",
          }}
        />
        <Reveal>
          <Eyebrow className="mb-4">The list is open</Eyebrow>
          <h2 className="mx-auto max-w-2xl font-display text-5xl uppercase leading-[0.95] text-bone sm:text-6xl">
            The city is waiting for <span className="text-gradient">your name</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-concrete">
            Applications take about ten minutes. Staff read every one. Step in, and start writing a
            life the city won't forget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className={cn(buttonVariants({ size: "lg" }))}>
              Begin your application
              <ArrowRight width={18} height={18} />
            </Link>
            <Link href="/charter" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
              Read the Charter first
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
