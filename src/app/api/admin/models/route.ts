import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

// NOTE: Not yet protected — add auth before production.

// GET /api/admin/models?brandId=... — models, optionally filtered by brand.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get("brandId") || undefined;
  try {
    const models = await prisma.model.findMany({
      where: brandId ? { brandId } : undefined,
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { brand: { select: { name: true, slug: true } } },
    });
    return NextResponse.json({ models });
  } catch (err) {
    console.error("GET /api/admin/models failed", err);
    return NextResponse.json({ error: "Failed to load models" }, { status: 500 });
  }
}

// POST /api/admin/models — create a model under a brand.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const brandId = String(body.brandId || "").trim();
    if (!name || !brandId) {
      return NextResponse.json(
        { error: "name and brandId are required" },
        { status: 400 }
      );
    }
    const slug = body.slug ? slugify(String(body.slug)) : slugify(name);

    const model = await prisma.model.create({
      data: {
        name,
        slug,
        series: body.series ?? null,
        image: body.image ?? null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active ?? true,
        brandId,
      },
    });
    return NextResponse.json({ model }, { status: 201 });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2002") {
      return NextResponse.json(
        { error: "A model with this slug already exists for the brand" },
        { status: 409 }
      );
    }
    console.error("POST /api/admin/models failed", err);
    return NextResponse.json({ error: "Failed to create model" }, { status: 500 });
  }
}
