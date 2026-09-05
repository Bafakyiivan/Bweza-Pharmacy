import { NextResponse } from "next/server";
import { text, validateBase, validWebhook } from "@/lib/validation";

const allowed = new Set(["image/jpeg", "image/png", "application/pdf"]);

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 5_500_000) return NextResponse.json({ message: "The prescription file must be 5 MB or smaller." }, { status: 413 });
  const form = await request.formData();
  const base = validateBase(form, false);
  if (!base.ok) return NextResponse.json({ message: base.message }, { status: 400 });
  if (text(form, "consent", 10) !== "yes") return NextResponse.json({ message: "Consent is required before submitting health information." }, { status: 400 });
  const file = form.get("prescription");
  if (!(file instanceof File) || file.size === 0) return NextResponse.json({ message: "Please attach a prescription file." }, { status: 400 });
  if (file.size > 5_000_000 || !allowed.has(file.type)) return NextResponse.json({ message: "Use a JPEG, PNG or PDF file no larger than 5 MB." }, { status: 400 });
  const endpoint = validWebhook(process.env.PRESCRIPTION_WEBHOOK_URL);
  if (!endpoint) return NextResponse.json({ message: "Secure prescription delivery is awaiting final setup. Please use the confirmed pharmacy contact once published." }, { status: 503 });
  const outgoing = new FormData();
  outgoing.set("name", base.name); outgoing.set("phone", base.phone); outgoing.set("email", base.email); outgoing.set("message", text(form,"message",2000)); outgoing.set("consent", "yes"); outgoing.set("submittedAt", new Date().toISOString()); outgoing.set("prescription", file, file.name.replace(/[^a-zA-Z0-9._-]/g,"_"));
  const response = await fetch(endpoint, { method: "POST", body: outgoing, signal: AbortSignal.timeout(12000), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ message: "We could not deliver the prescription enquiry. Please contact the pharmacy directly." }, { status: 502 });
  return NextResponse.json({ message: "Your prescription inquiry has been received. The pharmacy team will review it before confirming the next step." });
}
