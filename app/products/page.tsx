import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCatalog } from "@/components/product-catalog";
import { CtaBand } from "@/components/cta-band";
import { listProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Product Catalogue", description: "Browse pharmacy products available from Bweza Pharmacy in Kibuye, Kampala.", alternates: { canonical: "/products" } };
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await listProducts().catch(() => []);
  return <><PageHero eyebrow="Product catalogue" title="Browse products." description="Check published products, then ask on WhatsApp for current stock and prices." /><section className="section"><div className="container"><div className="notice" role="note"><strong>Important:</strong> Stock can change. Prescription medicines require a valid prescription and pharmacist review.</div>{items.length ? <ProductCatalog products={items} /> : <div className="catalog-empty"><h2>More products are coming soon.</h2><p>Ask us on WhatsApp about the item you need.</p></div>}</div></section><CtaBand title="Can’t find your product?" text="Send the product name or a clear photograph on WhatsApp." /></>;
}
