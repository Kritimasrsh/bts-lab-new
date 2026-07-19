import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

// NOTE: Admin routes are NOT yet protected. Add authentication/authorization
// (e.g. middleware or a session check) before exposing these in production.

// GET /api/admin/brands — all brands (incl. inactive) with model counts.
export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { _count: { select: { models: true } } },
    });
    return NextResponse.json({ brands });
  } catch (err) {
    console.error("GET /api/admin/brands failed", err);
    return NextResponse.json({ error: "Failed to load brands" }, { status: 500 });
  }
}

// POST /api/admin/brands — create a brand.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const slug = body.slug ? slugify(String(body.slug)) : slugify(name);

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
        logo: body.logo ?? null,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active ?? true,
      },
    });
    return NextResponse.json({ brand }, { status: 201 });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2002") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error("POST /api/admin/brands failed", err);
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}
