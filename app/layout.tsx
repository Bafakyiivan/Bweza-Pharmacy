import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Bweza Pharmacy | Pharmacy Services in Kampala", template: "%s | Bweza Pharmacy" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_UG", siteName: site.name, title: site.name, description: site.description, url: "/" },
  twitter: { card: "summary", title: site.name, description: site.description },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#087a3e" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org", "@type": "Pharmacy", name: site.name,
    legalName: site.legalName, url: site.url, image: `${site.url}/images/bweza-logo.jpg`,
    address: { "@type": "PostalAddress", addressLocality: "Kibuye", addressRegion: "Kampala", addressCountry: "UG" },
    openingHours: "Mo-Su 07:30-23:30",
    hasMap: site.directionsUrl,
    ...(site.phone ? { telephone: site.phone } : {}), ...(site.email ? { email: site.email } : {}),
  };
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><Analytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }} /></body></html>;
}
