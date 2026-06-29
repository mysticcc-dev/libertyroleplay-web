import { FACTIONS } from "@liberty/shared"
import type { Metadata } from "next"
import Link from "next/link"
import { CinematicCard } from "@/components/brand/cinematic-card"
import { FactionCard } from "@/components/brand/faction-card"
import { Stat } from "@/components/brand/stat"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Flame, Torch } from "@/components/ui/icons"
import { Input, Label, Textarea } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Style Guide",
  robots: { index: false, follow: false },
}

const COLORS = [
  ["asphalt", "#0B0907"],
  ["gunmetal", "#18120D"],
  ["card", "#1C1610"],
  ["line", "#2E2419"],
  ["ignition", "#FF6A00"],
  ["flare", "#FF9E2C"],
  ["ember", "#D84300"],
  ["gold", "#FFB627"],
  ["teal", "#19E5C6"],
  ["magenta", "#FF2D6E"],
  ["violet", "#7A1FA2"],
  ["bone", "#F4EDE3"],
  ["concrete", "#9B8E7E"],
]

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-flare">{title}</h2>
      {children}
    </section>
  )
}

export default function StyleguidePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <header className="flex items-center justify-between">
        <div className="inline-flex items-center gap-3">
          <Torch width={30} height={30} className="text-ignition" />
          <div>
            <h1 className="font-display text-3xl text-bone">LIBERTY STYLE GUIDE</h1>
            <p className="font-mono text-xs uppercase tracking-wider text-concrete">
              The orange golden-hour system
            </p>
          </div>
        </div>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          ← Back to site
        </Link>
      </header>

      <Block title="Colour">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {COLORS.map(([name, hex]) => (
            <div key={name} className="surface-card overflow-hidden p-0">
              <div className="h-16 w-full" style={{ background: hex }} />
              <div className="px-3 py-2">
                <p className="font-head text-sm text-bone">{name}</p>
                <p className="font-mono text-[0.65rem] text-concrete">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Typography">
        <div className="space-y-4">
          <p className="font-display text-6xl uppercase text-bone">Display · Anton</p>
          <p className="font-head text-3xl font-semibold text-bone">Heading · Space Grotesk</p>
          <p className="font-body text-lg text-concrete">
            Body · Inter — the city keeps going when you log off.
          </p>
          <p className="font-mono text-sm text-flare">Mono · JetBrains — 138 IN THE CITY NOW</p>
          <p className="text-gradient font-display text-5xl uppercase">Gradient display fill</p>
        </div>
      </Block>

      <Block title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={cn(buttonVariants())}>
            Primary
          </button>
          <button type="button" className={cn(buttonVariants({ variant: "outline" }))}>
            Outline
          </button>
          <button type="button" className={cn(buttonVariants({ variant: "ghost" }))}>
            Ghost
          </button>
          <button type="button" className={cn(buttonVariants({ variant: "subtle" }))}>
            Subtle
          </button>
          <button type="button" className={cn(buttonVariants({ variant: "danger" }))}>
            Danger
          </button>
          <button type="button" className={cn(buttonVariants({ size: "lg" }))}>
            Large
          </button>
          <button type="button" className={cn(buttonVariants({ size: "sm" }))}>
            Small
          </button>
        </div>
      </Block>

      <Block title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="ignition">
            <Flame width={12} height={12} /> Ignition
          </Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="gold">Gold</Badge>
          <Badge variant="magenta">Magenta</Badge>
        </div>
      </Block>

      <Block title="Cards & stats">
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <CardTitle>Warm glass card</CardTitle>
            <CardDescription className="mt-2">
              The base surface for grouped content, with a hairline ignition edge.
            </CardDescription>
          </Card>
          <CinematicCard title="Cinematic card" icon={<Flame width={20} height={20} />}>
            Accent glow warms on hover. Used for the signature feature grids.
          </CinematicCard>
          <Card className="flex items-center justify-around">
            <Stat value="138" label="Online" accent="var(--color-flare)" />
            <Stat value="7" label="Factions" />
          </Card>
        </div>
      </Block>

      <Block title="Form fields">
        <div className="max-w-md space-y-4">
          <div>
            <Label htmlFor="sg-name">Character name</Label>
            <Input id="sg-name" placeholder="e.g. Marcus Vane" />
          </div>
          <div>
            <Label htmlFor="sg-bio">Backstory</Label>
            <Textarea id="sg-bio" placeholder="Where do they come from?" />
          </div>
        </div>
      </Block>

      <Block title="Skeletons">
        <div className="max-w-md space-y-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </Block>

      <Block title="Faction card">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACTIONS.slice(0, 3).map((f) => (
            <FactionCard key={f.slug} faction={f} />
          ))}
        </div>
      </Block>
    </main>
  )
}
