/**
 * Work section data. Swap in real projects here without touching components.
 * `concept: true` renders a visible "Concept piece" tag — placeholders are
 * realistic but clearly fictional, and must stay labelled.
 */

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  tags: string[];
  stack: string[];
  outcome: string;
  description: string;
  /** omit to use the in-code ConceptCover art */
  cover?: string;
  link: string;
  concept: boolean;
  /** accent used by the ConceptCover art */
  accent: "vermilion" | "matcha" | "gold" | "ink";
};

export const projects: Project[] = [
  {
    slug: "consistent-academy",
    title: "The Consistent Academy",
    client: "Vidya Wankhade · Pune",
    year: 2025,
    tags: ["E-learning", "Platform", "React"],
    stack: ["React", "TypeScript", "Node"],
    outcome:
      "A 19-year teaching practice brought online — courses, tests, webinars and a bookshelf in one place.",
    description:
      "The Consistent Academy prepares students for IELTS, TOEFL, PTE and CELPIP, alongside corporate communication, interview prep and courses for kids. We built the platform end to end: course catalogue, tests and game tests, webinars, blog, careers and the academy's book library — all run by a founder who is a British Council certified IELTS Master Trainer with over nineteen years of teaching behind her.",
    cover: "/work/tca.jpg",
    link: "https://theconsistentacademy.in",
    concept: false,
    accent: "vermilion",
  },
  {
    slug: "karakuri-coffee",
    title: "Karakuri Coffee",
    client: "Karakuri Coffee Roasters",
    year: 2026,
    tags: ["Commerce", "Brand", "Storefront"],
    stack: ["React", "Headless CMS", "Stripe"],
    outcome:
      "A roaster's catalogue that pours: single-origin pages, subscriptions, and a checkout nobody abandons out of boredom.",
    description:
      "A concept storefront for a fictional specialty roaster. Each origin gets its own pour: tasting notes that steep in as you scroll, a subscription builder with exactly three decisions, and a checkout stripped to the essentials. The study explores how slow-craft brands can sell online without the template smell.",
    link: "#",
    concept: true,
    accent: "gold",
  },
  {
    slug: "paper-crane-stays",
    title: "Paper Crane Stays",
    client: "Paper Crane Hotels",
    year: 2026,
    tags: ["Booking", "Microsite", "Motion"],
    stack: ["React", "GSAP", "Sanity"],
    outcome: "A boutique-stay microsite where the room reveals itself before the price does.",
    description:
      "A concept booking microsite for a fictional trio of boutique stays. Rooms unfold like folded paper — light first, view second, price last — and the booking flow fits on one screen. The study is about pacing: what a visitor should feel before they're asked to decide.",
    link: "#",
    concept: true,
    accent: "matcha",
  },
  {
    slug: "dialed",
    title: "Dialed",
    client: "Dialed Audio",
    year: 2025,
    tags: ["SaaS", "Dashboard", "Data-viz"],
    stack: ["React", "TypeScript", "D3"],
    outcome: "A podcast-analytics dashboard that makes retention graphs feel like a story arc.",
    description:
      "A concept analytics surface for a fictional podcast platform. Retention curves read as story arcs, episode drop-offs get plain-language diagnoses, and the whole dashboard works at desk-glance distance. The study tests how far editorial typography can carry a data product.",
    link: "#",
    concept: true,
    accent: "ink",
  },
  {
    slug: "moth-and-flame",
    title: "Moth & Flame",
    client: "Moth & Flame Games",
    year: 2026,
    tags: ["Games", "Press kit", "WebGL"],
    stack: ["React", "Three.js", "GSAP"],
    outcome: "An indie studio press site with one shader and a lot of restraint.",
    description:
      "A concept press site for a fictional indie game studio. One hero shader — a candle flame that leans toward the cursor — and everything else is type, stills and downloads a journalist can find in ten seconds. The study argues that restraint is what makes the one effect land.",
    link: "#",
    concept: true,
    accent: "vermilion",
  },
];
