import Link from "next/link";
import { cn } from "@/lib/utils";

const ARROW_PATH =
  "M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z";

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d={ARROW_PATH} />
    </svg>
  );
}

type BaseProps = {
  children: React.ReactNode;
  /** Light-on-dark treatment (white outline) for use over dark backgrounds. */
  onDark?: boolean;
  className?: string;
};

type AsLink = BaseProps & { href: string; onClick?: never; type?: never };
type AsButton = BaseProps & {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

export type AnimatedButtonProps = AsLink | AsButton;

/**
 * Shared animated CTA (Uiverse "animated-button", adapted to brand teal).
 * Renders a Next.js <Link> when `href` is provided, otherwise a <button>.
 * The visual styling lives in globals.css under `.animated-button`.
 */
export default function AnimatedButton({
  children,
  onDark = false,
  className,
  ...rest
}: AnimatedButtonProps) {
  const cls = cn("animated-button", onDark && "on-dark", className);

  const inner = (
    <>
      <ArrowIcon className="arr-2" />
      <span className="text">{children}</span>
      <span className="circle" aria-hidden="true" />
      <ArrowIcon className="arr-1" />
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={cls}>
        {inner}
      </Link>
    );
  }

  const { onClick, type = "button" } = rest as AsButton;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
