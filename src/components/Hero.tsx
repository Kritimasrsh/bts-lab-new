"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ShieldCheck, Cpu } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import Counter from "@/components/Counter";
import HeroBackground from "@/components/HeroBackground";
import { IconWrench, IconUsers, IconShieldCheck, IconGauge } from "@/components/icons/StatIcons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const wordBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type Stat = { Icon: (p: { className?: string }) => React.ReactElement; to: number; suffix: string; label: string };
const STATS: Stat[] = [
  { Icon: IconWrench, to: 10000, suffix: "+", label: "Devices repaired" },
  { Icon: IconUsers, to: 8000, suffix: "+", label: "Happy customers" },
  { Icon: IconShieldCheck, to: 90, suffix: "-day", label: "Repair warranty" },
  { Icon: IconGauge, to: 98, suffix: "%", label: "Success rate" },
];

const HEADLINE = ["We", "Fix", "What", "Others"];

export default function Hero() {
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 110, damping: 18, mass: 0.5 };
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), spring);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), spring);
  const tX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), spring);
  const tY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), spring);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !areaRef.current) return;
    const r = areaRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="relative isolate -mt-20 overflow-hidden pt-20">
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:pb-16 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT — copy */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col text-center lg:text-left">
            <motion.span
              variants={rise}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1.5 font-mono-tag text-[11px] uppercase tracking-[0.24em] text-brand-mint backdrop-blur-sm lg:mx-0"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" />
              Certified Repair Lab · Nepal
            </motion.span>

            <motion.h1
              variants={wordContainer}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-paper sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="flex flex-wrap justify-center gap-x-4 lg:justify-start">
                {HEADLINE.map((word) => (
                  <motion.span key={word} variants={wordBlur} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span variants={wordBlur} className="mt-1 inline-block text-brand-mint">
                Can&apos;t Fix.
              </motion.span>
            </motion.h1>

            <motion.p variants={rise} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg lg:mx-0">
              Board-level phone, tablet &amp; laptop repair genuine parts, certified
              technicians, doorstep pickup and a warranty on every fix.
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <AnimatedButton href="/services" onDark>
                Book a Repair
              </AnimatedButton>
              <a
                href="tel:+9779866754678"
                className="focus-ring font-display text-sm font-bold uppercase tracking-wide text-paper/90 underline-offset-4 hover:text-paper hover:underline"
              >
                Or call +977-9866754678
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — framed device stage (spotlight ring + accent chips) */}
          <div
            ref={areaRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative hidden items-center justify-center lg:flex"
            style={{ perspective: 1200 }}
          >
            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="relative flex h-[520px] w-[440px] items-center justify-center"
            >
              {/* spotlight glow */}
              <div className="absolute inset-0 rounded-full bg-brand/25 blur-3xl" aria-hidden />
              {/* concentric rings */}
              <div className="absolute h-[420px] w-[420px] rounded-full border border-paper/10" aria-hidden />
              <div className="absolute h-[320px] w-[320px] rounded-full border border-paper/15" aria-hidden />
              <div
                className="absolute h-[420px] w-[420px] rounded-full"
                style={{ background: "conic-gradient(from 0deg, transparent, rgba(47,168,154,0.25), transparent 60%)" }}
                aria-hidden
              />

              {/* the exploded phone with parallax + float */}
              <motion.div
                style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, x: tX, y: tY }}
                className="relative z-10"
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -14, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/phone-decomposed.png"
                    alt="Exploded view of a smartphone showing every internal repair component"
                    width={520}
                    height={700}
                    priority
                    className="h-auto w-[340px] object-contain mix-blend-screen"
                  />
                </motion.div>
              </motion.div>

              {/* floating accent chips */}
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute left-0 top-16 z-20 flex items-center gap-2 rounded-xl border border-paper/15 bg-ink/60 px-3 py-2 backdrop-blur-md"
              >
                <ShieldCheck className="h-4 w-4 text-brand-mint" />
                <span className="text-xs font-semibold text-paper">Genuine parts</span>
              </motion.div>
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute bottom-16 right-0 z-20 flex items-center gap-2 rounded-xl border border-paper/15 bg-ink/60 px-3 py-2 backdrop-blur-md"
              >
                <Cpu className="h-4 w-4 text-brand-mint" />
                <span className="text-xs font-semibold text-paper">Board-level repair</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* stats row with custom SVG icons */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-y-8 border-t border-paper/15 pt-10 lg:grid-cols-4"
        >
          {STATS.map(({ Icon, to, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper/10 text-brand-mint">
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-display text-3xl font-extrabold tracking-tight text-paper sm:text-4xl">
                <Counter to={to} suffix={suffix} />
              </span>
              <span className="font-mono-tag text-[11px] uppercase tracking-widest text-paper/60">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
