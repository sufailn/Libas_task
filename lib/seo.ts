export const siteConfig = {
  name: "Libas",
  tagline: "Premium Fashion & Beauty",
  description:
    "Libas is a premium, modern storefront for fashion and beauty — built on Next.js App Router, optimized for SEO and performance.",
  siteUrl: "https://example.com", // TODO(SEO): Replace with your production base URL.
}

export function productUrl(slug: string) {
  return `${siteConfig.siteUrl}/products/${slug}`
}
