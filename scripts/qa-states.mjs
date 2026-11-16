// Captures interaction states for visual QA: preloader, case panel, pact stamp zone.
// Run: node scripts/qa-states.mjs [--url http://localhost:4173]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const i = process.argv.indexOf("--url");
const url = i > -1 ? process.argv[i + 1] : "http://localhost:4173";
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();

// 1) preloader, first visit
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url);
  await page.waitForTimeout(450);
  await page.screenshot({ path: "shots/qa-preloader.png" });
  await ctx.close();
}

// 2) case panel open (desktop)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem("sp-seen", "1"));
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const card = page.locator("#conquests button").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await card.click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "shots/qa-casepanel.png" });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  console.log("esc closed:", (await page.locator("[role=dialog]").count()) === 0 ? "yes" : "NO");
  console.log(errors.length ? "PAGE ERRORS: " + errors.join("; ") : "no page errors");
  await ctx.close();
}

await browser.close();
console.log("done");
