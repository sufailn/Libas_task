"use client"

import { PropsWithChildren } from "react"
import type { Product } from "@/lib/data/mock-products"
import { useCart } from "@/hooks/use-cart"

export function AddToCartButton({
  product,
  children,
  variant = "dark",
}: PropsWithChildren<{ product: Product; variant?: "dark" | "outline" }>) {
  const { add } = useCart()
  return (
    <button
      className={`btn btn-${variant === "dark" ? "dark" : "outline-dark"} btn-sm`}
      onClick={() => add(product)}
      aria-label={`Add ${product.name} to cart`}
    >
      {children ?? "Add to cart"}
    </button>
  )
}
