import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/animated/Reveal";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-brand">
      {children}
    </h3>
  );
}

export const metadata = {
  title: "Contact | BTS Lab",
  description: "Book a repair, ask a question, or visit BTS Lab in Kathmandu.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's open a ticket."
        desc="Tell us what's going on with your device and we'll get back within the hour."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal as="div" direction="right" className="glass rounded-3xl p-8">
            <form>
            <p className="font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
              New ticket
            </p>
            <div className="mt-6 space-y-5">
              <Field label="Name" placeholder="Your full name" />
              <Field label="Phone" placeholder="98XXXXXXXX" />
              <Field label="Device" placeholder="e.g. iPhone 13, Samsung S22" />
              <div>
                <label className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">
                  What&apos;s wrong?
                </label>
                <textarea
                  rows={4}
                  placeholder="Cracked screen, won't charge, dropped in water..."
                  className="focus-ring mt-2 w-full rounded-xl border border-ink/12 bg-paper px-4 py-3 font-sans text-sm outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="hover-lift focus-ring mt-7 inline-flex w-full items-center justify-center rounded-full border border-ink/12 bg-brand px-7 py-3.5 font-display text-sm font-bold text-paper transition hover:bg-brand-deep"
            >
              Submit Ticket →
            </button>
            </form>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className="glass rounded-2xl p-6">
              <Label>Visit us</Label>
              <p className="mt-3 font-display text-xl font-bold">
                New Road, Kathmandu
              </p>
              <p className="mt-1 font-sans text-sm text-ink-soft">
                New Road, Kathmandu, Nepal
              </p>
            </Reveal>
            <Reveal delay={0.08} className="glass rounded-2xl p-6">
              <Label>Call or message</Label>
              <p className="mt-3 font-mono-tag text-lg font-bold">
                +977 98-0101-8203
              </p>
              <p className="mt-1 font-mono-tag text-sm text-ink-soft">01-5354999</p>
            </Reveal>
            <Reveal delay={0.16} className="glass rounded-2xl p-6">
              <Label>Hours</Label>
              <ul className="mt-3 space-y-2 font-sans text-sm">
                <li className="flex justify-between border-b border-ink/10 pb-2">
                  <span>Sun – Fri</span>
                  <span className="font-mono-tag">10:00 – 19:00</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Saturday</span>
                  <span className="font-mono-tag">11:00 – 17:00</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, placeholder }) {
  return (
    <div>
      <label className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-xl border border-ink/12 bg-paper px-4 py-3 font-sans text-sm outline-none"
      />
    </div>
  );
}
