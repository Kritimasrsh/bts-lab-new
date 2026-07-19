"use client";

import { useEffect, useState } from "react";

const SLIDES = ["/hero/repairing-bg.jpg", "/hero/repairing2.jpg"];
const INTERVAL = 6000;

/**
 * Full-bleed hero background that cross-fades between the hero images with a
 * slow Ken-Burns zoom on each. Lower overlay lets the photos show through.
 */
export default function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className={`h-full w-full object-cover ${
              i === index ? (i % 2 === 0 ? "animate-kenburns" : "animate-kenburns-pan") : ""
            }`}
          />
        </div>
      ))}

      {/* refined dark teal overlay — crisp text, intentional (not muddy) */}
      <div className="absolute inset-0 bg-brand-deep/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/70" />
      {/* subtle vignette to focus the centered content */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(6,26,28,0.6) 100%)" }}
        aria-hidden
      />
    </div>
  );
}
