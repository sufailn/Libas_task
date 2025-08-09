import { siteConfig } from "@/lib/seo"
import { getAllProducts } from "@/lib/data/mock-products"
import { FeaturedProductsCarousel } from "@/components/featured-products-carousel"
import { ScrollZoomSection } from "@/components/scroll-zoom-section"
import { Privileges, ScrollImageSection } from "@/components/privileges"
import { Link } from "lucide-react"
  // import ScrollImg from "@/components/scrollimg"
  // import ScrollImgPremium from "@/components/scrollimg"

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

type Props = {
  imageSrc: string
  heading: string
  subheading: string
  align?: "left" | "right" | "justify" | "center"
  link?: {
    label: string
    href: string
  }
}

export default async function HomePage() {
  const products = await getAllProducts()

  return (
    <>
      {/* Editorial scroll zoom sections */}
      <div className="">
         <ScrollZoomSection
        imageSrc="/images/scroll-1.png"
        heading="Libas Beauty"
        subheading="Modern fragrances and skincare essentials."
        align="left"
      />
      <div className="container py-5">
        <h1 className="text-center text-gold mb-4">Welcome to Libas</h1>
        <p className="text-center text-muted mb-5">
          Discover our curated collection of premium fashion and beauty products.
        </p>
      </div>
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

      </div>
      

      {/* Privileges — keep only one heading (removes duplicate from your screenshot) */}
      <div className="container py-5">

      <Privileges />
      </div>
      <div className="container py-5">
        <ScrollZoomSection
          imageSrc="/images/oud-mystique.jpg"
          heading="Signature Perfumes"
          subheading="Experience captivating scents crafted for every occasion."
          align="center"
        />
      </div>
          

      {/* Featured products — swipeable on all devices */}
      <section aria-labelledby="featured-heading" className="container py-5 bg-white rounded-lg shadow">
        <div className="text-center mb-4">
          <h2 id="featured-heading" className="lux-h2 m-0">Featured Products</h2>
          <p className="lux-muted mt-2 m-0">
            Curated picks from our fashion and beauty collections.
          </p>
        </div>
        <div className="px-4 py-3 bg-white rounded-lg">
          <FeaturedProductsCarousel products={products} />
        </div>
      </section>
      
    </>
  )
}
