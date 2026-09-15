import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "bweza_catalog_admin";
const SESSION_SECONDS = 8 * 60 * 60;

function secret() { return process.env.SUPABASE_SERVICE_ROLE_KEY; }
function safeEqual(left: string, right: string) {
  return timingSafeEqual(createHash("sha256").update(left).digest(), createHash("sha256").update(right).digest());
}
export function catalogueAdminIsConfigured() { return Boolean(process.env.CATALOG_ADMIN_PASSWORD && secret()); }
export function verifyAdminPassword(password: string) {
  const configured = process.env.CATALOG_ADMIN_PASSWORD;
  return Boolean(configured && configured.length >= 12 && safeEqual(password, configured));
}
function signature(expiresAt: string) {
  const key = secret();
  return key ? createHmac("sha256", key).update(`catalog-admin:${expiresAt}`).digest("base64url") : "";
}
export async function createAdminSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  (await cookies()).set(COOKIE_NAME, `${expiresAt}.${signature(expiresAt)}`, {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: SESSION_SECONDS,
  });
}
export async function clearAdminSession() {
  (await cookies()).set(COOKIE_NAME, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
}
export async function isCatalogAdmin() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value || !secret()) return false;
  const [expiresAt, signed] = value.split(".");
  return Boolean(expiresAt && signed && Number(expiresAt) > Math.floor(Date.now() / 1000) && safeEqual(signed, signature(expiresAt)));
}
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
