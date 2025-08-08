import { getAllProducts } from "@/lib/data/mock-products"
import { siteConfig, productUrl } from "@/lib/seo"

export default async function sitemap() {
  const products = await getAllProducts()

  const staticRoutes = [
    {
      url: `${siteConfig.siteUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.siteUrl}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]

  const productRoutes = products.map((p) => ({
    url: productUrl(p.slug),
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...productRoutes]
}
