import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { BRANDS, PROBLEM_CATEGORIES, GOOGLE_REVIEWS, TESTIMONIALS, slugify } from "./seed-data";

// Prisma 7 requires a driver adapter. dotenv/config loads DATABASE_URL from .env
// since the seed runs outside Next.js (which would otherwise inject it).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding BTS Lab database…");

  // --- Brands + Models ---
  for (let b = 0; b < BRANDS.length; b++) {
    const brand = BRANDS[b];
    const createdBrand = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: { name: brand.name, logo: brand.logo, order: b },
      create: { name: brand.name, slug: brand.slug, logo: brand.logo, order: b },
    });

    for (let m = 0; m < brand.models.length; m++) {
      const model = brand.models[m];
      await prisma.model.upsert({
        where: { brandId_slug: { brandId: createdBrand.id, slug: model.slug } },
        update: { name: model.name, series: model.series, order: m },
        create: {
          name: model.name,
          slug: model.slug,
          series: model.series,
          order: m,
          brandId: createdBrand.id,
        },
      });
    }
    console.log(`  ✓ ${brand.name} (${brand.models.length} models)`);
  }

  // --- Problem categories + problems ---
  let problemCount = 0;
  for (let c = 0; c < PROBLEM_CATEGORIES.length; c++) {
    const cat = PROBLEM_CATEGORIES[c];
    const catSlug = slugify(cat.name);
    const createdCat = await prisma.problemCategory.upsert({
      where: { slug: catSlug },
      update: { name: cat.name, order: c },
      create: { name: cat.name, slug: catSlug, order: c },
    });

    for (let p = 0; p < cat.problems.length; p++) {
      const name = cat.problems[p];
      // Problem slug must be globally unique; prefix with category for safety
      // (e.g. "Other" or "Camera Change" could otherwise repeat).
      const slug = slugify(`${cat.name}-${name}`);
      await prisma.problem.upsert({
        where: { slug },
        update: { name, order: p, categoryId: createdCat.id },
        create: { name, slug, order: p, categoryId: createdCat.id },
      });
      problemCount++;
    }
  }
  console.log(
    `  ✓ ${PROBLEM_CATEGORIES.length} problem categories, ${problemCount} problems`
  );

  // --- Google reviews (only seed if none exist, so admin edits aren't clobbered) ---
  const existingReviews = await prisma.googleReview.count();
  if (existingReviews === 0) {
    for (let i = 0; i < GOOGLE_REVIEWS.length; i++) {
      const r = GOOGLE_REVIEWS[i];
      await prisma.googleReview.create({
        data: {
          author: r.author,
          rating: r.rating,
          text: r.text,
          service: r.service,
          order: i,
        },
      });
    }
    console.log(`  ✓ ${GOOGLE_REVIEWS.length} google reviews`);
  } else {
    console.log(`  • ${existingReviews} google reviews already present — skipped`);
  }

  // --- Testimonials (only seed if none exist) ---
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    for (let i = 0; i < TESTIMONIALS.length; i++) {
      const t = TESTIMONIALS[i];
      await prisma.testimonial.create({
        data: {
          author: t.author,
          role: t.role,
          rating: t.rating,
          quote: t.quote,
          featured: t.featured,
          order: i,
        },
      });
    }
    console.log(`  ✓ ${TESTIMONIALS.length} testimonials`);
  } else {
    console.log(`  • ${existingTestimonials} testimonials already present — skipped`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
