// Guards the copy and file rules from the build brief. Run with: npm run check:copy
// - no em dashes, en dashes or double hyphens in copy
// - no hype words
// - no file over 500 lines in app, components or lib
// - exactly ten insurers, and the ledger still ends on "You."
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "lib", "public/llms.txt", "README.md", "SEO-LAUNCH.md", "implementation_kickstart.md"];
const TEXT = new Set([".ts", ".tsx", ".md", ".txt", ".css"]);
const HYPE = ["revolutionary", "cutting-edge", "seamless", "elevate", "unparalleled", "peace of mind", "lowest possible price", "very best coverage"];

async function* walk(path) {
  const ext = extname(path);
  if (ext) {
    if (TEXT.has(ext)) yield path;
    return;
  }
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (TEXT.has(extname(entry.name))) yield full;
  }
}

const problems = [];
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const text = await readFile(file, "utf8");
    const lines = text.split("\n");
    const isCode = /\.(ts|tsx|css)$/.test(file);
    if (isCode && lines.length > 500) problems.push(`${file}: ${lines.length} lines (limit 500)`);
    lines.forEach((line, i) => {
      const where = `${file}:${i + 1}`;
      if (/[—–]/.test(line)) problems.push(`${where}: em or en dash`);
      // A double hyphen in prose. CSS custom properties and CLI flags are fine.
      if (!file.endsWith(".css") && /(^|[\s"'`>])--(?=[\s"'`<]|$)/.test(line)) problems.push(`${where}: double hyphen`);
      const lower = line.toLowerCase();
      // The check script itself and the brief's own "do not claim" notes may name these words.
      if (!/do not claim|hype|check-copy/.test(lower)) {
        for (const word of HYPE) if (lower.includes(word)) problems.push(`${where}: "${word}"`);
      }
    });
  }
}

const business = await readFile("lib/business.ts", "utf8");
const insurerBlock = business.slice(business.indexOf("export const insurers"), business.indexOf("];", business.indexOf("export const insurers")));
const insurerCount = (insurerBlock.match(/\{ name:/g) || []).length;
if (insurerCount !== 10) problems.push(`lib/business.ts: expected exactly 10 insurers, found ${insurerCount}`);

const ledger = await readFile("lib/ledger.ts", "utf8");
if (!ledger.includes("in th Navy")) problems.push('lib/ledger.ts: Gerard\'s quote must stay exact, including "in th Navy"');
if (!/kind: "next"[\s\S]*\];/.test(ledger)) problems.push('lib/ledger.ts: the ledger must end on the "You." entry');

if (problems.length) {
  console.error(`Copy check failed (${problems.length}):\n` + problems.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}
console.log("Copy check passed.");
