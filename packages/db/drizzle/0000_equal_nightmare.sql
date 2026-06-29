CREATE TYPE "public"."application_status" AS ENUM('draft', 'submitted', 'under_review', 'accepted', 'denied', 'on_hold');--> statement-breakpoint
CREATE TYPE "public"."character_status" AS ENUM('pending', 'approved', 'retired', 'deceased');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('heist', 'race', 'council', 'court', 'club_night', 'gang', 'community', 'showcase');--> statement-breakpoint
CREATE TYPE "public"."faction_type" AS ENUM('law_enforcement', 'ems', 'government', 'media', 'underworld', 'business', 'civilian');--> statement-breakpoint
CREATE TYPE "public"."marker_category" AS ENUM('faction', 'business', 'event', 'poi');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('screenshot', 'clip');--> statement-breakpoint
CREATE TYPE "public"."rsvp_status" AS ENUM('going', 'interested', 'declined');--> statement-breakpoint
CREATE TYPE "public"."strike_severity" AS ENUM('verbal', 'minor', 'major', 'ban');--> statement-breakpoint
CREATE TYPE "public"."supporter_tier" AS ENUM('none', 'citizen', 'patron', 'founder');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('member', 'faction_leader', 'staff', 'admin');--> statement-breakpoint
CREATE TABLE "accounts" (
	"user_id" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "application_status" DEFAULT 'draft' NOT NULL,
	"answers" jsonb,
	"character_concept" text,
	"submitted_at" timestamp with time zone,
	"reviewed_at" timestamp with time zone,
	"reviewed_by" uuid,
	"reviewer_notes" text,
	"decision_reason" text,
	"discord_message_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"entity" text NOT NULL,
	"entity_id" uuid,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"owner_id" uuid,
	"type" text DEFAULT 'general' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"marker_id" uuid,
	"district" text,
	"hours" text,
	"contact" text,
	"logo_url" text,
	"status" text DEFAULT 'open' NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"age" integer,
	"occupation" text,
	"faction_id" uuid,
	"backstory" text,
	"appearance" text,
	"portrait_url" text,
	"gallery" jsonb,
	"status" character_status DEFAULT 'pending' NOT NULL,
	"approved_by" uuid,
	"is_public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_rsvps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"character_id" uuid,
	"status" "rsvp_status" DEFAULT 'going' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_rsvps_unique" UNIQUE("event_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"type" "event_type" NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone,
	"timezone" text DEFAULT 'America/Los_Angeles' NOT NULL,
	"marker_id" uuid,
	"host_faction_id" uuid,
	"capacity" integer,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"recap" text,
	"media" jsonb,
	"created_by" uuid,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "faction_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"faction_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"rank" text DEFAULT 'Member' NOT NULL,
	"is_leader" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "faction_members_unique" UNIQUE("faction_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "factions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"type" "faction_type" NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"lore" text DEFAULT '' NOT NULL,
	"color_accent" text DEFAULT '#FF6A00' NOT NULL,
	"emblem_url" text,
	"header_art_url" text,
	"recruiting_status" text DEFAULT 'open' NOT NULL,
	"requirements" text DEFAULT '' NOT NULL,
	"territory_marker_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "factions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "map_markers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" "marker_category" NOT NULL,
	"label" text NOT NULL,
	"x" numeric NOT NULL,
	"y" numeric NOT NULL,
	"icon" text,
	"layer" text DEFAULT 'default' NOT NULL,
	"ref_table" text,
	"ref_id" uuid
);
--> statement-breakpoint
CREATE TABLE "media_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"uploader_id" uuid,
	"type" "media_type" DEFAULT 'screenshot' NOT NULL,
	"url" text NOT NULL,
	"caption" text,
	"featured" boolean DEFAULT false NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "strikes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"reason" text NOT NULL,
	"severity" "strike_severity" DEFAULT 'verbal' NOT NULL,
	"issued_by" uuid,
	"issued_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"appeal_status" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "supporters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tier" "supporter_tier" DEFAULT 'none' NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"status" text DEFAULT 'inactive' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"renews_at" timestamp with time zone,
	CONSTRAINT "supporters_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"discord_id" text NOT NULL,
	"username" text NOT NULL,
	"name" text,
	"email" text,
	"email_verified" timestamp with time zone,
	"image" text,
	"role" "user_role" DEFAULT 'member' NOT NULL,
	"supporter_tier" "supporter_tier" DEFAULT 'none' NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone,
	"banned_at" timestamp with time zone,
	CONSTRAINT "users_discord_id_unique" UNIQUE("discord_id")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_marker_id_map_markers_id_fk" FOREIGN KEY ("marker_id") REFERENCES "public"."map_markers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_faction_id_factions_id_fk" FOREIGN KEY ("faction_id") REFERENCES "public"."factions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_marker_id_map_markers_id_fk" FOREIGN KEY ("marker_id") REFERENCES "public"."map_markers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_host_faction_id_factions_id_fk" FOREIGN KEY ("host_faction_id") REFERENCES "public"."factions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faction_members" ADD CONSTRAINT "faction_members_faction_id_factions_id_fk" FOREIGN KEY ("faction_id") REFERENCES "public"."factions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faction_members" ADD CONSTRAINT "faction_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "factions" ADD CONSTRAINT "factions_territory_marker_id_map_markers_id_fk" FOREIGN KEY ("territory_marker_id") REFERENCES "public"."map_markers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_items" ADD CONSTRAINT "media_items_uploader_id_users_id_fk" FOREIGN KEY ("uploader_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "strikes" ADD CONSTRAINT "strikes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "strikes" ADD CONSTRAINT "strikes_issued_by_users_id_fk" FOREIGN KEY ("issued_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supporters" ADD CONSTRAINT "supporters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;