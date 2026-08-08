"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Slide-in direction. Defaults to "up". */
  direction?: Direction;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Travel distance in px. */
  distance?: number;
  /** Animate every time it enters, not just once. */
  repeat?: boolean;
  /** Optional blur-in for a softer entrance. */
  blur?: boolean;
  as?: "div" | "span" | "li" | "section";
};

/**
 * Lightweight scroll-reveal wrapper. Fades + slides its children in when they
 * enter the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 28,
  repeat = false,
  blur = false,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "down"
        ? { y: -distance }
        : direction === "left"
          ? { x: distance }
          : direction === "right"
            ? { x: -distance }
            : {};

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, ...offset, filter: blur ? "blur(10px)" : "blur(0px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
