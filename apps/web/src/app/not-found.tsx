import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Torch } from "@/components/ui/icons"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <Torch
          width={48}
          height={48}
          className="mx-auto text-ignition motion-safe:animate-flicker"
        />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-flare">Error 404</p>
        <h1 className="mt-3 font-display text-6xl uppercase text-bone sm:text-7xl">
          Lost in the <span className="text-gradient">city.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-concrete">
          This street doesn't exist — or it did, and the city moved on. Let's get you back to
          somewhere with lights.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={cn(buttonVariants())}>
            Back to the city
          </Link>
          <Link href="/factions" className={cn(buttonVariants({ variant: "outline" }))}>
            Explore the factions
          </Link>
        </div>
      </div>
    </main>
  )
}
