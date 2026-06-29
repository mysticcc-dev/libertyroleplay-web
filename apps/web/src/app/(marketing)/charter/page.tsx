import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/brand/page-header"
import { Section } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "@/components/ui/icons"
import { CHARTER } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "The Charter",
  description:
    "Five principles that keep Liberty's fiction alive and its people safe. Read it, mean it, and the city is yours.",
}

export default function CharterPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Charter"
        title={
          <>
            The five things <span className="text-gradient">we never break.</span>
          </>
        }
        lead="A city only works if everyone agrees on what it is. The Charter is the short version — the full rulebook lives in the Discord, but everything starts here."
      />

      <Section className="!pt-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {CHARTER.map((s) => (
            <Reveal key={s.n}>
              <article className="surface-card flex gap-5 p-6 sm:gap-7 sm:p-7">
                <span className="font-display text-4xl leading-none text-ignition sm:text-5xl">
                  {s.n}
                </span>
                <div>
                  <h2 className="font-head text-xl font-semibold text-bone">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-concrete">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="surface-glass mt-6 rounded-card p-6 text-center">
              <p className="text-sm leading-relaxed text-concrete">
                When you apply, you'll sign the Charter. It isn't fine print — it's the promise that
                makes the story worth telling. Break it and the city remembers; keep it and you'll
                always have a place here.
              </p>
              <Link href="/apply" className={cn(buttonVariants(), "mt-6")}>
                I'm ready to sign
                <ArrowRight width={18} height={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
