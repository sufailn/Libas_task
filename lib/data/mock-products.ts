export type Audience = "Men" | "Women" | "Kids"
export type Department = "Fashion" | "Beauty"
export type Category =
  | "Clothing"
  | "Shoes"
  | "Accessories"
  | "Cosmetics"
  | "Hygiene"
  | "Fragrance"

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number // AED
  image: string
  brand?: string
  dept: Department
  category: Category
  audience: Audience
  badge?: "New" | "Best Seller" | "Limited"
}

const MOCK: Product[] = [
  // 6 demo products (4 fashion, 2 beauty)
  {
    id: "p-201",
    slug: "mens-linen-shirt",
    name: "Linen Shirt",
    description: "Breathable linen with a relaxed fit — perfect for warm days.",
    price: 179,
    image: "/images/mens-linen-shirt.png",
    brand: "Libas",
    dept: "Fashion",
    category: "Clothing",
    audience: "Men",
    badge: "Best Seller",
  },
  {
    id: "p-203",
    slug: "womens-summer-dress",
    name: "Summer Dress",
    description: "Lightweight, flowy silhouette with a flattering waistline.",
    price: 249,
    image: "/images/Linen.jpg ",
    brand: "Libas",
    dept: "Fashion",
    category: "Clothing",
    audience: "Women",
    badge: "New",
  },
  {
    id: "p-208",
    slug: "mens-running-shoes",
    name: "Running Shoes",
    description: "Responsive cushioning and breathable upper for daily runs.",
    price: 359,
    image: "/images/mens-running-shoes.png",
    brand: "Libas",
    dept: "Fashion",
    category: "Shoes",
    audience: "Men",
  },
  {
    id: "p-207",
    slug: "womens-leather-tote",
    name: "Leather Tote",
    description: "Spacious tote in smooth leather with magnetic closure.",
    price: 549,
    image: "/images/womens-leather-tote.png",
    brand: "Libas",
    dept: "Fashion",
    category: "Accessories",
    audience: "Women",
    badge: "Limited",
  },
  {
    id: "b-302",
    slug: "radiance-serum",
    name: "Radiance Serum",
    description: "Vitamin C serum to brighten and even skin tone.",
    price: 189,
    image: "/images/beauty-serum.png",
    brand: "Libas",
    dept: "Beauty",
    category: "Cosmetics",
    audience: "Women",
    badge: "Best Seller",
  },
  {
    id: "b-304",
    slug: "eau-de-parfum",
    name: "Eau de Parfum",
    description: "A modern signature fragrance with warm floral notes.",
    price: 399,
    image: "/images/beauty-perfume.png",
    brand: "Libas",
    dept: "Beauty",
    category: "Fragrance",
    audience: "Women",
  },
]

// SERVER functions (SSR/SSG-friendly)
export async function getAllProducts(): Promise<Product[]> {
  // TODO(Firebase): Replace MOCK with Firestore results and consider caching headers.
  return MOCK
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // TODO(Firebase): Query Firestore by slug.
  return MOCK.find((p) => p.slug === slug)
}
