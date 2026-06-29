import { Anton, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"

/** Display — the cinematic poster face. */
export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

/** Headings. */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

/** Body. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

/** Mono — data, counters, labels. */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const fontVariables = [
  anton.variable,
  spaceGrotesk.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ")
