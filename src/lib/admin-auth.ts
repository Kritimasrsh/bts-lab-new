import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Guard for admin API routes. Usage:
 *   const { response } = await requireAdmin();
 *   if (response) return response;
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (session.user.role !== "ADMIN") {
    return {
      session,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { session, response: null as null };
}
