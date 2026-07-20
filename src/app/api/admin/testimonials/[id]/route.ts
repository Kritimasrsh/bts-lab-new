import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: Not yet protected — add admin auth before production.

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/testimonials/[id]
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.author === "string") data.author = body.author.trim();
    if (typeof body.quote === "string") data.quote = body.quote.trim();
    if (body.rating != null) data.rating = Math.min(5, Math.max(1, Number(body.rating)));
    if ("role" in body) data.role = body.role ?? null;
    if (typeof body.featured === "boolean") data.featured = body.featured;
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.published === "boolean") data.published = body.published;

    const testimonial = await prisma.testimonial.update({ where: { id }, data });
    return NextResponse.json({ testimonial });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    console.error(`PATCH /api/admin/testimonials/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE /api/admin/testimonials/[id]
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    console.error(`DELETE /api/admin/testimonials/${id} failed`, err);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
