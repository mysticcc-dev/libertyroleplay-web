import Link from "next/link"
import { PageHeader } from "@/components/brand/page-header"
import { Section, SectionHeading } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, Discord, Users, Xbox } from "@/components/ui/icons"
import { HOW_IT_WORKS } from "@/lib/content"
import { createMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: "How It Works",
  description:
    "What you need, how to apply, and how to step into Liberty — from the outside in, in four moves.",
  path: "/how-it-works",
})

const NEEDS = [
  {
    icon: <Xbox width={22} height={22} />,
    title: "A console & GTA V",
    body: "Xbox or PlayStation. Liberty is built console-first — no PC, no mods, no barrier.",
  },
  {
    icon: <Users width={22} height={22} />,
    title: "A microphone",
    body: "Voice is the heart of roleplay. A headset and the willingness to be someone else.",
  },
  {
    icon: <Discord width={22} height={22} />,
    title: "A Discord account",
    body: "The community's home. It's where the city talks, plans, and welcomes you in.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title={
          <>
            From the outside in, <span className="text-gradient">in four moves.</span>
          </>
        }
        lead="Joining Liberty is meant to feel like the first scene of a story, not a sign-up form. Here's the whole path."
      />

      <Section className="!pt-6">
        <SectionHeading eyebrow="Before you start" title="All you need to walk in." />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {NEEDS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.07}>
              <div className="surface-card h-full p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-asphalt/60 text-flare">
                  {n.icon}
                </div>
                <h3 className="font-head text-lg font-semibold text-bone">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="The path" title="Four moves to a second life." />
        <ol className="mt-12 space-y-4">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.n}>
              <Reveal className="surface-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8">
                <span className="font-display text-5xl leading-none text-ignition">{step.n}</span>
                <div>
                  <h3 className="font-head text-xl font-semibold text-bone">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-concrete">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/apply" className={cn(buttonVariants({ size: "lg" }))}>
            Start your application
            <ArrowRight width={18} height={18} />
          </Link>
          <Link href="/charter" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Read the Charter
          </Link>
        </div>
      </Section>
    </>
  )
}
