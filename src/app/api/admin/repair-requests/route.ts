import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: Not yet protected — add auth before production.

// GET /api/admin/repair-requests — recent repair enquiries (leads/tickets).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = Math.min(Number(searchParams.get("take")) || 50, 200);
  try {
    const requests = await prisma.repairRequest.findMany({
      orderBy: { createdAt: "desc" },
      take,
      include: {
        model: { include: { brand: { select: { name: true } } } },
        problems: { include: { problem: { select: { name: true } } } },
      },
    });
    return NextResponse.json({ requests });
  } catch (err) {
    console.error("GET /api/admin/repair-requests failed", err);
    return NextResponse.json({ error: "Failed to load requests" }, { status: 500 });
  }
}
