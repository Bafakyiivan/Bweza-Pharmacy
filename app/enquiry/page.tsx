import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const enquiryFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdh7FiyAl5KVgQ0VZUR6DDiYLSMx7biB4twGObXaemJ9kp6Ag/viewform";

export const metadata: Metadata = {
  title: "Online Enquiry",
  description:
    "Send a general enquiry or request a corporate quotation from Bweza Pharmacy in Kibuye, Kampala.",
  alternates: { canonical: "/enquiry" },
};

export default function EnquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Online enquiry"
        title="Tell Bweza Pharmacy how we can help."
        description="Use our enquiry form for a general question or a corporate quotation request."
      />
      <section className="section section-soft">
        <div className="container form-shell">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>
              One form for <span>two enquiry types.</span>
            </h2>
            <div className="steps">
              <div className="step">
                <strong>Choose your enquiry type</strong>
                <p>Select General Enquiry or Corporate Quotation Request when the form opens.</p>
              </div>
              <div className="step">
                <strong>Provide clear details</strong>
                <p>Tell us what you need and include the best contact information for our response.</p>
              </div>
              <div className="step">
                <strong>Our team reviews your request</strong>
                <p>Bweza Pharmacy will review the information and respond using the contact details provided.</p>
              </div>
            </div>
          </div>

          <div className="form-card">
            <p className="eyebrow">General and corporate enquiries</p>
            <h2>Open the enquiry form</h2>
            <p>
              The Google Form opens in a new tab. Choose the option that matches your request and complete the relevant questions.
            </p>
            <div className="button-row">
              <a
                className="button button-magenta"
                href={enquiryFormUrl}
                target="_blank"
                rel="noreferrer"
                data-conversion="enquiry_form_open"
                data-intent="general_or_corporate_enquiry"
                data-location="enquiry_page"
              >
                Open enquiry form
              </a>
              <Link className="button button-secondary" href="/prescription">
                Prescription enquiry
              </Link>
            </div>
            <p className="small">
              Please do not submit prescription images or confidential medical records through this form. Use our dedicated prescription page when appropriate. By continuing, you will use a Google Form. Read our <Link href="/privacy">privacy notice</Link> for more information.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
