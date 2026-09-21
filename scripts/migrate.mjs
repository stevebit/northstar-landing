#!/usr/bin/env node
/**
 * Production-style migrator used by `npm run build`.
 * This landing page has no SQL schema — skip cleanly when migrations/ is empty.
 */
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "migrations");

if (!existsSync(dir)) {
  console.log("[migrate] no migrations/ directory — skip");
  process.exit(0);
}

const files = (await readdir(dir)).filter((name) => name.endsWith(".sql"));
if (files.length === 0) {
  console.log("[migrate] no SQL files — skip");
  process.exit(0);
}

console.error(
  "[migrate] SQL files exist but this standalone landing has no migrator backend. Add DATABASE_URL + a real migrator before applying:",
);
for (const file of files) console.error(`  - ${file}`);
process.exit(1);
