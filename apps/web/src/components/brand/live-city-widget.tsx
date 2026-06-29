"use client"

import { useEffect, useState } from "react"
import { formatCount } from "@/lib/utils"

type Live = {
  online: number
  members: number
  queue: number
  status: "online" | "offline"
}

/**
 * The live city bar. Polls a cached endpoint so the surrounding page can stay
 * static while these numbers breathe. Until the bot is live (M6) the endpoint
 * returns representative figures.
 */
export function LiveCityWidget({ className }: { className?: string }) {
  const [data, setData] = useState<Live | null>(null)

  useEffect(() => {
    let active = true
    const load = () =>
      fetch("/api/live")
        .then((r) => r.json())
        .then((d: Live) => {
          if (active) setData(d)
        })
        .catch(() => {})
    load()
    const id = setInterval(load, 30_000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const online = data?.online
  const isLive = data?.status === "online"

  return (
    <div
      // Counts update on a 30s poll; announce them politely to assistive tech.
      role="status"
      aria-live="polite"
      className={`surface-glass inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-full px-5 py-3 ${className ?? ""}`}
    >
      <span className="inline-flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {isLive ? (
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal/70 motion-safe:animate-ping" />
          ) : null}
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isLive ? "bg-teal" : "bg-concrete"}`}
          />
        </span>
        <span className="font-mono text-sm text-bone">
          {online === undefined ? (
            <span className="text-concrete">connecting…</span>
          ) : (
            <>
              <span className="font-semibold text-flare">{formatCount(online)}</span> in the city
              now
            </>
          )}
        </span>
      </span>

      <Divider />
      <Metric label="members" value={data ? formatCount(data.members) : "—"} />
      <Divider />
      <Metric label="on the list" value={data ? formatCount(data.queue) : "—"} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-mono text-sm font-semibold text-bone">{value}</span>
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-concrete">
        {label}
      </span>
    </span>
  )
}

function Divider() {
  return <span aria-hidden className="hidden h-4 w-px bg-line sm:block" />
}
