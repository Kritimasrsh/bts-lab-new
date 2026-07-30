import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// GET /api/admin/users — all accounts with request counts.
export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        createdAt: true,
        _count: { select: { requests: true } },
      },
    });
    return NextResponse.json({ users });
  } catch (err) {
    console.error("GET /api/admin/users failed", err);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}
