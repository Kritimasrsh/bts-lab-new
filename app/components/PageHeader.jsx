import Eyebrow from "./Eyebrow";

export default function PageHeader({ eyebrow, title, desc }) {
  return (
    <section className="border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="flex justify-center">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-6xl">
          {title}
        </h1>
        {desc && (
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}
