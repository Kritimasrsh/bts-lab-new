import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="bg-paper">
      {/* header */}
      <section className="border-b border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
          <Skeleton className="h-3 w-56" />
          <Skeleton className="mt-5 h-9 w-72" />
          <Skeleton className="mt-3 h-4 w-96 max-w-full" />
        </div>
      </section>

      {/* selector */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="space-y-8">
            {[0, 1, 2].map((cat) => (
              <div key={cat}>
                <Skeleton className="h-3 w-28" />
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="hidden lg:block">
            <Skeleton className="h-80 rounded-2xl" />
          </aside>
        </div>
      </section>
    </div>
  );
}
