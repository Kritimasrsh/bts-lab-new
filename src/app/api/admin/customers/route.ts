import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

/* ---------------- GET: list customers with filters ---------------- */
export async function GET(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");
  const source = searchParams.get("source");

  const where: Prisma.CustomerWhereInput = {};
  if (status) where.status = status as Prisma.CustomerWhereInput["status"];
  if (source) where.source = source as Prisma.CustomerWhereInput["source"];
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
    ];
  }

  const customers = await prisma.customer.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 1000,
    include: { orders: { select: { cost: true, amountPaid: true } } },
  });
  return NextResponse.json({ customers });
}

/* ---------------- POST: add a customer manually ---------------- */
export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "Phone is required" }, { status: 400 });

  const company = body.company?.trim() || null;
  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        company,
        address: body.address?.trim() || null,
        source: company ? "SHOP" : "DIRECT",
        notes: body.notes?.trim() || null,
      },
    });
    return NextResponse.json({ customer }, { status: 201 });
  } catch (e) {
    const err = e as { code?: string };
    if (err.code === "P2002") {
      return NextResponse.json({ error: `A customer with phone ${phone} already exists` }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
