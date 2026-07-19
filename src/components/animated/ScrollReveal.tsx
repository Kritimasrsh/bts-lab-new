'use client';

import React, { useEffect, useMemo, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** Blur the words in as they reveal. */
  enableBlur?: boolean;
  /** Starting opacity of each word before reveal (0–1). */
  baseOpacity?: number;
  /** Starting blur in px (when enableBlur). */
  blurStrength?: number;
  /** Kept for API compatibility (no longer used). */
  baseRotation?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  containerClassName?: string;
  textClassName?: string;
}

/**
 * Reveals its text word-by-word (fade + blur, staggered) the first time it
 * scrolls into view. Uses IntersectionObserver + CSS transitions — deterministic
 * and independent of scroll position (unlike scrubbed ScrollTrigger).
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  // Lazy init: if reduced-motion is preferred, start already revealed (no
  // synchronous setState inside an effect).
  const [revealed, setRevealed] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Split into tokens and precompute each visible word's stagger index so we
  // never mutate a variable during render.
  const tokens = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    let wi = 0;
    return text.split(/(\s+)/).map((word) => {
      const isSpace = /^\s+$/.test(word);
      return { word, isSpace, order: isSpace ? -1 : wi++ };
    });
  }, [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <div className={containerClassName}>
      <p ref={ref} className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.4] font-semibold ${textClassName}`}>
        {tokens.map(({ word, isSpace, order }, i) => {
          if (isSpace) return <span key={i}>{word}</span>;
          const delay = order * 0.045;
          return (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: revealed ? 1 : baseOpacity,
                filter: revealed || !enableBlur ? 'blur(0px)' : `blur(${blurStrength}px)`,
                transform: revealed ? 'translateY(0)' : 'translateY(6px)',
                transition: `opacity 0.6s ease ${delay}s, filter 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
              }}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default ScrollReveal;
