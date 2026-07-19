import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getModel, getProblemCategories } from "@/lib/queries/repair";
import ProblemSelector from "@/components/repair/ProblemSelector";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}) {
  const { brand, model } = await params;
  const m = await getModel(brand, model);
  return {
    title: m ? `${m.name} Repair — Select the problem | BTS Lab` : "Repair | BTS Lab",
  };
}

export default async function ModelProblemPage({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}) {
  const { brand, model } = await params;
  const [m, categories] = await Promise.all([
    getModel(brand, model),
    getProblemCategories(),
  ]);
  if (!m) notFound();

  return (
    <div className="bg-paper">
      {/* header */}
      <section className="border-b border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
          <nav className="flex flex-wrap items-center gap-2 font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
            <Link href="/#select-brand" className="hover:text-brand">
              Brands
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/repair/${m.brand.slug}`} className="hover:text-brand">
              {m.brand.name}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-brand">{m.name}</span>
          </nav>

          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            What&apos;s the problem?
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Select the issue(s) with your <span className="font-semibold text-ink">{m.name}</span>.
            Pick as many as apply, or describe it in your own words.
          </p>
        </div>
      </section>

      {/* selector */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <ProblemSelector modelId={m.id} modelName={m.name} categories={categories} />
      </section>
    </div>
  );
}
