"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Close, Menu, Torch } from "@/components/ui/icons"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on navigation.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intended trigger, not a read dependency.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "surface-glass border-b border-line" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[var(--header-h)] w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-display text-xl tracking-wide text-bone"
        >
          <Torch
            width={26}
            height={26}
            className="text-ignition transition-transform group-hover:scale-110 motion-safe:animate-flicker"
          />
          <span>
            LIBERTY<span className="text-flare">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-head text-sm font-medium transition-colors hover:text-flare",
                    active ? "text-flare" : "text-concrete",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/apply"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Apply
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone lg:hidden"
          >
            {open ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 font-head text-base text-bone hover:bg-gunmetal hover:text-flare"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link href="/apply" className={cn(buttonVariants({ size: "md" }), "w-full")}>
                Apply to Liberty
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
