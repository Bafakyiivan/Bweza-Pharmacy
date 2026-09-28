import Image from "next/image";
import Link from "next/link";
import { Arrow, Message } from "@/components/icons";
import { CtaBand } from "@/components/cta-band";
import { DynamicHomeHero } from "@/components/dynamic-home-hero";
import { SectionReveals } from "@/components/section-reveals";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

const categories = [
  ["Rx", "Prescription medicines", "Send a valid prescription for pharmacist review."],
  ["+", "First aid", "Everyday first-aid supplies for homes and workplaces."],
  ["V", "Vitamins & supplements", "Everyday nutrition and wellness products."],
  ["M", "Medical supplies", "Health supplies for people and organisations."],
];

export default function Home() {
  const deliveryWa = whatsappHref("Hello Bweza Pharmacy, I would like to ask about delivery. My location is [town/district] and I need [product or prescription details].");
  return <>
    <SectionReveals />
    <DynamicHomeHero />

    <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">What are you looking for?</p><h2 className="heading">Browse popular <span>product categories.</span></h2></div><p className="lead">Choose a category, then ask us about current stock.</p></div><div className="grid-4">{categories.map(([icon,title,text])=><article className="card category-card" key={title}><div className="icon-box">{icon}</div><h3>{title}</h3><p>{text}</p><Link href="/products" className="card-link">Explore category →</Link></article>)}</div></div></section>

    <section className="section section-soft"><div className="container split"><div className="photo-stack"><div className="photo-main photo-contain"><Image src="/images/pharmacy-interior.jpg" alt="Bweza Pharmacy team member ready to assist customers in Kibuye" fill sizes="(max-width: 1000px) 90vw, 46vw" /></div><div className="photo-small"><Image src="/images/pharmacy-shelves.jpg" alt="Bright, well-stocked Bweza Pharmacy interior in Kibuye" fill sizes="(max-width: 680px) 45vw, 24vw" /></div></div><div><p className="eyebrow">Quick access</p><h2 className="heading">Choose what <span>you need.</span></h2><p className="lead">Products, prescriptions and business supply—start here.</p><ul className="check-list"><li><b>01</b><span><strong>Products</strong><br />Browse the catalogue and ask about stock.</span></li><li><b>02</b><span><strong>Prescription review</strong><br />Send your prescription securely.</span></li><li><b>03</b><span><strong>Corporate supply</strong><br />Request a quotation for your organisation.</span></li></ul><div className="button-row"><Link className="button" href="/products">Browse products</Link><Link className="button button-secondary" href="/prescription">Prescription review</Link><Link className="button button-magenta" href="/corporate">Request a quote</Link></div></div></div></section>

    <section className="section section-soft"><div className="container split"><div><p className="eyebrow">Delivery across Uganda</p><h2 className="heading">Ask about delivery to <span>your location.</span></h2><p className="lead">Send your location, product and quantity on WhatsApp. We will confirm availability, timing and delivery fees.</p><div className="button-row"><a className="button button-magenta" href={deliveryWa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="delivery_enquiry" data-location="home_delivery"><Message /> Ask about delivery</a></div></div><div className="photo-main" style={{position:"relative", inset:"auto", minHeight:430}}><Image src="/images/pharmacy-shelves.jpg" alt="Wide view of products inside Bweza Pharmacy" fill sizes="(max-width: 1000px) 100vw, 46vw" /></div></div></section>

    <section className="section"><div className="container split"><div><p className="eyebrow">Corporate procurement</p><h2 className="heading">A clear supply route for <span>organisations.</span></h2><p className="lead">Medicines, first-aid items and medical supplies for workplaces, clinics, schools, NGOs and field operations.</p><ul className="check-list"><li><b>✓</b><span>Clear quotation process</span></li><li><b>✓</b><span>Medicine, first-aid and medical supplies</span></li><li><b>✓</b><span>Delivery planning across Uganda</span></li></ul><div className="button-row"><Link className="button button-magenta" href="/corporate">Request a quote <Arrow /></Link></div></div><div className="photo-main photo-contain" style={{position:"relative", inset:"auto", minHeight:430}}><Image src="/images/pharmacy-counter.jpg" alt="Bweza Pharmacy team members inside the Kibuye pharmacy" fill sizes="(max-width: 1000px) 100vw, 46vw" /></div></div></section>
    <CtaBand />
  </>;
}
