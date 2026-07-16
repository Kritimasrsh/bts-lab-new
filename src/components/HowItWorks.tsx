import Eyebrow from "@/components/Eyebrow";

const STEPS = [
  {
    num: "01",
    title: "Tell us your device & problem",
    desc: "Select your brand, model and the issue you're facing. Takes under a minute and gives you an instant estimate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <path d="M10 18h4" />
        <path d="m8.5 9 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We diagnose & fix it",
    desc: "Free doorstep pickup or walk-in. Certified technicians diagnose the fault and repair with genuine, quality-tested parts.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Get it back — warrantied",
    desc: "Your phone is delivered back tested and warrantied. Track everything from your BTS Lab portal, from quote to delivery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            From broken to brand-new in three steps.
          </h2>
          <p className="mt-3 font-sans text-base text-ink-soft">
            No guesswork, no runaround. BTS Lab turns a stressful repair into a simple, trackable process.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="ticket hover-lift flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  {step.icon}
                </span>
                <span className="font-display text-3xl font-extrabold text-ink/10">
                  {step.num}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
