import type { Metadata } from "next";
import Image from "next/image";
import { GoogleEnquiryForm } from "@/components/google-enquiry-form";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate Medical Supplies",
  description: "Request medicines, first-aid items and medical supplies for businesses, clinics, NGOs, schools, construction and oil and gas operations in Uganda.",
  alternates: { canonical: "/corporate" },
};

const sectors = [
  {
    title: "Businesses & workplaces",
    description: "Workplace first-aid kits, routine medical consumables and employee health essentials.",
    image: "/images/corporate/businesses-workplaces.webp",
    alt: "Workplace building with a first-aid supply kit",
  },
  {
    title: "Clinics & healthcare facilities",
    description: "Medicines, medical consumables and selected clinical supplies.",
    image: "/images/corporate/clinics-healthcare-facilities.webp",
    alt: "Clinic building with medicines and medical supplies",
  },
  {
    title: "NGOs & community programmes",
    description: "Outreach medical kits, community-health supplies and bulk consumables.",
    image: "/images/corporate/ngos-community-programmes.webp",
    alt: "Community outreach team with organised medical kits",
  },
  {
    title: "Schools & institutions",
    description: "First-aid kits, sickbay supplies, hygiene products and health essentials.",
    image: "/images/corporate/schools.svg",
    alt: "School building with first-aid and health supplies",
  },
  {
    title: "Construction & engineering",
    description: "Site first-aid supplies, emergency consumables and planned replenishment.",
    image: "/images/corporate/construction.svg",
    alt: "Construction safety equipment with a first-aid kit",
  },
  {
    title: "Oil & gas operations",
    description: "Remote-site clinic supplies, emergency consumables and field medical kits.",
    image: "/images/corporate/oil-gas.svg",
    alt: "Oil and gas field site with remote medical supplies",
  },
];

const assurances = [
  ["01", "Itemised quotations", "Clear products, quantities and commercial terms."],
  ["02", "Pharmacy review", "Medicine requests are reviewed before confirmation."],
  ["03", "Delivery planning", "Location, timing and fees are agreed before dispatch."],
  ["04", "Responsive support", "WhatsApp and quotation-form options are available."],
];

export default function CorporatePage() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I am requesting a corporate quotation. Organisation: [name]. Items and quantities: [list]. Required date: [date]. Delivery location: [location].");

  return (
    <>
      <section className="corporate-hero">
        <div className="container corporate-hero-grid">
          <div className="corporate-hero-copy">
            <p className="eyebrow">Corporate medical supplies</p>
            <h1 className="display">Reliable supply support for <span>your organisation.</span></h1>
            <p className="lead">Request medicines, first-aid items and medical supplies from Bweza Pharmacy in Kibuye, Kampala.</p>
            <div className="button-row">
              <a className="button button-magenta" href="#corporate-quotation-form">Request a quotation</a>
              <a className="button button-secondary" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="corporate_enquiry" data-intent="corporate_quotation" data-location="corporate_hero">Send list on WhatsApp</a>
            </div>
            <div className="trust-inline">
              <span><i>✓</i> Itemised requests</span>
              <span><i>✓</i> Formal quotations</span>
              <span><i>✓</i> Delivery coordination</span>
            </div>
          </div>
          <div className="corporate-hero-photo">
            <Image src="/images/pharmacy-interior-wide.jpg" alt="Bweza Pharmacy team serving customers inside the Kibuye pharmacy" fill priority sizes="(max-width: 1000px) 100vw, 48vw" />
            <div className="corporate-photo-label"><strong>Bweza Medicare Ltd</strong><span>Kibuye, Kampala</span></div>
          </div>
        </div>
      </section>

      <section className="section corporate-assurance-section">
        <div className="container">
          <div className="corporate-assurance-grid">
            {assurances.map(([number, title, text]) => (
              <article className="corporate-assurance" key={title}>
                <span>{number}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Who we support</p>
              <h2 className="heading">Supply solutions for <span>your sector.</span></h2>
            </div>
            <p className="lead">Select your sector, then send the item names, quantities, delivery location and required date.</p>
          </div>
          <div className="grid-3 corporate-sector-grid">
            {sectors.map((sector) => (
              <article className="card corporate-sector-card" key={sector.title}>
                <div className="corporate-sector-image">
                  <Image src={sector.image} alt={sector.alt} fill unoptimized={sector.image.endsWith(".svg")} sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                </div>
                <div className="corporate-sector-body">
                  <h3>{sector.title}</h3>
                  <p>{sector.description}</p>
                  <a className="card-link" href="#corporate-quotation-form">Request supplies →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="corporate-process">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">How procurement works</p>
              <h2 className="heading">From requirement list to <span>formal quotation.</span></h2>
            </div>
            <p className="lead">A clear request helps us respond faster and more accurately.</p>
          </div>
          <div className="corporate-process-grid">
            <article><b>1</b><h3>Send your list</h3><p>Include item names, specifications and quantities.</p></article>
            <article><b>2</b><h3>We review</h3><p>We check requirements and possible availability.</p></article>
            <article><b>3</b><h3>Receive a quotation</h3><p>Review the itemised offer and commercial terms.</p></article>
            <article><b>4</b><h3>Confirm supply</h3><p>Agree on payment, collection or delivery.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container form-shell">
          <div>
            <p className="eyebrow">Request a quotation</p>
            <h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>Tell us what <span>you need.</span></h2>
            <p className="lead">Include item names, quantities, delivery location and required date.</p>
            <div className="notice"><strong>Please note:</strong> Supply is subject to availability, pharmacist review and applicable regulatory requirements.</div>
            <div className="button-row">
              <a className="button button-magenta" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="corporate_enquiry" data-intent="corporate_quotation" data-location="corporate_form">Send requirements on WhatsApp</a>
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
