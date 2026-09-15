import { clearAdminSession, isSameOrigin } from "@/lib/catalog-auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  await clearAdminSession();
  return Response.json({ ok: true });
}
