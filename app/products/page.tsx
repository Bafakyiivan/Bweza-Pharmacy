import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { isExternalWhatsApp, whatsappHref } from "@/lib/site";

export const metadata: Metadata = { title: "Products", description: "Browse pharmacy, wellness, personal-care and medical-supply categories available for enquiry at Bweza Pharmacy in Kampala.", alternates: { canonical: "/products" } };

const categories = [
  ["Prescription medicines", "Medicines requiring a valid prescription and pharmacy review."],
  ["Over-the-counter products", "Common non-prescription health-product enquiries."],
  ["First aid", "Supplies for home, travel and workplace first-aid needs."],
  ["Vitamins and supplements", "Nutritional and wellness-support product categories."],
  ["Personal care", "Everyday hygiene, skin-care and personal-care categories."],
  ["Medical supplies and devices", "Selected health monitoring and care supplies."],
  ["Mother and baby", "Selected mother-and-baby health and personal-care categories."],
  ["Wellness products", "Products supporting everyday wellbeing and healthy routines."],
];

export default function ProductsPage() { return <><PageHero eyebrow="Products" title="Browse by product category." description="Choose a category and contact the pharmacy team to confirm current availability, pricing and any prescription requirements." /><section className="section"><div className="container"><div className="notice" role="note"><strong>Important:</strong> Products shown by category are not a guarantee of stock. Prescription medicines are supplied only after appropriate review.</div><div className="grid-4" style={{marginTop:30}}>{categories.map(([title,text],i)=>{
  const isPrescription = i === 0;
  const href = isPrescription ? "/prescription" : whatsappHref(`Hello Bweza Pharmacy, I would like to ask about ${title.toLowerCase()}. Please confirm availability and price.`);
  return <article className="card category-card" key={title}><div className="icon-box">{String(i+1).padStart(2,"0")}</div><h2 style={{fontSize:"1.15rem"}}>{title}</h2><p>{text}</p>{isPrescription ? <Link href={href} className="card-link">Send prescription enquiry →</Link> : <a href={href} className="card-link" target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent={title.toLowerCase().replaceAll(" ", "_")} data-location="products_page">Ask on WhatsApp →</a>}</article>;
})}</div></div></section><CtaBand title="Can’t find the category you need?" text="Send a clear product enquiry and our team can confirm whether it is available or advise you on the next appropriate step." /></> }
