import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

function toInt(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { id } = await params;
  const order = await prisma.repairOrder.findUnique({ where: { id } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ order });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const data: Prisma.RepairOrderUpdateInput = {};
  const str = ["customerName", "companyName", "address", "contactNo", "brand", "deviceModel", "relatedFault", "serialImei", "devicePassword", "faultDescription", "notes"] as const;
  for (const k of str) {
    if (k in body) (data as Record<string, unknown>)[k] = body[k]?.toString().trim() || null;
  }
  const enums = ["source", "preferredPayment", "status", "paymentStatus"] as const;
  for (const k of enums) {
    if (k in body && body[k]) (data as Record<string, unknown>)[k] = body[k];
  }
  const bools = ["passwordProtected", "quoted", "termsAccepted"] as const;
  for (const k of bools) {
    if (k in body) (data as Record<string, unknown>)[k] = Boolean(body[k]);
  }
  const ints = ["quotedAmount", "cost", "amountPaid"] as const;
  for (const k of ints) {
    if (k in body) (data as Record<string, unknown>)[k] = toInt(body[k]);
  }

  try {
    const order = await prisma.repairOrder.update({ where: { id }, data });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { id } = await params;
  try {
    await prisma.repairOrder.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
