import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

/** The Liberty mark — a torch flame. */
export function Torch({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true" {...props}>
      <path
        d="M12 2c1.6 2.2 1 4-0.2 5.4C10.4 9 9.2 10.4 9.2 12.4a2.8 2.8 0 0 0 5.6 0c0-1-.4-1.7-.4-1.7.9.5 2 1.7 2 3.6a4.4 4.4 0 1 1-8.8 0c0-2.6 1.7-4.2 3-5.7C13.2 6.6 13.6 4.4 12 2Z"
        fill="currentColor"
      />
      <path d="M10.5 18.5h3l-.6 3h-1.8l-.6-3Z" fill="currentColor" opacity={0.7} />
    </svg>
  )
}

export function Flame({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true" {...props}>
      <path
        d="M12 3c2 2.8 1.2 5-.4 6.8C10 11.6 8.5 13 8.5 15.5a3.5 3.5 0 0 0 7 0c0-1.3-.5-2.2-.5-2.2 2 1 3.5 2.8 3.5 5A6.5 6.5 0 1 1 5.5 18c0-3.4 2.3-5.6 4-7.6C11 8.6 13.5 6 12 3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ArrowRight({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Menu({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Close({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function ChevronDown({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function Check({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  )
}

export function Shield({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M12 3l7 3v5c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z" />
    </svg>
  )
}

export function Users({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.2a3.2 3.2 0 0 1 0 5.6M17 14.4a5.5 5.5 0 0 1 3.5 4.6" />
    </svg>
  )
}

export function MapPin({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      {...stroke}
      {...props}
    >
      <path d="M12 21c4-4.4 6-7.8 6-10.5a6 6 0 1 0-12 0C6 13.2 8 16.6 12 21Z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  )
}

export function Discord({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20 5.3A17 17 0 0 0 15.7 4l-.2.4a13 13 0 0 1 3.7 1.9 16 16 0 0 0-13.4 0A13 13 0 0 1 9.5 4.4L9.3 4A17 17 0 0 0 5 5.3C2.3 9.3 1.6 13.2 2 17a17 17 0 0 0 5.1 2.6l.6-.9c-.6-.2-1.2-.5-1.7-.9l.4-.3a12 12 0 0 0 10.4 0l.4.3c-.5.4-1.1.7-1.7.9l.6.9A17 17 0 0 0 22 17c.4-4.3-.6-8.2-2-11.7ZM8.9 14.6c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm6.2 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"
      />
    </svg>
  )
}

export function Xbox({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9.2" {...stroke} />
      <path
        {...stroke}
        d="M6 19c2-4 4-6.3 6-8 2 1.7 4 4 6 8M7.2 5.4C9 6 10.6 7.3 12 8.7c1.4-1.4 3-2.7 4.8-3.3"
      />
    </svg>
  )
}

export function PlayStation({ width = 24, height = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M9.2 4v14.6l3.1 1V8.3c0-.6.3-1 .8-.8.6.2.8.8.8 1.6v4.3c2 1 3.7-.2 3.7-2.9 0-2.7-1-4-4-5C11.4 4.6 9.9 4.2 9.2 4Zm-3 12.6L4 15.9c-1-.4-1.2-1 .2-1.5 1.2-.4 3-.7 3-.7v1.4l-2 .6c-.4.1-.4.3 0 .4l2 .7v1.4s-1.6-.5-3-1.6Zm12.6.1c1.2-.4 1.3-1 .1-1.5-1.1-.4-2.9-.5-2.9-.5l-3.2 1.1v1.4l3-1.1c.4-.1.5-.1.9 0 .3.1.3.3 0 .4l-3.9 1.4v1.4l6-2Z"
      />
    </svg>
  )
}
