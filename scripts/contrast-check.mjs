// Asserts the WCAG contrast matrix from docs/PLAN.md §3.1 against src/index.css.
// Run: node scripts/contrast-check.mjs
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/index.css", import.meta.url), "utf8");
const color = (name) => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --color-${name} not found`);
  return m[1];
};

const lum = (hex) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(color(a)), lum(color(b))];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

// [fg, bg, minimum, rule]
const matrix = [
  ["ink", "washi", 7, "body AAA"],
  ["ink-soft", "washi", 7, "secondary AAA"],
  ["ink", "washi-dim", 7, "cards AAA"],
  ["washi", "ink", 7, "dark chapters AAA"],
  ["vermilion-deep", "washi", 4.5, "links/buttons AA"],
  ["washi", "vermilion-deep", 4.5, "button labels AA"],
  ["ink-mute", "washi", 4.5, "meta AA"],
  ["matcha-deep", "washi", 4.5, "tags AA"],
  ["gold", "ink", 4.5, "numerals on ink AA"],
  ["vermilion", "washi", 3, "display-only AA-large"],
  ["vermilion", "ink", 3, "display-only on ink AA-large"],
];

let fail = 0;
for (const [fg, bg, min, rule] of matrix) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${fg}/${bg}  ${r.toFixed(2)}  (min ${min}, ${rule})`,
  );
}
process.exit(fail ? 1 : 0);
