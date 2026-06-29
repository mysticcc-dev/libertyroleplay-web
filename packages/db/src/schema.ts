import type { ApplicationInput } from "@liberty/shared"
import {
  APPLICATION_STATUSES,
  CHARACTER_STATUSES,
  EVENT_TYPES,
  FACTION_TYPES,
  MARKER_CATEGORIES,
  MEDIA_TYPES,
  RSVP_STATUSES,
  STRIKE_SEVERITIES,
  SUPPORTER_TIERS,
  USER_ROLES,
} from "@liberty/shared"
import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core"

/* -------------------------------------------------------------------------- */
/* Enums — value tuples come from @liberty/shared (single source of truth).    */
/* -------------------------------------------------------------------------- */

export const userRoleEnum = pgEnum("user_role", USER_ROLES)
export const applicationStatusEnum = pgEnum("application_status", APPLICATION_STATUSES)
export const characterStatusEnum = pgEnum("character_status", CHARACTER_STATUSES)
export const factionTypeEnum = pgEnum("faction_type", FACTION_TYPES)
export const eventTypeEnum = pgEnum("event_type", EVENT_TYPES)
export const strikeSeverityEnum = pgEnum("strike_severity", STRIKE_SEVERITIES)
export const supporterTierEnum = pgEnum("supporter_tier", SUPPORTER_TIERS)
export const markerCategoryEnum = pgEnum("marker_category", MARKER_CATEGORIES)
export const mediaTypeEnum = pgEnum("media_type", MEDIA_TYPES)
export const rsvpStatusEnum = pgEnum("rsvp_status", RSVP_STATUSES)

/* -------------------------------------------------------------------------- */
/* Identity & auth                                                             */
/* -------------------------------------------------------------------------- */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  discordId: text("discord_id").notNull().unique(),
  username: text("username").notNull(),
  // `name` and `image` mirror the Auth.js user shape so the Drizzle adapter
  // can hydrate them directly; `name` is the display name.
  name: text("name"),
  email: text("email"),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  role: userRoleEnum("role").notNull().default("member"),
  supporterTier: supporterTierEnum("supporter_tier").notNull().default("none"),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
  bannedAt: timestamp("banned_at", { withTimezone: true }),
})

// --- Auth.js (NextAuth) Drizzle adapter tables ------------------------------
export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })],
)

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
})

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
)

/* -------------------------------------------------------------------------- */
/* The map — declared early; many tables soft/hard-link to a marker            */
/* -------------------------------------------------------------------------- */

export const mapMarkers = pgTable("map_markers", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: markerCategoryEnum("category").notNull(),
  label: text("label").notNull(),
  x: numeric("x").notNull(),
  y: numeric("y").notNull(),
  icon: text("icon"),
  layer: text("layer").notNull().default("default"),
  // Soft link back to the source record (faction / business / event).
  refTable: text("ref_table"),
  refId: uuid("ref_id"),
})

/* -------------------------------------------------------------------------- */
/* The persistent world                                                        */
/* -------------------------------------------------------------------------- */

export const factions = pgTable("factions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: factionTypeEnum("type").notNull(),
  description: text("description").notNull().default(""),
  lore: text("lore").notNull().default(""),
  colorAccent: text("color_accent").notNull().default("#FF6A00"),
  emblemUrl: text("emblem_url"),
  headerArtUrl: text("header_art_url"),
  recruitingStatus: text("recruiting_status").notNull().default("open"),
  requirements: text("requirements").notNull().default(""),
  territoryMarkerId: uuid("territory_marker_id").references(() => mapMarkers.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const factionMembers = pgTable(
  "faction_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    factionId: uuid("faction_id")
      .notNull()
      .references(() => factions.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rank: text("rank").notNull().default("Member"),
    isLeader: boolean("is_leader").notNull().default(false),
    joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("faction_members_unique").on(t.factionId, t.userId)],
)

export const businesses = pgTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id").references(() => users.id, { onDelete: "set null" }),
  type: text("type").notNull().default("general"),
  description: text("description").notNull().default(""),
  markerId: uuid("marker_id").references(() => mapMarkers.id, { onDelete: "set null" }),
  district: text("district"),
  hours: text("hours"),
  contact: text("contact"),
  logoUrl: text("logo_url"),
  status: text("status").notNull().default("open"),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  type: eventTypeEnum("type").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }),
  timezone: text("timezone").notNull().default("America/Los_Angeles"),
  markerId: uuid("marker_id").references(() => mapMarkers.id, { onDelete: "set null" }),
  hostFactionId: uuid("host_faction_id").references(() => factions.id, { onDelete: "set null" }),
  capacity: integer("capacity"),
  status: text("status").notNull().default("scheduled"),
  recap: text("recap"),
  media: jsonb("media").$type<string[]>(),
  createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
})

