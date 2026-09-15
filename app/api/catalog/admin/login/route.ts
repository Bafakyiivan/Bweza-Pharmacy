import { catalogueAdminIsConfigured, createAdminSession, isSameOrigin, verifyAdminPassword } from "@/lib/catalog-auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!catalogueAdminIsConfigured()) return Response.json({ error: "Staff catalogue access is awaiting configuration." }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";
  if (!verifyAdminPassword(password)) return Response.json({ error: "Incorrect staff password." }, { status: 401 });
  await createAdminSession();
  return Response.json({ ok: true });
}
