import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => { try { sessionStorage.setItem("sp-seen", "1"); } catch {} });
const page = await ctx.newPage();
await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const p = page.locator("#hero p").first();
await p.screenshot({ path: "shots/_para.png" });
// also shoot with the grain overlay hidden to isolate it
await page.evaluate(() => (document.querySelector(".grain-overlay").style.display = "none"));
await p.screenshot({ path: "shots/_para-nograin.png" });
await browser.close();
console.log("done");
