const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,29}$/;

export function text(form: FormData, key: string, max = 2000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validateBase(form: FormData, requireEmail = true) {
  const name = text(form, "name", 100);
  const phone = text(form, "phone", 30);
  const email = text(form, "email", 160);
  if (text(form, "website", 200)) return { ok: false as const, message: "Invalid submission." };
  if (name.length < 2) return { ok: false as const, message: "Please enter your full name." };
  if (!phonePattern.test(phone)) return { ok: false as const, message: "Please enter a valid phone or WhatsApp number." };
  if ((requireEmail || email) && !emailPattern.test(email)) return { ok: false as const, message: "Please enter a valid email address." };
  return { ok: true as const, name, phone, email };
}

export function validWebhook(value: string | undefined) {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === "https:" ? url.toString() : null; } catch { return null; }
}
