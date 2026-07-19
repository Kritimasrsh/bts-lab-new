import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

// NOTE: Not yet protected — add auth before production.

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/brands/[id] — update a brand.
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.name === "string") data.name = body.name.trim();
    if (typeof body.slug === "string") data.slug = slugify(body.slug);
    if ("logo" in body) data.logo = body.logo ?? null;
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.active === "boolean") data.active = body.active;

    const brand = await prisma.brand.update({ where: { id }, data });
    return NextResponse.json({ brand });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    console.error(`PATCH /api/admin/brands/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

// DELETE /api/admin/brands/[id] — delete a brand (cascades to models).
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  try {
    await prisma.brand.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }
    console.error(`DELETE /api/admin/brands/${id} failed`, err);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
