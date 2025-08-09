"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Product } from "@/lib/data/mock-products"

export type CartItem = {
  variant: string
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

type CartState = {
  items: CartItem[]
}

type CartContextType = {
  items: CartItem[]
  count: number
  total: number
  add: (p: Product, quantity?: number, size?: string) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = "v0_store_cart_v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] })

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setState(JSON.parse(raw))
    } catch {
      // no-op
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // no-op
    }
  }, [state])

  const add = useCallback((p: Product, quantity = 1, size?: string) => {
    setState((prev) => {
      // For size-based products, treat each size as a unique cart item
      const key = size ? `${p.id}-${size}` : p.id
      const idx = prev.items.findIndex((i) => (size ? `${i.id}-${i.size}` : i.id) === key)
      const items = [...prev.items]
      if (idx >= 0) {
        items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity }
      } else {
        items.push({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          quantity,
          size,
          variant: ""
        })
      }
      return { items }
    })
  }, [])

  const remove = useCallback((id: string) => {
    setState((prev) => ({ items: prev.items.filter((i) => i.id !== id) }))
  }, [])

  const clear = useCallback(() => setState({ items: [] }), [])

  const { count, total } = useMemo(() => {
    const count = state.items.reduce((acc, it) => acc + it.quantity, 0)
    const total = state.items.reduce((acc, it) => acc + it.price * it.quantity, 0)
    return { count, total }
  }, [state.items])

  const value: CartContextType = { items: state.items, count, total, add, remove, clear }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return ctx
}
