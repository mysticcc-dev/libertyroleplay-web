import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Only required for `migrate`/`push`/`studio`; `generate` runs without it.
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
})
