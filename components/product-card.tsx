import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AddToCartButton } from "./add-to-cart-button"
import { AddToCartModal } from "./AddToCartModal"
import type { Product } from "@/lib/data/mock-products"
import { formatCurrency } from "@/lib/currency"

export function ProductCard({ product }: { product: Product }) {

  const [showAddToCart, setShowAddToCart] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const router = useRouter()

  return (
  <div className="group flex flex-col h-full bg-white rounded-2xl shadow-md border border-zinc-200 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl min-h-[340px] max-h-[410px] sm:min-h-[360px] sm:max-h-[440px]">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-[4/3] sm:aspect-square overflow-hidden bg-zinc-100"
      >
        {product.badge && (
          <span className="absolute top-3 left-3 bg-zinc-900 text-white text-xs font-medium px-2 py-1 rounded-lg z-10 shadow">
            {product.badge}
          </span>
        )}
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-zinc-200 opacity-60" />
          </div>
        )}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoadingComplete={() => setImgLoaded(true)}
        />
      </Link>

      {/* Card Body */}
  <div className="flex flex-col flex-1 p-3 sm:p-4 gap-1 sm:gap-2 md:gap-3">
  <div className="text-xs text-zinc-500 mb-0 flex items-center gap-1">
          {product.dept && <span>{product.dept}</span>}
          {product.dept && product.category && <span className="w-1 h-1 bg-zinc-400 rounded-full"></span>}
          {product.category && <span>{product.category}</span>}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="text-sm sm:text-base font-semibold text-zinc-900 line-clamp-1 hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-xs sm:text-sm text-zinc-600 mt-0 line-clamp-2 min-h-[2em]">{product.description}</p>

        {/* Price & Size */}
        <div className="mt-1 sm:mt-2 flex items-center justify-between">
          <span className="text-base sm:text-lg font-bold text-zinc-900">
            {formatCurrency(product.price)}
          </span>
        </div>

        {/* {product.sizes && (
          <ProductOrderOptions
            sizes={product.sizes}
            onChange={(opts) => setOrderOptions(opts)}
          />
        )} */}

        {/* Actions */}
  <div className="flex gap-2 mt-auto pt-3 border-t border-zinc-200">
          {/* Hide Add to Cart on mobile if inside carousel (use .hide-add-cart-mobile class) */}
          <button
            className="btn btn-dark flex-1 text-sm font-semibold rounded-lg py-2 shadow hover:bg-zinc-800 transition-colors hidden sm:block"
            type="button"
            onClick={() => setShowAddToCart(true)}
          >
            Add to Cart
          </button>
          <button
            className="flex-1 border border-zinc-300 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 text-center py-2 transition-colors shadow-sm"
            type="button"
            onClick={() => router.push(`/orderpage?product=${product.slug}`)}
          >
            View Cart
          </button>
        </div>
        <AddToCartModal
          product={product}
          open={showAddToCart}
          onClose={() => setShowAddToCart(false)}
        />
      </div>
    </div>
  )
}
