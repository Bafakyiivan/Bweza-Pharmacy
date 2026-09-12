import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { isExternalWhatsApp, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "General Body Screening in Kibuye, Kampala",
  description: "Ask about General Body Screening at Bweza Pharmacy in Kibuye, Kampala. Confirm availability, preparation and the UGX 60,000 service price.",
  alternates: { canonical: "/screening" },
};

export default function ScreeningPage() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I would like to book or ask about the UGX 60,000 General Body Screening service. Please confirm availability and preparation requirements.");

  return <>
    <PageHero eyebrow="General Body Screening" title="Start with a clearer picture of your health." description="Ask about our UGX 60,000 General Body Screening service in Kibuye, confirm availability and receive preparation guidance before visiting." />
    <section className="section"><div className="container split"><div><p className="eyebrow">Screening enquiry</p><h2 className="heading">Confirm your visit <span>before you come.</span></h2><p className="lead">Screening availability and the checks included may vary. Contact the pharmacy team before travelling so they can confirm the current service, preparation requirements and an appropriate visit time.</p><div className="price-card"><span>Current service price</span><strong>UGX 60,000</strong><small>Confirm availability and what is included before visiting.</small></div><div className="button-row"><a className="button button-magenta" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="screening_enquiry" data-intent="general_body_screening" data-location="screening_page">Ask or book on WhatsApp</a><a className="button button-secondary" href={phoneHref()} data-conversion="phone_click" data-intent="general_body_screening" data-location="screening_page">Call pharmacy</a></div></div><div className="card"><div className="icon-box">+</div><h2>What happens next</h2><div className="steps"><div className="step"><strong>Ask about availability</strong><p>Tell the team which day you would like to visit.</p></div><div className="step"><strong>Receive preparation guidance</strong><p>Follow only the instructions given for the screening checks confirmed by the team.</p></div><div className="step"><strong>Visit Bweza Pharmacy</strong><p>Find us in {site.location}. Screening does not replace medical diagnosis or emergency care.</p></div></div><div className="button-row"><a className="button" href={site.directionsUrl} target="_blank" rel="noreferrer" data-conversion="directions_click" data-intent="general_body_screening" data-location="screening_page">Get directions</a><Link className="button button-secondary" href="/services">Other services</Link></div></div></div></section>
    <section className="section section-soft"><div className="container"><div className="notice"><strong>Health notice:</strong> Screening results may require interpretation or follow-up by an appropriately qualified health professional. Do not use this service instead of urgent medical assessment when you are seriously unwell.</div></div></section>
  </>;
}
