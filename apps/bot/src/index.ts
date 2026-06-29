import { BRAND } from "@liberty/shared"
import { Client, Events, GatewayIntentBits } from "discord.js"
import { env } from "./env"

/**
 * Liberty Discord bot — scaffold.
 *
 * A small, always-on gateway service (serverless can't hold a gateway socket).
 * M6 builds this out: slash commands, the application-review pipeline (signed
 * web→bot webhook → staff-channel embed with approve/deny/hold → row update →
 * audit log → role assignment → callback to the web app), scheduled role sync,
 * and event reminders. For now it connects with only the intents it needs.
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
})

client.once(Events.ClientReady, (ready) => {
  console.log(`${BRAND.name} bot online as ${ready.user.tag}`)
})

async function main() {
  await client.login(env.DISCORD_BOT_TOKEN)
}

main().catch((err) => {
  console.error("Bot failed to start:", err)
  process.exit(1)
})
