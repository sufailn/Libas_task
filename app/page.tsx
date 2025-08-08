import { siteConfig } from "@/lib/seo"
import { getAllProducts } from "@/lib/data/mock-products"
import { FeaturedProductsCarousel } from "@/components/featured-products-carousel"
import { ScrollZoomSection } from "@/components/scroll-zoom-section"
import { Privileges } from "@/components/privileges"

export const revalidate = 3600

export const metadata = {
  title: "Home",
  description: "Discover premium fashion and beauty from Libas.",
  alternates: { canonical: `${siteConfig.siteUrl}/` },
  openGraph: {
    title: "Libas • Premium Fashion & Beauty",
    description: "Discover premium fashion and beauty from Libas.",
    url: `${siteConfig.siteUrl}/`,
  },
}

export default async function HomePage() {
  const products = await getAllProducts()

  return (
    <>
      {/* Editorial scroll zoom sections */}
      <ScrollZoomSection
        imageSrc="/images/scroll-1.png"
        heading="Libas Beauty"
        subheading="Modern fragrances and skincare essentials."
        align="left"
      />
      <ScrollZoomSection
        imageSrc="/images/scroll-2.png"
        heading="Timeless Apparel"
        subheading="Tailored silhouettes for everyday elegance."
        align="right"
      />
      <ScrollZoomSection
        imageSrc="/images/scroll-3.png"
        heading="Footwear & Accessories"
        subheading="Elevate every look with finishing touches."
        align="justify"
      />

      {/* Privileges — keep only one heading (removes duplicate from your screenshot) */}
      <Privileges />

      {/* Featured products — swipeable on all devices */}
      <section aria-labelledby="featured-heading" className="container py-5">
        <div className="text-center mb-4">
          <h2 id="featured-heading" className="lux-h2 m-0">Featured Products</h2>
          <p className="lux-muted mt-2 m-0">
            Curated picks from our fashion and beauty collections.
          </p>
        </div>
        <FeaturedProductsCarousel products={products} />
   
        
      </section>
    </>
  )
}
