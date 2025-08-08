import React, { useRef } from "react";

interface ScrollImageSectionProps {
    imageUrl: string;
    alt?: string;
    height?: number | string;
    width?: number | string;
}

const ScrollImageSection: React.FC<ScrollImageSectionProps> = ({
    imageUrl,
    alt = "Scrollable Image",
    height = 300,
    width = "100%",
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", width }}>
            <button
                aria-label="Scroll Left"
                onClick={scrollLeft}
                style={{
                    height,
                    width: 40,
                    border: "none",
                    background: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    fontSize: 24,
                }}
            >
                &#8592;
            </button>
            <div
                ref={scrollRef}
                style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap",
                    height,
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            >
                <img
                    src={imageUrl}
                    alt={alt}
                    style={{
                        display: "inline-block",
                        height: "100%",
                        objectFit: "cover",
                        userSelect: "none",
                        pointerEvents: "none",
                    }}
                    draggable={false}
                />
            </div>
            <button
                aria-label="Scroll Right"
                onClick={scrollRight}
                style={{
                    height,
                    width: 40,
                    border: "none",
                    background: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    fontSize: 24,
                }}
            >
                &#8594;
            </button>
        </div>
    );
};

export default ScrollImageSection;