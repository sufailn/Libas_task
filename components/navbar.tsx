"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from "@/hooks/use-cart"
import { CartDrawer } from "@/components/cart-drawer"

export function Navbar() {
  const { count } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ] = useState("")
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const qs = q.trim()
    router.push(qs ? `/products?q=${encodeURIComponent(qs)}` : "/products")
    setShowSearch(false)
    setMobileOpen(false)
  }

  return (
    <>
      <header className={`nav-lux-wrapper ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-lux container d-flex align-items-center justify-content-between flex-wrap w-100 px-2 px-md-3">
          {/* Left: Menu (mobile/desktop) */}
          <button
            className="icon-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Center: Wordmark */}
          <div className="nav-lux-center">
            <Link href="/" className="brand-wordmark" aria-label="Libas Home">
              LIBAS
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="nav-lux-right">
            <button
              className="icon-btn d-none d-md-inline-flex"
              aria-label={showSearch ? "Close search" : "Open search"}
              onClick={() => setShowSearch((v) => !v)}
            >
              <Search size={18} />
            </button>
            <button className="icon-btn d-none d-md-inline-flex" aria-label="Account">
              <User size={18} />
            </button>
            <button className="icon-btn position-relative" aria-label="Open cart" onClick={() => setDrawerOpen(true)}>
              <ShoppingBag size={18} />
              {count > 0 && <span className="count-pill">{count}</span>}
            </button>
          </div>
        </div>

        {/* Search reveal (desktop) */}
        {showSearch && (
          <div className="nav-lux-searchbar">
            <form className="nav-lux-search container" onSubmit={onSearchSubmit} role="search" aria-label="Search">
              <Search size={16} />
              <input
                className="nav-lux-input"
                placeholder="Search products"
                aria-label="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="btn btn-dark btn-sm" type="submit">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="nav-lux-mobile container  d-flex flex-column align-items-start justify-content-start w-100 px-2 px-md-3 py-3 bg-white shadow-sm rounded position-absolute top-100 start-0 end-0 z-1030   ">
            <form className="nav-lux-search mb-3" onSubmit={onSearchSubmit} role="search" aria-label="Search mobile">
              <Search size={16} />
              <input
                className="nav-lux-input"
                placeholder="Search products"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="btn btn-dark btn-sm" type="submit">
                Go
              </button>
            </form>
            <nav className="nav-lux-links">
              <Link href="/products?dept=Fashion" onClick={() => setMobileOpen(false)}>
                Fashion
              </Link>
              <Link href="/products?dept=Beauty" onClick={() => setMobileOpen(false)}>
                Beauty
              </Link>
              {/* Removed Men link */}
              <Link href="/products?audience=Women" onClick={() => setMobileOpen(false)}>
                Women
              </Link>
              {/* Removed Kids link */}
              <Link href="/products" onClick={() => setMobileOpen(false)}>
                All Products
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
