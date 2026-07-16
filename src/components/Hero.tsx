"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Phone, ShieldCheck, Truck, Clock } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const BADGES = [
  { icon: Truck, label: "Doorstep pickup" },
  { icon: ShieldCheck, label: "Genuine parts" },
  { icon: Clock, label: "Same-day fixes" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);

  // Mouse parallax for the exploded-phone image
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 120, damping: 18, mass: 0.4 };
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), springCfg);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), springCfg);
  const transX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), springCfg);
  const transY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), springCfg);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* soft background wash + dotted grid */}
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        {/* LEFT — message */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
          <motion.span variants={rise} className="section-label text-brand">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600 align-middle" />
            BTS Lab · Mobile Repair
          </motion.span>

          <motion.h1
            variants={rise}
            className="display-heading mt-5 text-[2.65rem] text-ink sm:text-6xl lg:text-[4.1rem]"
          >
            Phone Repair
            <br />
            That Comes{" "}
            <span className="relative inline-block">
              <span className="relative z-10">to You</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                className="absolute inset-x-0 bottom-1 z-0 h-4 origin-left rounded bg-brand/25 sm:bottom-2 sm:h-5"
              />
            </span>
          </motion.h1>

          <motion.p variants={rise} className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            BTS Lab is a revolutionary service designed to simplify mobile &amp; computer
            repairs — genuine parts, certified technicians and doorstep pickup, without
            making it hard on your wallet.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-5">
            <a href="tel:+9779866754678" className="group inline-flex items-center gap-3 text-ink">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-paper transition group-hover:bg-brand-deep">
                <Phone className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                +977-9866754678
              </span>
            </a>

            <Link
              href="/services"
              className="hover-lift focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-paper"
            >
              Book a Repair
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>

          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-2.5">
            {BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3.5 py-2 text-xs font-semibold text-ink-soft"
              >
                <Icon className="h-3.5 w-3.5 text-brand-mint" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — floating phone over a solid brand-teal block (reference style) */}
        <div
          ref={areaRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative flex min-h-[440px] items-center justify-center py-6 sm:min-h-[520px]"
          style={{ perspective: 1200 }}
        >
          {/* solid teal block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-[74%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-brand"
            aria-hidden
          >
            {/* subtle dotted texture inside the block */}
            <div className="grid-bg absolute inset-0 rounded-2xl opacity-20" aria-hidden />
            {/* red accent corner tab */}
            <span className="absolute -left-3 -top-3 h-16 w-16 rounded-xl bg-red-600/90 shadow-lg" aria-hidden />
          </motion.div>

          {/* the floating phone with mouse parallax + float */}
          <motion.div
            style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, x: transX, y: transY }}
            className="relative z-10"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/illustration1.jpeg"
                alt="Exploded view of a smartphone showing internal repair components"
                width={520}
                height={700}
                priority
                className="h-auto w-[62%] max-w-[340px] rounded-3xl object-contain shadow-[0_50px_90px_-30px_rgba(13,43,46,0.65)] ring-1 ring-black/10 sm:w-full"
              />
            </motion.div>
          </motion.div>

          {/* floating "Guaranteed Safety" card — overlaps block edge like the reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -right-1 bottom-8 z-20 hidden w-56 rounded-xl bg-paper p-4 shadow-[0_20px_50px_-20px_rgba(13,43,46,0.45)] ring-1 ring-ink/5 sm:block"
          >
            <div className="flex items-center gap-2 text-brand">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-bold text-ink">Guaranteed Safety</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              90-day warranty on every repair. If it&apos;s not right, we make it right.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
