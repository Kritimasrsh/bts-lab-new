import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  dark?: boolean;
};

export default function Eyebrow({ children, dark = false }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono-tag text-xs uppercase tracking-widest ${
        dark
          ? "border-paper/25 text-mint"
          : "border-violet/20 bg-violet/5 text-violet"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-mint" : "bg-violet"}`}
      />
      {children}
    </span>
  );
}
