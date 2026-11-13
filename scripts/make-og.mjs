// Builds public/og-image.png (1200x630): paper background, the KIG logo, "We work for you."
// and photo 01 cropped on the right. Rendered in Chromium so the real Newsreader font is used,
// then compressed with sharp. Run with: npm run og (needs Playwright's Chromium and network access to Google Fonts).
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const b64 = async (p) => (await readFile(p)).toString("base64");
const logo = await b64("public/images/00-logo-logo-kig-transparent.png");
const photo = await b64("public/images/01-chili8-team-purple-5000-check-BEST.webp");

const html = `<!doctype html><html><head>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500&family=Public+Sans:wght@500;600&display=block" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#F6F3EC;color:#0E2338;font-family:'Public Sans',sans-serif;position:relative;overflow:hidden}
  .left{position:absolute;left:72px;top:64px;width:540px;height:502px;display:flex;flex-direction:column}
  .logo{height:84px;width:auto;align-self:flex-start}
  .eyebrow{margin-top:auto;font-size:17px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#005F99}
  h1{font-family:'Newsreader',serif;font-weight:500;font-size:68px;white-space:nowrap;line-height:1;letter-spacing:-.02em;margin-top:18px}
  h1 span{display:inline-block;border-bottom:6px solid #0079C0;padding-bottom:6px}
  .sub{margin-top:26px;font-size:22px;color:#5A6878}
  .frame{position:absolute;right:56px;top:56px;width:470px;height:518px;background:#fff;border:1px solid #DDD6C8;border-radius:6px;padding:12px}
  .frame div{width:100%;height:100%;border-radius:3px;background:url(data:image/webp;base64,${photo}) 58% 50%/cover}
</style></head><body>
  <div class="left">
    <img class="logo" src="data:image/png;base64,${logo}">
    <p class="eyebrow">Independent agency · Cockeysville, MD</p>
    <h1><span>We work for you.</span></h1>
    <p class="sub">Family owned since 1974. Ten insurers, one call.</p>
  </div>
  <div class="frame"><div></div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" });
await browser.close();
await sharp(png).png({ compressionLevel: 9, palette: false }).toFile("public/og-image.png");
console.log("public/og-image.png written");
