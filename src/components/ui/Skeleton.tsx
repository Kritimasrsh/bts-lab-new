import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  dark?: boolean;
};

/** Shimmering placeholder block. Compose several to mimic a page's layout. */
export function Skeleton({ className, dark, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", dark && "skeleton-dark", className)}
      {...props}
    />
  );
}
