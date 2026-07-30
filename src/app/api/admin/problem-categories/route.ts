import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/problem-categories — list categories (with problem counts).
export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    const categories = await prisma.problemCategory.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { problems: true } } },
    });
    return NextResponse.json({ categories });
  } catch (err) {
    console.error("GET /api/admin/problem-categories failed", err);
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}

// POST /api/admin/problem-categories — create a category.
export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const count = await prisma.problemCategory.count();
    const category = await prisma.problemCategory.create({
      data: {
        name,
        slug: slugify(name),
        order: typeof body.order === "number" ? body.order : count,
      },
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2002") {
      return NextResponse.json({ error: "That category already exists" }, { status: 409 });
    }
    console.error("POST /api/admin/problem-categories failed", err);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
