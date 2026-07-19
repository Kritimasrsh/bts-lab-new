import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getBrandWithModelGroups } from "@/lib/queries/repair";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const data = await getBrandWithModelGroups(brand);
  return {
    title: data ? `${data.brand.name} Repair — Select your model | BTS Lab` : "Repair | BTS Lab",
  };
}

export default async function BrandModelsPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const data = await getBrandWithModelGroups(brand);
  if (!data) notFound();

  const { brand: b, groups } = data;
  const totalModels = groups.reduce((n, g) => n + g.models.length, 0);

  return (
    <div className="bg-paper">
      {/* header */}
      <section className="border-b border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <nav className="flex items-center gap-2 font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
            <Link href="/#select-brand" className="hover:text-brand">
              Brands
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand">{b.name}</span>
          </nav>

          <div className="mt-5 flex items-center gap-4">
            {b.logo && (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink/10 bg-paper p-2.5">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={44}
                  height={44}
                  className="h-full w-auto object-contain"
                />
              </span>
            )}
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Select your {b.name} model
              </h1>
              <p className="mt-1 text-sm text-ink-soft">
                {totalModels} models · choose yours to see repair options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* model groups */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        {groups.length === 0 && (
          <p className="text-ink-soft">
            No models listed yet.{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact us
            </Link>{" "}
            and we&apos;ll sort you out.
          </p>
        )}

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.series}>
              <h2 className="font-mono-tag text-xs uppercase tracking-[0.2em] text-ink-soft">
                {group.series}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.models.map((model) => (
                  <Link
                    key={model.id}
                    href={`/repair/${b.slug}/${model.slug}`}
                    className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border border-ink/10 bg-paper px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <span className="font-display text-[15px] font-bold text-ink transition-colors group-hover:text-brand">
                      {model.name}
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-soft transition-all group-hover:bg-brand group-hover:text-paper">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    {/* left accent bar on hover */}
                    <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform duration-200 group-hover:scale-y-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/#select-brand"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all brands
          </Link>
        </div>
      </section>
    </div>
  );
}
