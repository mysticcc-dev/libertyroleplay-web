import type { Metadata, Viewport } from "next"
import { GrainOverlay } from "@/components/brand/grain-overlay"
import { LenisProvider } from "@/components/motion/lenis-provider"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { TorchCursor } from "@/components/motion/torch-cursor"
import { env } from "@/lib/env"
import { fontVariables } from "@/lib/fonts"
import { site } from "@/lib/site"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "GTA roleplay",
    "console roleplay",
    "Xbox roleplay",
    "PlayStation roleplay",
    "GTA RP community",
    site.name,
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0B0907",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ignition focus:px-4 focus:py-2 focus:font-head focus:text-sm focus:text-asphalt"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <GrainOverlay />
        <TorchCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
