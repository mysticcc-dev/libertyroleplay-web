import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Render on demand (and cache) rather than at build time: next/og fetches its
// default font over the network, and the build must never depend on outbound
// network. Crawlers get a freshly generated, edge-cached card on first request.
export const dynamic = "force-dynamic"

/** Branded default share card, rendered at the edge. Per-route files override. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background:
          "radial-gradient(900px 500px at 50% 120%, #D84300 0%, transparent 60%), radial-gradient(700px 400px at 90% -10%, #FF6A00 0%, transparent 55%), #0B0907",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ fontSize: 40 }}>🔥</div>
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            color: "#F4EDE3",
            fontWeight: 800,
          }}
        >
          LIBERTY ROLEPLAY
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1,
            fontWeight: 800,
            color: "#F4EDE3",
            maxWidth: 900,
          }}
        >
          A city that remembers you.
        </div>
        <div style={{ fontSize: 30, color: "#FFB627", fontWeight: 600 }}>
          Console-true GTA-V roleplay.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#9B8E7E",
        }}
      >
        <span>Xbox · PlayStation</span>
        <span style={{ color: "#FF9E2C" }}>Apply now →</span>
      </div>
    </div>,
    { ...size },
  )
}
