export const site = {
  name: "Bweza Pharmacy",
  legalName: "Bweza Medicare Ltd",
  tagline: "Walk a Healthy Life",
  description:
    "A community-focused pharmacy in Kibuye, Kampala, serving individuals and organisations with medicine, wellness and medical-supply enquiries.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bwezapharmacy.com",
  location: "Kibuye, Kampala, Uganda",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+256 750 664 777",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256750664777",
  email: process.env.NEXT_PUBLIC_EMAIL || "info@bwezapharmacy.com",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "7:30 AM–11:30 PM",
  mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL || "",
};

export function whatsappHref(message: string) {
  if (!site.whatsapp) return "/contact#confirm-details";
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const isExternalWhatsApp = Boolean(site.whatsapp);
