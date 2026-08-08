"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";
import { Check, ArrowRight } from "lucide-react";

export type StackItem = {
  title: string;
  tagline?: string;
  description: string;
  image: string;
  points?: string[];
  meta?: string;
  href?: string;
  /** Background gradient classes for the card. */
  bg?: string;
};

const DEFAULT_BGS = [
  "from-brand-deep to-brand",
  "from-brand to-brand-cyan",
  "from-[#0b3b40] to-brand-deep",
  "from-brand-cyan to-brand-mint",
  "from-[#123f45] to-brand",
  "from-brand to-brand-deep",
  "from-[#0b3b40] to-brand-cyan",
];

/**
 * Scroll-driven stacking cards (adapted from ui-layout). Each card is sticky and
 * scales down as the next stacks over it, driven by Lenis smooth-scroll.
 *
 * The animated version is only mounted on the client (after hydration) to avoid
 * motion's "target ref not hydrated" error; a static stack renders on the server
 * and as the no-JS fallback.
 */
export default function StackingCards({ items }: { items: StackItem[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <StaticStack items={items} />;
  return <AnimatedStack items={items} />;
}

function StaticStack({ items }: { items: StackItem[] }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-12 sm:px-8">
      {items.map((item, i) => (
        <CardBody key={`static_${i}`} item={item} index={i} />
      ))}
    </div>
  );
}

function AnimatedStack({ items }: { items: StackItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative">
      {items.map((item, i) => {
        const targetScale = 1 - (items.length - i) * 0.04;
        return (
          <Card
            key={`stack_${i}`}
            i={i}
            item={item}
            progress={scrollYProgress}
            range={[i * (1 / items.length), 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

function Card({
  i,
  item,
  progress,
  range,
  targetScale,
}: {
  i: number;
  item: StackItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div style={{ scale, top: `calc(-5vh + ${i * 26}px)` }} className="w-[90%] max-w-5xl origin-top">
        <CardBody item={item} index={i} imageScale={imageScale} />
      </motion.div>
    </div>
  );
}

function CardBody({
  item,
  index,
  imageScale,
}: {
  item: StackItem;
  index: number;
  imageScale?: MotionValue<number>;
}) {
  const bg = item.bg ?? DEFAULT_BGS[index % DEFAULT_BGS.length];
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[2rem] bg-linear-to-br ${bg} p-6 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-8 lg:h-[460px] lg:flex-row lg:gap-10 lg:p-10`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />

      {/* content */}
      <div className="flex flex-1 flex-col justify-center">
        {item.tagline && (
          <span className="font-mono-tag text-[11px] uppercase tracking-[0.2em] text-white/70">
            {String(index + 1).padStart(2, "0")} · {item.tagline}
          </span>
        )}
        <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{item.description}</p>

        {item.points && item.points.length > 0 && (
          <ul className="mt-5 grid max-w-md gap-x-5 gap-y-2 sm:grid-cols-2">
            {item.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-center gap-4">
          <Link
            href={item.href ?? "/repair"}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-sm font-bold text-brand-deep transition hover:gap-3"
          >
            Book this repair
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {item.meta && <span className="text-xs font-medium text-white/70">{item.meta}</span>}
        </div>
      </div>

      {/* image */}
      <div className="relative mt-6 h-52 w-full overflow-hidden rounded-2xl lg:mt-0 lg:h-full lg:w-[46%]">
        {imageScale ? (
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
            <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:1024px) 90vw, 45vw" />
          </motion.div>
        ) : (
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:1024px) 90vw, 45vw" />
        )}
      </div>
    </div>
  );
}
