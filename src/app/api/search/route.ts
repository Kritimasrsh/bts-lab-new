import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type SearchResult = {
  type: "brand" | "model" | "problem" | "service";
  label: string;
  sublabel?: string;
  href: string;
};

// GET /api/search?q=...  — searches brands, models, problems across the app.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [brands, models, problems] = await Promise.all([
      prisma.brand.findMany({
        where: { active: true, name: { contains: q, mode: "insensitive" } },
        select: { name: true, slug: true },
        take: 4,
      }),
      prisma.model.findMany({
        where: { active: true, name: { contains: q, mode: "insensitive" } },
        select: { name: true, slug: true, brand: { select: { name: true, slug: true } } },
        take: 6,
      }),
      prisma.problem.findMany({
        where: { active: true, name: { contains: q, mode: "insensitive" } },
        select: { name: true, category: { select: { name: true } } },
        take: 6,
      }),
    ]);

    const results: SearchResult[] = [
      ...brands.map((b) => ({
        type: "brand" as const,
        label: b.name,
        sublabel: "Brand",
        href: `/repair/${b.slug}`,
      })),
      ...models.map((m) => ({
        type: "model" as const,
        label: m.name,
        sublabel: `${m.brand.name} · model`,
        href: `/repair/${m.brand.slug}/${slugifyModel(m.name)}`,
      })),
      ...problems.map((p) => ({
        type: "problem" as const,
        label: p.name,
        sublabel: `${p.category?.name ?? "Problem"} · issue`,
        href: `/services`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (err) {
    console.error("GET /api/search failed", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}

// Model slugs are stored per-brand; recompute the same way the seed did so the
// link lands on the model page. (Kept simple; slugs are deterministic.)
function slugifyModel(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
