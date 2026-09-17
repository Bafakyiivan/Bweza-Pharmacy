import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const feedbackFormUrl = "https://forms.gle/kN1wY9Vne2buYpHv5";

export const metadata: Metadata = {
  title: "Client Feedback",
  description: "Share feedback about your experience with Bweza Pharmacy in Kibuye, Kampala.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  return <>
    <PageHero
      eyebrow="Client feedback"
      title="Share your experience with Bweza Pharmacy."
      description="Your feedback helps us improve how we serve individual customers and organisations. The form takes only a few minutes to complete."
    />
    <section className="section section-soft">
      <div className="container form-shell">
        <div>
          <p className="eyebrow">Before you begin</p>
          <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>Genuine feedback helps us <span>serve you better.</span></h2>
          <div className="steps">
            <div className="step"><strong>Tell us about the service</strong><p>Select the pharmacy or corporate service you received and rate your experience.</p></div>
            <div className="step"><strong>Choose your privacy preference</strong><p>You decide whether your feedback may be published with your name, anonymously or kept completely private.</p></div>
            <div className="step"><strong>We review every response</strong><p>Feedback is reviewed by Bweza Pharmacy and is never published automatically.</p></div>
          </div>
        </div>
        <div className="form-card">
          <p className="eyebrow">Bweza Pharmacy Client Feedback</p>
          <h2>Ready to share your experience?</h2>
          <p>The feedback form opens securely in a new tab. Please do not include diagnoses, prescription details, medical records or other confidential health information.</p>
          <div className="button-row">
            <a
              className="button button-magenta"
              href={feedbackFormUrl}
              target="_blank"
              rel="noreferrer"
              data-conversion="feedback_form_click"
              data-intent="client_feedback"
              data-location="feedback_page"
            >
              Open feedback form
            </a>
          </div>
          <p className="small">By continuing, you will use a Google Form. Read our <Link href="/privacy">privacy notice</Link> for more information.</p>
        </div>
      </div>
    </section>
  </>;
}
