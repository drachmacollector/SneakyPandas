/**
 * SAMPLE PRICING — replace before launch.
 * Figures are placeholders agreed with Nakul (2026-11-15); the page also shows
 * a visible "sample figures" caveat from copy.ts.
 */

export type Tier = {
  name: string;
  blurb: string;
  price: string;
  duration: string;
};

export const tiers: Tier[] = [
  {
    name: "The Scroll",
    blurb: "A landmark site, custom-coded.",
    price: "from $1,200", // SAMPLE
    duration: "4–8 weeks",
  },
  {
    name: "The Stronghold",
    blurb: "A full platform or web app.",
    price: "from $4,500", // SAMPLE
    duration: "8–16 weeks",
  },
  {
    name: "The Commission",
    blurb: "Something strange. Our favorite kind.",
    price: "let's talk",
    duration: "scoped together",
  },
];
