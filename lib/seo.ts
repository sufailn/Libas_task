// lib/seo.ts
export const siteConfig = {
  siteUrl: "https://libas-gamma.vercel.app",
  name: "Libas",
  description: "Fashion & Beauty Store for Women",
};

/** Product Page URL */
export function productUrl(slug: string): string {
  return `${siteConfig.siteUrl}/products/${slug}`;
}

/** Category Page URL */
export function categoryUrl(category: string): string {
  // Lowercase and replace spaces with hyphens for SEO
  return `${siteConfig.siteUrl}/category/${category.toLowerCase().replace(/\s+/g, "-")}`;
}
