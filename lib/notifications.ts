type Notification = {
  id: string;
  subject: string;
  lines: string[];
};

export async function sendInquiryNotification(notification: Notification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

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
      subject: notification.subject,
      text: notification.lines.join("\n"),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  return Boolean(response?.ok);
}
