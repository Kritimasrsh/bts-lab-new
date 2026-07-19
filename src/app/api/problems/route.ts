import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/problems — all problem categories with their active problems.
// The list is global (same for every model).
export async function GET() {
  try {
    const categories = await prisma.problemCategory.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        problems: {
          where: { active: true },
          orderBy: { order: "asc" },
          select: { id: true, name: true, slug: true },
        },
      },
    });
    // drop empty categories
    return NextResponse.json({
      categories: categories.filter((c) => c.problems.length > 0),
    });
  } catch (err) {
    console.error("GET /api/problems failed", err);
    return NextResponse.json({ error: "Failed to load problems" }, { status: 500 });
  }
}
