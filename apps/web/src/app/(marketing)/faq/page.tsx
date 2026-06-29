import Link from "next/link"
import { PageHeader } from "@/components/brand/page-header"
import { Section } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { ChevronDown } from "@/components/ui/icons"
import { FAQ, type FaqItem } from "@/lib/content"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "The questions people ask before they apply — about joining, playing, and how Liberty keeps the city fair and safe.",
  path: "/faq",
})

const GROUPS: FaqItem["group"][] = ["Joining", "Playing", "Rules & Safety"]

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Before you <span className="text-gradient">knock.</span>
          </>
        }
        lead="Everything a cold visitor wonders, answered plainly. Still stuck? The Discord is the fastest way to ask a human."
      />

      <Section className="!pt-6">
        <div className="mx-auto max-w-3xl space-y-12">
          {GROUPS.map((group) => {
            const items = FAQ.filter((f) => f.group === group)
            if (items.length === 0) return null
            return (
              <div key={group}>
                <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-flare">
                  {group}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <Reveal key={item.q}>
                      <details className="group surface-card overflow-hidden p-0">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-head text-base font-medium text-bone [&::-webkit-details-marker]:hidden">
                          {item.q}
                          <ChevronDown
                            width={20}
                            height={20}
                            className="shrink-0 text-concrete transition-transform duration-200 group-open:rotate-180"
                          />
                        </summary>
                        <p className="px-6 pb-6 text-sm leading-relaxed text-concrete">{item.a}</p>
                      </details>
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}

          <p className="text-center text-sm text-concrete">
            Didn't find it?{" "}
            <Link href="/apply" className="text-flare underline-offset-4 hover:underline">
              Just apply
            </Link>{" "}
            — the rest you'll learn in the city.
          </p>
        </div>
      </Section>
    </>
  )
}
