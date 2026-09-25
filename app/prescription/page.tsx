import type { Metadata } from "next";
import Link from "next/link";
import { Message } from "@/components/icons";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/page-hero";
import { emailHref, isExternalWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prescription Review",
  description:
    "Start a prescription request with Bweza Pharmacy on WhatsApp or use the secure website upload for pharmacist review.",
  alternates: { canonical: "/prescription" },
  robots: { index: true, follow: true },
};

export default function PrescriptionPage() {
  const prescriptionWhatsApp = whatsappHref(
    "Hello Bweza Pharmacy. I would like to submit a prescription for pharmacist review. Please guide me on the next step.",
  );
  const prescriptionEmail = emailHref(
    "Prescription Review Request",
    "Name: [name]\nTelephone: [number]\nMedicine enquiry: [details]\nCollection or delivery location: [location]\n\nIf attaching a prescription, send only what is necessary. Do not include identification or payment details.",
  );

  return (
    <>
      <PageHero
        eyebrow="Prescription review"
        title="Prescription review on WhatsApp."
        description="Send a valid prescription when requested. Stock and pricing are confirmed after pharmacist review."
      />
      <section className="section section-soft">
        <div className="container form-shell">
          <div className="info-panel">
            <p className="eyebrow">What happens next</p>
            <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
              Three simple <span>steps.</span>
            </h2>
            <div className="steps">
              <div className="step">
                <strong>Start on WhatsApp</strong>
                <p>Open WhatsApp and request a prescription review.</p>
              </div>
              <div className="step">
                <strong>Share only what is needed</strong>
                <p>Send only the requested prescription image—never IDs or payment details.</p>
              </div>
              <div className="step">
                <strong>Receive the next step</strong>
                <p>We will confirm stock, price and collection or delivery.</p>
              </div>
            </div>
            <div className="notice" style={{ marginTop: 30 }}>
              <strong>Important:</strong> This service is not for emergencies. Prescription medicines require pharmacist review and a valid prescription where applicable.
            </div>
          </div>

          <div className="form-card">
            <p className="eyebrow">Contact options</p>
            <h2>Email or WhatsApp the pharmacy team</h2>
            <p>
              Choose email or open a ready-made WhatsApp message to begin.
            </p>
            <div className="button-row">
              <a
                className="button button-secondary"
                href={prescriptionEmail}
                data-conversion="prescription_email_click"
                data-intent="prescription_review"
                data-location="prescription_page"
              >
                Email prescription enquiry
              </a>
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
            <p className="small">
              Email may not be encrypted. Send only what is needed—never identification or payment details. Read our <Link href="/privacy">privacy notice</Link> for more information.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container form-shell">
          <div>
            <p className="eyebrow">Secondary option</p>
            <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
              Prefer to upload through the <span>website?</span>
            </h2>
            <p className="lead">
              Upload a clear prescription securely. Files remain private.
            </p>
            <div className="notice">
              JPEG, PNG or PDF only. Maximum size: 5 MB.
            </div>
          </div>
          <InquiryForm kind="prescription" />
        </div>
      </section>
    </>
  );
}
