"use client";

import { useEffect, useRef } from "react";
import { FaGift, FaShippingFast, FaBoxOpen } from "react-icons/fa";

export function Privileges() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const cards = section.querySelectorAll(".priv-card");
      const scrollPosition = window.scrollY;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardTop = cardElement.offsetTop;
        const fadeStart = cardTop - window.innerHeight / 1.5;
        const fadeEnd = cardTop + cardElement.offsetHeight;

        if (scrollPosition > fadeStart && scrollPosition < fadeEnd) {
          cardElement.style.opacity = "1";
          cardElement.style.transform = "translateY(0)";
        } else {
          cardElement.style.opacity = "0";
          cardElement.style.transform = "translateY(20px)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="container py-5">
      <h2 className="lux-h2 text-center mb-4 text-gold">
        Libas Online Boutique Privileges
      </h2>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div
            className="priv-card premium-card shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-gold to-white"
            style={{
              transition: "opacity 0.5s, transform 0.5s",
              opacity: 0,
            }}
          >
            <div className="priv-media d-flex flex-column align-items-center text-center py-5">
              <FaGift size={50} className="icon-premium text-gold mb-3" />
              <div className="priv-title text-lg font-bold text-center text-dark">
                Personalised Message
              </div>
              <p className="text-center text-muted mt-2">
                Available on all products.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div
            className="priv-card premium-card shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-gold to-white"
            style={{
              transition: "opacity 0.5s, transform 0.5s",
              opacity: 0,
            }}
          >
            <div className="priv-media d-flex flex-column align-items-center text-center py-5">
              <FaBoxOpen size={50} className="icon-premium text-gold mb-3" />
              <div className="priv-title text-lg font-bold text-center text-dark">
                Iconic Libas Packaging
              </div>
              <p className="text-center text-muted mt-2">
                Seasonal and unique designs.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div
            className="priv-card premium-card shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-gold to-white"
            style={{
              transition: "opacity 0.5s, transform 0.5s",
              opacity: 0,
            }}
          >
            <div className="priv-media d-flex flex-column align-items-center text-center py-5">
              <FaShippingFast size={50} className="icon-premium text-gold mb-3" />
              <div className="priv-title text-lg font-bold text-center text-dark">
                Free Delivery & Return
              </div>
              <p className="text-center text-muted mt-2">
                Complimentary delivery for all orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Scrollable Image Section
export function ScrollImageSection() {
  return (
    <section className="scroll-image-section position-relative">
      <div className="fixed-image">
        <div className="image-wrapper">
          <img
            src="/images/fixed-image.png"
            alt="Premium Product"
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="scroll-content">
        <div className="product-details">
          <h2 className="text-center text-gold mb-4">Exclusive Products</h2>
          <p className="text-center text-muted">
            Discover our premium collection of men's and women's fashion.
          </p>
        </div>
        <div className="product-list">
          <div className="product-item">
            <h3>Men's Collection</h3>
            <p>Elegant designs for every occasion.</p>
          </div>
          <div className="product-item">
            <h3>Women's Collection</h3>
            <p>Timeless styles to elevate your wardrobe.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// If you have any <Link> or <a> elements, update them like this:
// <Link href="/your-link" className="no-underline text-inherit hover:text-gold">Your Text</Link>
