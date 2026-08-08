"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * How far (px) the element drifts across its scroll pass. Positive moves the
   * element up as you scroll down (classic parallax); negative reverses it.
   */
  offset?: number;
};

/**
 * Scroll-linked vertical parallax. The child drifts as the section scrolls
 * through the viewport. The scroll-driven version mounts only on the client
 * (avoids motion's "target ref not hydrated" error); SSR renders a plain box.
 */
export default function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <ParallaxInner className={className} offset={offset}>
      {children}
    </ParallaxInner>
  );
}

function ParallaxInner({ children, className, offset = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
