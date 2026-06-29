import { FACTIONS } from "@liberty/shared"
import { getDb } from "./client"
import { factions } from "./schema"

/**
 * Seed the database with the founding factions of Liberty.
 *
 * Idempotent: re-running updates existing factions (matched on slug) rather
 * than duplicating them. Run with `pnpm db:seed` (requires DATABASE_URL).
 */
async function seed() {
  const db = getDb()
  console.log("Seeding factions…")

  for (const f of FACTIONS) {
    await db
      .insert(factions)
      .values({
        name: f.name,
        slug: f.slug,
        type: f.type,
        description: f.description,
        lore: f.lore,
        colorAccent: f.colorAccent,
        recruitingStatus: f.recruitingStatus,
        requirements: f.requirements,
      })
      .onConflictDoUpdate({
        target: factions.slug,
        set: {
          name: f.name,
          type: f.type,
          description: f.description,
          lore: f.lore,
          colorAccent: f.colorAccent,
          recruitingStatus: f.recruitingStatus,
          requirements: f.requirements,
          updatedAt: new Date(),
        },
      })
    console.log(`  ✓ ${f.name}`)
  }

  console.log(`Seeded ${FACTIONS.length} factions.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
