"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ProductOrderOptions } from "./ProductOrderOptions";
import { AddToCartButton } from "./add-to-cart-button";
import type { Product } from "@/lib/data/mock-products";
import { formatCurrency } from "@/lib/currency";

export function AddToCartModal({ product, open, onClose }: {
  product: Product,
  open: boolean,
  onClose: () => void
}) {
  const [orderOptions, setOrderOptions] = useState<{ size?: string; quantity: number }>({
    size: product.sizes?.[0],
    quantity: 1,
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-900" onClick={onClose} aria-label="Close">&times;</button>
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-48 relative rounded-xl overflow-hidden border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-center">{product.name}</h2>
          <div className="text-lg font-bold text-zinc-900 mb-2">{formatCurrency(product.price)}</div>
          <ProductOrderOptions sizes={product.sizes} onChange={setOrderOptions} />
          <AddToCartButton
            product={{ ...product, selectedSize: orderOptions.size, quantity: orderOptions.quantity }}
            variant="dark"
          >
            Confirm Add to Cart
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
