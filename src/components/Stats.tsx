function DeviceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m22 4-10 10-3-3" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const STATS = [
  { value: "10,000+", label: "Devices Repaired", icon: DeviceIcon, fg: "text-brand" },
  { value: "98%", label: "Success Rate", icon: CheckCircleIcon, fg: "text-brand" },
  { value: "24hr", label: "Avg. Turnaround", icon: ClockIcon, fg: "text-brand" },
  { value: "4.9★", label: "Customer Rating", icon: UsersIcon, fg: "text-brand" },
];

export default function Stats() {
  return (
    <section className="bg-paper-dim">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mt-3 font-sans text-base text-ink-soft">
            We provide fast, reliable, and affordable mobile repair services.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                <Icon className={`h-7 w-7 ${stat.fg}`} />
                <span className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {stat.value}
                </span>
                <span className="font-sans text-sm font-medium text-ink-soft">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}