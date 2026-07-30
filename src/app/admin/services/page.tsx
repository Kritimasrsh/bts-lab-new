import { prisma } from "@/lib/prisma";
import ServicesManager from "@/components/admin/ServicesManager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const categories = await prisma.problemCategory.findMany({
    orderBy: { order: "asc" },
    include: { problems: { orderBy: { order: "asc" } } },
  });
  return <ServicesManager initial={categories} />;
}
