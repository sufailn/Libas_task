import { siteConfig } from "@/lib/seo"
import { getAllProducts } from "@/lib/data/mock-products"
import { ProductGrid } from "@/components/product-grid"

export const dynamic = "force-dynamic" // SSR listing

export const metadata = {
  title: "Products",
  description: "Browse Libas premium fashion and beauty collections.",
  alternates: { canonical: `${siteConfig.siteUrl}/products` },
  openGraph: {
    title: "Products",
    url: `${siteConfig.siteUrl}/products`,
  },
}

type Search = {
  q?: string
  category?: string
  audience?: string
  dept?: string
  min?: string
  max?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  // SSR data load; integrate Firestore here if desired.
  // TODO(Firebase): Replace getAllProducts() with Firestore server-side fetching to keep SSR.
  const products = await getAllProducts()
  const params = await searchParams

  return (
    <section className="container py-4">
      <div className="mb-4">
        <h1 className="h2 mb-1">All Products</h1>
        <p className="text-muted">Filter by department, audience, category, and price.</p>
      </div>
      <ProductGrid
        products={products}
        initial={{
          q: params.q ?? "",
          min: params.min ?? "",
          max: params.max ?? "",
          category: params.category ?? "All",
          audience: params.audience ?? "All",
          dept: params.dept ?? "All",
        }}
      />
    </section>
  )
}
