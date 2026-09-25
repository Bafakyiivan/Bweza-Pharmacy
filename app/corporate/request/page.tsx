import type { Metadata } from "next";
import { GoogleEnquiryForm } from "@/components/google-enquiry-form";
import { emailHref, isExternalWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request Corporate Supplies",
  description: "Send your corporate medical-supply requirements to Bweza Pharmacy by email, WhatsApp or online quotation form.",
  alternates: { canonical: "/corporate/request" },
};

export default function CorporateRequestPage() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I am requesting a corporate quotation. Organisation: [name]. Items and quantities: [list]. Required date: [date]. Delivery location: [location].");
  const corporateEmail = emailHref("Corporate Quotation Request");

  return (
    <>
      <section className="section section-soft">
        <div className="container">
          <p className="eyebrow">Corporate supply request</p>
          <h1 className="display">Choose how to send <span>your requirements.</span></h1>
          <p className="lead">Use email for an attached PDF or Excel list, WhatsApp for a quick enquiry, or complete the online quotation form.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            <article className="card">
              <p className="eyebrow">Email</p>
              <h2>Attach your supply list</h2>
              <p>Send your PDF, Excel sheet or written requirements to info@bwezapharmacy.org.</p>
              <a
                className="button button-magenta"
                href={corporateEmail}
                data-conversion="email_click"
                data-intent="corporate_quotation"
                data-location="corporate_request_page"
              >
                Email requirements
              </a>
            </article>

            <article className="card">
              <p className="eyebrow">WhatsApp</p>
              <h2>Start a quick enquiry</h2>
              <p>Send item names, quantities, delivery location and the date you need them.</p>
              <a
                className="button button-secondary"
                href={wa}
                target={isExternalWhatsApp ? "_blank" : undefined}
                rel={isExternalWhatsApp ? "noreferrer" : undefined}
                data-conversion="corporate_enquiry"
                data-intent="corporate_quotation"
                data-location="corporate_request_page"
              >
                Send on WhatsApp
              </a>
            </article>

            <article className="card">
              <p className="eyebrow">Online form</p>
              <h2>Submit a quotation request</h2>
              <p>Complete the structured form below so the pharmacy team can review your request.</p>
              <a className="button button-secondary" href="#quotation-form">
                Complete online form
              </a>
            </article>
          </div>

          <div className="notice" style={{ marginTop: "2rem" }}>
            <strong>Please note:</strong> Supply is subject to availability, pharmacist review and applicable regulatory requirements.
          </div>
        </div>
      </section>

      <section className="section section-soft" id="quotation-form">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Google quotation form</p>
              <h2 className="heading">Submit your <span>requirements online.</span></h2>
            </div>
            <p className="lead">Include item names, quantities, delivery location and required date.</p>
          </div>
          <GoogleEnquiryForm context="corporate" />
        </div>
      </section>
    </>
  );
}
