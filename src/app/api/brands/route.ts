import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/brands — active brands, ordered for display.
export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      select: { id: true, name: true, slug: true, logo: true },
    });
    return NextResponse.json({ brands });
  } catch (err) {
    console.error("GET /api/brands failed", err);
    return NextResponse.json({ error: "Failed to load brands" }, { status: 500 });
  }
}
