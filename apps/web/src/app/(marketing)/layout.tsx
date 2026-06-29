import type { ReactNode } from "react"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteNav } from "@/components/layout/site-nav"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
