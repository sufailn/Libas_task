"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type Props = {
  imageSrc: string
  heading?: string
  subheading?: string
  align?: "left" | "right" | "center" | "justify" 
}

/**
 * ScrollZoomSection (luxury)
 * - Full-bleed background image with gentle zoom on scroll
 * - Elegant serif headline overlaid; consistent sizes regardless of Tailwind/Bootstrap
 */
export function ScrollZoomSection({
  imageSrc,
  heading,
  subheading,
  align = "left",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = 1 - Math.min(Math.max((r.top + r.height) / (vh + r.height), 0), 1)
      setP(progress)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scale = 0.8 + p * 0.4 // Adjusted zoom effect for low to high zoom
  const translateY = (1 - p) * 12

  return (
    <section ref={ref} className="scroll-zoom-section">
      <div className="szs-media" style={{ transform: `translateY(${translateY}px) scale(${scale})` }}>
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt=""
          fill
          sizes="10vw"
          className="object-cover"
          priority={false}
        />
        <div className="szs-scrim" aria-hidden="true" />
      </div>


      {(heading || subheading) && (
        <div
          className={`szs-content ${
            align === "center" ? "is-center" : align === "right" ? "is-right" : "is-left"
          }`}
        >
          {heading && <h2 className="lux-hero-title">{heading}</h2>}
          {subheading && <p className="lux-hero-sub">{subheading}</p>}
        </div>
      )}
    </section>
  )
}