export const eventRsvps = pgTable(
  "event_rsvps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    characterId: uuid("character_id").references(() => characters.id, { onDelete: "set null" }),
    status: rsvpStatusEnum("status").notNull().default("going"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("event_rsvps_unique").on(t.eventId, t.userId)],
)

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: applicationStatusEnum("status").notNull().default("draft"),
  // Validated against the shared application schema before write.
  answers: jsonb("answers").$type<Partial<ApplicationInput>>(),
  characterConcept: text("character_concept"),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  reviewedBy: uuid("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewerNotes: text("reviewer_notes"),
  decisionReason: text("decision_reason"),
  discordMessageId: text("discord_message_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  age: integer("age"),
  occupation: text("occupation"),
  factionId: uuid("faction_id").references(() => factions.id, { onDelete: "set null" }),
  backstory: text("backstory"),
  appearance: text("appearance"),
  portraitUrl: text("portrait_url"),
  gallery: jsonb("gallery").$type<string[]>(),
  status: characterStatusEnum("status").notNull().default("pending"),
  approvedBy: uuid("approved_by").references(() => users.id, { onDelete: "set null" }),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const strikes = pgTable("strikes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  severity: strikeSeverityEnum("severity").notNull().default("verbal"),
  issuedBy: uuid("issued_by").references(() => users.id, { onDelete: "set null" }),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  appealStatus: text("appeal_status"),
  notes: text("notes"),
})

export const mediaItems = pgTable("media_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  uploaderId: uuid("uploader_id").references(() => users.id, { onDelete: "set null" }),
  type: mediaTypeEnum("type").notNull().default("screenshot"),
  url: text("url").notNull(),
  caption: text("caption"),
  featured: boolean("featured").notNull().default(false),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const supporters = pgTable("supporters", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  tier: supporterTierEnum("tier").notNull().default("none"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  status: text("status").notNull().default("inactive"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  renewsAt: timestamp("renews_at", { withTimezone: true }),
})

export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: uuid("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

/* -------------------------------------------------------------------------- */
/* Relations (for the typed query API)                                         */
/* -------------------------------------------------------------------------- */

export const usersRelations = relations(users, ({ many, one }) => ({
  characters: many(characters),
  businesses: many(businesses),
  applications: many(applications),
  rsvps: many(eventRsvps),
  strikes: many(strikes),
  factionMemberships: many(factionMembers),
  supporter: one(supporters, { fields: [users.id], references: [supporters.userId] }),
}))

export const factionsRelations = relations(factions, ({ many, one }) => ({
  members: many(factionMembers),
  characters: many(characters),
  events: many(events),
  territoryMarker: one(mapMarkers, {
    fields: [factions.territoryMarkerId],
    references: [mapMarkers.id],
  }),
}))

export const factionMembersRelations = relations(factionMembers, ({ one }) => ({
  faction: one(factions, { fields: [factionMembers.factionId], references: [factions.id] }),
  user: one(users, { fields: [factionMembers.userId], references: [users.id] }),
}))

export const charactersRelations = relations(characters, ({ one }) => ({
  user: one(users, { fields: [characters.userId], references: [users.id] }),
  faction: one(factions, { fields: [characters.factionId], references: [factions.id] }),
}))

export const eventsRelations = relations(events, ({ many, one }) => ({
  rsvps: many(eventRsvps),
  hostFaction: one(factions, { fields: [events.hostFactionId], references: [factions.id] }),
}))

export const eventRsvpsRelations = relations(eventRsvps, ({ one }) => ({
  event: one(events, { fields: [eventRsvps.eventId], references: [events.id] }),
  user: one(users, { fields: [eventRsvps.userId], references: [users.id] }),
  character: one(characters, { fields: [eventRsvps.characterId], references: [characters.id] }),
}))

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, { fields: [applications.userId], references: [users.id] }),
  reviewer: one(users, { fields: [applications.reviewedBy], references: [users.id] }),
}))

/* -------------------------------------------------------------------------- */
/* Inferred row types                                                          */
/* -------------------------------------------------------------------------- */

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Faction = typeof factions.$inferSelect
export type Character = typeof characters.$inferSelect
export type Application = typeof applications.$inferSelect
export type EventRow = typeof events.$inferSelect
export type Business = typeof businesses.$inferSelect
export type MapMarker = typeof mapMarkers.$inferSelect
export type MediaItem = typeof mediaItems.$inferSelect
export type Supporter = typeof supporters.$inferSelect
export type Strike = typeof strikes.$inferSelect
