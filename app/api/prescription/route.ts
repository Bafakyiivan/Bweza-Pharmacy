import { NextResponse } from "next/server";
import { sendInquiryNotification } from "@/lib/notifications";
import { deletePrivatePrescription, insertRow, isSupabaseConfigured, uploadPrivatePrescription } from "@/lib/supabase-admin";
import { text, validateBase } from "@/lib/validation";

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
  if (!isSupabaseConfigured()) return NextResponse.json({ message: "Secure prescription delivery is awaiting final setup. Please use phone or WhatsApp." }, { status: 503 });
  const id = crypto.randomUUID();
  const extension = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg";
  const path = `${new Date().toISOString().slice(0, 10)}/${id}.${extension}`;
  const consentedAt = new Date().toISOString();
  try {
    await uploadPrivatePrescription(path, file);
    try {
      await insertRow("prescription_inquiries", { id, name: base.name, phone: base.phone, email: base.email || null, message: text(form,"message",2000) || null, storage_path: path, original_file_name: file.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(0, 180), mime_type: file.type, file_size: file.size, consented_at: consentedAt });
    } catch (error) {
      await deletePrivatePrescription(path);
      throw error;
    }
    await sendInquiryNotification({ id, kind: "prescription" });
  } catch {
    return NextResponse.json({ message: "We could not securely save the prescription inquiry. Please contact the pharmacy directly." }, { status: 502 });
  }
  return NextResponse.json({ message: "Your prescription inquiry has been received. The pharmacy team will review it before confirming the next step." });
}
