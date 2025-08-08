import type { Metadata, Viewport } from "next"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import "@/styles/premium.css"
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Navbar } from "@/components/navbar"
import { CartProvider } from "@/hooks/use-cart"
import { siteConfig } from "@/lib/seo"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} • ${siteConfig.tagline}`,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.siteUrl },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [{ url: "/seo-storefront-og-image.png", width: 1200, height: 630, alt: "Libas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/seo-storefront-twitter-card.png"],
  },
    generator: 'sufail'
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main className="container-fluid p-0">{children}</main>
          <Footer />
          
        </CartProvider>
      </body>
    </html>
  )
}
