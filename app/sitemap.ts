// app/sitemap.ts
import { getAllProducts } from "@/lib/data/mock-products";
import { siteConfig, productUrl, categoryUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  // Unique categories from all products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Static core pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: categoryUrl(cat),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Product detail pages
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: productUrl(p.slug),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
