import { SUPPORTER_DISCLAIMER } from "@liberty/shared"
import Link from "next/link"
import { Discord, Torch } from "@/components/ui/icons"
import { site } from "@/lib/site"

export function SiteFooter() {
  const year = 2026
  return (
    <footer className="relative border-t border-line bg-gunmetal/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-2xl text-bone"
            >
              <Torch width={26} height={26} className="text-ignition" />
              LIBERTY<span className="text-flare">.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-concrete">{site.tagline}</p>
            <a
              href={site.discordInvite}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-head text-sm text-bone transition hover:border-ignition/60 hover:text-flare"
            >
              <Discord width={18} height={18} />
              Join the Discord
            </a>
          </div>

          {site.footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-flare">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-concrete transition-colors hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-concrete/80">
          {SUPPORTER_DISCLAIMER}
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-concrete sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. A roleplay community. Not affiliated with Rockstar Games.
          </p>
          <p className="font-mono uppercase tracking-wider">Built for the console.</p>
        </div>
      </div>
    </footer>
  )
}
