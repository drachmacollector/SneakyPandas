/**
 * Every visitor-facing string on the site. Edit copy here, never in components.
 * Voice: the panda narrator — confident, playful, a little mischievous, never corporate.
 */

export const copy = {
  preloader: {
    line: "grinding the ink…",
    skipHint: "press any key to skip",
  },

  nav: {
    cta: "Seal a project",
    menuLabel: "Chapters",
  },

  hero: {
    kanji: "序",
    chapter: "Prologue",
    h1: ["Quietly,", "we build", "loud websites."],
    sub: "SneakyPandas is Nakul and Siddhi — two developers who treat every website like a story worth unrolling. You've just opened ours.",
    ctaPrimary: "Seal a project",
    ctaGhost: "Unroll the story",
    scrollHint: "scroll to unroll",
  },

  clan: {
    kanji: "一",
    chapter: "The Clan",
    lead: "Every scroll begins with a confession, so here is ours: there are only two of us. That's not the fine print. That's the product.",
    body: "Nakul plans like a general and codes like he's being watched by one. Siddhi finds the detail you didn't ask for and hides it where you'll smile when you find it. Together we take on a small number of projects and give each one both of our full attention — no juniors, no handoffs, no “the team will get back to you.” We are the team.",
    joke: "Strictly speaking, pandas don't belong in Japanese paintings. We snuck in. It's kind of our whole thing.",
  },

  arts: {
    kanji: "二",
    chapter: "The Arts",
    lead: "Four disciplines. One standard: if it ships with our seal on it, it's work we'd sign twice.",
    services: [
      {
        title: "Web Experiences",
        line: "Marketing sites, portfolios, launches. The kind of site that makes scrolling the show.",
        items: ["Landing & campaign sites", "Scroll-story pages", "Portfolio sites"],
        motif: "web" as const,
      },
      {
        title: "Web Apps & Platforms",
        line: "Dashboards, portals, e-learning — software people actually log back into.",
        items: ["SaaS frontends", "Learning platforms", "Internal tools"],
        motif: "lantern" as const,
      },
      {
        title: "Commerce & CMS",
        line: "Stores and content systems your team can edit without calling us. (Call us anyway, we're nice.)",
        items: ["Storefronts", "Headless CMS", "Payment flows"],
        motif: "coin" as const,
      },
      {
        title: "Motion & Brand Systems",
        line: "Design systems and animation languages, written in code, not in a PDF.",
        items: ["Design tokens", "GSAP motion systems", "Component libraries"],
        motif: "wave" as const,
      },
    ],
    stackLabel: "Forged with",
    pricingTitle: "What a pact costs",
    pricingCaveat:
      "Sample figures — the real number comes after one conversation. Deposit upfront, milestones after.",
  },

  marquee: ["Web experiences", "Platforms", "Commerce", "Motion"],

  conquests: {
    kanji: "三",
    chapter: "The Conquests",
    lead: "Scrolls we've already signed. One is real and live; the rest are concept pieces — shown so you can see how we'd treat yours, and labelled so nobody's fooled.",
    conceptTag: "Concept piece",
    openLabel: "Open the scroll",
    visitLabel: "Visit the live site",
    closeLabel: "Close",
  },

  way: {
    kanji: "四",
    chapter: "The Way",
    lead: "From first message to launch, the path has five stones. No mystery, no “process™”.",
    steps: [
      {
        title: "The brief",
        body: "Tell us what you're building and what haunts you about it. A paragraph is enough.",
      },
      {
        title: "One conversation",
        body: "Both of us, one call. You'll know by the end of it whether we're your pandas.",
      },
      {
        title: "The quiet middle",
        kanji: "間",
        body: "Design and build, with room to think. You see real progress weekly, on a live link — not slideware.",
      },
      {
        title: "The reveal",
        body: "Staging link, your notes, our polish. We argue with pixels so you don't have to.",
      },
      {
        title: "The launch — and the first moon after",
        body: "We ship it, then stay close for thirty days. Launches wobble; we hold.",
      },
    ],
  },

  masters: {
    kanji: "五",
    chapter: "The Masters",
    lead: "Two names you'll see in your commit history.",
    linkedinLabel: "LinkedIn",
  },

  pact: {
    kanji: "終",
    chapter: "Seal the Pact",
    lead: "Every scroll ends with a seal. Tell us what you're building — we read everything, usually twice.",
    terms: [
      "both pandas, on every build",
      "weekly progress on a live link",
      "thirty days of care past launch",
    ],
    stampCta: "Stamp it — start the conversation",
    copied: "copied",
    copyHint: "click an address to copy it",
    faq: [
      {
        q: "What do you cost?",
        a: "The tier figures above are samples; the real number comes after one conversation about scope. Deposit upfront, milestones after.",
      },
      {
        q: "How long will my site take?",
        a: "A landmark site: four to eight weeks. A platform: longer. We'd rather be honest than fast.",
      },
      {
        q: "Who actually does the work?",
        a: "Us. Both of us, on everything. Nothing gets handed off, because there's nobody to hand it to.",
      },
      {
        q: "Do you only make Japanese-looking sites?",
        a: "No — this scroll is ours. Yours will look like you. That's the job.",
      },
    ],
  },

  footer: {
    asciiLine: "the pandas will code again soon.",
    eggHint: "press p anywhere",
    rights: `© ${new Date().getFullYear()} SneakyPandas`,
    endKanji: "終",
  },
} as const;
