import { z } from "zod"

/**
 * The application wizard — defined once, here.
 *
 * This schema is the single source of truth for the membership application.
 * The web app imports it to type the form and validate input on the server;
 * the Discord bot imports it to render the staff review embed. Because both
 * sides share this file, they can never disagree about what an application
 * contains.
 */

export const PLATFORMS = ["xbox", "playstation", "both"] as const
export type Platform = (typeof PLATFORMS)[number]

export const EXPERIENCE_LEVELS = ["new", "some", "experienced"] as const
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]

export const PLATFORM_LABELS: Record<Platform, string> = {
  xbox: "Xbox",
  playstation: "PlayStation",
  both: "Both",
}

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  new: "New to roleplay",
  some: "Some experience",
  experienced: "Experienced",
}

// --- Step 1: identity & platform --------------------------------------------
export const identityStep = z.object({
  platform: z.enum(PLATFORMS),
  /** Confirms the applicant meets the community age policy. */
  isAdult: z.literal(true),
  timezone: z.string().min(2, "Add your timezone").max(64),
})

// --- Step 2: experience ------------------------------------------------------
export const experienceStep = z.object({
  experience: z.enum(EXPERIENCE_LEVELS),
  priorCommunities: z.string().max(2000).optional(),
  motivation: z.string().min(40, "Tell us a little more about what draws you to Liberty").max(2000),
})

// --- Step 3: character concept ----------------------------------------------
export const characterStep = z.object({
  characterName: z.string().min(2, "Your character needs a name").max(80),
  characterAge: z.number().int().min(18).max(99),
  occupation: z.string().min(2).max(120),
  backstory: z.string().min(80, "Give your character some history").max(4000),
})

// --- Step 4: scenario questions (reveal RP instinct) ------------------------
export const scenarioStep = z.object({
  scenarioRobbery: z.string().min(40, "Walk us through how your character would react").max(2000),
  scenarioConflict: z.string().min(40, "Walk us through how your character would react").max(2000),
})

// --- Step 5: rules acknowledgment -------------------------------------------
export const rulesStep = z.object({
  agreeRules: z.literal(true),
  agreeConduct: z.literal(true),
  agreeNonToxic: z.literal(true),
})

/** The complete, validated application payload. */
export const applicationSchema = identityStep
  .merge(experienceStep)
  .merge(characterStep)
  .merge(scenarioStep)
  .merge(rulesStep)

export type ApplicationInput = z.infer<typeof applicationSchema>

/**
 * Wizard step metadata — drives the multi-step UI (M5) and lets the server
 * validate one step at a time. Order here is the order shown to the applicant.
 */
export const APPLICATION_STEPS = [
  {
    id: "identity",
    title: "Identity & Platform",
    blurb: "The basics — how you play and where in the world you are.",
    schema: identityStep,
  },
  {
    id: "experience",
    title: "Experience",
    blurb: "Your history with roleplay, and what brings you to Liberty.",
    schema: experienceStep,
  },
  {
    id: "character",
    title: "Your Character",
    blurb: "Who are you going to become in the city?",
    schema: characterStep,
  },
  {
    id: "scenarios",
    title: "In the Moment",
    blurb: "Two situations. Show us how your character thinks.",
    schema: scenarioStep,
  },
  {
    id: "rules",
    title: "The Charter",
    blurb: "Read it, mean it, sign it.",
    schema: rulesStep,
  },
] as const

export type ApplicationStepId = (typeof APPLICATION_STEPS)[number]["id"]

/**
 * Flatten a validated application into ordered label/value pairs — used by the
 * bot to render the review embed and by the dashboard to show a read-back.
 */
export function summarizeApplication(
  input: ApplicationInput,
): ReadonlyArray<{ label: string; value: string }> {
  return [
    { label: "Platform", value: PLATFORM_LABELS[input.platform] },
    { label: "Timezone", value: input.timezone },
    { label: "Experience", value: EXPERIENCE_LABELS[input.experience] },
    { label: "Prior communities", value: input.priorCommunities?.trim() || "—" },
    { label: "Motivation", value: input.motivation },
    { label: "Character", value: `${input.characterName}, ${input.characterAge}` },
    { label: "Occupation", value: input.occupation },
    { label: "Backstory", value: input.backstory },
    { label: "Scenario — robbery", value: input.scenarioRobbery },
    { label: "Scenario — conflict", value: input.scenarioConflict },
  ]
}
