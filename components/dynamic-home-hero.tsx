"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isExternalWhatsApp, phoneHref, whatsappHref } from "@/lib/site";

const AUTOPLAY_MS = 7500;

export function DynamicHomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = [
    {
      id: "products",
      number: "01",
      tab: "Products",
      eyebrow: "Your neighbourhood pharmacy",
      title: "Everyday health essentials, close to you.",
      description: "Browse selected wellness, first-aid and health products, then contact our team to confirm current availability.",
      image: "/images/pharmacy-counter.jpg",
      imagePosition: "center center",
      alt: "Bweza Pharmacy team serving customers inside the Kibuye pharmacy",
      primaryLabel: "Browse products",
      primaryHref: "/products",
      secondaryLabel: "Order on WhatsApp",
      secondaryHref: whatsappHref("Hello Bweza Pharmacy, I would like to ask about a product or service."),
      secondaryType: "whatsapp",
    },
    {
      id: "prescriptions",
      number: "02",
      tab: "Prescriptions",
      eyebrow: "Private pharmacist support",
      title: "A safer route for prescription requests.",
      description: "Prescription medicines are handled privately. Send a valid prescription for pharmacist review and guidance before supply.",
      image: "/images/bweza-pharmacy-staff.webp",
      imagePosition: "72% center",
      alt: "Bweza Pharmacy staff member ready to support customers",
      primaryLabel: "Request pharmacist review",
      primaryHref: "/prescription",
      secondaryLabel: "Call pharmacy",
      secondaryHref: phoneHref(),
      secondaryType: "phone",
    },
    {
      id: "corporate",
      number: "03",
      tab: "Corporate",
      eyebrow: "Supply support for organisations",
      title: "A clear medical-supply route for your team.",
      description: "Request medicines, first-aid items and medical supplies for workplaces, clinics, schools, NGOs and field operations.",
      image: "/images/pharmacy-interior-wide.jpg",
      imagePosition: "center center",
      alt: "Wide view of Bweza Pharmacy in Kibuye, Kampala",
      primaryLabel: "Request supplies",
      primaryHref: "/corporate/request",
      secondaryLabel: "Explore corporate services",
      secondaryHref: "/corporate",
      secondaryType: "internal",
    },
  ] as const;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const current = slides[active];

  return (
    <section
      className="home-dynamic-hero"
      aria-label="Bweza Pharmacy services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="home-dynamic-media" aria-hidden="true">
        {slides.map((slide, index) => (
          <div className={`home-dynamic-image${index === active ? " is-active" : ""}`} key={slide.id}>
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectPosition: slide.imagePosition }}
            />
          </div>
        ))}
      </div>

      <div className="container home-dynamic-shell">
        <div className="home-dynamic-copy" key={current.id}>
          <p className="home-dynamic-eyebrow">{current.eyebrow}</p>
          <h1>{current.title}</h1>
          <p className="home-dynamic-lead">{current.description}</p>
          <div className="button-row">
            <Link className="button button-magenta" href={current.primaryHref}>
              {current.primaryLabel}
            </Link>
            {current.secondaryType === "internal" ? (
              <Link className="button home-dynamic-secondary" href={current.secondaryHref}>
                {current.secondaryLabel}
              </Link>
            ) : (
              <a
                className="button home-dynamic-secondary"
                href={current.secondaryHref}
                target={current.secondaryType === "whatsapp" && isExternalWhatsApp ? "_blank" : undefined}
                rel={current.secondaryType === "whatsapp" && isExternalWhatsApp ? "noreferrer" : undefined}
                data-conversion={current.secondaryType === "whatsapp" ? "whatsapp_click" : "phone_click"}
                data-intent={current.id}
                data-location="dynamic_home_hero"
              >
                {current.secondaryLabel}
              </a>
            )}
          </div>
          <div className="home-dynamic-trust">
            <span><i>✓</i> Open daily, 7:30 AM–11:30 PM</span>
            <span><i>✓</i> Delivery enquiries across Uganda</span>
            <span><i>✓</i> Kibuye, Kampala</span>
          </div>
        </div>

        <div className="home-dynamic-tabs" aria-label="Choose a homepage feature">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === active ? "is-active" : ""}
              aria-pressed={index === active}
              aria-label={`Show ${slide.tab} feature`}
              onClick={() => setActive(index)}
              key={slide.id}
            >
              <small>{slide.number}</small>
              <span>{slide.tab}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
