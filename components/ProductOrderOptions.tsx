import React, { useState } from "react";

interface ProductOrderOptionsProps {
  sizes?: string[];
  onChange: (options: { size?: string; quantity: number }) => void;
}

export const ProductOrderOptions: React.FC<ProductOrderOptionsProps> = ({ sizes, onChange }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
    onChange({ size: e.target.value, quantity });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Math.max(1, Number(e.target.value));
    setQuantity(qty);
    onChange({ size: selectedSize, quantity: qty });
  };

  return (
    <div className="flex gap-2 items-center mb-2">
      {sizes && sizes.length > 0 && (
        <select
          className="border rounded px-2 py-1 focus:outline-none focus:ring"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      )}
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={handleQuantityChange}
        className="border rounded px-2 py-1 w-16 focus:outline-none focus:ring"
        aria-label="Quantity"
      />
    </div>
  );
};
