/* Lightweight, dependency-free SVG charts for the admin overview.
   All server-renderable (no hooks) — plain presentational components. */

type Bar = { label: string; value: number; sub?: string };

/** Grouped monthly bar chart: orders count with an optional secondary series. */
export function MonthlyBars({
  data,
  height = 180,
}: {
  data: { label: string; primary: number; secondary?: number }[];
  height?: number;
}) {
  const max = Math.max(1, ...data.map((d) => Math.max(d.primary, d.secondary ?? 0)));
  const barGap = 10;
  const cols = data.length;
  const colW = 100 / cols;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="h-44 w-full">
        {/* horizontal gridlines */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1="0"
            x2="100"
            y1={height - t * (height - 24)}
            y2={height - t * (height - 24)}
            stroke="currentColor"
            strokeWidth="0.15"
            className="text-ink/10"
          />
        ))}
        {data.map((d, i) => {
          const h = (d.primary / max) * (height - 24);
          const x = i * colW + barGap / 4;
          const w = colW - barGap / 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y={height - h}
                width={w}
                height={h}
                rx="1.2"
                className="fill-brand"
              >
                <title>{`${d.label}: ${d.primary}`}</title>
              </rect>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between">
        {data.map((d, i) => (
          <span key={i} className="flex-1 text-center text-[11px] font-medium text-ink-soft">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Donut chart for a small set of labelled segments. */
export function Donut({
  segments,
  size = 132,
  thickness = 16,
  centerLabel,
  centerSub,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={c} cy={c} r={r} fill="none" strokeWidth={thickness} className="stroke-ink/8" />
          {segments.map((s, i) => {
            const len = (s.value / total) * circ;
            const dash = `${len} ${circ - len}`;
            const el = (
              <circle
                key={i}
                cx={c}
                cy={c}
                r={r}
                fill="none"
                strokeWidth={thickness}
                stroke={s.color}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        {centerLabel != null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-xl font-extrabold text-ink">{centerLabel}</span>
            {centerSub && <span className="text-[10px] uppercase tracking-wide text-ink-soft">{centerSub}</span>}
          </div>
        )}
      </div>
      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.color }} />
              <span className="truncate text-ink-soft">{s.label}</span>
            </span>
            <span className="font-semibold tabular-nums text-ink">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Thin horizontal progress bars (e.g. source split). */
export function BarList({ items }: { items: (Bar & { color?: string })[] }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="space-y-3.5">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-ink">{it.label}</span>
            <span className="tabular-nums text-ink-soft">
              {it.value}
              {it.sub ? <span className="ml-1 text-xs">{it.sub}</span> : null}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/8">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: it.color ?? "var(--brand)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
