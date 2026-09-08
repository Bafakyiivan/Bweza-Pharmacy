import { NextResponse } from "next/server";
import { sendInquiryNotification } from "@/lib/notifications";
import { insertRow, isSupabaseConfigured } from "@/lib/supabase-admin";
import { text, validateBase } from "@/lib/validation";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 100_000) return NextResponse.json({ message: "Submission is too large." }, { status: 413 });
  const form = await request.formData();
  const base = validateBase(form, true);
  if (!base.ok) return NextResponse.json({ message: base.message }, { status: 400 });
  const kind = text(form, "kind", 20);
  const message = text(form, "message", 2000);
  if (!message) return NextResponse.json({ message: "Please describe how we can help." }, { status: 400 });
  if (!isSupabaseConfigured()) return NextResponse.json({ message: "Online submissions are awaiting final setup. Please use phone or WhatsApp." }, { status: 503 });
  const payload = { kind: kind === "corporate" ? "corporate" : "contact", name: base.name, phone: base.phone, email: base.email, message, organisation: text(form,"organisation",140) || null, sector: text(form,"sector",80) || null, deadline: text(form,"deadline",20) || null };
  try {
    const record = await insertRow("inquiries", payload);
    const id = String(record.id || crypto.randomUUID());
    await sendInquiryNotification({ id, kind: payload.kind });
  } catch {
    return NextResponse.json({ message: "We could not save the enquiry. Please use WhatsApp or phone." }, { status: 502 });
  }
  return NextResponse.json({ message: kind === "corporate" ? "Thank you. Your quotation request has been received." : "Thank you. Your enquiry has been received." });
}
