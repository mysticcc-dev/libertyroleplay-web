import { z } from "zod"

/**
 * Bot environment, validated at startup. A missing required value fails fast
 * and loudly rather than at runtime mid-flow.
 */
const schema = z.object({
  DISCORD_BOT_TOKEN: z.string().min(1, "DISCORD_BOT_TOKEN is required"),
  DISCORD_GUILD_ID: z.string().min(1, "DISCORD_GUILD_ID is required"),
  DISCORD_STAFF_CHANNEL_ID: z.string().optional(),
  DISCORD_VERIFIED_ROLE_ID: z.string().optional(),
  BOT_WEBHOOK_SECRET: z.string().optional(),
  WEB_WEBHOOK_URL: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
})

export const env = schema.parse(process.env)
export type BotEnv = z.infer<typeof schema>
