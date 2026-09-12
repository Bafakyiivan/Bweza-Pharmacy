export const site = {
  name: "Bweza Pharmacy",
  legalName: "Bweza Medicare Ltd",
  tagline: "Walk a Healthy Life",
  description:
    "A community-focused pharmacy in Kibuye, Kampala, serving individuals and organisations with medicine, wellness and medical-supply enquiries.",
  url: "https://www.bwezapharmacy.org",
  location: "Kibuye, Kampala, Uganda",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+256 750 664 777",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256750664777",
  email: process.env.NEXT_PUBLIC_EMAIL || "info@bwezapharmacy.org",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "7:30 AM–11:30 PM",
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7676080457277!2d32.57518327495725!3d0.28888046406727186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbdafdfa284cf%3A0xeef32a2bc9913c3f!2sBweza%20Pharmacy!5e0!3m2!1sen!2sug!4v1789154712426!5m2!1sen!2sug",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Bweza%20Pharmacy%2C%20Kibuye%2C%20Kampala",
};

export function whatsappHref(message: string) {
  if (!site.whatsapp) return "/contact#confirm-details";
  const number = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function phoneHref() {
  return site.phone ? `tel:${site.phone.replace(/[^+\d]/g, "")}` : "/contact";
}

export const isExternalWhatsApp = Boolean(site.whatsapp);
