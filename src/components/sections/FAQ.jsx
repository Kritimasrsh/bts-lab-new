"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    question: "How long does a mobile repair take?",
    answer:
      "Most screen and battery replacements are completed within 30–90 minutes. Complex motherboard or water-damage repairs may take 1–3 business days.",
  },
  {
    question: "Do you use genuine parts?",
    answer:
      "Yes. We use genuine or premium-quality replacement parts depending on your device and budget. We'll always explain your options before starting the repair.",
  },
  {
    question: "Do your repairs come with a warranty?",
    answer:
      "Yes. Eligible repairs include a warranty covering replacement parts and workmanship for your peace of mind.",
  },
  {
    question: "Can I book a repair online?",
    answer:
      "Absolutely. You can book your repair online, and our team will contact you to confirm the appointment.",
  },
  {
    question: "Do you offer doorstep pickup and delivery?",
    answer:
      "Yes. We provide pickup and delivery services in selected locations for added convenience.",
  },
  {
    question: "Which phone brands do you repair?",
    answer:
      "We repair Apple, Samsung, Xiaomi, OnePlus, OPPO, vivo, Realme, Google Pixel, Huawei, Motorola, Nothing, ASUS, POCO, and many other brands.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-3xl px-4">

        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Everything you need to know before repairing your device.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  onClick={() => setActive(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition"
                >
                  <span className="pr-4 text-sm font-semibold text-slate-900 md:text-base">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F6A73]/10"
                  >
                    <Plus className="h-4 w-4 text-[#0F6A73]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                        <p className="text-sm leading-6 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}