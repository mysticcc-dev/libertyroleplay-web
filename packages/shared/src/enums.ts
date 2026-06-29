/**
 * Canonical enum value tuples — the single source of truth for both the
 * database (`@liberty/db` feeds these straight into `pgEnum`) and the app
 * (`z.enum(...)` and TS unions). Define a value once here; never re-list it.
 */

export const USER_ROLES = ["member", "faction_leader", "staff", "admin"] as const
export type UserRole = (typeof USER_ROLES)[number]

export const APPLICATION_STATUSES = [
  "draft",
  "submitted",
  "under_review",
  "accepted",
  "denied",
  "on_hold",
] as const
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]

export const CHARACTER_STATUSES = ["pending", "approved", "retired", "deceased"] as const
export type CharacterStatus = (typeof CHARACTER_STATUSES)[number]

export const FACTION_TYPES = [
  "law_enforcement",
  "ems",
  "government",
  "media",
  "underworld",
  "business",
  "civilian",
] as const
export type FactionType = (typeof FACTION_TYPES)[number]

export const EVENT_TYPES = [
  "heist",
  "race",
  "council",
  "court",
  "club_night",
  "gang",
  "community",
  "showcase",
] as const
export type EventType = (typeof EVENT_TYPES)[number]

export const STRIKE_SEVERITIES = ["verbal", "minor", "major", "ban"] as const
export type StrikeSeverity = (typeof STRIKE_SEVERITIES)[number]

export const SUPPORTER_TIERS = ["none", "citizen", "patron", "founder"] as const
export type SupporterTier = (typeof SUPPORTER_TIERS)[number]

export const MARKER_CATEGORIES = ["faction", "business", "event", "poi"] as const
export type MarkerCategory = (typeof MARKER_CATEGORIES)[number]

export const MEDIA_TYPES = ["screenshot", "clip"] as const
export type MediaType = (typeof MEDIA_TYPES)[number]

export const RSVP_STATUSES = ["going", "interested", "declined"] as const
export type RsvpStatus = (typeof RSVP_STATUSES)[number]

/** Human-readable labels for the faction-type taxonomy. */
export const FACTION_TYPE_LABELS: Record<FactionType, string> = {
  law_enforcement: "Law Enforcement",
  ems: "Emergency Services",
  government: "Government",
  media: "Media",
  underworld: "Underworld",
  business: "Business",
  civilian: "Civilian",
}
