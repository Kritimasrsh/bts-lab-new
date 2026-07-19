import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type Body = {
  modelId?: string;
  problemIds?: string[];
  customNote?: string;
  customerName?: string;
  customerPhone?: string;
};

// POST /api/repair-requests — create a repair enquiry from the public flow.
export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    modelId,
    problemIds = [],
    customNote,
    customerName,
    customerPhone,
  } = body;

  if (!modelId) {
    return NextResponse.json({ error: "modelId is required" }, { status: 400 });
  }

  const note = customNote?.trim() || null;
  const uniqueProblemIds = [...new Set(problemIds.filter(Boolean))];

  if (uniqueProblemIds.length === 0 && !note) {
    return NextResponse.json(
      { error: "Select at least one problem or describe the issue." },
      { status: 400 }
    );
  }

  try {
    // Require login — the public flow gates submission behind an account.
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Please log in to submit a repair request." },
        { status: 401 }
      );
    }

    // Validate the model exists.
    const model = await prisma.model.findUnique({ where: { id: modelId } });
    if (!model) {
      return NextResponse.json({ error: "Unknown model" }, { status: 404 });
    }

    // Validate the referenced problems exist (ignore any that don't).
    const validProblems = uniqueProblemIds.length
      ? await prisma.problem.findMany({
          where: { id: { in: uniqueProblemIds } },
          select: { id: true },
        })
      : [];

    // Snapshot contact details from the account (fall back to any provided).
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, phone: true },
    });

    const created = await prisma.repairRequest.create({
      data: {
        modelId,
        customNote: note,
        customerName: dbUser?.name ?? customerName?.trim() ?? null,
        customerPhone: dbUser?.phone ?? customerPhone?.trim() ?? null,
        userId: session.user.id,
        problems: {
          create: validProblems.map((p) => ({ problemId: p.id })),
        },
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, request: created }, { status: 201 });
  } catch (err) {
    console.error("POST /api/repair-requests failed", err);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
