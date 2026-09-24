import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { GoogleEnquiryForm } from "@/components/google-enquiry-form";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = { title: "Corporate Procurement", description: "Request a quotation for pharmaceutical, first-aid and medical supplies from Bweza Pharmacy in Kampala.", alternates: { canonical: "/corporate" } };

const buyers = [
  {
    title: "Businesses & workplaces",
    description: "Workplace first-aid supplies, routine medical consumables and employee health essentials, supplied against an approved item list and quantity.",
  },
  {
    title: "Clinics & healthcare facilities",
    description: "Medicines, medical consumables and selected clinical supplies, subject to verified availability, specifications and applicable regulatory requirements.",
  },
  {
    title: "NGOs & community programmes",
    description: "Quotation support for outreach activities, community-health projects, medical kits and bulk consumable requirements.",
  },
  {
    title: "Schools & institutions",
    description: "First-aid kits, sickbay supplies, hygiene products and routine health essentials for schools and training institutions.",
  },
  {
    title: "Construction & engineering firms",
    description: "Site first-aid supplies, emergency-response consumables and scheduled replenishment based on workforce and project requirements.",
  },
  {
    title: "Oil & gas contractors",
    description: "Remote-site clinic supplies, first-aid and emergency consumables, and planned stock replenishment for field operations.",
  },
];

export default function CorporatePage() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I am requesting a corporate quotation. Organisation: [name]. Items and quantities: [list]. Required date: [date]. Delivery location: [location].");

  return (
    <>
      <PageHero
        eyebrow="Corporate procurement"
        title="Corporate medical supplies."
        description="Request medicines, first-aid items and medical supplies for your organisation."
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Who we support</p>
              <h2 className="heading">Supply support for <span>your sector.</span></h2>
            </div>
            <p className="lead">Send item names, quantities, location and required date.</p>
          </div>
          <div className="grid-3">
            {buyers.map((buyer, index) => (
              <article className="card" key={buyer.title}>
                <div className="icon-box">{String(index + 1).padStart(2, "0")}</div>
                <h3>{buyer.title}</h3>
                <p>{buyer.description}</p>
              </article>
            ))}
          </div>
          <div className="button-row">
            <a className="button" href="#corporate-quotation-form">Request a Corporate Quotation</a>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container form-shell">
          <div>
            <p className="eyebrow">Request for quotation</p>
            <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>Tell us exactly <span>what you need.</span></h2>
            <p className="lead">Include item names, quantities, delivery location and required date.</p>
            <div className="steps">
              <div className="step"><strong>Submit requirements</strong><p>Send your item list and quantities.</p></div>
              <div className="step"><strong>Availability review</strong><p>We check specifications and stock.</p></div>
              <div className="step"><strong>Receive quotation</strong><p>We prepare a formal quotation.</p></div>
              <div className="step"><strong>Confirm the order</strong><p>Approve the order and delivery plan.</p></div>
            </div>
            <div className="button-row">
              <a className="button button-magenta" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="corporate_enquiry" data-intent="corporate_quotation" data-location="corporate_page">Send requirements on WhatsApp</a>
            </div>
          </div>
          <div id="corporate-quotation-form">
            <GoogleEnquiryForm context="corporate" />
          </div>
        </div>
      </section>
    </>
  );
}
