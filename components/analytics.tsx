"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { ConversionTracker } from "@/components/conversion-tracker";

type Consent = "granted" | "denied" | null | undefined;
const CONSENT_KEY = "bweza-analytics-consent";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [consent, setConsent] = useState<Consent>(undefined);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    setConsent(saved === "granted" || saved === "denied" ? saved : null);
  }, []);

  function choose(value: Exclude<Consent, null | undefined>) {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  const enabled = consent === "granted";
  return <>
    {enabled && gaId ? <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" /><Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}</Script></> : null}
    {enabled && pixelId ? <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}</Script> : null}
    {enabled ? <ConversionTracker /> : null}
    {consent === null && (gaId || pixelId) ? <aside className="analytics-consent" aria-label="Analytics preference"><div><strong>Your privacy matters</strong><p>Allow anonymous website analytics to help Bweza Pharmacy improve this site. Medicine searches, messages and prescription details are never intentionally sent to analytics.</p></div><div className="analytics-consent-actions"><button className="button button-secondary" type="button" onClick={() => choose("denied")}>Essential only</button><button className="button" type="button" onClick={() => choose("granted")}>Allow analytics</button></div></aside> : null}
  </>;
}
