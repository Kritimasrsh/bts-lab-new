import { cn } from "@/lib/utils";

type StatIconName = "repaired" | "customers" | "warranty" | "success";

type StatIconProps = {
  name: StatIconName;
  className?: string;
};

/**
 * Renders a solid-fill SVG from /public/stats tinted with currentColor via a
 * CSS mask. This lets the black source SVGs pick up the brand color and stay
 * crisp at any size, independent of each file's viewBox.
 */
export default function StatIcon({ name, className }: StatIconProps) {
  const url = `/stats/${name}.svg`;
  return (
    <span
      role="img"
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
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
