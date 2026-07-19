import { prisma } from "@/lib/prisma";

/** Published Google reviews for the homepage, ordered for display. */
export async function getGoogleReviews() {
  return prisma.googleReview.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: { id: true, author: true, rating: true, text: true, service: true, avatarUrl: true },
  });
}
