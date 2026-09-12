import Image from "next/image";
import Link from "next/link";
import { Message, Phone } from "@/components/icons";
import { isExternalWhatsApp, phoneHref, whatsappHref } from "@/lib/site";

const links = [
  ["Products", "/products"],
  ["Services", "/services"],
  ["Screening", "/screening"],
  ["Prescription", "/prescription"],
  ["Corporate", "/corporate"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Header() {
  const wa = whatsappHref("Hello Bweza Pharmacy, I would like to make an enquiry.");
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Bweza Pharmacy home">
          <Image src="/images/bweza-logo.jpg" alt="" width={697} height={560} priority />
          <span className="brand-word">Bweza Pharmacy<small>Walk a Healthy Life</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
          <a className="button button-secondary nav-cta" href={phoneHref()} aria-label="Call Bweza Pharmacy" data-conversion="phone_click" data-intent="general" data-location="header"><Phone /> Call</a>
          <a className="button nav-cta" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="general" data-location="header"><Message /> WhatsApp</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">☰</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <a href={phoneHref()} data-conversion="phone_click" data-intent="general" data-location="mobile_menu">Call Bweza Pharmacy</a>
            <a href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="general" data-location="mobile_menu">Order via WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
