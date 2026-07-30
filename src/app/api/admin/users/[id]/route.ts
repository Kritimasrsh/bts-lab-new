import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };
const ROLES = ["CUSTOMER", "ADMIN"] as const;

// PATCH /api/admin/users/[id] — change a user's role.
export async function PATCH(req: Request, { params }: Ctx) {
  const { response, session } = await requireAdmin();
  if (response) return response;
  const { id } = await params;

  try {
    const body = await req.json();
    const role = String(body.role || "");
    if (!ROLES.includes(role as (typeof ROLES)[number])) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    if (id === session!.user!.id && role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can't remove your own admin access." },
        { status: 400 }
      );
    }
    const user = await prisma.user.update({
      where: { id },
      data: { role: role as (typeof ROLES)[number] },
      select: { id: true, role: true },
    });
    return NextResponse.json({ user });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.error(`PATCH /api/admin/users/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id]
export async function DELETE(_req: Request, { params }: Ctx) {
  const { response, session } = await requireAdmin();
  if (response) return response;
  const { id } = await params;

  if (id === session!.user!.id) {
    return NextResponse.json({ error: "You can't delete your own account." }, { status: 400 });
  }
  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.error(`DELETE /api/admin/users/${id} failed`, err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
