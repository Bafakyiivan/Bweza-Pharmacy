"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/pharmacy-interior-wide.jpg", alt: "Inside Bweza Pharmacy in Kibuye, Kampala" },
  { src: "/images/pharmacy-shelves.jpg", alt: "Shelves inside Bweza Pharmacy" },
  { src: "/images/pharmacy-counter.jpg", alt: "Bweza Pharmacy counter" },
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
      aria-label="Photos of Bweza Pharmacy"
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
      <div className="hero-card"><strong>A real local pharmacy</strong><p>Explore our categories online, then contact the team to confirm availability and the appropriate next step.</p></div>
      <div className="hero-photo-controls" aria-label="Choose a pharmacy photo">
        {photos.map((photo, index) => (
          <button key={photo.src} type="button" className={index === active ? "is-active" : ""} aria-label={`Show photo ${index + 1} of ${photos.length}`} aria-pressed={index === active} onClick={() => setActive(index)} />
        ))}
      </div>
    </div>
  );
}
