import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };
const STATUSES = ["NEW", "CONTACTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

// GET /api/admin/repair-requests/[id] — full booking detail.
export async function GET(_req: Request, { params }: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { id } = await params;
  try {
    const request = await prisma.repairRequest.findUnique({
      where: { id },
      include: {
        model: { include: { brand: { select: { name: true, slug: true } } } },
        problems: { include: { problem: { include: { category: { select: { name: true } } } } } },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
    if (!request) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ request });
  } catch (err) {
    console.error(`GET /api/admin/repair-requests/${id} failed`, err);
    return NextResponse.json({ error: "Failed to load booking" }, { status: 500 });
  }
}

// PATCH /api/admin/repair-requests/[id] — update status.
export async function PATCH(req: Request, { params }: Ctx) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { id } = await params;
  try {
    const body = await req.json();
    const status = String(body.status || "");
    if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const request = await prisma.repairRequest.update({
      where: { id },
      data: { status: status as (typeof STATUSES)[number] },
      select: { id: true, status: true },
    });
    return NextResponse.json({ request });
  } catch (err: unknown) {
    if (typeof err === "object" && err && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    console.error(`PATCH /api/admin/repair-requests/${id} failed`, err);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
