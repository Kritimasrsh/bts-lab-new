import { cn } from "@/lib/utils";

type MaskIconProps = {
  /** Path under /public, e.g. "/svgs/phone.svg". */
  src: string;
  className?: string;
};

/**
 * Renders any solid-fill SVG from /public tinted with currentColor via a CSS
 * mask — crisp at any size, independent of the file's own fill/viewBox.
 */
export default function MaskIcon({ src, className }: MaskIconProps) {
  return (
    <span
      role="img"
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
