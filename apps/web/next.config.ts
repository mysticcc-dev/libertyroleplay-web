import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Transpile workspace TypeScript packages (they ship source, not a build).
  transpilePackages: ["@liberty/shared"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
}

export default nextConfig
