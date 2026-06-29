import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

/**
 * Lazy database client.
 *
 * The connection is created on first use, never at import time — so importing
 * `@liberty/db` (for its schema and types) during a static build never requires
 * `DATABASE_URL` and never opens a socket. Call `getDb()` only inside code that
 * actually queries (server actions, route handlers, the bot, the seed).
 */
let cached: PostgresDatabase | undefined

export type PostgresDatabase = ReturnType<typeof createClient>

function createClient(url: string) {
  // `prepare: false` keeps us compatible with transaction-pooled connections
  // (e.g. Neon/Supabase poolers).
  const sql = postgres(url, { prepare: false, max: 10 })
  return drizzle(sql, { schema })
}

export function getDb(): PostgresDatabase {
  if (cached) return cached
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to your environment before querying the database.",
    )
  }
  cached = createClient(url)
  return cached
}
