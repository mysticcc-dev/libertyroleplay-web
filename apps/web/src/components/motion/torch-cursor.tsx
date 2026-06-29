"use client"

import { useEffect, useState } from "react"

/**
 * A soft warm light that follows the pointer — the city's torch, tracking you.
 *
 * Deliberately *not* a cursor replacement: the native cursor stays visible, so
 * usability is untouched. Only renders for fine pointers (mouse) and never for
 * reduced-motion users.
 */
export function TorchCursor() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }))
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!pos) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[40] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen md:block"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-ignition) 22%, transparent), transparent 62%)",
      }}
    />
  )
}
