"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { X } from 'lucide-react'
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/currency"

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, remove, clear } = useCart()
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Close on ESC and lock scroll when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      // lock scroll behind the drawer
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      // focus the close button for accessibility
      setTimeout(() => closeBtnRef.current?.focus(), 0)
      return () => {
        document.removeEventListener("keydown", onKey)
        document.body.style.overflow = prev
      }
    }
  }, [open, onClose])

  return (
    <div
      aria-hidden={!open}
      className={`offcanvas-backdrop ${open ? "show" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        background: open ? "rgba(0,0,0,0.35)" : "transparent",
        pointerEvents: open ? "auto" : "none",
        transition: "background 150ms ease",
        zIndex: 1040,
        opacity: open ? 1 : 0,
        display: open ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className="bg-white shadow rounded-3"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 480,
          maxHeight: "90vh",
          margin: "auto",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          zIndex: 1050,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom" style={{zIndex: 1060, position: 'relative'}}>
          <h2 className="h5 m-0">Basket ({items.length})</h2>
          <button
            ref={closeBtnRef}
            className="btn btn-light"
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            style={{zIndex: 1070, position: 'relative', fontSize: 24, lineHeight: 1, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}} // Large, visible close button
          >
            <X />
          </button>
        </div>
        <div className="flex-grow-1 overflow-auto p-4 d-flex flex-column align-items-center justify-content-center">
          {items.length === 0 ? (
            <>
              <p className="text-muted m-0 mb-4">Your cart is currently empty.</p>
              <button className="btn btn-dark px-5 py-2 rounded-pill" type="button" onClick={onClose}>
                Continue Shopping
              </button>
            </>
          ) : (
            <ul className="list-unstyled m-0 w-100">
              {items.map((it) => (
                <li key={`${it.id}-${it.variant ?? "default"}`} className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-3 overflow-hidden shadow-soft" style={{ width: 64, height: 64, position: "relative" }}>
                    <Image
                      src={it.image || "/placeholder.svg"}
                      alt={it.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{it.name}</div>
                    <div className="text-muted small">Qty: {it.quantity}</div>
                  </div>
                  <div className="text-nowrap fw-semibold">{formatCurrency(it.price * it.quantity)}</div>
                  <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => remove(it.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-top p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="fw-semibold">Subtotal</span>
              <span className="fw-bold">{formatCurrency(total)}</span>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary flex-grow-1" type="button" onClick={clear} disabled={items.length === 0}>
                Clear
              </button>
              <button className="btn btn-dark flex-grow-1" type="button" disabled={items.length === 0}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
