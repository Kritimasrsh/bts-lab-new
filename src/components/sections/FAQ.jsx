"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import Reveal from "@/components/animated/Reveal";

const FAQS = [
  {
    question: "How long does a mobile repair take?",
    answer:
      "Most screen and battery replacements are completed within 30–90 minutes. Complex motherboard or water-damage repairs may take 1–3 business days.",
    image: "/images/screen-repair.jpg",
  },
  {
    question: "Do you use genuine parts?",
    answer:
      "Yes. We use genuine or premium-quality replacement parts depending on your device and budget. We'll always explain your options before starting the repair.",
    image: "/images/battery-and-power.jpg",
  },
  {
    question: "Do your repairs come with a warranty?",
    answer:
      "Yes. Eligible repairs include a warranty covering replacement parts and workmanship for your peace of mind.",
    image: "/images/motherboard-reapair.jpg",
  },
  {
    question: "Can I book a repair online?",
    answer:
      "Absolutely. You can book your repair online, and our team will contact you to confirm the appointment.",
    image: "/images/camera-faceid.jpg",
  },
  {
    question: "Do you offer doorstep pickup and delivery?",
    answer:
      "Yes. We provide pickup and delivery services in selected locations for added convenience.",
    image: "/images/water-damage-rescue.png",
  },
  {
    question: "Which phone brands do you repair?",
    answer:
      "We repair Apple, Samsung, Xiaomi, OnePlus, OPPO, vivo, Realme, Google Pixel, Huawei, Motorola, Nothing, ASUS, POCO, and many other brands.",
    image: "/images/laptop-tablet-repair.avif",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);
  const current = FAQS[active] ?? FAQS[0];

  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-[#f6f3ef] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Questions, <span className="text-[#e85d04]">answered.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
            Everything customers ask before their first repair. Can&apos;t find yours? Our team
            replies within a day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* LEFT — accordion */}
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = active === index;
              return (
                <motion.div
                  key={index}
                  layout
                  transition={{ duration: 0.25 }}
                  className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition-colors ${
                    isOpen
                      ? "border-white/70 bg-white/70 text-ink shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)]"
                      : "glass-hover border-white/70 bg-white/55"
                  }`}
                >
                  <button
                    onClick={() => setActive(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-sm font-bold text-ink md:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[#ff6b1a] text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)]"
                          : "bg-[#ff6b1a]/10 text-[#e85d04]"
                      }`}
                    >
                      {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden lg:hidden"
                      >
                        {/* inline answer on mobile (right panel is hidden there) */}
                        <div className="px-5 pb-5">
                          <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                            <Image src={faq.image} alt={faq.question} fill className="object-cover" />
                          </div>
                          <p className="text-sm leading-6 text-ink/70">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT — image + answer panel (desktop) */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/55 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.image}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={current.image} alt={current.question} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-xl font-extrabold text-ink">{current.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{current.answer}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
