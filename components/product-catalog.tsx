"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

const labels = { in_stock: "In stock", low_stock: "Low stock", out_of_stock: "Out of stock", coming_soon: "Coming soon" };

export function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const categories = useMemo(() => ["All products", ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const visible = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All products" || product.category === category;
    const text = `${product.name} ${product.category} ${product.description} ${product.pack_size || ""}`.toLowerCase();
    return matchesCategory && (!deferredQuery || text.includes(deferredQuery));
  }), [category, deferredQuery, products]);

  return <>
    <div className="catalog-tools" aria-label="Catalogue filters">
      <label className="field"><span>Search products</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product or category" /></label>
      <label className="field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p className="small" aria-live="polite">Showing {visible.length} of {products.length} products</p>
    {visible.length ? <div className="product-grid">{visible.map((product) => {
      const available = !["out_of_stock", "coming_soon"].includes(product.stock_status);
      const message = `Hello Bweza Pharmacy, I am interested in ${product.name}${product.pack_size ? ` (${product.pack_size})` : ""}. Please confirm availability and price.`;
      return <article className="product-card" key={product.id}>
        <div className="product-image">{product.image_url ? <Image src={product.image_url} alt={`${product.name} product`} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 25vw" /> : <span aria-hidden="true">BP</span>}</div>
        <div className="product-card-body">
          <div className="product-meta"><span>{product.category}</span><span className={`stock stock-${product.stock_status}`}>{labels[product.stock_status]}</span></div>
          <h2>{product.name}</h2>{product.pack_size ? <p className="product-pack">{product.pack_size}</p> : null}<p>{product.description}</p>
          <div className="product-price">{product.show_price && product.price_ugx ? `UGX ${product.price_ugx.toLocaleString("en-UG")}` : "Ask for price"}</div>
          {product.requires_prescription ? <Link className="button" href="/prescription">Contact our pharmacist</Link> : <a className={`button${available ? "" : " button-secondary"}`} href={whatsappHref(message)} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="product_enquiry" data-location="product_catalogue">{available ? "Order on WhatsApp" : "Ask about availability"}</a>}
        </div>
      </article>;
    })}</div> : <div className="catalog-empty"><h2>No matching products</h2><p>Try another search or category, or ask the pharmacy team on WhatsApp.</p></div>}
  </>;
}
