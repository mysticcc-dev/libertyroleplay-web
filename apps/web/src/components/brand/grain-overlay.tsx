/**
 * Fixed cinematic overlay: a vignette plus a faint film grain. Purely
 * decorative, never intercepts pointer events. The grain is static (the global
 * reduced-motion rule already neutralises any animation elsewhere).
 */
export function GrainOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[30]">
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 55%, color-mix(in oklab, var(--color-asphalt) 85%, black) 100%)",
        }}
      />
      {/* grain */}
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
