import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { requireAdmin } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/models/[id] — update a model.
export async function PATCH(req: Request, { params }: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.name === "string") data.name = body.name.trim();
    if (typeof body.slug === "string") data.slug = slugify(body.slug);
    if ("series" in body) data.series = body.series?.trim() || null;
    if ("image" in body) data.image = body.image ?? null;
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.active === "boolean") data.active = body.active;
    if (typeof body.brandId === "string" && body.brandId) data.brandId = body.brandId;

    const model = await prisma.model.update({ where: { id }, data });
    return NextResponse.json({ model });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err) {
      if (err.code === "P2025")
        return NextResponse.json({ error: "Model not found" }, { status: 404 });
      if (err.code === "P2002")
        return NextResponse.json(
          { error: "A model with this slug already exists for the brand" },
          { status: 409 }
        );
    }
    console.error(`PATCH /api/admin/models/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update model" }, { status: 500 });
  }
}

// DELETE /api/admin/models/[id] — delete a model.
export async function DELETE(_req: Request, { params }: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  try {
    await prisma.model.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err) {
      if (err.code === "P2025")
        return NextResponse.json({ error: "Model not found" }, { status: 404 });
      if (err.code === "P2003")
        return NextResponse.json(
          { error: "This model has repair requests and can't be deleted." },
          { status: 409 }
        );
    }
    console.error(`DELETE /api/admin/models/${id} failed`, err);
    return NextResponse.json({ error: "Failed to delete model" }, { status: 500 });
  }
}
