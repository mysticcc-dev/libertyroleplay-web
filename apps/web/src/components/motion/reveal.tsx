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
 * Reveal-on-scroll. Animates once when scrolled into view; renders instantly
 * and statically for reduced-motion users.
 */
export function Reveal({ children, className, y = 24, delay = 0, ...rest }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
