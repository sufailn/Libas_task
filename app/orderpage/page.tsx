import React from "react";
import OrderPageClient from "./OrderPageClient";

export default function OrderPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <OrderPageClient />
    </React.Suspense>
  );
}
