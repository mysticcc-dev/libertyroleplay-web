import { APPLICATION_STEPS } from "@liberty/shared"
import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/brand/page-header"
import { Section } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight, Discord } from "@/components/ui/icons"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to Liberty Roleplay. A short, guided story — about ten minutes. Staff read every application by hand.",
}

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the city"
        title={
          <>
            Write your way <span className="text-gradient">in.</span>
          </>
        }
        lead="The application is the first scene of your character — short, guided, and read by a real person. Here's what's ahead."
      />

      <Section className="!pt-6">
        <div className="mx-auto max-w-3xl">
          <ol className="space-y-3">
            {APPLICATION_STEPS.map((step, i) => (
              <Reveal key={step.id}>
                <li className="surface-card flex items-start gap-5 p-6">
                  <span className="font-mono text-sm text-flare">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-head text-lg font-semibold text-bone">{step.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-concrete">{step.blurb}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="surface-glass mt-8 rounded-card p-7 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-flare">
                The in-city application is launching soon
              </p>
              <h3 className="mt-3 font-head text-2xl font-semibold text-bone">
                Until then, the doors are open in Discord.
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-concrete">
                We're an 18+ community. Join the server to introduce yourself and be first in line
                when the guided application goes live.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={site.discordInvite}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  <Discord width={18} height={18} />
                  Join the Discord
                </a>
                <Link
                  href="/charter"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Read the Charter
                  <ArrowRight width={18} height={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
