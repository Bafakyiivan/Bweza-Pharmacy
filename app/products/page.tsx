import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "Products", description: "Browse pharmacy, wellness, personal-care and medical-supply categories available for enquiry at Bweza Pharmacy in Kampala.", alternates: { canonical: "/products" } };

const categories = [
  ["Prescription medicines", "Medicines requiring a valid prescription and pharmacy review.", "/prescription"],
  ["Over-the-counter products", "Common non-prescription health-product enquiries.", "/contact"],
  ["First aid", "Supplies for home, travel and workplace first-aid needs.", "/contact"],
  ["Vitamins and supplements", "Nutritional and wellness-support product categories.", "/contact"],
  ["Personal care", "Everyday hygiene, skin-care and personal-care categories.", "/contact"],
  ["Medical supplies and devices", "Selected health monitoring and care supplies.", "/contact"],
  ["Mother and baby", "Selected mother-and-baby health and personal-care categories.", "/contact"],
  ["Wellness products", "Products supporting everyday wellbeing and healthy routines.", "/contact"],
];

export default function ProductsPage() { return <><PageHero eyebrow="Products" title="Browse by product category." description="Our full verified product catalogue is being prepared. Choose a category and contact the pharmacy team to confirm current availability, pricing and any prescription requirements." /><section className="section"><div className="container"><div className="notice" role="note"><strong>Important:</strong> Products shown by category are not a guarantee of stock. Prescription medicines are supplied only after appropriate review.</div><div className="grid-4" style={{marginTop:30}}>{categories.map(([title,text,href],i)=><article className="card category-card" key={title}><div className="icon-box">{String(i+1).padStart(2,"0")}</div><h2 style={{fontSize:"1.15rem"}}>{title}</h2><p>{text}</p><Link href={href} className="card-link">Make an enquiry →</Link></article>)}</div></div></section><CtaBand title="Can’t find the category you need?" text="Send a clear product enquiry and our team can confirm whether it is available or advise you on the next appropriate step." /></> }
