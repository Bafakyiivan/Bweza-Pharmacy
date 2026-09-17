import type { Metadata } from "next";
import Link from "next/link";
import { Message } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prescription Review",
  description:
    "Start a prescription request with Bweza Pharmacy on WhatsApp for pharmacist review and next-step guidance.",
  alternates: { canonical: "/prescription" },
  robots: { index: true, follow: true },
};

export default function PrescriptionPage() {
  const prescriptionWhatsApp = whatsappHref(
    "Hello Bweza Pharmacy. I would like to submit a prescription for pharmacist review. Please guide me on the next step.",
  );

  return (
    <>
      <PageHero
        eyebrow="Prescription review"
        title="Start your prescription request on WhatsApp."
        description="Contact our pharmacy team for guidance and pharmacist review. Sending a prescription does not confirm stock, price or supply."
      />
      <section className="section section-soft">
        <div className="container form-shell">
          <div className="info-panel">
            <p className="eyebrow">What happens next</p>
            <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
              A clear, responsible <span>review process.</span>
            </h2>
            <div className="steps">
              <div className="step">
                <strong>Start on WhatsApp</strong>
                <p>Open the pharmacy WhatsApp conversation and tell us that you need a prescription review.</p>
              </div>
              <div className="step">
                <strong>Share only what is needed</strong>
                <p>Send a clear prescription image when requested. Do not send identification, payment information or unrelated medical records.</p>
              </div>
              <div className="step">
                <strong>Receive the next step</strong>
                <p>After pharmacist review, the team will explain availability and any collection, payment or further review requirements.</p>
              </div>
            </div>
            <div className="notice" style={{ marginTop: 30 }}>
              <strong>Important:</strong> This service is not for emergencies. Prescription medicines require pharmacist review and a valid prescription where applicable.
            </div>
          </div>

          <div className="form-card">
            <p className="eyebrow">Recommended route</p>
            <h2>Contact the pharmacy team on WhatsApp</h2>
            <p>
              The button opens a prefilled message so the team can guide you through the prescription-review process.
            </p>
            <div className="button-row">
              <a
                className="button button-magenta"
                href={prescriptionWhatsApp}
                target={isExternalWhatsApp ? "_blank" : undefined}
                rel={isExternalWhatsApp ? "noreferrer" : undefined}
                data-conversion="prescription_whatsapp_click"
                data-intent="prescription_review"
                data-location="prescription_page"
              >
                <Message /> Start prescription request
              </a>
            </div>
            <div className="notice" style={{ marginTop: 24 }}>
              <strong>Secure website upload:</strong> Temporarily unavailable while we verify the complete storage and staff-retrieval workflow. Please use the WhatsApp route above.
            </div>
            <p className="small">
              Send only the information needed for this request. Read our <Link href="/privacy">privacy notice</Link> for more information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
