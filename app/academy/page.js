import PageHeader from "../components/PageHeader";
import CtaBanner from "../components/CtaBanner";
import Eyebrow from "../components/Eyebrow";

export const metadata = {
  title: "Repair Academy | Mobizilla",
  description: "Hands-on mobile repair training in Kathmandu, from beginner to chip-level pro.",
};

const COURSES = [
  {
    tag: "Beginner",
    title: "Screen & Battery Fundamentals",
    weeks: "4 weeks",
    desc: "Disassembly, screen and battery replacement, tool handling, and customer-facing diagnostics.",
    accent: "mint",
  },
  {
    tag: "Intermediate",
    title: "Board-Level Diagnostics",
    weeks: "6 weeks",
    desc: "Multimeter use, schematic reading, and tracing common faults on real donor boards.",
    accent: "sun",
  },
  {
    tag: "Pro",
    title: "Micro-Soldering & Chip Repair",
    weeks: "8 weeks",
    desc: "IC reballing, chip-off recovery, and advanced motherboard-level repair techniques.",
    accent: "coral",
  },
];

const WHY = [
  { icon: "🎓", title: "Certified on graduation", desc: "A recognized certificate that job-ready employers ask for." },
  { icon: "🧰", title: "Real tools, real devices", desc: "Train on the same CNC, OCA and laser machines used in our lab." },
  { icon: "👩‍🏫", title: "Small class sizes", desc: "Hands-on time with instructors, not lecture-hall crowds." },
  { icon: "💼", title: "Job placement support", desc: "Top graduates get referred to our hiring partners." },
];

export default function AcademyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Mobizilla Training"
        title="Learn to fix phones like it's a craft."
        desc="From your first screen swap to chip-level repair — built for students, job-seekers, and future shop owners."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Eyebrow>Courses</Eyebrow>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {COURSES.map((course) => (
            <div key={course.title} className="ticket flex flex-col bg-paper">
              <div className="p-6">
                <span
                  className={`inline-block rounded-full border border-ink/12 px-3 py-1 font-mono-tag text-xs font-bold ${
                    course.accent === "mint"
                      ? "bg-mint"
                      : course.accent === "sun"
                      ? "bg-sun"
                      : "bg-coral text-paper"
                  }`}
                >
                  {course.tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug">
                  {course.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                  {course.desc}
                </p>
              </div>
              <div className="ticket-perf mx-6" />
              <div className="flex items-center justify-between px-6 py-4">
                <span className="font-mono-tag text-xs text-ink-soft">
                  {course.weeks}
                </span>
                <span className="font-mono-tag text-xs font-bold">
                  Certificate ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Eyebrow dark>Why train here</Eyebrow>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <div key={item.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 text-xl">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-display text-base font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-paper/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to start your first ticket?"
        subtitle="Applications open on a rolling basis — cohorts start monthly."
        ctaLabel="Apply to the Academy"
      />
    </>
  );
}
