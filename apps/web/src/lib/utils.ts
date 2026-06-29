import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge class lists, resolving Tailwind conflicts (last wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Format a number with thin-space grouping, e.g. 1240 -> "1,240". */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n)
}
