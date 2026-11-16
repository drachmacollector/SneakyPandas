// Renders the live ConceptCover compositions to images for the gallery.
// Run with the dev server up: node scripts/capture-covers.mjs [--url http://localhost:5173]
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const i = process.argv.indexOf("--url");
const url = i > -1 ? process.argv[i + 1] : "http://localhost:5173";
const slugs = ["karakuri-coffee", "paper-crane-stays", "dialed", "moth-and-flame"];
mkdirSync("public/work", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => sessionStorage.setItem("sp-seen", "1"));
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

for (const slug of slugs) {
  const el = page.locator(`[data-cover="${slug}"]`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const tmp = `public/work/_${slug}.png`;
  await el.screenshot({ path: tmp });
  await sharp(tmp).resize({ width: 1000 }).jpeg({ quality: 84, mozjpeg: true }).toFile(`public/work/${slug}.jpg`);
  await sharp(tmp).resize({ width: 1000 }).webp({ quality: 84 }).toFile(`public/work/${slug}.webp`);
  console.log(`captured ${slug}`);
}
await browser.close();

// remove temps
import { rmSync } from "node:fs";
for (const slug of slugs) rmSync(`public/work/_${slug}.png`, { force: true });
console.log("done");
