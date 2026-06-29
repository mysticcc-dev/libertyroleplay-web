import type { FactionType } from "./enums"

/**
 * Canonical faction definitions for Liberty Roleplay.
 *
 * These power the public `/factions` marketing pages and seed the `factions`
 * table. Once members are running their own rosters the database is the live
 * source of truth, but these are the founding institutions of the city.
 */
export type FactionDefinition = {
  slug: string
  name: string
  shortName: string
  type: FactionType
  /** A one-line hook for cards and headers. */
  tagline: string
  /** Marketing-length description. */
  description: string
  /** Longer in-world lore. */
  lore: string
  /** CSS color used as the faction's accent (hex). */
  colorAccent: string
  recruitingStatus: "open" | "selective" | "closed"
  requirements: string
}

export const FACTIONS: readonly FactionDefinition[] = [
  {
    slug: "metro-police",
    name: "Los Santos Metro Police",
    shortName: "LSPD",
    type: "law_enforcement",
    tagline: "The thin line between the city and the dark.",
    description:
      "The department that keeps Liberty's streets honest — patrol, pursuit, investigation and the slow grind of holding a city together one shift at a time.",
    lore: "From the Vinewood hills to the docks, Metro answers the calls nobody else will. Promotion is earned in the rain at 3 a.m., not handed out. The badge is a promise, and the city remembers who keeps it.",
    colorAccent: "#19E5C6",
    recruitingStatus: "selective",
    requirements: "Clean record in-city, a steady head, and the patience to learn the radio.",
  },
  {
    slug: "fire-rescue",
    name: "San Andreas Fire & Rescue",
    shortName: "SAFR",
    type: "ems",
    tagline: "When it all goes wrong, we run toward it.",
    description:
      "Paramedics and firefighters who turn the worst night of someone's life into a survivable one. The city's last good people, on call around the clock.",
    lore: "SAFR doesn't ask who you are or what you did — only where it hurts. They've pulled racers from wrecks on the Del Perro freeway and gang-bangers from their own bad decisions, and treated them all the same.",
    colorAccent: "#FF2D6E",
    recruitingStatus: "open",
    requirements: "A calm voice under pressure and the will to show up for strangers.",
  },
  {
    slug: "city-hall",
    name: "Office of the Mayor",
    shortName: "City Hall",
    type: "government",
    tagline: "Power is a paperwork problem.",
    description:
      "The mayor's office, the council and the civil service that decides where the money goes, which permits clear, and whose vision the city wears next.",
    lore: "Every ribbon-cutting hides a back-room deal. City Hall is where ambition wears a suit — and where a single signature can make a district or break a dynasty.",
    colorAccent: "#FFB627",
    recruitingStatus: "selective",
    requirements: "A talent for politics, a thick skin, and a willingness to be quoted.",
  },
  {
    slug: "liberty-press",
    name: "The Liberty Press",
    shortName: "Press",
    type: "media",
    tagline: "Someone has to write it down.",
    description:
      "The city's newsroom — reporters, photographers and broadcasters chasing the story before it gets buried. They make legends and they end careers.",
    lore: "The Press has put more than one untouchable behind bars and more than one hero on a pedestal. Talk to them carefully. The front page is forever, and the city reads.",
    colorAccent: "#FF9E2C",
    recruitingStatus: "open",
    requirements: "A nose for a story and the nerve to print it.",
  },
  {
    slug: "ember-street",
    name: "The Ember Street Kings",
    shortName: "Ember",
    type: "underworld",
    tagline: "The city burns brightest where the law won't look.",
    description:
      "A crew that runs the blocks the postcards never show — territory, respect, and the long game of staying free while everyone reaches for the same corner.",
    lore: "Ember started as five kids and a borrowed car. Now their name is sprayed on half of South Los Santos. Loyalty is the only currency they take, and the only one they'll spill blood over.",
    colorAccent: "#D84300",
    recruitingStatus: "selective",
    requirements: "Proven in the streets. Vouched for. Loyal, or you don't last.",
  },
  {
    slug: "vinewood-motors",
    name: "Vinewood Motors",
    shortName: "Motors",
    type: "business",
    tagline: "Everything has a price. We just make it shine.",
    description:
      "A flagship dealership, garage and custom shop — the legitimate face of a lot of money, where the city comes to be seen behind the wheel.",
    lore: "Vinewood Motors will sell you a dream with chrome on it and a warranty you'll never read. Behind the showroom glass, deals are done that have nothing to do with cars.",
    colorAccent: "#FF6A00",
    recruitingStatus: "open",
    requirements: "Charm, a head for numbers, and an eye for what people want.",
  },
  {
    slug: "citizens",
    name: "The Citizens of Liberty",
    shortName: "Civilians",
    type: "civilian",
    tagline: "The city is its people.",
    description:
      "Bartenders, cab drivers, mechanics, dreamers and drifters — the thousand ordinary lives that make Liberty a place worth fighting over.",
    lore: "Not everyone wears a badge or carries a piece. Some people just want to open a bar, drive a cab, build something real. The civilians are the heartbeat the rest of the city is fighting to control.",
    colorAccent: "#9B8E7E",
    recruitingStatus: "open",
    requirements: "Show up, be someone, make the city feel lived-in.",
  },
] as const

export function getFaction(slug: string): FactionDefinition | undefined {
  return FACTIONS.find((f) => f.slug === slug)
}
