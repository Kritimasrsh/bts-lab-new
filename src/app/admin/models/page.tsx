import { prisma } from "@/lib/prisma";
import ModelsManager from "@/components/admin/ModelsManager";

export const dynamic = "force-dynamic";

export default async function AdminModelsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
    select: { id: true, name: true },
  });
  return <ModelsManager brands={brands} />;
}
