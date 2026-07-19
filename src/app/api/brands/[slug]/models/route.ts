import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/brands/[slug]/models — a brand with its active models,
// grouped by series for the selection UI.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        models: {
          where: { active: true },
          orderBy: [{ order: "asc" }, { name: "asc" }],
          select: { id: true, name: true, slug: true, series: true, image: true },
        },
      },
    });

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    // group models by series (preserving order)
    const groups: { series: string; models: typeof brand.models }[] = [];
    for (const model of brand.models) {
      const key = model.series || "Other";
      let group = groups.find((g) => g.series === key);
      if (!group) {
        group = { series: key, models: [] };
        groups.push(group);
      }
      group.models.push(model);
    }

    return NextResponse.json({
      brand: { id: brand.id, name: brand.name, slug: brand.slug, logo: brand.logo },
      groups,
    });
  } catch (err) {
    console.error(`GET /api/brands/${slug}/models failed`, err);
    return NextResponse.json({ error: "Failed to load models" }, { status: 500 });
  }
}
