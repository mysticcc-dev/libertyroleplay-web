import { NextResponse } from "next/server"

// Cache for a few seconds so the polled widget is cheap but still lively.
export const revalidate = 10

/**
 * The live city numbers. Until the Discord bot reports real presence (M6),
 * this returns representative, gently-moving figures so the home widget feels
 * alive. The shape matches what the bot will eventually publish.
 */
export function GET() {
  const minute = Math.floor(Date.now() / 60_000)
  const wobble = (minute % 19) - 9 // -9 … +9
  const online = Math.max(40, 138 + wobble)

  return NextResponse.json({
    online,
    members: 4820,
    queue: 31 + (minute % 7),
    status: "online" as const,
  })
}
