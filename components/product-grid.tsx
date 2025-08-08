"use client"

import { useEffect, useMemo, useState } from "react"
import type { Product } from "@/lib/data/mock-products"
import { ProductCard } from "./product-card"

type Initial = {
  q?: string
  min?: string
  max?: string
  category?: string
  audience?: string
  dept?: string
}

type Props = { products?: Product[]; initial?: Initial }

export function ProductGrid({ products = [], initial = {} }: Props) {
  const [q, setQ] = useState(initial.q ?? "")
  const [min, setMin] = useState<string>(initial.min ?? "")
  const [max, setMax] = useState<string>(initial.max ?? "")
  const [category, setCategory] = useState<string>(initial.category ?? "All")
  const [audience, setAudience] = useState<string>(initial.audience ?? "All")
  const [dept, setDept] = useState<string>(initial.dept ?? "All")

  useEffect(() => {
    // If initial props change (e.g., via client-side nav), sync once.
    setQ(initial.q ?? "")
    setMin(initial.min ?? "")
    setMax(initial.max ?? "")
    setCategory(initial.category ?? "All")
    setAudience(initial.audience ?? "All")
    setDept(initial.dept ?? "All")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial.q, initial.min, initial.max, initial.category, initial.audience, initial.dept])

  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => set.add(p.category))
    return ["All", ...Array.from(set)]
  }, [products])

  const audiences = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => set.add(p.audience))
    return ["All", ...Array.from(set)]
  }, [products])

  const depts = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => set.add(p.dept))
    return ["All", ...Array.from(set)]
  }, [products])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    const minN = min ? parseFloat(min) : -Infinity
    const maxN = max ? parseFloat(max) : Infinity
    return products.filter((p) => {
      const matchesQ =
        !qq ||
        p.name.toLowerCase().includes(qq) ||
        p.description.toLowerCase().includes(qq) ||
        p.category.toLowerCase().includes(qq) ||
        p.audience.toLowerCase().includes(qq) ||
        p.dept.toLowerCase().includes(qq)
      const inRange = p.price >= minN && p.price <= maxN
      const inCategory = category === "All" || p.category === category
      const inAudience = audience === "All" || p.audience === audience
      const inDept = dept === "All" || p.dept === dept
      return matchesQ && inRange && inCategory && inAudience && inDept
    })
  }, [products, q, min, max, category, audience, dept])

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-6">
          <input
            className="form-control"
            placeholder="Search fashion or beauty..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <select
            className="form-select"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            aria-label="Filter by department"
          >
            {depts.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3 col-xl-2">
          <select
            className="form-select"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            aria-label="Filter by audience"
          >
            {audiences.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3 col-xl-1">
          <input
            className="form-control"
            placeholder="Min AED"
            inputMode="decimal"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            aria-label="Min price"
          />
        </div>
        <div className="col-6 col-md-3 col-xl-1">
          <input
            className="form-control"
            placeholder="Max AED"
            inputMode="decimal"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            aria-label="Max price"
          />
        </div>
        <div className="col-12 col-xl-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filtered.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4 col-xxl-3">
            <ProductCard product={p} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-12">
            <div className="text-center text-muted py-5">No products match your filters.</div>
          </div>
        )}
      </div>
    </>
  )
}
