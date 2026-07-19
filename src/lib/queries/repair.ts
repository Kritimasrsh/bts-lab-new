import { prisma } from "@/lib/prisma";

export type ModelLite = {
  id: string;
  name: string;
  slug: string;
  series: string | null;
};

export type ModelGroup = { series: string; models: ModelLite[] };

/** A brand plus its active models grouped by series (for the model-picker page). */
export async function getBrandWithModelGroups(slug: string) {
  const brand = await prisma.brand.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      logo: true,
      models: {
        where: { active: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
        select: { id: true, name: true, slug: true, series: true },
      },
    },
  });
  if (!brand) return null;

  const groups: ModelGroup[] = [];
  for (const model of brand.models) {
    const key = model.series || "Other";
    let group = groups.find((g) => g.series === key);
    if (!group) {
      group = { series: key, models: [] };
      groups.push(group);
    }
    group.models.push(model);
  }

  return {
    brand: { id: brand.id, name: brand.name, slug: brand.slug, logo: brand.logo },
    groups,
  };
}

/** A single model (by brand slug + model slug) with its brand. */
export async function getModel(brandSlug: string, modelSlug: string) {
  return prisma.model.findFirst({
    where: { slug: modelSlug, active: true, brand: { slug: brandSlug } },
    select: {
      id: true,
      name: true,
      slug: true,
      series: true,
      brand: { select: { name: true, slug: true } },
    },
  });
}

/** All problem categories with their active problems (global list). */
export async function getProblemCategories() {
  const categories = await prisma.problemCategory.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      problems: {
        where: { active: true },
        orderBy: { order: "asc" },
        select: { id: true, name: true },
      },
    },
  });
  return categories.filter((c) => c.problems.length > 0);
}
