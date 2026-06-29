"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "motion/react"
import { type ReactNode, useEffect, useRef } from "react"

/**
 * GSAP + ScrollTrigger scaffold. Translates its children on scroll for a
 * layered, cinematic parallax. Inert under reduced motion.
 *
 * `speed` is the fraction of the element's travel relative to scroll: positive
 * drifts down (slower, for background layers), negative drifts up (foreground).
 */
export function Parallax({
  children,
  className,
  speed = 0.2,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (reduce || !el) return

    gsap.registerPlugin(ScrollTrigger)
    const anim = gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [reduce, speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
