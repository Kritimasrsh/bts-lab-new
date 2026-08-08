import type { ReactNode } from "react";

type EyebrowProps = {
  children?: ReactNode;
  dark?: boolean;
};

/**
 * Eyebrow / kicker labels have been retired from the design. This is kept as a
 * no-op so existing call-sites (and the `eyebrow` prop on PageHeader) stay valid
 * without rendering the small uppercase pill above every heading.
 */
export default function Eyebrow(_props: EyebrowProps) {
  return null;
}
