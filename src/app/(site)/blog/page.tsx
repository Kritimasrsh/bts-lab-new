import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Blog | BTS Lab",
  description: "Repair tips, buyback guides, and news from the BTS Lab team.",
};

const POSTS = [
  {
    tag: "Repair Tips",
    title: "5 Signs Your Battery Needs Replacing",
    desc: "Slow charging, sudden shutdowns, and swelling. Here's what to watch for before it's too late.",
    date: "Jul 02, 2026",
  },
  {
    tag: "Buyback",
    title: "How We Price a Used Phone Fairly",
    desc: "A look inside our transparent valuation process, from condition checks to market data.",
    date: "Jun 21, 2026",
  },
  {
    tag: "Training",
    title: "From Student to Technician: Aakash's Story",
    desc: "How our 8-week micro-soldering course helped a Training graduate open his own shop.",
    date: "Jun 10, 2026",
  },
  {
    tag: "Guides",
    title: "Water Damage: What To Do In The First Hour",
    desc: "The steps that actually help and the myths (like rice) that can make things worse.",
    date: "May 29, 2026",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="BTS Lab Blog"
        title="Repair tips, buyback guides & news."
        desc="Practical advice from our technicians, straight from the workbench."
      />

      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {POSTS.map((post) => (
              <article
                key={post.title}
                className="flex flex-col rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-[#ff6b1a]/10 px-3 py-1 font-mono-tag text-xs font-bold uppercase tracking-wide text-[#e85d04]">
                  {post.tag}
                </span>
                <h2 className="mt-4 font-display text-xl font-bold leading-snug text-ink">
                  {post.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                  {post.desc}
                </p>
                <p className="mt-4 font-mono-tag text-xs uppercase tracking-wide text-ink/55">
                  {post.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
