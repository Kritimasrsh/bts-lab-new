export default function Ticket({
  icon,
  title,
  desc,
  price,
  code,
  accent = "violet",
  className = "",
}) {
  const accents = {
    violet: "bg-violet",
    coral: "bg-coral",
    sun: "bg-sun",
    mint: "bg-mint",
  };

  return (
    <div className={`ticket hover-lift flex flex-col ${className}`}>
      <div className="flex items-start gap-4 p-6">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/12 text-xl ${accents[accent]}`}
        >
          {icon}
        </span>
        <div>
          <h3 className="font-display text-lg font-bold leading-snug">{title}</h3>
          {desc && (
            <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-soft">
              {desc}
            </p>
          )}
        </div>
      </div>
      <div className="ticket-perf mx-6" />
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">
          {code}
        </span>
        {price && (
          <span className="font-mono-tag text-sm font-bold text-ink">{price}</span>
        )}
      </div>
    </div>
  );
}
