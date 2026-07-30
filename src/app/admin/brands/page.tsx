import { prisma } from "@/lib/prisma";
import BrandsManager from "@/components/admin/BrandsManager";

export const dynamic = "force-dynamic";

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: { _count: { select: { models: true } } },
  });
  return <BrandsManager initial={brands} />;
}
