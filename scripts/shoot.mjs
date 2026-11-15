// Screenshot tool for the visual QA loop.
// Usage: node scripts/shoot.mjs --url http://localhost:5173 --out shots/hero-1440.png
//        [--w 1440] [--h 900] [--full] [--scroll 2000] [--delay 800] [--reduced] [--skip-loader]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? (process.argv[i + 1]?.startsWith("--") || !process.argv[i + 1] ? true : process.argv[i + 1]) : def;
};

const url = arg("url", "http://localhost:5173");
const out = arg("out", "shots/shot.png");
const w = Number(arg("w", 1440));
const h = Number(arg("h", 900));
const full = process.argv.includes("--full");
const scroll = Number(arg("scroll", 0));
const delay = Number(arg("delay", 900));
const reduced = process.argv.includes("--reduced");
const skipLoader = !process.argv.includes("--keep-loader");

mkdirSync(dirname(out), { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: w, height: h },
  reducedMotion: reduced ? "reduce" : "no-preference",
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

if (skipLoader) {
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem("sp-seen", "1");
    } catch {}
  });
}

await page.goto(url, { waitUntil: "networkidle" });
if (full) {
  // walk the page so lazy images load and scroll-triggered reveals reach final state
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(400);
}
if (scroll) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scroll);
}
await page.waitForTimeout(delay);
await page.screenshot({ path: out, fullPage: full && !scroll });
console.log(`saved ${out} (${w}x${h}${full ? ", full" : ""}${scroll ? `, scrollY=${scroll}` : ""})`);
if (errors.length) {
  console.log("CONSOLE ERRORS:");
  for (const e of errors) console.log("  " + e);
} else {
  console.log("console clean");
}
await browser.close();
