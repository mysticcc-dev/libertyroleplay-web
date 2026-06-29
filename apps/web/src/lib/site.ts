import { BRAND } from "@liberty/shared"

/** Static site configuration: identity, navigation, social links. */
export const site = {
  name: BRAND.name,
  short: BRAND.short,
  tagline: BRAND.tagline,
  description: BRAND.description,
  // The public base URL lives in `@/lib/env` (validated, server-only) so it is
  // never read unvalidated and never bundled into client code. This config is
  // client-safe and holds only static identity + navigation.
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
