import type { SupporterTier } from "./enums"

/** Identity constants shared across web + bot. */
export const BRAND = {
  name: "Liberty Roleplay",
  short: "Liberty",
  tagline: "A city that remembers you.",
  description:
    "A cinematic, console-true GTA-V roleplay community. Build a character, earn your place, and live a second life in the city of Liberty.",
} as const

/**
 * Supporter tiers, named in-world. Perks are strictly cosmetic and
 * recognition-based — never anything that confers advantage in roleplay.
 * Funds cover hosting and development, and that is stated plainly.
 */
export type SupporterTierDefinition = {
  tier: Exclude<SupporterTier, "none">
  name: string
  priceMonthly: number
  blurb: string
  perks: readonly string[]
}

export const SUPPORTER_TIER_DEFINITIONS: readonly SupporterTierDefinition[] = [
  {
    tier: "citizen",
    name: "Citizen",
    priceMonthly: 3,
    blurb: "Keep the lights on in the city and wear the badge that says so.",
    perks: ["A Citizen badge on your profile", "A supporter colour in Discord", "Our gratitude"],
  },
  {
    tier: "patron",
    name: "Patron",
    priceMonthly: 7,
    blurb: "For the regulars who make the city feel like home.",
    perks: [
      "Everything in Citizen",
      "Priority event signup",
      "A Patron badge & Discord colour",
      "Name in the supporter credits",
    ],
  },
  {
    tier: "founder",
    name: "Founder",
    priceMonthly: 15,
    blurb: "The names the city is built on.",
    perks: [
      "Everything in Patron",
      "A Founder badge & exclusive Discord colour",
      "Early access to new features",
      "A permanent place in the Hall of Founders",
    ],
  },
] as const

/** Cosmetic-only. State it plainly. */
export const SUPPORTER_DISCLAIMER =
  "Supporter perks are cosmetic and recognition-based only. They never confer any advantage in roleplay. Your support pays for hosting and development — nothing more, and nothing less."
