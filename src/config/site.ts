/**
 * Single source of truth for identity, links, contact and PHOTOS.
 * Swapping a founder photo = changing one path here (files live in /public).
 */

export const site = {
  name: "SneakyPandas",
  tagline: "Built quietly. Shipped loudly.",
  /** PLACEHOLDER domain — swap when the real one is registered. */
  url: "https://sneakypandas.dev",
  description:
    "SneakyPandas is Nakul and Siddhi — a two-person web development studio building scroll-worthy websites, platforms and motion systems.",
  emails: ["nakulccs@gmail.com", "sidii0080@gmail.com"] as const,
  /** Set to a Cal.com/Calendly URL to make a "Book a call" button appear. */
  bookingUrl: "",
} as const;

export const mailto = (subject = "A new pact") =>
  `mailto:${site.emails.join(",")}?subject=${encodeURIComponent(subject)}`;

export type Founder = {
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  photos: {
    /** shown by default */
    primary: string;
    /** crossfaded in on hover */
    hover: string;
    /** object-position for the primary crop */
    position?: string;
    hoverPosition?: string;
  };
};

export const founders: Founder[] = [
  {
    id: "nakul",
    name: "Nakul Bhadade",
    role: "The Strategist.",
    bio: "Plans the build, argues with the pixels, usually wins. If the site holds together under pressure — deadlines, traffic, scope — that's Nakul's doing. Chairs a mean committee, too.",
    linkedin: "https://www.linkedin.com/in/nakul-bhadade/",
    photos: {
      primary: "/developers/DSC05339.JPG",
      hover: "/developers/DSC05158.JPG",
      position: "62% 30%",
      hoverPosition: "55% 25%",
    },
  },
  {
    id: "siddhi",
    name: "Siddhi Dhoke",
    role: "The Mischief.",
    bio: "Finds the detail you didn't know you wanted and hides it where you'll find it. If something on this page made you smile, assume it was Siddhi. The code reviews are less gentle.",
    linkedin: "https://www.linkedin.com/in/siddhi-dhoke-53b7b432b/",
    photos: {
      primary: "/developers/IMG_20260321_211823.jpg",
      hover: "/developers/20260201_154833.jpg",
      position: "50% 28%",
      hoverPosition: "50% 20%",
    },
  },
];

/** Other photos used around the site — same swap rule. */
export const photos = {
  /** Chapter V — the duo snapshot between the two plates */
  duo: { src: "/developers/IMG_20260321_221918~2.jpg", position: "50% 30%" },
  /** Chapter IV — margin photo on the ink section */
  way: { src: "/developers/_DSC6706.JPG", position: "60% 20%" },
} as const;

/** Chapter I facts strip — honest numbers only. */
export const facts = [
  { value: "02", label: "founders" },
  { value: "02", label: "people on your project" },
  { value: "01+", label: "platforms shipped" },
  { value: "00", label: "account managers" },
] as const;

export const chapters = [
  { id: "hero", kanji: "序", title: "Prologue" },
  { id: "clan", kanji: "一", title: "The Clan" },
  { id: "arts", kanji: "二", title: "The Arts" },
  { id: "conquests", kanji: "三", title: "The Conquests" },
  { id: "way", kanji: "四", title: "The Way" },
  { id: "masters", kanji: "五", title: "The Masters" },
  { id: "pact", kanji: "終", title: "Seal the Pact" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
