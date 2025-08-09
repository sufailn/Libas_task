"use client"

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"


import type { Product } from "@/lib/data/mock-products"
import { ProductCard } from "@/components/product-card"

export function FeaturedProductsCarousel({ products = [] as Product[] }) {
  const featured = products.slice(0, 6) // show 4-6 featured items

  return (
    <div className="featured-swiper">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{
          480: { slidesPerView: 1.5 },    
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        aria-label="Featured products"
      >
        {featured.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
