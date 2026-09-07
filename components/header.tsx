import Image from "next/image";
import Link from "next/link";
import { Message, Phone } from "@/components/icons";
import { isExternalWhatsApp, phoneHref, whatsappHref } from "@/lib/site";

const links = [
  ["Products", "/products"],
  ["Services", "/services"],
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
          <a className="button button-secondary nav-cta" href={phoneHref()} aria-label="Call Bweza Pharmacy on +256 750 664 777"><Phone /> Call</a>
          <a className="button nav-cta" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined}><Message /> WhatsApp</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">☰</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <a href={phoneHref()}>Call Bweza Pharmacy</a>
            <a href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined}>Order via WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
