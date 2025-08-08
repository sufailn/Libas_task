"use client"

import Image from "next/image"
import { useRef } from "react"

/**
 * HoverZoomImage
 * - Elegant zoom-on-hover with cursor-based pan via transform-origin
 * - Works well for product detail hero image
 */
export function HoverZoomImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string
  alt: string
  sizes?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty("--x", `${x}%`)
    el.style.setProperty("--y", `${y}%`)
  }

  return (
    <div
      ref={ref}
      className="hover-zoom-img"
      onMouseMove={onMove}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.style.removeProperty("--x")
        el.style.removeProperty("--y")
      }}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  )
}
