const ITEMS = [
  {
    title: "Verified",
    sub: "Trusted Partners",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Top Rated",
    sub: "Happy Customers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" opacity="0" />
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
      </svg>
    ),
  },
  {
    title: "Instant",
    sub: "Same Day Pay",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.2 2" />
      </svg>
    ),
  },
  {
    title: "Secure",
    sub: "Data Safe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <div className="border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:gap-6">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet/10 text-violet">
              {item.icon}
            </span>
            <div>
              <p className="font-display text-base font-bold text-ink">{item.title}</p>
              <p className="font-sans text-sm text-ink-soft">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
