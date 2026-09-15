import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCatalog } from "@/components/product-catalog";
import { CtaBand } from "@/components/cta-band";
import { listProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Product Catalogue", description: "Browse products available for enquiry from Bweza Pharmacy in Kibuye, Kampala.", alternates: { canonical: "/products" } };
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await listProducts().catch(() => []);
  return <><PageHero eyebrow="Product catalogue" title="Find what you need, then ask us on WhatsApp." description="Browse published products and contact the pharmacy team to confirm current availability. Prices are shown only where confirmed by staff." /><section className="section"><div className="container"><div className="notice" role="note"><strong>Important:</strong> Catalogue availability can change. Prescription medicines require appropriate pharmacist review and a valid prescription where applicable.</div>{products.length ? <ProductCatalog products={products} /> : <div className="catalog-empty"><h2>The product catalogue is being prepared.</h2><p>Staff can now upload verified products. In the meantime, contact us on WhatsApp to ask about availability.</p></div>}</div></section><CtaBand title="Can’t find the product you need?" text="Send the product name or a clear photograph on WhatsApp and our team will confirm availability and the appropriate next step." /></>;
}

