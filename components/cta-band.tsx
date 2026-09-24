import Link from "next/link";
import { Arrow } from "@/components/icons";

export function CtaBand({ title = "What do you need?", text = "Products, prescriptions, delivery and corporate supply." }) {
  return <section className="section"><div className="container"><div className="band"><div><p className="eyebrow" style={{color:"#8ed8ac"}}>Get started</p><h2 className="heading">{title}</h2><p className="lead">{text}</p></div><Link className="button" href="/contact">Contact Bweza Pharmacy <Arrow /></Link></div></div></section>;
}
