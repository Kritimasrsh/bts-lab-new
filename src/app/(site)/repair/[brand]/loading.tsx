import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="bg-paper">
      {/* header skeleton */}
      <section className="border-b border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <Skeleton className="h-3 w-40" />
          <div className="mt-5 flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* model groups skeleton */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="space-y-10">
          {[0, 1, 2].map((g) => (
            <div key={g}>
              <Skeleton className="h-3 w-24" />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-[58px] rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
