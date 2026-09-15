import { randomUUID } from "node:crypto";
import { productCategories, removeProductImage, stockStatuses, updateProduct, uploadProductImage } from "@/lib/catalog";
import { isCatalogAdmin, isSameOrigin } from "@/lib/catalog-auth";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
function field(form: FormData, key: string, max: number) { const value = form.get(key); return typeof value === "string" ? value.trim().slice(0, max) : ""; }

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await isCatalogAdmin())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await context.params;
  const form = await request.formData();
  const name = field(form, "name", 120), category = field(form, "category", 80), description = field(form, "description", 600), stockStatus = field(form, "stock_status", 30);
  const rawPrice = field(form, "price_ugx", 12), price = rawPrice ? Number(rawPrice) : null;
  const showPrice = form.get("show_price") === "true";
  if (name.length < 2 || description.length < 10) return Response.json({ error: "Add a product name and a clear description." }, { status: 400 });
  if (!productCategories.includes(category as (typeof productCategories)[number]) || !stockStatuses.includes(stockStatus as (typeof stockStatuses)[number])) return Response.json({ error: "Select valid product options." }, { status: 400 });
  if (price !== null && (!Number.isInteger(price) || price < 0 || price > 100_000_000)) return Response.json({ error: "Enter a valid UGX price." }, { status: 400 });
  if (showPrice && (!price || price <= 0)) return Response.json({ error: "Add a price or switch off ‘Show price’." }, { status: 400 });
  const image = form.get("image"), currentImagePath = field(form, "current_image_path", 300);
  let nextImage: { path: string; url: string } | null = null;
  if (image instanceof File && image.size > 0) {
    if (!allowedImageTypes.has(image.type) || image.size > 5_000_000) return Response.json({ error: "Use a JPG, PNG or WebP image no larger than 5 MB." }, { status: 400 });
    const extension = image.type === "image/png" ? "png" : image.type === "image/webp" ? "webp" : "jpg";
    nextImage = await uploadProductImage(image, `${new Date().getUTCFullYear()}/${randomUUID()}.${extension}`);
  }
  try {
    const product = await updateProduct(id, {
      name, category: category as (typeof productCategories)[number], pack_size: field(form, "pack_size", 100) || null,
      description, price_ugx: price, show_price: showPrice, stock_status: stockStatus as (typeof stockStatuses)[number],
      requires_prescription: form.get("requires_prescription") === "true", is_published: form.get("is_published") === "true",
      ...(nextImage ? { image_path: nextImage.path, image_url: nextImage.url } : {}),
    });
    if (nextImage && currentImagePath) await removeProductImage(currentImagePath).catch(() => undefined);
    return Response.json({ product });
  } catch (error) {
    if (nextImage) await removeProductImage(nextImage.path).catch(() => undefined);
    throw error;
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await isCatalogAdmin())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await context.params;
  return Response.json({ product: await updateProduct(id, { is_archived: true, is_published: false }) });
}
