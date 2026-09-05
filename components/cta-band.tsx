import Link from "next/link";
import { Arrow } from "@/components/icons";

export function CtaBand({ title = "How can our pharmacy team help?", text = "Tell us what you need. We’ll guide you to the right next step for a product, prescription or organisational supply enquiry." }) {
  return <section className="section"><div className="container"><div className="band"><div><p className="eyebrow" style={{color:"#8ed8ac"}}>Start an enquiry</p><h2 className="heading">{title}</h2><p className="lead">{text}</p></div><Link className="button" href="/contact">Contact Bweza Pharmacy <Arrow /></Link></div></div></section>;
}
