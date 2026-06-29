import type { InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const fieldBase =
  "w-full rounded-lg border border-line bg-asphalt/60 px-4 py-2.5 text-bone placeholder:text-concrete outline-none transition focus:border-ignition/60 focus:ring-2 focus:ring-flare/30"

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-28 resize-y leading-relaxed", className)}
      {...props}
    />
  )
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: reusable primitive — consumers pass htmlFor + matching input id.
    <label
      className={cn("mb-1.5 block font-head text-sm font-medium text-bone", className)}
      {...props}
    />
  )
}
