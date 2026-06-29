/**
 * Editorial content for the public marketing site.
 *
 * This lives in code for the launch wave; M10 moves the charter, lore and
 * editorial copy into the CMS so staff can edit without a deploy. Until then,
 * this is the single place to tune the words.
 */

export type HowItWorksStep = {
  n: string
  title: string
  body: string
}

export const HOW_IT_WORKS: readonly HowItWorksStep[] = [
  {
    n: "01",
    title: "Apply",
    body: "Tell us who you are and who you want to become. Our application is a short, guided story — not a form. It takes about ten minutes and it's the first scene of your character.",
  },
  {
    n: "02",
    title: "Get the call",
    body: "Staff read every application by hand. When you're accepted, the city opens: your member dashboard, your role in Discord, and your name on the waiting list turns into a key.",
  },
  {
    n: "03",
    title: "Step into the city",
    body: "Build your character, pick a side or stay independent, and start living. Factions, businesses, events — the world is already in motion. You just have to walk in.",
  },
  {
    n: "04",
    title: "Leave a mark",
    body: "Win a council seat. Open a bar. Run the docks. The city keeps records, and the records remember you. What you do here lasts.",
  },
]

export type FaqItem = {
  q: string
  a: string
  group: "Joining" | "Playing" | "Rules & Safety"
}

export const FAQ: readonly FaqItem[] = [
  {
    group: "Joining",
    q: "What do I need to play?",
    a: "A console — Xbox or PlayStation — a copy of GTA V, a microphone, and a Discord account. That's it. Liberty is built console-first; you don't need a gaming PC or mods.",
  },
  {
    group: "Joining",
    q: "Is there an age requirement?",
    a: "Yes. Liberty is an 18+ community. Our application confirms it, and our conduct expectations and safety posture are written with that in mind. If that changes, we'll state the policy plainly here.",
  },
  {
    group: "Joining",
    q: "How long does the application take to review?",
    a: "Staff review applications by hand, usually within a few days. You'll see your status update live on your dashboard, and you'll get the news in Discord the moment a decision is made.",
  },
  {
    group: "Playing",
    q: "Do I have to join a faction?",
    a: "No. Plenty of the best stories belong to civilians — bartenders, cab drivers, journalists, dreamers. Factions are a way in, not a requirement. The city needs ordinary lives to feel real.",
  },
  {
    group: "Playing",
    q: "Can I run a business?",
    a: "Absolutely. Open a shop, a garage, a club. Register it in the city directory, put it on the map, and build something the rest of Liberty comes to. Owning a corner of the city is half the point.",
  },
  {
    group: "Rules & Safety",
    q: "What keeps roleplay from descending into chaos?",
    a: "The Charter, and people who mean it. Clear rules, staff who enforce them fairly, and a strike system that's transparent. We protect the fiction and the people behind it in equal measure.",
  },
  {
    group: "Rules & Safety",
    q: "Is supporting the server pay-to-win?",
    a: "Never. Supporter perks are cosmetic and recognition-based only — a badge, a colour, priority signup. They never confer an advantage in roleplay. Support pays for hosting and development, full stop.",
  },
]

export type TeamMember = {
  name: string
  role: string
  bio: string
  accent: string
}

export const TEAM: readonly TeamMember[] = [
  {
    name: "The Mayor",
    role: "Founder · Direction",
    bio: "Started Liberty with a single rule: the city has to feel like it was here before you arrived, and will be here after you leave.",
    accent: "#FFB627",
  },
  {
    name: "Dispatch",
    role: "Head of Staff",
    bio: "Reads the applications, settles the disputes, keeps the lights on. The calm voice on the other end of every problem.",
    accent: "#19E5C6",
  },
  {
    name: "The Editor",
    role: "Story & Events",
    bio: "Designs the heists, the council nights, the slow-burn arcs. Believes the best events are the ones nobody planned to be in.",
    accent: "#FF9E2C",
  },
  {
    name: "The Engineer",
    role: "Tech & Tools",
    bio: "Builds the bot, the map, the dashboard — the machinery that makes a console community feel like a living world.",
    accent: "#FF2D6E",
  },
]

export type District = {
  name: string
  kind: string
  blurb: string
}

export const DISTRICTS: readonly District[] = [
  {
    name: "Vinewood",
    kind: "The heights",
    blurb:
      "Where the cameras are and the deals are bigger than the budgets. Fame is currency and everyone's spending.",
  },
  {
    name: "The Docks",
    kind: "The edge",
    blurb:
      "Containers, cranes and the things that move through them after dark. The city's appetite has to come from somewhere.",
  },
  {
    name: "Mission Row",
    kind: "The law",
    blurb:
      "Booking, holding, paperwork and the long night shift. The place the rest of the city ends up, one way or another.",
  },
  {
    name: "South Central",
    kind: "The streets",
    blurb:
      "Blocks with names, corners with history, loyalty you can't buy. The heart that keeps beating no matter who's in charge.",
  },
  {
    name: "The Strip",
    kind: "The night",
    blurb:
      "Neon, engines and bad decisions made beautifully. When the sun goes down, this is where Liberty comes alive.",
  },
  {
    name: "City Hall",
    kind: "The power",
    blurb:
      "Marble, microphones and the quiet rooms behind them. Every law starts as someone's ambition here.",
  },
]

export type HomeSection = {
  kicker: string
  title: string
  body: string
  accent: string
}

export const HOME_SECTIONS: readonly HomeSection[] = [
  {
    kicker: "A persistent world",
    title: "The city keeps going when you log off.",
    body: "Liberty isn't a lobby you drop into. It's a continuous world with a memory — factions hold territory, businesses open and close, the council changes hands. Your character has a past here, and a future being written whether you're online or not.",
    accent: "#FF6A00",
  },
  {
    kicker: "Console-true",
    title: "No PC, no mods, no barrier.",
    body: "Built for Xbox and PlayStation from the first line of design. A microphone and a story are the only requirements. Everything cinematic about Liberty runs on the console in your living room.",
    accent: "#19E5C6",
  },
  {
    kicker: "Stories with stakes",
    title: "Choices that the city remembers.",
    body: "Win an election, lose a war, open the bar everyone ends up at. Liberty keeps records — of characters, of factions, of the night it all went sideways — and those records are the history you're writing together.",
    accent: "#FFB627",
  },
]

export type CharterSection = {
  n: string
  title: string
  body: string
}

export const CHARTER: readonly CharterSection[] = [
  {
    n: "I",
    title: "Stay in character",
    body: "The city is real while you're in it. Break the fiction only when safety requires it. Out-of-character problems are solved out of character — never inside the story.",
  },
  {
    n: "II",
    title: "Value every life",
    body: "Your character fears death, pain and loss the way a real person would. Don't throw a life away for nothing; the stakes are what make the story matter.",
  },
  {
    n: "III",
    title: "No metagaming, no powergaming",
    body: "Don't use what you know out of character inside the story, and don't force outcomes others can't respond to. Give every scene room to breathe and a way to go wrong.",
  },
  {
    n: "IV",
    title: "Respect the people",
    body: "Behind every character is a person. Harassment, hate and cruelty have no place here, in character or out. The fiction is a shared space and everyone keeps it safe.",
  },
  {
    n: "V",
    title: "Earn it",
    body: "Rank, respect and territory are won in the story, not handed out. Nothing real here is bought. The city remembers what you built — make it worth remembering.",
  },
]
