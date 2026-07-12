import Link from "next/link";
import Eyebrow from "./Eyebrow";

const COURSES = [
  { tag: "Beginner", title: "Screen & Battery Fundamentals", weeks: "4 weeks" },
  { tag: "Intermediate", title: "Board-Level Diagnostics", weeks: "6 weeks" },
  { tag: "Pro", title: "Micro-Soldering & Chip Repair", weeks: "8 weeks" },
];

export default function AcademySection() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow dark>Mobizilla Training</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Learn to fix phones
              <br />
              like it&apos;s a craft.
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/70">
              From your first screen swap to chip-level repair, our
              certified instructors train students, job-seekers and future
              shop owners — hands-on, on real devices.
            </p>
          </div>
          <Link
            href="/academy"
            className="hover-lift focus-ring inline-flex shrink-0 items-center rounded-full border border-paper/40 bg-transparent px-7 py-3.5 font-display text-sm font-bold text-paper"
          >
            Explore courses →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {COURSES.map((course) => (
            <div
              key={course.title}
              className="rounded-2xl border border-paper/15 p-6 transition-colors hover:border-mint"
            >
              <span className="inline-block rounded-full bg-mint px-3 py-1 font-mono-tag text-xs font-bold text-ink">
                {course.tag}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                {course.title}
              </h3>
              <p className="mt-2 font-mono-tag text-xs uppercase tracking-wide text-paper/50">
                {course.weeks} · Certificate included
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
