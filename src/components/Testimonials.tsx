import Eyebrow from "@/components/Eyebrow";

const REVIEWS = [
  {
    name: "Rajesh K.",
    stars: 5,
    quote:
      "Got my iPhone screen replaced here. Excellent work and the price was very fair.",
    code: "REV-114",
  },
  {
    name: "Suman S.",
    stars: 4,
    quote:
      "Sold my old Samsung through their buyback program. Fast payment, smooth process.",
    code: "REV-115",
  },
  {
    name: "Priya M.",
    stars: 5,
    quote:
      "The team is very professional. They fixed my water-damaged phone when others gave up.",
    code: "REV-116",
  },
];

export default function Testimonials() {
  return (
    <section className="border-y border-ink/10 bg-paper-dim">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Eyebrow>Real tickets, real customers</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          What people say
          <br />
          after we&apos;re done.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <div key={review.code} className="ticket bg-paper">
              <div className="p-6">
                <div className="flex gap-1 text-sun">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < review.stars ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="mt-4 font-sans text-sm leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              <div className="ticket-perf mx-6" />
              <div className="flex items-center justify-between px-6 py-4">
                <span className="font-display text-sm font-bold">{review.name}</span>
                <span className="font-mono-tag text-xs text-ink-soft">
                  {review.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
