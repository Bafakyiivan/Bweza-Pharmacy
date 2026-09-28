import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCatalog } from "@/components/product-catalog";
import { CtaBand } from "@/components/cta-band";
import { listProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Product Catalogue", description: "Browse pharmacy products available from Bweza Pharmacy in Kibuye, Kampala.", alternates: { canonical: "/products" } };
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await listProducts().catch(() => []);
  return <><PageHero eyebrow="Product catalogue" title="Browse products." description="Browse selected wellness, first-aid and health products. Prescription medicines are handled privately by our pharmacy team." /><section className="section"><div className="container"><div className="notice" role="note"><strong>Prescription medicines are not displayed in this catalogue.</strong> Contact our pharmacy team by WhatsApp, phone or email. A valid prescription and pharmacist review may be required before supply. Published product stock can change.</div>{items.length ? <ProductCatalog products={items} /> : <div className="catalog-empty"><h2>More products are coming soon.</h2><p>Ask us on WhatsApp about the item you need.</p></div>}</div></section><CtaBand title="Need a prescription medicine or unlisted product?" text="Contact our pharmacy team by WhatsApp, phone or email for the appropriate next step." /></>;
}
