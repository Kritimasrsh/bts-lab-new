import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: Not yet protected — add admin auth before production.

// GET /api/admin/reviews — all reviews (incl. hidden).
export async function GET() {
  try {
    const reviews = await prisma.googleReview.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error("GET /api/admin/reviews failed", err);
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

// POST /api/admin/reviews — create a review.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const author = String(body.author || "").trim();
    const text = String(body.text || "").trim();
    if (!author || !text) {
      return NextResponse.json({ error: "author and text are required" }, { status: 400 });
    }
    const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));

    const review = await prisma.googleReview.create({
      data: {
        author,
        text,
        rating,
        service: body.service ?? null,
        avatarUrl: body.avatarUrl ?? null,
        order: typeof body.order === "number" ? body.order : 0,
        published: body.published ?? true,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/reviews failed", err);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
