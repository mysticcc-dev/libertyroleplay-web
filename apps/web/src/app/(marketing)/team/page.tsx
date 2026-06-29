import type { Metadata } from "next"
import { PageHeader } from "@/components/brand/page-header"
import { Section, SectionHeading } from "@/components/brand/section"
import { Reveal } from "@/components/motion/reveal"
import { TEAM } from "@/lib/content"

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people who keep Liberty running — direction, staff, story and the machinery behind the city.",
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title={
          <>
            The people behind <span className="text-gradient">the curtain.</span>
          </>
        }
        lead="A small crew keeps Liberty alive — reading applications, running events, building tools, and settling the city's arguments at three in the morning."
      />

      <Section className="!pt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={(i % 2) * 0.06}>
              <article className="surface-card relative h-full overflow-hidden p-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: member.accent }}
                />
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="grid h-12 w-12 place-items-center rounded-full font-display text-xl text-asphalt"
                    style={{ background: member.accent }}
                  >
                    {member.name.charAt(0)}
                  </span>
                  <div>
                    <h2 className="font-head text-lg font-semibold text-bone">{member.name}</h2>
                    <p className="font-mono text-[0.7rem] uppercase tracking-wider text-concrete">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-concrete">{member.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <SectionHeading
          className="mt-16"
          eyebrow="Join the crew"
          title="The best staff started as players."
          lead="Liberty grows by finding the people who already care. Spend time in the city, make it better, and the door to the team opens on its own."
        />
      </Section>
    </>
  )
}
