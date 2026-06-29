import { BRAND } from "@liberty/shared"

/** Static site configuration: identity, navigation, social links. */
export const site = {
  name: BRAND.name,
  short: BRAND.short,
  tagline: BRAND.tagline,
  description: BRAND.description,
  // Public base URL — falls back to localhost for local dev. Read directly so
  // Next can inline the NEXT_PUBLIC_ value into both server and client output.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  discordInvite: "https://discord.gg/libertyrp",
  nav: [
    { label: "The City", href: "/the-city" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Factions", href: "/factions" },
    { label: "The Charter", href: "/charter" },
    { label: "FAQ", href: "/faq" },
    { label: "Team", href: "/team" },
  ],
  footerNav: [
    {
      heading: "The City",
      links: [
        { label: "The City", href: "/the-city" },
        { label: "Factions", href: "/factions" },
        { label: "How It Works", href: "/how-it-works" },
      ],
    },
    {
      heading: "Join",
      links: [
        { label: "Apply", href: "/apply" },
        { label: "The Charter", href: "/charter" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      heading: "Community",
      links: [
        { label: "Team", href: "/team" },
        { label: "Style Guide", href: "/styleguide" },
      ],
    },
  ],
} as const

export type NavItem = (typeof site.nav)[number]
