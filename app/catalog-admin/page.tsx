import type { Metadata } from "next";
import { CatalogAdmin } from "@/components/catalog-admin";
import { catalogueAdminIsConfigured, isCatalogAdmin } from "@/lib/catalog-auth";
import { listProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Catalogue management", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CatalogAdminPage() {
  const authenticated = await isCatalogAdmin();
  const products = authenticated ? await listProducts(true).catch(() => []) : [];
  return <section className="section section-soft"><div className="container"><div className="admin-page-head"><p className="eyebrow">Private staff area</p><h1 className="heading">Manage the product catalogue.</h1><p className="lead">Upload products, choose whether prices appear, manage availability and publish changes without editing website code.</p></div><CatalogAdmin configured={catalogueAdminIsConfigured()} initialAuthenticated={authenticated} initialProducts={products} /></div></section>;
}
