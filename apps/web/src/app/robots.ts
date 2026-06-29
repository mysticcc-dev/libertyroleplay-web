import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Member and staff areas (later milestones) stay out of the index.
      disallow: ["/dashboard", "/staff", "/api/", "/styleguide"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
