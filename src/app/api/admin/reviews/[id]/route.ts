import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: Not yet protected — add admin auth before production.

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/reviews/[id]
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.author === "string") data.author = body.author.trim();
    if (typeof body.text === "string") data.text = body.text.trim();
    if (body.rating != null) data.rating = Math.min(5, Math.max(1, Number(body.rating)));
    if ("service" in body) data.service = body.service ?? null;
    if ("avatarUrl" in body) data.avatarUrl = body.avatarUrl ?? null;
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.published === "boolean") data.published = body.published;

    const review = await prisma.googleReview.update({ where: { id }, data });
    return NextResponse.json({ review });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    console.error(`PATCH /api/admin/reviews/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE /api/admin/reviews/[id]
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    await prisma.googleReview.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    console.error(`DELETE /api/admin/reviews/${id} failed`, err);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
