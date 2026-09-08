type NotificationKind = "contact" | "corporate" | "prescription";

type Notification = {
  id: string;
  kind: NotificationKind;
};

const DEFAULT_NOTIFICATION_EMAIL = "info@bwezapharmacy.org";
const DEFAULT_FROM_EMAIL = "Bweza Website <website@bwezapharmacy.org>";

const labels: Record<NotificationKind, string> = {
  contact: "general website enquiry",
  corporate: "corporate quotation request",
  prescription: "private prescription enquiry",
};

export async function sendInquiryNotification(notification: Notification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL || DEFAULT_FROM_EMAIL;

  if (!apiKey) {
    console.warn("Staff email notification skipped: RESEND_API_KEY is not configured.");
    return false;
  }

  const label = labels[notification.kind];
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `bweza-${notification.id}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New Bweza Pharmacy ${label}`,
      text: [
        `A new ${label} has been received.`,
        `Reference: ${notification.id}`,
        "",
        "Open the secure Supabase dashboard to review and respond.",
        "No customer contact details, enquiry message or prescription file are included in this email.",
      ].join("\n"),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("Staff email notification could not be sent.", {
      status: response?.status ?? "network-error",
    });
    return false;
  }

  return true;
}
