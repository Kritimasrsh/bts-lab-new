import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

// NOTE: Not yet protected — add auth before production.

// GET /api/admin/problems — all categories with their problems (incl. inactive).
export async function GET() {
  try {
    const categories = await prisma.problemCategory.findMany({
      orderBy: { order: "asc" },
      include: { problems: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json({ categories });
  } catch (err) {
    console.error("GET /api/admin/problems failed", err);
    return NextResponse.json({ error: "Failed to load problems" }, { status: 500 });
  }
}

// POST /api/admin/problems — create a problem under a category.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const categoryId = String(body.categoryId || "").trim();
    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "name and categoryId are required" },
        { status: 400 }
      );
    }

    const category = await prisma.problemCategory.findUnique({
      where: { id: categoryId },
      select: { name: true },
    });
    if (!category) {
      return NextResponse.json({ error: "Unknown category" }, { status: 404 });
    }

    const slug = slugify(`${category.name}-${name}`);
    const problem = await prisma.problem.create({
      data: {
        name,
        slug,
        order: typeof body.order === "number" ? body.order : 0,
        active: body.active ?? true,
        categoryId,
      },
    });
    return NextResponse.json({ problem }, { status: 201 });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2002") {
      return NextResponse.json(
        { error: "A problem with this name/slug already exists" },
        { status: 409 }
      );
    }
    console.error("POST /api/admin/problems failed", err);
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
  }
}
