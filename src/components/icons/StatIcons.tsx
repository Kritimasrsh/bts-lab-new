// Custom line-art SVG icons for the hero stats — more distinctive than the
// stock lucide set. Inherit currentColor.

type P = { className?: string };

export function IconWrench({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M31 6a10 10 0 0 0-9.2 13.9L7.4 34.3a4 4 0 0 0 0 5.7l.6.6a4 4 0 0 0 5.7 0l14.4-14.4A10 10 0 0 0 42 17a10 10 0 0 0-.5-3l-6 6-5-5 6-6A10 10 0 0 0 31 6Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="37" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function IconUsers({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="18" cy="16" r="6.5" stroke="currentColor" strokeWidth="2.2" />
      <path d="M6 40c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 11a6.5 6.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M34 28.5c5 1.4 8 5.6 8 11.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconShieldCheck({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path
        d="M24 5 9 10v11c0 9.4 6.3 16.8 15 20 8.7-3.2 15-10.6 15-20V10L24 5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="m18 24 4.2 4.2L31 19.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGauge({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M8 34a16 16 0 1 1 32 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 34 33 22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="24" cy="34" r="2.6" fill="currentColor" />
    </svg>
  );
}
