// Processes inspiration paintings into optimized site art (public/art/).
// Crops remove watermarks/frames; outputs webp + jpg fallback.
// Run: node scripts/prepare-art.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "public/inspiration";
const OUT = "public/art";
mkdirSync(OUT, { recursive: true });

/** crop values are fractions of the source dimension to remove from each edge */
const jobs = [
  // hero: sumi-e panda walking under plum blossoms, gold-flecked washi
  { src: `${SRC}/46724914866655987.jpg`, out: "hero-panda", crop: { top: 0.01, bottom: 0.01, left: 0.01, right: 0.01 }, maxW: 1400 },
  // clan: cub hanging from bamboo
  { src: `${SRC}/588916088820396703.jpg`, out: "clan-cub", crop: { top: 0.02, bottom: 0.02, left: 0.02, right: 0.02 }, maxW: 1100 },
  // arts: panda in red-leaf bamboo (vertical scroll)
  {
    src: `${SRC}/Download premium image of PNG Illustration of panda wildlife animal mammal_ by Hein about wallpaper panda, japanese panda, panda, vintage, and wall art print 14350510.jpg`,
    out: "arts-bamboo",
    crop: { top: 0, bottom: 0, left: 0, right: 0 },
    maxW: 900,
  },
  // conquests: cavalry charge ink painting (wide)
  { src: `${SRC}/479774166574657916.jpg`, out: "conquests-charge", crop: { top: 0.02, bottom: 0.03, left: 0, right: 0 }, maxW: 1600 },
  // conquests alt: ukiyo-e night panda
  { src: `${SRC}/🎋.jpg`, out: "conquests-night", crop: { top: 0.02, bottom: 0.03, left: 0.02, right: 0.02 }, maxW: 1100 },
  // way: sepia landscape with pavilion, stairs, Fuji, red sun
  { src: `${SRC}/Asthetic 9_16 Wallpaper ✨.jpg`, out: "way-path", crop: { top: 0, bottom: 0, left: 0, right: 0 }, maxW: 1100 },
  // masters: the two pandas under the pine (crop the AI tag, keep the calligraphy)
  { src: `${SRC}/988188343257791174.jpg`, out: "masters-duo", crop: { top: 0.055, bottom: 0, left: 0, right: 0 }, maxW: 1200 },
  // pact: red pagoda & plum woodblock (right crop removes the AI pseudo-calligraphy column)
  { src: `${SRC}/907616131203606812.jpg`, out: "pact-pagoda", crop: { top: 0.015, bottom: 0.015, left: 0.015, right: 0.3 }, maxW: 1000 },
];

for (const j of jobs) {
  const img = sharp(j.src);
  const meta = await img.metadata();
  const left = Math.round(meta.width * (j.crop.left ?? 0));
  const top = Math.round(meta.height * (j.crop.top ?? 0));
  const width = Math.round(meta.width * (1 - (j.crop.left ?? 0) - (j.crop.right ?? 0)));
  const height = Math.round(meta.height * (1 - (j.crop.top ?? 0) - (j.crop.bottom ?? 0)));
  const base = img.extract({ left, top, width, height }).resize({ width: Math.min(j.maxW, width), withoutEnlargement: true });
  await base.clone().webp({ quality: 82 }).toFile(`${OUT}/${j.out}.webp`);
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/${j.out}.jpg`);
  console.log(`${j.out}: ${meta.width}x${meta.height} -> cropped ${width}x${height}`);
}
console.log("done");
