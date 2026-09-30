"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { emailHref, isExternalWhatsApp, phoneHref, whatsappHref } from "@/lib/site";

const labels = { in_stock: "In stock", low_stock: "Low stock", out_of_stock: "Out of stock", coming_soon: "Coming soon" };

function compactDescription(description: string) {
  if (description.length <= 220) return description;
  const excerpt = description.slice(0, 220);
  const boundary = excerpt.lastIndexOf(" ");
  return `${excerpt.slice(0, boundary > 160 ? boundary : 220).trim()}…`;
}

export function ProductCatalog({ products, initialCategory = "All products" }: { products: CatalogProduct[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(() => products.some((product) => product.category === initialCategory) ? initialCategory : "All products");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const categories = useMemo(() => ["All products", ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const visible = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All products" || product.category === category;
    const text = `${product.name} ${product.category} ${product.description} ${product.pack_size || ""}`.toLowerCase();
    return matchesCategory && (!deferredQuery || text.includes(deferredQuery));
  }), [category, deferredQuery, products]);
  const searchedName = query.trim();
  const pharmacistMessage = `Hello Bweza Pharmacy, I am looking for ${searchedName || "[medicine name]"}. I understand prescription medicines are not listed in the public catalogue and require pharmacist review. Please advise me how to submit my prescription.`;
  const prescriptionEmail = emailHref("Prescription medicine enquiry");

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
          <h2>{product.name}</h2>{product.pack_size ? <p className="product-pack">{product.pack_size}</p> : null}<p className="product-description-preview">{compactDescription(product.description)}</p>{product.description.length > 220 ? <details className="product-details"><summary>View full product information</summary><p>{product.description}</p></details> : null}
          <div className="product-price">{product.show_price && product.price_ugx ? `UGX ${product.price_ugx.toLocaleString("en-UG")}` : "Ask for price"}</div>
          {product.requires_prescription ? <Link className="button" href="/prescription">Contact our pharmacist</Link> : <a className={`button${available ? "" : " button-secondary"}`} href={whatsappHref(message)} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="product_enquiry" data-location="product_catalogue">{available ? "Order on WhatsApp" : "Ask about availability"}</a>}
        </div>
      </article>;
    })}</div> : <div className="catalog-empty">
      <h2>Prescription medicine or product not listed?</h2>
      <p><strong>Prescription medicines are intentionally not displayed in the public catalogue.</strong> Contact our pharmacy team for a private pharmacist review. A valid prescription may be required before supply.</p>
      <div className="button-row" style={{ justifyContent: "center" }}>
        <a className="button button-magenta" href={whatsappHref(pharmacistMessage)} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="prescription_enquiry" data-location="catalog_empty">WhatsApp pharmacist</a>
        <a className="button" href={phoneHref()} data-conversion="phone_click" data-intent="prescription_enquiry" data-location="catalog_empty">Call pharmacy</a>
        <a className="button button-secondary" href={prescriptionEmail} data-conversion="email_click" data-intent="prescription_enquiry" data-location="catalog_empty">Email pharmacy</a>
      </div>
    </div>}
  </>;
}
