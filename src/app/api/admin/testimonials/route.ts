import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: Not yet protected — add admin auth before production.

// GET /api/admin/testimonials — all testimonials (incl. hidden).
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ testimonials });
  } catch (err) {
    console.error("GET /api/admin/testimonials failed", err);
    return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}

// POST /api/admin/testimonials — create a testimonial.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const author = String(body.author || "").trim();
    const quote = String(body.quote || "").trim();
    if (!author || !quote) {
      return NextResponse.json({ error: "author and quote are required" }, { status: 400 });
    }
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));

    const testimonial = await prisma.testimonial.create({
      data: {
        author,
        quote,
        rating,
        role: body.role ?? null,
        featured: body.featured ?? false,
        order: typeof body.order === "number" ? body.order : 0,
        published: body.published ?? true,
      },
    });
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/testimonials failed", err);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
