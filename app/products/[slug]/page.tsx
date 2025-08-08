import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ShoppingCart } from 'lucide-react'
import { getAllProducts, getProductBySlug } from "@/lib/data/mock-products"
import { siteConfig, productUrl } from "@/lib/seo"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { formatCurrency } from "@/lib/currency"
import { HoverZoomImage } from "@/components/hover-zoom-image"

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(await params.slug);
  if (!product) return {};

  const url = productUrl(product.slug);
  const title = `${product.name}`;
  const description = product.description;
  const images = [
    {
      url: product.image,
      width: 1200,
      height: 1200,
      alt: product.name,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "article", // Updated type
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(await params.slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand ?? siteConfig.name },
    audience: { "@type": "PeopleAudience", suggestedGender: product.audience },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: productUrl(product.slug),
      priceCurrency: "AED",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <article className="container py-4">
      {/* JSON-LD structured data for rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row gy-4">
        <div className="col-12 col-lg-6">
          {/* Hover zoom product image */}
          <div className="ratio ratio-1x1 rounded-4 overflow-hidden border-0 shadow-soft position-relative">
            <HoverZoomImage src={product.image || "/placeholder.svg"} alt={product.name} />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="h2">{product.name}</h1>
          <p className="text-muted">{product.description}</p>

          <div className="d-flex flex-wrap align-items-center gap-2 my-2">
            <span className="badge text-bg-light">{product.audience}</span>
            <span className="badge text-bg-light">{product.dept}</span>
            <span className="badge text-bg-light">{product.category}</span>
          </div>

          <div className="d-flex align-items-center gap-3 my-3">
            <span className="display-6">{formatCurrency(product.price)}</span>
          </div>

          <div className="d-flex flex-wrap gap-3">
            <AddToCartButton product={product}>
              <ShoppingCart className="me-2" size={18} />
              Add to cart
            </AddToCartButton>
            <Link href="/products" className="btn btn-outline-secondary">
              Continue shopping
            </Link>
          </div>
          <hr className="my-4" />
          <ul className="list-unstyled">
            <li>• Free returns within 30 days</li>
            <li>• Ships in 1-2 business days</li>
            <li>• Secure checkout</li>
          </ul>
        </div>
      </div>
    </article>
  )
}
