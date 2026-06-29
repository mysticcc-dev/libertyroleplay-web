type Building = [x: number, w: number, h: number]

// Two parallax layers of a stylised Los Santos skyline.
const BACK: Building[] = [
  [40, 70, 120],
  [120, 54, 170],
  [185, 90, 110],
  [285, 60, 210],
  [355, 80, 150],
  [445, 50, 250],
  [505, 110, 130],
  [625, 64, 200],
  [700, 86, 160],
  [795, 56, 230],
  [860, 100, 140],
  [970, 60, 190],
  [1040, 90, 120],
  [1140, 56, 220],
  [1205, 80, 150],
  [1295, 64, 200],
  [1370, 80, 130],
]

const FRONT: Building[] = [
  [0, 110, 180],
  [120, 70, 280],
  [200, 96, 220],
  [305, 60, 330],
  [375, 120, 240],
  [505, 80, 300],
  [595, 64, 360],
  [670, 110, 250],
  [790, 90, 320],
  [890, 70, 220],
  [970, 120, 300],
  [1100, 80, 360],
  [1190, 100, 240],
  [1300, 80, 320],
  [1390, 90, 220],
]

function windows(b: Building, baseline: number, seed: number) {
  const [x, w, h] = b
  const cols = Math.max(1, Math.floor(w / 22))
  const rows = Math.max(1, Math.floor(h / 30))
  const lights: { x: number; y: number; on: boolean }[] = []
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      // Deterministic "lit window" pattern (no Math.random — stable SSR).
      const on = (c * 7 + r * 13 + seed * 5) % 5 === 0
      lights.push({
        x: x + 8 + c * ((w - 12) / cols),
        y: baseline - h + 10 + r * ((h - 16) / rows),
        on,
      })
    }
  }
  return lights
}

export function Skyline({
  layer = "front",
  className,
}: {
  layer?: "back" | "front"
  className?: string
}) {
  const data = layer === "front" ? FRONT : BACK
  const fill = layer === "front" ? "#0a0805" : "#140e09"
  const baseline = 360

  return (
    <svg
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <g fill={fill}>
        {data.map((b) => (
          <rect key={`${layer}-${b[0]}`} x={b[0]} y={baseline - b[2]} width={b[1]} height={b[2]} />
        ))}
      </g>
      <g>
        {data.flatMap((b, i) =>
          windows(b, baseline, i + (layer === "front" ? 1 : 3))
            .filter((l) => l.on)
            .map((l) => (
              <rect
                key={`${layer}-${l.x}-${l.y}`}
                x={l.x}
                y={l.y}
                width={3}
                height={4}
                fill={layer === "front" ? "#FF9E2C" : "#FFB627"}
                opacity={layer === "front" ? 0.5 : 0.32}
              />
            )),
        )}
      </g>
    </svg>
  )
}
