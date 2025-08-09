import React from 'react';

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description?: string;
}

interface ProductQuickViewModalProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
    onAddToCart?: (product: Product) => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
    product,
    open,
    onClose,
    onAddToCart,
}) => {
    if (!open || !product) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: '#fff',
                    borderRadius: 8,
                    padding: 24,
                    minWidth: 320,
                    maxWidth: 400,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                    position: 'relative',
                }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: 'transparent',
                        border: 'none',
                        fontSize: 20,
                        cursor: 'pointer',
                    }}
                    aria-label="Close"
                >
                    &times;
                </button>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', borderRadius: 4, marginBottom: 16 }}
                />
                <h2 style={{ margin: '0 0 8px 0' }}>{product.name}</h2>
                <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>
                    ${product.price.toFixed(2)}
                </p>
                {product.description && (
                    <p style={{ marginBottom: 16 }}>{product.description}</p>
                )}
                {onAddToCart && (
                    <button
                        onClick={() => onAddToCart(product)}
                        style={{
                            background: '#0070f3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductQuickViewModal;