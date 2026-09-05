import { NextResponse } from "next/server";
import { text, validateBase, validWebhook } from "@/lib/validation";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 100_000) return NextResponse.json({ message: "Submission is too large." }, { status: 413 });
  const form = await request.formData();
  const base = validateBase(form, true);
  if (!base.ok) return NextResponse.json({ message: base.message }, { status: 400 });
  const kind = text(form, "kind", 20);
  const message = text(form, "message", 2000);
  if (!message) return NextResponse.json({ message: "Please describe how we can help." }, { status: 400 });
  const endpoint = validWebhook(process.env.CONTACT_WEBHOOK_URL);
  if (!endpoint) return NextResponse.json({ message: "Online submissions are awaiting final setup. Please use the confirmed phone or WhatsApp details once published." }, { status: 503 });
  const payload = { kind, name: base.name, phone: base.phone, email: base.email, message, organisation: text(form,"organisation",140), sector: text(form,"sector",80), deadline: text(form,"deadline",20), submittedAt: new Date().toISOString() };
  const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(8000), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ message: "We could not deliver the enquiry. Please try WhatsApp or phone." }, { status: 502 });
  return NextResponse.json({ message: kind === "corporate" ? "Thank you. Your quotation request has been received." : "Thank you. Your enquiry has been received." });
}
