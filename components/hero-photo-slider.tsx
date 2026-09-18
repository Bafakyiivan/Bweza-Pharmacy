"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/pharmacy-interior-wide.jpg", alt: "Inside Bweza Pharmacy in Kibuye, Kampala", label: "Visit", title: "Find us in Kibuye", detail: "Near Prayer Palace, Kampala." },
  { src: "/images/pharmacy-shelves.jpg", alt: "Shelves inside Bweza Pharmacy", label: "Hours", title: "Open daily", detail: "7:30 AM–11:30 PM." },
  { src: "/images/pharmacy-counter.jpg", alt: "Bweza Pharmacy counter", label: "About", title: "A local pharmacy", detail: "Operated by Bweza Medicare Ltd." },
];

export function HeroPhotoSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % photos.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="hero-visual hero-photo-slider"
      aria-label="Bweza Pharmacy information slides"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="hero-photo">
        {photos.map((photo, index) => (
          <div className={`hero-photo-slide${index === active ? " is-active" : ""}`} aria-hidden={index !== active} key={photo.src}>
            <Image src={photo.src} alt={index === active ? photo.alt : ""} fill sizes="(max-width: 1000px) 100vw, 46vw" priority={index === 0} />
          </div>
        ))}
      </div>
      <div className="hero-card"><strong>{photos[active].title}</strong><p>{photos[active].detail}</p></div>
      <div className="hero-photo-controls" aria-label="Choose an information slide">
        {photos.map((photo, index) => (
          <button key={photo.src} type="button" className={index === active ? "is-active" : ""} aria-label={`Show ${photo.label} slide`} aria-pressed={index === active} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span> {photo.label}</button>
        ))}
      </div>
    </div>
  );
}
