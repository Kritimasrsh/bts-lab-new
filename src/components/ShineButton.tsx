import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  /** Light outline treatment for use over dark backgrounds. */
  onDark?: boolean;
  className?: string;
};

type AsLink = BaseProps & { href: string; onClick?: never; type?: never };
type AsButton = BaseProps & {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
};

export type ShineButtonProps = AsLink | AsButton;

/**
 * Secondary CTA with a light-sweep shine on hover (Uiverse, adapted to brand teal).
 * Renders a Next.js <Link> when `href` is given, otherwise a <button>.
 * Styling lives in globals.css under `.shine-btn`.
 */
export default function ShineButton({
  children,
  onDark = false,
  className,
  ...rest
}: ShineButtonProps) {
  const cls = cn("shine-btn", onDark && "on-dark", className);

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = rest as AsButton;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
