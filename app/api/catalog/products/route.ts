import { randomUUID } from "node:crypto";
import { createProduct, listProducts, productCategories, removeProductImage, stockStatuses, uploadProductImage } from "@/lib/catalog";
import { isCatalogAdmin, isSameOrigin } from "@/lib/catalog-auth";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
function field(form: FormData, key: string, max: number) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function slugify(value: string) {
  const base = value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
  return `${base || "product"}-${randomUUID().slice(0, 8)}`;
}

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("admin") === "1";
  if (admin && !(await isCatalogAdmin())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  try { return Response.json({ products: await listProducts(admin) }); }
  catch { return Response.json({ error: "The catalogue could not be loaded." }, { status: 503 }); }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await isCatalogAdmin())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const form = await request.formData();
  const name = field(form, "name", 120);
  const category = field(form, "category", 80);
  const description = field(form, "description", 600);
  const stockStatus = field(form, "stock_status", 30);
  const rawPrice = field(form, "price_ugx", 12);
  const price = rawPrice ? Number(rawPrice) : null;
  const showPrice = form.get("show_price") === "true";
  const image = form.get("image");
  if (name.length < 2 || description.length < 10) return Response.json({ error: "Add a product name and a clear description." }, { status: 400 });
  if (!productCategories.includes(category as (typeof productCategories)[number]) || !stockStatuses.includes(stockStatus as (typeof stockStatuses)[number])) return Response.json({ error: "Select valid product options." }, { status: 400 });
  if (price !== null && (!Number.isInteger(price) || price < 0 || price > 100_000_000)) return Response.json({ error: "Enter a valid UGX price." }, { status: 400 });
  if (showPrice && (!price || price <= 0)) return Response.json({ error: "Add a price or switch off ‘Show price’." }, { status: 400 });
  if (!(image instanceof File) || image.size === 0) return Response.json({ error: "Upload a product photograph." }, { status: 400 });
  if (!allowedImageTypes.has(image.type) || image.size > 5_000_000) return Response.json({ error: "Use a JPG, PNG or WebP image no larger than 5 MB." }, { status: 400 });
  const extension = image.type === "image/png" ? "png" : image.type === "image/webp" ? "webp" : "jpg";
  const uploaded = await uploadProductImage(image, `${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`);
  try {
    const product = await createProduct({
      name, slug: slugify(name), category: category as (typeof productCategories)[number],
      pack_size: field(form, "pack_size", 100) || null, description, price_ugx: price, show_price: showPrice,
      stock_status: stockStatus as (typeof stockStatuses)[number], requires_prescription: form.get("requires_prescription") === "true",
      image_path: uploaded.path, image_url: uploaded.url, is_published: form.get("is_published") === "true", is_archived: false, display_order: 0,
    });
    return Response.json({ product }, { status: 201 });
  } catch (error) {
    await removeProductImage(uploaded.path).catch(() => undefined);
    throw error;
  }
}
