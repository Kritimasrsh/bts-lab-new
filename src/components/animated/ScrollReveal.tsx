'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    setReduceMotion(media.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);

      if (e.matches) {
        setRevealed(true);
      }
    };

    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reduceMotion]);

  const lines = useMemo(() => {
    const text =
      typeof children === 'string'
        ? children
        : React.Children.toArray(children).join(' ');

    return text.split('\n');
  }, [children]);

  return (
    <div className={containerClassName}>
      <p
        ref={ref}
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.6] font-semibold ${textClassName}`}
      >
        {lines.map((line, lineIndex) => {
          const words = line.trim().split(/\s+/);

          return (
            <React.Fragment key={lineIndex}>
              {words.map((word, wordIndex) => {
                const delay = (lineIndex * 20 + wordIndex) * 0.05;

                return (
                  <span
                    key={`${lineIndex}-${wordIndex}`}
                    className="inline-flex mr-[0.28em] will-change-transform"
                    style={{
                      opacity: revealed ? 1 : baseOpacity,
                      filter:
                        revealed || !enableBlur
                          ? 'blur(0px)'
                          : `blur(${blurStrength}px)`,
                      transform: revealed
                        ? 'translate3d(0,0,0)'
                        : 'translate3d(0,10px,0)',
                      transition: reduceMotion
                        ? 'none'
                        : `
                            opacity 700ms cubic-bezier(.22,1,.36,1) ${delay}s,
                            filter 700ms cubic-bezier(.22,1,.36,1) ${delay}s,
                            transform 700ms cubic-bezier(.22,1,.36,1) ${delay}s
                          `,
                    }}
                  >
                    {word}
                  </span>
                );
              })}

              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </p>
    </div>
  );
}