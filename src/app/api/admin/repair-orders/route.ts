import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

/** Next lab number, continuing from the highest existing one (paper series ends at 0142). */
async function nextLabNo() {
  const all = await prisma.repairOrder.findMany({ select: { labNo: true } });
  const max = all.reduce((m, o) => Math.max(m, parseInt(o.labNo, 10) || 0), 142);
  return String(max + 1).padStart(4, "0");
}

function toInt(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/* ---------------- GET: list with filters (also powers reports) ---------------- */
export async function GET(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const payment = searchParams.get("payment"); // preferred method
  const paymentStatus = searchParams.get("paymentStatus");
  const source = searchParams.get("source");
  const q = searchParams.get("q")?.trim();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const take = Math.min(Number(searchParams.get("take")) || 500, 1000);

  const where: Prisma.RepairOrderWhereInput = {};
  if (status) where.status = status as Prisma.RepairOrderWhereInput["status"];
  if (payment) where.preferredPayment = payment as Prisma.RepairOrderWhereInput["preferredPayment"];
  if (paymentStatus) where.paymentStatus = paymentStatus as Prisma.RepairOrderWhereInput["paymentStatus"];
  if (source) where.source = source as Prisma.RepairOrderWhereInput["source"];
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }
  if (q) {
    where.OR = [
      { labNo: { contains: q, mode: "insensitive" } },
      { customerName: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { contactNo: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { deviceModel: { contains: q, mode: "insensitive" } },
      { serialImei: { contains: q, mode: "insensitive" } },
    ];
  }

  const orders = await prisma.repairOrder.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take,
  });
  return NextResponse.json({ orders });
}

/* ---------------- POST: create a new repair order ---------------- */
export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json().catch(() => ({}));
  const customerName = String(body.customerName || "").trim();
  const contactNo = String(body.contactNo || "").trim();
  const brand = String(body.brand || "").trim();
  const deviceModel = String(body.deviceModel || "").trim();

  if (!customerName) return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
  if (!contactNo) return NextResponse.json({ error: "Contact number is required" }, { status: 400 });
  if (!brand) return NextResponse.json({ error: "Brand is required" }, { status: 400 });
  if (!deviceModel) return NextResponse.json({ error: "Model is required" }, { status: 400 });

  const labNo = String(body.labNo || "").trim() || (await nextLabNo());
  const companyName = body.companyName?.trim() || null;
  const address = body.address?.trim() || null;
  // Source is inferred from whether a company/shop name was given.
  const source: "SHOP" | "DIRECT" = companyName ? "SHOP" : "DIRECT";

  // Maintain the separate Customer record (keyed by phone).
  const existing = await prisma.customer.findUnique({ where: { phone: contactNo } });
  if (existing?.status === "BLOCKED") {
    return NextResponse.json(
      { error: `${existing.name} is blocked. Unblock them from Customers to add orders.` },
      { status: 403 }
    );
  }
  const customer = await prisma.customer.upsert({
    where: { phone: contactNo },
    create: { name: customerName, phone: contactNo, company: companyName, address, source },
    update: { name: customerName, company: companyName, address, source },
  });

  try {
    const order = await prisma.repairOrder.create({
      data: {
        labNo,
        customerName,
        companyName,
        address,
        contactNo,
        source,
        customerId: customer.id,
        preferredPayment: (body.preferredPayment as "CASH" | "CHEQUE" | "CREDIT") || "CREDIT",
        brand,
        deviceModel,
        relatedFault: body.relatedFault?.trim() || null,
        serialImei: body.serialImei?.trim() || null,
        passwordProtected: Boolean(body.passwordProtected),
        devicePassword: body.devicePassword?.trim() || null,
        quoted: Boolean(body.quoted),
        quotedAmount: toInt(body.quotedAmount),
        faultDescription: body.faultDescription?.trim() || null,
        status: (body.status as "RECEIVED") || "RECEIVED",
        cost: toInt(body.cost),
        paymentStatus: (body.paymentStatus as "UNPAID") || "UNPAID",
        amountPaid: toInt(body.amountPaid) ?? 0,
        termsAccepted: body.termsAccepted === false ? false : true,
        notes: body.notes?.trim() || null,
      },
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (e) {
    const err = e as { code?: string };
    if (err.code === "P2002") {
      return NextResponse.json({ error: `Lab No ${labNo} already exists` }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
