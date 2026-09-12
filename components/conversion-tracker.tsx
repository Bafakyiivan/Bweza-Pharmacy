"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function ConversionTracker() {
  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLElement>("[data-conversion]");
      if (!link) return;

      const eventName = link.dataset.conversion;
      if (!eventName) return;

      const parameters = {
        intent: link.dataset.intent || "general",
        location: link.dataset.location || window.location.pathname,
        destination: link instanceof HTMLAnchorElement ? link.href : undefined,
      };

      window.gtag?.("event", eventName, parameters);
      window.fbq?.("trackCustom", eventName, parameters);
    }

    document.addEventListener("click", trackClick, true);
    return () => document.removeEventListener("click", trackClick, true);
  }, []);

  return null;
}
