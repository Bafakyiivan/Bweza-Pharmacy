"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Building, Message, Phone, Search } from "@/components/icons";
import { isExternalWhatsApp, phoneHref, whatsappHref } from "@/lib/site";

const slides = [
  {
    eyebrow: "Your neighbourhood pharmacy in Kibuye",
    title: "Pharmacy support that puts",
    accent: "your needs first.",
    description: "Talk to Bweza Pharmacy about medicines, wellness products and health supplies for individuals and organisations.",
    image: "/images/pharmacy-interior-wide.jpg",
    alt: "Inside Bweza Pharmacy in Kibuye, Kampala",
    label: "A real local pharmacy",
    note: "Browse verified products, then contact our team to confirm current availability.",
    href: "/products",
    cta: "Browse products",
    icon: "search",
    intent: "browse_products",
  },
  {
    eyebrow: "Convenient prescription support",
    title: "Start your prescription",
    accent: "review with confidence.",
    description: "Contact the pharmacy team for guidance and pharmacist review before medicine availability or supply is confirmed.",
    image: "/images/pharmacy-shelves.jpg",
    alt: "Health products displayed at Bweza Pharmacy",
    label: "Responsible pharmacy guidance",
    note: "Share only the prescription information needed for your request.",
    href: "/prescription",
    cta: "Start prescription review",
    icon: "message",
    intent: "prescription_review",
  },
  {
    eyebrow: "Corporate procurement",
    title: "A clear supply route for",
    accent: "organisations.",
    description: "Request medicines, first-aid items and medical supplies for workplaces, clinics, schools and field operations.",
    image: "/images/pharmacy-counter.jpg",
    alt: "Bweza Pharmacy product shelves and dispensing counter",
    label: "Structured quotation support",
    note: "Share item specifications, quantities, delivery location and required date.",
    href: "/corporate",
    cta: "Request a quotation",
    icon: "building",
    intent: "corporate_procurement",
  },
] as const;

function SlideIcon({ name }: { name: (typeof slides)[number]["icon"] }) {
  if (name === "building") return <Building />;
  if (name === "message") return <Message />;
  return <Search />;
}

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const wa = whatsappHref("Hello Bweza Pharmacy, I would like to ask about a product or service.");

  return <section className="hero hero-slider" aria-roledescription="carousel" aria-label="Bweza Pharmacy services" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
    <div className="hero-slides" aria-live="polite">
      {slides.map((slide, index) => <div className={`hero-slide${index === active ? " is-active" : ""}`} aria-hidden={index !== active} key={slide.accent}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{slide.eyebrow}</p>
            {index === 0 ? <h1 className="display">{slide.title} <span>{slide.accent}</span></h1> : <h2 className="display">{slide.title} <span>{slide.accent}</span></h2>}
            <p className="lead">{slide.description}</p>
            <div className="button-row">
              <Link className="button button-magenta" href={slide.href} data-conversion="hero_slide_click" data-intent={slide.intent} data-location="home_hero"><SlideIcon name={slide.icon} /> {slide.cta}</Link>
              <a className="button" href={wa} target={isExternalWhatsApp ? "_blank" : undefined} rel={isExternalWhatsApp ? "noreferrer" : undefined} data-conversion="whatsapp_click" data-intent="product_or_service" data-location="home_hero"><Message /> WhatsApp</a>
              <a className="button button-secondary" href={phoneHref()} data-conversion="phone_click" data-intent="general" data-location="home_hero"><Phone /> Call pharmacy</a>
            </div>
            <div className="trust-inline"><span><i>✓</i> Open daily, 7:30 AM–11:30 PM</span><span><i>✓</i> Delivery enquiries across Uganda</span><span><i>✓</i> Near Prayer Palace, Kibuye</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 1000px) 100vw, 46vw" priority={index === 0} /></div>
            <div className="hero-card"><strong>{slide.label}</strong><p>{slide.note}</p></div>
          </div>
        </div>
      </div>)}
    </div>
    <div className="container hero-controls" aria-label="Choose a homepage slide">
      {slides.map((slide, index) => <button type="button" className={index === active ? "is-active" : ""} aria-label={`Show slide ${index + 1}: ${slide.accent}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} key={slide.accent}><span>{String(index + 1).padStart(2, "0")}</span>{slide.icon === "building" ? "Corporate" : slide.icon === "message" ? "Prescriptions" : "Products"}</button>)}
    </div>
  </section>;
}
