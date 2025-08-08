"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, CornerDownLeft } from 'lucide-react'
import type { Product } from "@/lib/data/mock-products"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

type Suggestion = {
  type: "Product" | "Category" | "Department" | "Audience"
  label: string
  href: string
}

type Props = {
  products?: Product[]
  backgrounds?: string[]
  initialQuery?: string
}

export function HeroCarousel({
  products = [],
  backgrounds = ["/images/hero-bg-1.png", "/images/hero-bg-2.png", "/images/hero-bg-3.png"],
  initialQuery = "",
}: Props) {
  const router = useRouter()
  const [q, setQ] = useState(initialQuery)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const unique = <T,>(arr: T[]) => Array.from(new Set(arr))

  const baseSuggestions: Suggestion[] = useMemo(() => {
    const productS: Suggestion[] = products.map((p) => ({
      type: "Product",
      label: p.name,
      href: `/products/${p.slug}`,
    }))
    const categories = unique(products.map((p) => p.category)).map((c) => ({
      type: "Category" as const,
      label: c,
      href: `/products?category=${encodeURIComponent(c)}`,
    }))
    const depts = unique(products.map((p) => p.dept)).map((d) => ({
      type: "Department" as const,
      label: d,
      href: `/products?dept=${encodeURIComponent(d)}`,
    }))
    const audiences = unique(products.map((p) => p.audience)).map((a) => ({
      type: "Audience" as const,
      label: a,
      href: `/products?audience=${encodeURIComponent(a)}`,
    }))
    return [...productS, ...categories, ...depts, ...audiences]
  }, [products])

  const suggestions = useMemo(() => {
    const text = q.trim().toLowerCase()
    if (!text) return baseSuggestions.slice(0, 8)

    const scored = baseSuggestions
      .map((s) => {
        const label = s.label.toLowerCase()
        const starts = label.startsWith(text)
        const includes = label.includes(text)
        const score = starts ? 0 : includes ? 1 : 99
        return { s, score }
      })
      .filter((x) => x.score < 99)
      .sort((a, b) => a.score - b.score || a.s.label.localeCompare(b.s.label))
      .slice(0, 8)
      .map((x) => x.s)

    return scored
  }, [q, baseSuggestions])

  useEffect(() => {
    setActiveIndex(0)
  }, [q])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const current = suggestions[activeIndex]
    if (open && current) {
      router.push(current.href)
    } else {
      const qq = q.trim()
      router.push(qq ? `/products?q=${encodeURIComponent(qq)}` : `/products`)
    }
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
      listRef.current?.children?.[Math.min(activeIndex + 1, suggestions.length - 1)]?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      listRef.current?.children?.[Math.max(activeIndex - 1, 0)]?.scrollIntoView({ block: "nearest" })
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      // close suggestions if click outside
      if (!e.target) return
      const target = e.target as HTMLElement
      const root = inputRef.current?.closest(".hero-search-root")
      if (root && !root.contains(target)) setOpen(false)
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  return (
    <section className="hero-swiper position-relative">
      {/* Background carousel */}
      <Swiper
        className="hero-swiper-inner"
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
      >
        {backgrounds.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="hero-slide">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Libas hero background ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="hero-overlay" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Top search bar overlay */}
      <div className="hero-search-root">
        <form className="hero-search" role="search" aria-label="Search products" onSubmit={onSubmit}>
          <Search size={18} className="text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            className="hero-search-input"
            placeholder="Search Libas fashion & beauty…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="hero-suggestions"
            aria-activedescendant={open && suggestions[activeIndex] ? `sugg-${activeIndex}` : undefined}
            autoComplete="off"
            enterKeyHint="search"
          />
          <button className="hero-search-submit" aria-label="Search" type="submit">
            <CornerDownLeft size={16} />
          </button>
        </form>

        {open && suggestions.length > 0 && (
          <ul id="hero-suggestions" role="listbox" ref={listRef} className="hero-suggest-list">
            {suggestions.map((s, idx) => (
              <li
                key={`${s.type}-${s.label}`}
                id={`sugg-${idx}`}
                role="option"
                aria-selected={idx === activeIndex}
                className={`hero-suggest-item ${idx === activeIndex ? "is-active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  router.push(s.href)
                  setOpen(false)
                }}
              >
                <span className="hero-suggest-type">{s.type}</span>
                <span className="hero-suggest-label">{s.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hero foreground content */}
      <div className="container hero-content">
        <div className="row align-items-end">
          <div className="col-12 col-lg-7">
            <h1 className="display-4 fw-extrabold text-white lh-tight">Elevate your style with Libas</h1>
            <p className="lead text-hero-muted mt-2">
              Premium fashion and beauty essentials for Men, Women, and Kids.
            </p>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <a href="/products?dept=Fashion" className="chip">Fashion</a>
              <a href="/products?dept=Beauty" className="chip">Beauty</a>
              <a href="/products?audience=Men" className="chip">Men</a>
              <a href="/products?audience=Women" className="chip">Women</a>
              <a href="/products?audience=Kids" className="chip">Kids</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
