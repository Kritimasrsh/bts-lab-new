import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

// PATCH /api/admin/problems/[id] — update a problem.
export async function PATCH(req: Request, { params }: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (typeof body.name === "string") data.name = body.name.trim();
    if (typeof body.order === "number") data.order = body.order;
    if (typeof body.active === "boolean") data.active = body.active;
    if (typeof body.categoryId === "string" && body.categoryId)
      data.categoryId = body.categoryId;

    const problem = await prisma.problem.update({ where: { id }, data });
    return NextResponse.json({ problem });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err) {
      if (err.code === "P2025")
        return NextResponse.json({ error: "Problem not found" }, { status: 404 });
      if (err.code === "P2002")
        return NextResponse.json(
          { error: "A problem with this name already exists in the category" },
          { status: 409 }
        );
    }
    console.error(`PATCH /api/admin/problems/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update problem" }, { status: 500 });
  }
}

// DELETE /api/admin/problems/[id] — delete a problem.
export async function DELETE(_req: Request, { params }: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  try {
    await prisma.problem.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err) {
      if (err.code === "P2025")
        return NextResponse.json({ error: "Problem not found" }, { status: 404 });
      if (err.code === "P2003")
        return NextResponse.json(
          { error: "This problem is used by repair requests and can't be deleted. Hide it instead." },
          { status: 409 }
        );
    }
    console.error(`DELETE /api/admin/problems/${id} failed`, err);
    return NextResponse.json({ error: "Failed to delete problem" }, { status: 500 });
  }
}
