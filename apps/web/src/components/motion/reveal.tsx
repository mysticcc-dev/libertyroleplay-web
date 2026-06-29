"use client"

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Vertical travel distance in px. */
  y?: number
  delay?: number
} & Omit<HTMLMotionProps<"div">, "children">

/**
 * Reveal-on-scroll. Animates once when scrolled into view; reduced-motion users
 * get an instant, motionless appearance.
 *
 * Hydration-safety is the key constraint: `useReducedMotion()` returns `null`
 * on the server and the real value on the first client render, so we must never
 * branch the *rendered output* (element type or `initial` style) on it — that
 * would mismatch on every section. Instead the element and `initial` are always
 * identical across SSR and hydration, and `reduce` only changes the
 * `transition` (a JS animation config that is never serialised into the HTML).
 * For reduced motion the transition is instant, so the element snaps to its
 * resting state with no movement and no hydration mismatch.
 */
export function Reveal({ children, className, y = 24, delay = 0, ...rest }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
