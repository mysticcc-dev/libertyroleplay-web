import type { Metadata } from "next"
import { site } from "@/lib/site"

/**
 * Build per-page metadata: a unique title and description, a canonical URL, and
 * matching Open Graph + Twitter cards.
 *
 * `canonical` and `openGraph.url` are relative paths — Next resolves them
 * against `metadataBase` (set once in the root layout). This guarantees every
 * page advertises its own URL rather than inheriting the homepage's.
 */
export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title: string
  description: string
  path?: string
}): Metadata {
  const ogTitle = `${title} · ${site.name}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      title: ogTitle,
      description,
    },
  }
}
