"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

export function FeaturedProducts({ products }: { products: CatalogProduct[] }) {
  const rail = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    rail.current?.scrollBy({ left: direction * Math.min(360, rail.current.clientWidth * .82), behavior: "smooth" });
  }

  if (!products.length) return null;

  return <section className="section featured-products" data-reveal>
    <div className="container">
      <div className="section-head featured-head"><div><p className="eyebrow">Featured products</p><h2 className="heading">Browse what is available <span>right now.</span></h2></div><div className="carousel-actions"><button type="button" onClick={() => move(-1)} aria-label="View previous products">←</button><button type="button" onClick={() => move(1)} aria-label="View more products">→</button></div></div>
      <div className="featured-rail" ref={rail} tabIndex={0} aria-label="Featured products carousel">
        {products.map((product) => {
          const message = `Hello Bweza Pharmacy, I am interested in ${product.name}${product.pack_size ? ` (${product.pack_size})` : ""}. Please confirm availability and price.`;
          return <article className="featured-card" key={product.id}>
            <div className="featured-image">{product.image_url ? <Image src={product.image_url} alt={`${product.name} product`} fill sizes="(max-width: 680px) 76vw, 300px" /> : <span aria-hidden="true">BP</span>}</div>
            <div className="featured-body"><span>{product.category}</span><h3>{product.name}</h3>{product.pack_size ? <p>{product.pack_size}</p> : null}<strong>{product.show_price && product.price_ugx ? `UGX ${product.price_ugx.toLocaleString("en-UG")}` : "Ask for price"}</strong><a className="button" href={whatsappHref(message)} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="featured_product" data-location="home_featured_products">Ask on WhatsApp</a></div>
          </article>;
        })}
      </div>
      <div className="featured-footer"><p>Swipe on mobile or use the arrows to explore more products.</p><Link className="card-link" href="/products">View the full catalogue →</Link></div>
    </div>
  </section>;
}
