import { FACTIONS } from "@liberty/shared"
import type { MetadataRoute } from "next"
import { env } from "@/lib/env"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL
  const now = new Date()
  const staticRoutes = [
    "",
    "/the-city",
    "/how-it-works",
    "/factions",
    "/charter",
    "/faq",
    "/team",
    "/apply",
  ]

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...FACTIONS.map((f) => ({
      url: `${base}/factions/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
