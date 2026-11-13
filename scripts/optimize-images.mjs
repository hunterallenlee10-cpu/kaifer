// Converts the agency's own photos in public/images/raw to .webp in public/images,
// keeps the logo as PNG, and builds the favicon and Apple touch icon from the KIG arc mark.
// Run with: npm run images
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";
const PAPER = { r: 246, g: 243, b: 236, alpha: 1 };

await mkdir(OUT, { recursive: true });

for (const file of await readdir(RAW)) {
  const { name } = parse(file);
  const src = join(RAW, file);
  const meta = await sharp(src).metadata();
  // Never upscale: every photo keeps its native width.
  await sharp(src).rotate().webp({ quality: 80, effort: 6 }).toFile(join(OUT, `${name}.webp`));
  if (name.startsWith("00-logo")) {
    await sharp(src).png({ compressionLevel: 9 }).toFile(join(OUT, `${name}.png`));
  }
  console.log(`${name}: ${meta.width}x${meta.height}`);
}

// The arc mark is the left part of the logo (the KIG letters inside the arc).
const logo = join(RAW, "00-logo-logo-kig-transparent.png");
const mark = await sharp(logo).extract({ left: 0, top: 0, width: 418, height: 435 }).png().toBuffer();

async function icon(size, pad, out) {
  const inner = Math.round(size - pad * 2);
  const resized = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(out);
  console.log(`icon ${out}`);
}

await icon(512, 40, "app/icon.png");
await icon(180, 16, "app/apple-icon.png");
