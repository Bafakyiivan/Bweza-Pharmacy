"use client";

import { FormEvent, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";

const categories = ["Over-the-counter products", "First aid", "Vitamins and supplements", "Personal care", "Medical supplies and devices", "Mother and baby", "Wellness products", "Prescription medicines"];

export function CatalogAdmin({ configured, initialAuthenticated, initialProducts }: { configured: boolean; initialAuthenticated: boolean; initialProducts: CatalogProduct[] }) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [editing, setEditing] = useState<CatalogProduct | null>(null);
  const [status, setStatus] = useState({ message: "", error: false });
  const [busy, setBusy] = useState(false);
  async function load() {
    const response = await fetch("/api/catalog/products?admin=1", { cache: "no-store" });
    if (response.status === 401) { setAuthenticated(false); return; }
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load products.");
    setProducts(data.products); setAuthenticated(true);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus({ message: "", error: false });
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/catalog/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: form.get("password") }) });
    const data = await response.json();
    if (!response.ok) setStatus({ message: data.error || "Sign-in failed.", error: true });
    else { event.currentTarget.reset(); await load(); }
    setBusy(false);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus({ message: "", error: false });
    const form = event.currentTarget, data = new FormData(form);
    for (const name of ["show_price", "requires_prescription", "is_published"]) {
      const element = form.elements.namedItem(name);
      data.set(name, element instanceof HTMLInputElement && element.checked ? "true" : "false");
    }
    if (editing?.image_path) data.set("current_image_path", editing.image_path);
    const response = await fetch(editing ? `/api/catalog/products/${editing.id}` : "/api/catalog/products", { method: editing ? "PUT" : "POST", body: data });
    const result = await response.json();
    if (!response.ok) setStatus({ message: result.error || "The product could not be saved.", error: true });
    else { form.reset(); setEditing(null); setStatus({ message: editing ? "Product updated." : "Product uploaded.", error: false }); await load(); }
    setBusy(false);
  }

  async function archive(product: CatalogProduct) {
    if (!window.confirm(`Archive ${product.name}? It will disappear from the public catalogue.`)) return;
    setBusy(true);
    const response = await fetch(`/api/catalog/products/${product.id}`, { method: "DELETE" });
    const result = await response.json();
    setStatus(response.ok ? { message: "Product archived.", error: false } : { message: result.error || "Could not archive product.", error: true });
    if (response.ok) await load(); setBusy(false);
  }

  if (!configured) return <div className="notice"><strong>One secure setting remains:</strong> add <code>CATALOG_ADMIN_PASSWORD</code> in Vercel using a unique password of at least 12 characters, then redeploy.</div>;
  if (!authenticated) return <form className="form-card admin-login" onSubmit={login}><h2>Staff sign in</h2><p className="small">Use the private catalogue password.</p><label className="field"><span>Password</span><input name="password" type="password" minLength={12} autoComplete="current-password" required /></label><button className="button" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>{status.message ? <p className={`status ${status.error ? "status-error" : "status-success"}`}>{status.message}</p> : null}</form>;

  const activeProducts = products.filter((item) => !item.is_archived);
  return <div className="admin-grid">
    <form className="form-card" onSubmit={save} key={editing?.id || "new"}>
      <div className="admin-form-heading"><div><p className="eyebrow">Staff dashboard</p><h2>{editing ? "Edit product" : "Upload a product"}</h2></div>{editing ? <button className="button button-secondary" type="button" onClick={() => setEditing(null)}>Cancel</button> : null}</div>
      <div className="form-grid">
        <label className="field"><span>Product name</span><input name="name" defaultValue={editing?.name} maxLength={120} required /></label>
        <label className="field"><span>Category</span><select name="category" defaultValue={editing?.category || categories[0]}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="field"><span>Pack size</span><input name="pack_size" defaultValue={editing?.pack_size || ""} maxLength={100} placeholder="Example: 30 tablets" /></label>
        <label className="field"><span>Stock status</span><select name="stock_status" defaultValue={editing?.stock_status || "in_stock"}><option value="in_stock">In stock</option><option value="low_stock">Low stock</option><option value="out_of_stock">Out of stock</option><option value="coming_soon">Coming soon</option></select></label>
        <label className="field"><span>Price (UGX)</span><input name="price_ugx" type="number" min="0" step="1" defaultValue={editing?.price_ugx || ""} placeholder="Leave blank if hidden" /></label>
        <label className="field"><span>Product photograph</span><input name="image" type="file" accept="image/jpeg,image/png,image/webp" required={!editing} /><small className="field-help">JPG, PNG or WebP; maximum 5 MB.{editing ? " Leave blank to keep the current photo." : ""}</small></label>
        <label className="field field-full"><span>Description</span><textarea name="description" defaultValue={editing?.description} minLength={10} maxLength={600} required /></label>
        <label className="checkbox"><input name="show_price" type="checkbox" defaultChecked={editing?.show_price} /> Show price publicly</label>
        <label className="checkbox"><input name="requires_prescription" type="checkbox" defaultChecked={editing?.requires_prescription} /> Requires prescription review</label>
        <label className="checkbox"><input name="is_published" type="checkbox" defaultChecked={editing ? editing.is_published : true} /> Publish immediately</label>
      </div>
      <button className="button" disabled={busy}>{busy ? "Saving…" : editing ? "Save changes" : "Upload product"}</button>
      {status.message ? <p className={`status ${status.error ? "status-error" : "status-success"}`}>{status.message}</p> : null}
    </form>
    <section className="admin-products" aria-label="Catalogue products"><div className="admin-form-heading"><div><p className="eyebrow">Current catalogue</p><h2>{activeProducts.length} products</h2></div><button className="button button-secondary" type="button" onClick={async () => { await fetch("/api/catalog/admin/logout", { method: "POST" }); setAuthenticated(false); }}>Sign out</button></div>
      <div className="admin-product-list">{activeProducts.map((product) => <article key={product.id}><div><strong>{product.name}</strong><span>{product.category} · {product.is_published ? "Published" : "Draft"} · {product.stock_status.replaceAll("_", " ")}</span></div><div><button type="button" onClick={() => { setEditing(product); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button><button type="button" className="danger-link" disabled={busy} onClick={() => archive(product)}>Archive</button></div></article>)}</div>
    </section>
  </div>;
}
