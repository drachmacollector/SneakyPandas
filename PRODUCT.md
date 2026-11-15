# PRODUCT.md — SneakyPandas

**What this is:** the agency site of SneakyPandas, a two-person web development studio run by Nakul Bhadade ("The Strategist") and Siddhi Dhoke ("The Mischief"). The site is itself the portfolio piece: a single-page scroll story in a feudal-Japanese ink-wash world, narrated by an original sumi-e panda.

**Who visits:** prospective clients (founders, small businesses, brands) deciding whether to hire the studio. Secondary: peers and recruiters.

**The one action:** start a conversation — `mailto:nakulccs@gmail.com,sidii0080@gmail.com`. Secondary: view the work, connect on LinkedIn.

**Surface mode:** Persuade (the visitor decides to hire), delivered through an Experience-grade scroll narrative. Craft and personality are the selling argument.

**Voice:** confident, playful, mischievous, never corporate. The panda narrates in first person plural. Banned: stock agency phrases, lorem ipsum, emoji-as-icons.

**Hard constraints:**
- English is the site language. **No Hindi or Marathi anywhere.** Japanese appears only as decorative garnish (glossaried kanji, motifs), never load-bearing.
- All panda artwork original; no resemblance to existing characters (no Kung Fu Panda likeness).
- Rising-sun ray motif excluded; torii/katana/sakura at most one quiet accent each.
- Pricing figures are samples until replaced (`src/data/pricing.ts`).
- Founder photos and typefaces must stay swappable from single files (`src/config/site.ts`, `src/styles/fonts.css`).
- Stack: React 19 + TypeScript + Vite + Tailwind v4; GSAP + Lenis for motion; deployed on Vercel.
- Performance: Lighthouse desktop Perf ≥ 85, A11y ≥ 95; `prefers-reduced-motion` fully honored.

**Committed design direction:** `docs/PLAN.md` (approved 2026-11-15) — tokens, copy, motion spec, asset inventory. Treat it as the design authority until a DESIGN.md is generated from the shipped build.
