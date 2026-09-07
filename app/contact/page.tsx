import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InquiryForm } from "@/components/inquiry-form";
import { isExternalWhatsApp, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Bweza Pharmacy in Kibuye, Kampala for product, prescription, service and corporate procurement enquiries.",
  alternates: { canonical: "/contact" },
};

function value(currentValue: string, fallback: string) {
  return currentValue || fallback;
}

export default function ContactPage() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I would like to make an enquiry.");
  return <>
    <PageHero eyebrow="Contact" title="Talk to Bweza Pharmacy." description="Choose the most convenient contact route for a product, pharmacy service, prescription or organisational supply enquiry." />
    <section className="section"><div className="container">
      <div className="contact-cards" id="confirm-details">
        <div className="contact-card"><span>Location</span><strong>{site.location}</strong></div>
        <div className="contact-card"><span>Phone</span><strong className={!site.phone ? "confirmation" : undefined}>{value(site.phone, "Awaiting confirmation")}</strong></div>
        <a className="contact-card" href={`mailto:${site.email}`} aria-label={`Email Bweza Pharmacy at ${site.email}`}><span>Email — tap to send</span><strong className={!site.email ? "confirmation" : undefined}>{value(site.email, "Awaiting confirmation")}</strong></a>
        <div className="contact-card"><span>Business hours</span><strong className={!site.hours ? "confirmation" : undefined}>{value(site.hours, "Awaiting confirmation")}</strong></div>
      </div>
      {!site.phone || !site.whatsapp || !site.email || !site.hours ? <div className="notice" style={{ marginTop: 24 }}><strong>Before launch:</strong> Bweza Pharmacy must confirm its public phone number, WhatsApp number, email address and business hours. They have intentionally not been invented.</div> : null}
    </div></section>
    <section className="section section-soft"><div className="container form-shell">
      <div><p className="eyebrow">General enquiry</p><h2 className="heading" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>How can we <span>help?</span></h2><p className="lead">Send a short, clear message. Do not include sensitive health information here; use the prescription route where appropriate.</p><div className="button-row"><a className="button button-magenta" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined}>Open WhatsApp</a></div></div>
      <InquiryForm kind="contact" />
    </div></section>
    <section className="section"><div className="container">{site.mapEmbedUrl ? <iframe title="Map showing Bweza Pharmacy" src={site.mapEmbedUrl} width="100%" height="400" style={{ border: 0, borderRadius: 24 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="map-placeholder"><div><p className="eyebrow">Kibuye, Kampala</p><h2>Exact map pin awaiting confirmation</h2><p className="lead">The verified Google Maps location will be embedded here before launch.</p></div></div>}</div></section>
  </>;
}
