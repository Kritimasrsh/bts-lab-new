/**
 * Runs a Prisma command against the PRODUCTION database from your machine.
 *
 * Vercel's free tier can't run a release/migration step, so schema changes must
 * be pushed to the prod (Neon) DB from here. This loads DATABASE_URL from the
 * gitignored .env.production.local and runs the given prisma command with it.
 *
 * Usage (via npm scripts):
 *   npm run db:deploy:prod   -> prisma migrate deploy
 *   npm run db:seed:prod     -> tsx prisma/seed.ts
 *   npm run db:status:prod   -> prisma migrate status
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envFile = path.join(root, ".env.production.local");

if (!existsSync(envFile)) {
  console.error(
    "\n✗ .env.production.local not found.\n" +
      "  Create it with your Neon UNPOOLED connection string:\n" +
      '  DATABASE_URL="postgresql://…neon.tech/neondb?sslmode=require"\n'
  );
  process.exit(1);
}

// Minimal .env parser (avoids adding a dependency).
const env = { ...process.env };
for (const raw of readFileSync(envFile, "utf8").split("\n")) {
  const line = raw.trim();
  if (!line || line.startsWith("#")) continue;
  const eq = line.indexOf("=");
  if (eq === -1) continue;
  const key = line.slice(0, eq).trim();
  let val = line.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  env[key] = val;
}

if (!env.DATABASE_URL) {
  console.error("✗ DATABASE_URL missing in .env.production.local");
  process.exit(1);
}

const cmd = process.argv.slice(2);
if (cmd.length === 0) {
  console.error("✗ No command given. e.g. node scripts/prod-db.mjs prisma migrate deploy");
  process.exit(1);
}

// Safety confirmation banner.
const host = (env.DATABASE_URL.match(/@([^/]+)/) || [])[1] || "unknown-host";
console.log(`\n▶ Running against PROD database (${host})\n  ${cmd.join(" ")}\n`);

const isWin = process.platform === "win32";
const result = spawnSync(isWin ? `${cmd[0]}.cmd` : cmd[0], cmd.slice(1), {
  stdio: "inherit",
  env,
  shell: isWin, // resolve npx/tsx on Windows
});

process.exit(result.status ?? 1);
