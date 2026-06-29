"use client"

import Lenis from "lenis"
import { useReducedMotion } from "motion/react"
import { type ReactNode, useEffect } from "react"

/**
 * App-wide smooth scrolling. Disabled entirely when the user prefers reduced
 * motion — the page then scrolls natively with no interception.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduce])

  return <>{children}</>
}
