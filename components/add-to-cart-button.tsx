"use client"

import { PropsWithChildren } from "react"
import type { Product } from "@/lib/data/mock-products"
import { useCart } from "@/hooks/use-cart"

export function AddToCartButton({
  product,
  children,
  variant = "dark",
}: PropsWithChildren<{ product: Product & { selectedSize?: string; quantity?: number }; variant?: "dark" | "outline" }>) {
  const { add } = useCart()
  return (
    <button
      className={`btn btn-${variant === "dark" ? "dark" : "outline-dark"} btn-sm`}
      onClick={() => add(product, product.quantity ?? 1, product.selectedSize)}
      aria-label={`Add ${product.name} to cart`}
    >
      {children ?? "Add to cart"}
    </button>
  )
}
