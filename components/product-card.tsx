import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "./add-to-cart-button"
import type { Product } from "@/lib/data/mock-products"
import { formatCurrency } from "@/lib/currency"

/**
 * Premium ProductCard
 * - Tall, airy layout with centered image and elegant typography
 * - Subtle hover elevation + image zoom
 * - Actions bar animates in on hover
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="pcard">
      <Link href={`/products/${product.slug}`} className="pcard-media" aria-label={product.name}>
        {product.badge && <span className="pcard-badge">{product.badge}</span>}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </Link>

      <div className="pcard-body">
        <div className="pcard-meta">
          <span className="pcard-kicker">{product.dept}</span>
          <span className="pcard-dot" />
          <span className="pcard-kicker">{product.category}</span>
        </div>
        <Link href={`/products/${product.slug}`} className="pcard-title">
          {product.name}
        </Link>
        <p className="pcard-desc">{product.description}</p>
      </div>

      <div className="pcard-footer">
        <div className="pcard-price">{formatCurrency(product.price)}</div>
        <div className="pcard-actions">
          <AddToCartButton product={product} variant="dark">
            Add to cart
          </AddToCartButton>
          <Link href={`/products/${product.slug}`} className="btn btn-outline-dark btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
