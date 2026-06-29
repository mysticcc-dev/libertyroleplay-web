import { FACTIONS } from "@liberty/shared"
import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...FACTIONS.map((f) => ({
      url: `${site.url}/factions/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
