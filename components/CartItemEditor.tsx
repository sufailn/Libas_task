import React, { useState } from "react";
import { ProductOrderOptions } from "./ProductOrderOptions";

export function CartItemEditor({ item, onUpdate }: {
  item: { size?: string; quantity: number; sizes?: string[] },
  onUpdate: (opts: { size?: string; quantity: number }) => void
}) {
  const [options, setOptions] = useState<{ size?: string; quantity: number }>({
    size: item.size,
    quantity: item.quantity,
  });

  return (
    <div className="flex gap-2 items-center">
      <ProductOrderOptions
        sizes={item.sizes}
        onChange={(opts) => {
          setOptions(opts);
          onUpdate(opts);
        }}
      />
    </div>
  );
}
