"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductOrderOptions } from "@/components/ProductOrderOptions";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatCurrency } from "@/lib/currency";
import { getAllProducts } from "@/lib/data/mock-products";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("product");
  const [product, setProduct] = useState<any>(null);
  const [orderOptions, setOrderOptions] = useState<{ size?: string; quantity: number }>({ size: undefined, quantity: 1 });
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const all = await getAllProducts();
      const found = all.find((p: any) => p.slug === slug);
      setProduct(found);
      setOrderOptions({ size: found?.sizes?.[0], quantity: 1 });
    }
    if (slug) fetchProduct();
  }, [slug]);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row items-stretch">
      {/* Left: Image with zoom */}
      <div className="flex-1 flex items-center justify-center bg-white p-8 relative">
        <div
          className="relative w-full max-w-md aspect-[3/4] cursor-zoom-in group"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-contain rounded-2xl border shadow transition-transform duration-300 ${zoom ? "scale-110 z-20" : "scale-100"}`}
            style={{ transition: "transform 0.3s" }}
          />
        </div>
      </div>
      {/* Right: Details */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-900">{product.name}</h1>
        <div className="text-zinc-500 mb-4">{product.description}</div>
        <div className="mb-4">
          <span className="text-lg font-semibold text-zinc-900">{formatCurrency(product.price)}</span>
        </div>
        <div className="mb-4">
          <ProductOrderOptions sizes={product.sizes} onChange={setOrderOptions} />
        </div>
        <div className="flex gap-2 mb-6">
          <AddToCartButton
            product={{ ...product, selectedSize: orderOptions.size, quantity: orderOptions.quantity }}
            variant="dark"
          >
            Add to cart
          </AddToCartButton>
          <button className="btn btn-outline-dark" type="button">
            Quick buy
          </button>
        </div>
        <div className="text-xs text-zinc-500 mt-2">By placing your order you agree to the terms of service. Delivery same day or next day, subject to availability.</div>
      </div>
    </div>
  );
}
