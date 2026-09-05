import Image from "next/image";
import Link from "next/link";
import { isExternalWhatsApp, site, whatsappHref } from "@/lib/site";

export function Footer() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I would like to make an enquiry.");
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="brand"><Image src="/images/bweza-logo.jpg" alt="" width={697} height={560} /><span>Bweza Pharmacy</span></Link>
              <p>{site.description}</p>
            </div>
            <div><div className="footer-title">Explore</div><div className="footer-links"><Link href="/products">Products</Link><Link href="/services">Services</Link><Link href="/about">About us</Link></div></div>
            <div><div className="footer-title">Get help</div><div className="footer-links"><Link href="/prescription">Prescription inquiry</Link><Link href="/corporate">Corporate procurement</Link><Link href="/contact">Contact</Link></div></div>
            <div><div className="footer-title">Visit</div><div className="footer-links"><span>{site.location}</span><span>{site.hours || "Business hours: awaiting confirmation"}</span><Link href="/privacy">Privacy notice</Link></div></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span><span>Health information on this site is general and does not replace professional advice.</span></div>
        </div>
      </footer>
      <a className="whatsapp-float" href={wa} aria-label="Contact Bweza Pharmacy on WhatsApp" target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined}>W</a>
    </>
  );
}
