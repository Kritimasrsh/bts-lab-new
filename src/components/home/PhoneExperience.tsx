"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown, Wrench } from "lucide-react";

const PhoneScene = dynamic(() => import("@/components/three/PhoneScene"), {
  ssr: false,
  loading: () => null,
});

/* ------------------------------------------------------------------ */
/*  Pinned 3D journey: hero → the iPhone 17 Pro Max explodes layer    */
/*  by layer with glass callouts → reassembles into the closing CTA.  */
/* ------------------------------------------------------------------ */

export default function PhoneExperience() {
  const wrapRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    return () => lenis.off("scroll", update);
  }, [lenis]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      /* positions below are fractions of the pinned scroll (total = 1) */
      tl.to(heroRef.current, { opacity: 0, y: -70, filter: "blur(10px)", duration: 0.08 }, 0.05)
        .set(heroRef.current, { pointerEvents: "none" }, 0.1)
        .to(hintRef.current, { opacity: 0, y: 10, duration: 0.04 }, 0.03)
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.05 },
          0.17
        )
        .to(titleRef.current, { opacity: 0, y: -12, duration: 0.04 }, 0.84)
        .fromTo(
          outroRef.current,
          { opacity: 0, y: 46, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.07 },
          0.9
        )
        .set(outroRef.current, { pointerEvents: "auto" }, 0.93);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative -mt-20 h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#f6f3ef]">
        {/* ---- ambient light-glass backdrop ---- */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-[#ff6b1a]/16 blur-3xl" />
          <div className="absolute -right-40 top-[30%] h-[30rem] w-[30rem] rounded-full bg-[#2fa89a]/14 blur-3xl" />
          <div className="absolute bottom-[-15%] left-[25%] h-[26rem] w-[26rem] rounded-full bg-[#f5a623]/12 blur-3xl" />
          {/* faint blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0d2b2e 1px, transparent 1px), linear-gradient(to bottom, #0d2b2e 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        {/* ---- 3D canvas ---- */}
        <PhoneScene progress={progress} />

        {/* ---- hero overlay ---- */}
        <div
          ref={heroRef}
          className="absolute inset-x-0 top-[14%] z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 font-mono-tag text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60 shadow-sm backdrop-blur-md">
            <Wrench className="h-3 w-3 text-[#e85d04]" />
            iPhone 17 Pro Max — inside out
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-ink sm:text-6xl">
            Every layer.
            <br />
            <span className="bg-gradient-to-r from-[#ff6b1a] to-[#e85d04] bg-clip-text text-transparent">
              Fixed right.
            </span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60 sm:text-base">
            We repair every part you&apos;re about to see — screen to logic board — with
            genuine parts and a 90-day warranty.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/repair"
              className="group inline-flex items-center gap-2 rounded-full bg-[#ff6b1a] py-2.5 pl-6 pr-2 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04]"
            >
              Book a Repair
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff6b1a] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full border border-white/70 bg-white/50 px-6 py-2.5 text-sm font-bold text-ink/75 shadow-sm backdrop-blur-md transition hover:bg-white/80 hover:text-ink"
            >
              Explore services
            </Link>
          </div>
        </div>

        {/* ---- exploded-view title card (reference style) ---- */}
        <div
          ref={titleRef}
          className="absolute left-4 top-24 z-10 opacity-0 sm:left-8 sm:top-28"
        >
          <div className="rounded-2xl border border-white/70 bg-white/55 px-5 py-4 shadow-[0_16px_40px_-16px_rgba(180,100,40,0.35)] backdrop-blur-xl">
            <p className="font-display text-lg font-extrabold leading-tight text-ink sm:text-xl">
              iPhone 17 Pro Max
            </p>
            <p className="font-display text-sm font-bold text-[#e85d04]">Exploded view</p>
            <p className="mt-1.5 border-t border-ink/10 pt-1.5 font-mono-tag text-[9px] uppercase tracking-[0.18em] text-ink/50">
              Repair & internal components
            </p>
          </div>
        </div>

        {/* ---- outro overlay ---- */}
        <div
          ref={outroRef}
          className="pointer-events-none absolute inset-x-0 top-[15%] z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center opacity-0"
        >
          <div className="rounded-3xl border border-white/70 bg-white/70 px-7 py-6 shadow-[0_24px_60px_-20px_rgba(180,100,40,0.4)] backdrop-blur-xl sm:px-10 sm:py-8">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
              We take it apart.
              <span className="text-[#e85d04]"> We put it back better.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/60">
              Genuine parts, certified technicians and a 90-day warranty on every fix —
              from a cracked screen to board-level micro-soldering.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/repair"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ff6b1a] py-2.5 pl-6 pr-2 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04]"
              >
                Book a Repair
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff6b1a] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full border border-ink/10 bg-white/60 px-6 py-2.5 text-sm font-bold text-ink/75 backdrop-blur-md transition hover:bg-white"
              >
                All services
              </Link>
            </div>
          </div>
        </div>

        {/* ---- scroll hint ---- */}
        <div
          ref={hintRef}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
        >
          <span className="inline-flex animate-bounce items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 font-mono-tag text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55 shadow-sm backdrop-blur-md">
            Scroll to explode
            <ChevronDown className="h-3.5 w-3.5 text-[#e85d04]" />
          </span>
        </div>
      </div>
    </section>
  );
}
