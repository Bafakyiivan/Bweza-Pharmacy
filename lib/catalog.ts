import "server-only";

export const productCategories = [
  "Over-the-counter products", "First aid", "Vitamins and supplements", "Personal care",
  "Medical supplies and devices", "Mother and baby", "Wellness products", "Prescription medicines",
] as const;

export const stockStatuses = ["in_stock", "low_stock", "out_of_stock", "coming_soon"] as const;
export type ProductCategory = (typeof productCategories)[number];
export type StockStatus = (typeof stockStatuses)[number];

export type CatalogProduct = {
  id: string; name: string; slug: string; category: ProductCategory; pack_size: string | null;
  description: string; price_ugx: number | null; show_price: boolean; stock_status: StockStatus;
  requires_prescription: boolean; image_path: string | null; image_url: string | null;
  is_published: boolean; is_archived: boolean; display_order: number; created_at: string; updated_at: string;
};

const PRODUCTS_BUCKET = "product-images";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const config = supabaseConfig();
  if (!config) throw new Error("Catalogue storage is not configured.");
  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, ...init.headers },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Catalogue storage request failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  return response;
}

export async function listProducts(includeUnpublished = false): Promise<CatalogProduct[]> {
  if (!supabaseConfig()) return [];
  const filters = includeUnpublished ? "" : "&is_published=eq.true&is_archived=eq.false";
  const response = await supabaseRequest(`/rest/v1/catalog_products?select=*&order=display_order.asc,name.asc${filters}`);
  return (await response.json()) as CatalogProduct[];
}

export async function createProduct(values: Omit<CatalogProduct, "id" | "created_at" | "updated_at">) {
  const response = await supabaseRequest("/rest/v1/catalog_products", {
    method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(values),
  });
  return ((await response.json()) as CatalogProduct[])[0];
}

export async function updateProduct(id: string, values: Partial<CatalogProduct>) {
  const response = await supabaseRequest(`/rest/v1/catalog_products?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH", headers: { "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({ ...values, updated_at: new Date().toISOString() }),
  });
  return ((await response.json()) as CatalogProduct[])[0];
}

export async function uploadProductImage(file: File, objectPath: string) {
  await supabaseRequest(`/storage/v1/object/${PRODUCTS_BUCKET}/${objectPath}`, {
    method: "POST", headers: { "Content-Type": file.type, "x-upsert": "false" }, body: await file.arrayBuffer(),
  });
  const config = supabaseConfig();
  if (!config) throw new Error("Catalogue storage is not configured.");
  return { path: objectPath, url: `${config.url}/storage/v1/object/public/${PRODUCTS_BUCKET}/${objectPath}` };
}

export async function removeProductImage(objectPath: string) {
  await supabaseRequest(`/storage/v1/object/${PRODUCTS_BUCKET}`, {
    method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prefixes: [objectPath] }),
  });
}
