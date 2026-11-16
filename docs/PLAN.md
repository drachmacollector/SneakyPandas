# SneakyPandas — The Scroll of the Sneaky Pandas
**Design & build plan · v1.1 · 2026-11-16**

> **v1.1 addendum (built reality):** mid-build, Nakul supplied `public/inspiration/` and redirected the art direction from hand-authored geometric SVG toward **painterly sumi-e artwork**. The shipped site uses processed crops of the AI-generated inspiration paintings (pipeline: `scripts/prepare-art.mjs` → `public/art/`, multiply-blended into the washi via `ArtPlate`), a canvas petal/gold-fleck field in the hero (`PetalField`, inspired by oneshot-sakura.vercel.app), and iredpanda-style type-over-art layering. The geometric panda poses in `src/assets/svg/panda.tsx` are retired from primary surfaces (kept for spares); seals, strokes and motif glyphs remain. Artist-made pieces in the inspiration folder (the Displate "Tranquility Panda", the Tomoaki Ichikawa painting) were used as **inspiration only** — rights unconfirmed. Everything else below (tokens, copy, IA, motion system, data files) shipped as planned.

This document is self-contained. A builder with only this file and `sneakypandas-prompt.md` can build the entire site: every token, every line of copy, every animation value, and every file path is specified. Nothing here is "add a nice animation" — if a value matters, it is written down.

---

## 0. Decisions from Nakul (answered) & open questions

**Answered (build exactly this):**

| Question | Nakul's answer → decision |
|---|---|
| Services | The 4 services in §5.3 are confirmed. |
| Pricing | Show **dummy sample pricing** inside good-fella-style tier framing (3 named tiers, "from" prices). All numbers live in `src/data/pricing.ts`, marked `// SAMPLE — replace before launch`, plus a visible "sample figures" caveat line on the page. |
| Contact | `mailto:nakulccs@gmail.com,sidii0080@gmail.com` (both inboxes, comma-joined — works in all major mail clients). Stored in `src/config/site.ts`. No Cal.com for now; a `bookingUrl` field exists in config, empty, and the booking button renders only when it's set. |
| Photos | Approved for publication. Use exactly the 5 marked "use" in §8. |
| Language | **English is the site language. ABSOLUTELY NO Hindi or Marathi anywhere.** Japanese appears only as design garnish: tiny motifs, chapter-marker kanji, decorative glyphs — never sentences, never navigation, never information a visitor needs. Every kanji used is in the glossary (§4.4) and always paired with (or redundant to) English. |
| Fonts article | The article's fonts are catalogued in §6.3 and folded into the strategy. |

**Still open (defaults are built in; swap via config when answered):**

1. **LinkedIn URLs** for Nakul Bhadade and Siddhi Dhoke → `#` placeholders in `src/config/site.ts` (`links.nakulLinkedIn`, `links.siddhiLinkedIn`). The Consistent Academy footer already links them — lift the URLs from there when convenient.
2. **Domain** → `sneakypandas.dev` placeholder in meta/OG tags (`site.domain`).
3. **Motif note:** per Nakul's edit, torii gates, katana, sakura and similar motifs may be used *sparingly* (each at most once, as a quiet accent). Exception kept out of the site: the **rising-sun ray motif** — it reads as the Japanese military flag across much of Asia and the Impeccable skill hard-bans it as ornament. Geisha imagery is also unplanned (no asset supports it well). Everything else in the motif kit is fair game.

---

## 1. Reference analysis

### 1.1 iredpanda.com (aesthetic & voice reference)
Personal site of designer Andrey Grodz written entirely in a red panda's first-person voice (CSS Design Awards badge, Tilda-built). What works: **one narrator, one voice** — the animal speaks every section, so the theme lives in the copy, not in decoration; field-guide stat blocks that give a playful persona factual authority; a big-display-line / small-body rhythm with deliberate line breaks; humor that turns sincere at the end ("there're just 10,000 of us left"), then an invitation; a preloader gag ("pandas will wake up soon — 0%"). We take the narrator device, the stat-block trick, and the tonal arc. We do not take its layout or any copy.

### 1.2 good-fella.com (structural reference — most important)
Two brothers (Julian & Adrian Fella), "The digital landmark studio". Full homepage flow: availability banner → hero (about-card + featured-project card, H1, two CTAs) → stat strip with animated counters → "How we work" in 4 numbered steps (Send us a brief / One conversation / Design and build / Ship) → Selected work (5 cards, bracketed tags like `[Web App]—[SaaS]`, internal case-study pages) → six value blocks (incl. "Both brothers on every project", "Custom code", "Motion as medium") → 6-item FAQ → "Start a project" (email + book-a-call + newsletter) → footer with keyboard easter eggs (⌘G grid, C color) and tagline "Let the Fellas handle it". Pricing page: three tiers (The Landmark Site / The Landmark Brand / Quoted), **no numbers**, "Numbers depend on what you're building", deposit + milestone payments. Lessons adopted: duo-as-brand, seniority guarantee, numbered process, FAQ as objection-handling, email + booking CTA, keyboard easter egg, tier-framing for pricing. We are single-page where they are multi-page (justified in §5.0).

### 1.3 dragonfly.com (motion reference)
By Studio Freight (creators of Lenis); Awwwards SOTD. From their public case study: single-scroll chosen *to enable* transition ideas; scroll-scrubbed **clip-path "fold" reveals** between sections (ScrollTrigger scrub + Lenis values); `position: sticky` driving horizontal sections; a single shared canvas instead of one per section (performance); typographic pairing with "a big attitude" (Non Natural Grotesk + Mondwest); numbered section index (01–05); draggable project modals, ESC closes all; ASCII easter egg (drop a file → ASCII-processed). Lessons adopted: fold reveals, sticky-pinned horizontal work section, one-canvas budget, ESC-closes-all, an ASCII easter egg of our own, numbered chapters.

### 1.4 Japanese web design research (utsubo.com style guide, Awwwards Japan)
Principles: **ma** (間) — space as an active, charged interval, not leftover padding; **mincho** (serif, heritage, high stroke contrast) vs **gothic** (sans, modern, UI); **tategaki** vertical text (`writing-mode: vertical-rl`) as a heritage accent; traditional colors — sumi ink black, washi off-white, vermilion 朱, indigo 藍, gold leaf; seasonality; premium pole = low density, one idea per view. **Chief warning: "cargo-cult Japanese"** — cherry blossoms + torii + a brush font bolted onto a Western layout reads fake instantly; borrow principles, not motifs. Exemplars noted: Garden Eight, SHIFTBRAIN, mount inc., monopo; KASANÉ Urushi Keyboard (Awwwards HM 2025); 45R Denim Karuta (SHIFTBRAIN SOTD 2025); Asahi Shuzo Dassai (brush kanji hero + clean sans body — our exact typography strategy); Kaba-jirushi (horizontal emakimono product chapters); Misato Town (scrollytelling).

### 1.5 Borrow / do differently

| Source | We borrow | We do differently |
|---|---|---|
| iredpanda | Narrator persona; stat blocks; humor→sincerity arc; preloader gag | Our narrator sells work, not conservation; original panda art; scroll-story structure |
| good-fella | IA skeleton; duo-as-brand; 4-step process; FAQ; tier pricing framing; keyboard egg | Single page; show sample prices (they hide all numbers); honest facts strip instead of B+/M+ counters; our own copy throughout |
| dragonfly | Fold reveals; pinned horizontal section; one canvas; ESC-all; ASCII egg | Ink/washi warmth instead of dark-tech; emakimono metaphor instead of control-panel |
| JP research | ma, mincho/gothic split, tategaki accents, traditional palette | English-language site; kanji as garnish only; panda joke acknowledges the cultural blend |

---

## 2. Creative concept

**The site is an emakimono — a picture scroll — and scrolling unrolls it.** Each section is a chapter of the SneakyPandas tale told by the panda narrator: a mischievous sumi-e panda who sneaks into the painting, tells you who the clan is, shows its arts and conquests, walks you down the way, introduces the two masters, and finally hands you the seal. The visitor ends knowing: who we are (Nakul & Siddhi, two developers), what we build (websites, platforms, commerce, motion), and how to hire us (stamp the pact → email).

**Why the panda works here:** a giant panda is a Chinese bear wandering through Japanese ink painting — and that's the joke that makes "Sneaky" land. Acknowledged exactly once, in Chapter I: *"Strictly speaking, pandas don't belong in Japanese paintings. We snuck in. It's kind of our whole thing."* All panda artwork is original: a geometric-sumi style (bold ink shapes, dry-brush edges, two dots + patch eyes), deliberately unlike any existing character — no Kung Fu Panda likeness in pose, face, costume or accessories (no martial-arts garb, no noodles).

**Cultural vocabulary — committed Japanese, with rules:**
1. The kit: sumi-e ink painting, washi paper, hanko seals, emakimono scroll format, kasumi mist bands, seigaiha wave pattern, bamboo, mountain silhouettes, kakejiku hanging scrolls.
2. Kanji only from the glossary (§4.4), correct and translated, set in mincho/brush faces, often tategaki — garnish only, never load-bearing (per Nakul: English is the language of the site).
3. Sparing-use motifs (≤1 quiet appearance each, if at all): torii, katana, sakura/plum sprig, paper lantern. Excluded entirely: rising-sun rays (§0), geisha imagery.
4. No Hindi, no Marathi, anywhere, in any form.

**Tone:** confident, playful, a little mischievous, never corporate. The narrator says "we" and occasionally breaks the fourth wall. Banned: "We build digital experiences that…", "crafting solutions", "passionate about", emoji-as-icons, any stock agency phrase.

---

## 3. Design tokens

Replace the entire stock shadcn `:root`/`.dark` block and the Geist import in `src/index.css` with the following. Site is light (washi) with ink inversions per chapter — no dark-mode toggle (the scroll is the scroll).

### 3.1 Color — Tailwind v4 `@theme`

```css
@theme {
  /* surfaces */
  --color-washi: #F4EFE3;        /* rice paper — main ground */
  --color-washi-dim: #E9E1CF;    /* aged paper — cards, alt bands */
  --color-ink: #1C1915;          /* warm sumi black — text, dark chapters */
  --color-ink-raise: #26221C;    /* raised panels on ink */
  /* inks & accents */
  --color-ink-soft: #3A352E;     /* secondary text on washi */
  --color-ink-mute: #6E6657;     /* captions/meta on washi (AA at 4.95) */
  --color-vermilion: #C73E2D;    /* seal red — display, large accents, seals */
  --color-vermilion-deep: #9B2D1F;/* body-size links, buttons, focus */
  --color-gold: #B08D45;         /* aged gold — hairlines & numerals on ink only */
  --color-matcha: #6F7D5C;       /* muted jade — decorative fills only */
  --color-matcha-deep: #4A5742;  /* jade for tag text on washi */
}
```

**Measured WCAG contrast matrix (computed, not estimated) and usage law:**

| Pair | Ratio | Permitted use |
|---|---|---|
| ink / washi | 15.26 | AAA — body text, default |
| ink-soft / washi | 10.59 | AAA — secondary text |
| ink / washi-dim | 13.45 | AAA — text on cards |
| washi / ink | 15.26 | AAA — text in dark chapters |
| vermilion-deep / washi | 6.56 | AA — links, button fills w/ washi label, any size |
| washi / vermilion-deep | 6.56 | AA — button labels |
| ink-mute / washi | 4.95 | AA — meta text ≥ 14px |
| matcha-deep / washi | 6.70 | AA — tag text |
| gold / ink | 5.62 | AA — numerals/hairline labels on ink chapters |
| vermilion / washi | 4.40 | **Large text only** (≥ 24px, or ≥ 18.66px bold) + non-text (seals, strokes) |
| vermilion / ink | 3.46 | **Non-text + display ≥ 24px only** |
| matcha / washi | 3.84 | **Non-text only** (fills, patterns) |

Law: body-size interactive text is never `vermilion` — always `vermilion-deep`. `gold` never appears on washi. A contrast script (`scripts/contrast-check.mjs`, ~30 lines, the matrix above as assertions) runs in M0 and in every QA round.

### 3.2 Spacing & rhythm

4px base. Tokens: `--space-2: 8px · --space-3: 12px · --space-4: 16px · --space-6: 24px · --space-8: 32px · --space-12: 48px · --space-16: 64px · --space-24: 96px · --space-36: 144px`.
**Rhythm is deliberately uneven (ma):** chapters on washi get `py-[--space-36]` desktop / `py-[--space-24]` mobile; ink chapters bleed full and get `py-[--space-24]`; the pause between Chapter II and III (the marquee) gets almost none. Never the same padding on five sections in a row (anti-slop). Content column: `max-w-[1200px]`, gutter `px-6` mobile / `px-12` desktop; equal left and right content edges everywhere (Taste rule 4).

### 3.3 Radius & shadow
`--radius: 2px` (paper is cut, not rounded). Cards may use `--radius-none` with an ink-bleed edge mask instead. **No default Tailwind shadows anywhere.** The only shadow is an ink-blot: `--shadow-ink: 0 18px 40px -24px rgb(28 25 21 / 0.45)` and the scroll-roller gradient in the hero.

### 3.4 Texture
- **Paper grain:** one global SVG filter `#grain` (`feTurbulence baseFrequency="0.9" numOctaves="2"` → subtle `feColorMatrix` alpha) composited as a fixed, pointer-events-none overlay at 4–6% opacity (React Bits `Noise`, re-parameterized to parchment). Rendered once; `display:none` under `prefers-reduced-motion`? No — grain is static, it stays.
- **Ink bleed:** filter `#ink-bleed` (`feTurbulence baseFrequency="0.015 0.09" numOctaves="3"` + `feDisplacementMap scale="14"`) applied to section-divider SVGs and photo mask edges — pre-rendered onto the SVG shapes, not animated per-frame (perf).
- Both filters live in `src/components/chrome/Defs.tsx`, mounted once in `App.tsx`.

### 3.5 Kanji glossary (every character on the site)

| Glyph | Reading | Meaning | Where used |
|---|---|---|---|
| 忍 | nin | stealth, endurance | brand seal (hanko), hero stamp, favicon |
| 墨 | sumi | ink | decorative tategaki strip, Ch I margin |
| 竹 | take | bamboo | bamboo SVG label accent, Ch II margin |
| 族 | zoku | clan, tribe | Ch I chapter marker |
| 技 | waza | craft, technique | Ch II chapter marker |
| 功 | kō | merit, achievement | Ch III chapter marker |
| 道 | dō | the way | Ch IV chapter marker |
| 匠 | takumi | master artisan | Ch V chapter marker |
| 印 | in | seal, stamp | Epilogue marker + the pact seal |
| 序 | jo | prologue | hero chapter marker |
| 終 | owari (shū) | end | footer marker |
| 間 | ma | interval, negative space | Ch IV step 3 accent |
| 一 二 三 四 五 | ichi–go | numerals 1–5 | chapter numbering, progress rail |

Chapter markers render as `「一 · 族」` in Yuji Syuku with the English title beside them in Zen Old Mincho; the kanji is decorative (`aria-hidden="true"`), the English carries the semantics.

---

## 4. Typography

### 4.1 Faces (all self-hosted via Fontsource; Latin+kana subsets only — we use ~20 kanji, so also subset JP faces to the glossary's codepoints via `unicode-range` or a glyphhanger pass in M0)

| Role | Face | Weights | Package |
|---|---|---|---|
| Display (H1, chapter titles) | **Zen Old Mincho** | 700, 900 | `@fontsource/zen-old-mincho` |
| Brush/kanji accents only | **Yuji Syuku** | 400 | `@fontsource/yuji-syuku` |
| Body + UI | **Zen Kaku Gothic New** | 400, 500, 700 | `@fontsource/zen-kaku-gothic-new` |
| Mono (ASCII, tags, meta) | **IBM Plex Mono** | 400, 500 | `@fontsource/ibm-plex-mono` |

Rules: brush face (Yuji Syuku) is for display kanji and the wordmark flourish **only, never body, never full English sentences** (brief rule). If Zen Kaku Gothic New's Latin reads poorly at 17px in M0's first screenshot, the recorded fallback body is `Instrument Sans` — decide once, note it here.

### 4.2 Scale

| Token | Size / line-height | Face & weight | Use |
|---|---|---|---|
| `display-1` | `clamp(3rem, 8vw, 7rem)` / 1.04, `-0.01em` | ZOM 900 | hero H1 |
| `display-2` | `clamp(2.25rem, 5vw, 4.25rem)` / 1.1 | ZOM 700 | chapter H2 |
| `title` | 1.5rem / 1.3 | ZOM 700 | card titles, H3 |
| `body` | 1.0625rem (17px) / 1.75 | ZKGN 400 | paragraphs |
| `body-strong` | same / 1.6 | ZKGN 700 | leads |
| `meta` | 0.8125rem / 1.6, `+0.02em` | Plex Mono 400 | tags `[Platform]—[React]`, meta |
| `eyebrow` | 0.75rem / 1, `+0.22em`, uppercase | Plex Mono 500 | section eyebrows ("CHAPTER I") |
| `kanji-marker` | 1.375rem | Yuji Syuku | chapter markers, rail |

Tategaki accents (`writing-mode: vertical-rl`) are used in exactly three places: the progress rail kanji, a 墨 strip in Ch I's margin, and the 竹 label beside Ch II's bamboo — hidden on mobile.

### 4.3 Fonts from the Medium article (Nakul's list — catalogued)

From `medium-article-japanese-fonts.txt`: **Shinju Display** (logos/titles, heavy playful strokes — Envato, paid), **Keitaro** (traditional branding — Envato, paid), **Akashii** (brush, art/photography — Envato, paid), **Modern Japanese Font** (contemporary labels — Envato, paid), **Aokahori Brush** (photo overlays — CreativeTacos, free), **Kashima Brush** (apparel/branding — CreativeTacos, free), **Sigokae** (minimal JP-inspired — CreativeTacos, free), **Gaze Nozarashi** (headings — CreativeTacos, free), **"Japanese Font" BRAAKY8** (elegant handcrafted — Envato, paid).
**Strategy:** these are Latin display faces with brush styling; licensing (Envato = paid per-project; CreativeTacos free downloads are often personal-use-only) makes them wrong as the shipped webfont. The build ships the OFL stack in §4.1. The **wordmark** gets the brush character these fonts promise by being **hand-lettered as SVG** (original, no license, animatable with DrawSVG). If Nakul licenses one later (Shinju Display is the best fit for the wordmark's vibe), it slots into `--font-display-alt` without layout change. Decision recorded; nothing else depends on these files.

---

## 5. Section-by-section spec

### 5.0 Architecture
**Single page** with 7 chapters + chrome. Justification vs good-fella's multi-page: we have 2 people and 1 real case study — multi-page would echo emptily, and the emakimono concept demands one continuous scroll. Changes vs the brief's proposed order, each justified: added an honest **facts strip** in Ch I (good-fella's stat strip, minus fake counters); added **sample-pricing tiers** into Ch II (Nakul's answer); added a **4-item FAQ** into the Epilogue (good-fella's objection-handling); founders stay at Ch V, *after* work (credibility before biography, as good-fella does).

Nav: fixed minimal top bar (wordmark seal left; "Seal a project" button right; chapter anchors in a menu on mobile). Progress rail: right edge, desktop only (§5.9).

Every section: semantic `<section id aria-labelledby>`, h2 first, one content `.wrap`, equal edges, decorative SVGs `aria-hidden="true"` with empty alt where img. All copy below is final draft copy — build it verbatim (typos and all taste fixes allowed; no lorem ipsum anywhere).

---

### 5.1 · 序 Prologue / Hero — `src/components/chapters/Hero.tsx`
**Desktop (1440):** full viewport. A washi scroll sheet occupies the frame with dark lacquer rollers top and bottom (gradient bars + `--shadow-ink`). Top-left eyebrow `序 · PROLOGUE` (kanji aria-hidden). Centered-left (not centered-everything): wordmark "SneakyPandas" hand-lettered SVG, then H1, sub, CTA row. Right third: sumi-e mountain + mist layers, panda **peeking** over the bottom roller (eyes + ears only). The 忍 hanko stamps into the top-right corner after the wordmark resolves.
**Mobile (390):** stacked; mountains become a low horizon band behind the text; panda peeks from the bottom edge; CTAs full-width.
**Copy:**
- Eyebrow: `序 — PROLOGUE`
- H1: **"Quietly, we build loud websites."**
- Sub: "SneakyPandas is Nakul and Siddhi — two developers who treat every website like a story worth unrolling. You've just opened ours."
- CTA primary: **Seal a project** (anchors to Epilogue) · CTA ghost: **Unroll the story** (scrolls to Ch I)
- Scroll hint (meta, bottom center): "scroll to unroll"
**Interactions:** entrance timeline (§7 rows H1–H5); roller shadow deepens slightly with scroll (scrub); panda eyes track cursor ±6px (desktop only, lerped).

### 5.2 · 一 族 Chapter I — The Clan — `Clan.tsx`
**Desktop:** two columns — left: narrator copy; right: original sumi-e panda *painting* a brush stroke that becomes the section's divider. 墨 tategaki strip hangs in the far-left margin. Below, the **facts strip**: 4 mono stat blocks in a row (iredpanda field-guide style).
**Mobile:** single column, facts strip 2×2 grid.
**Copy:**
- Eyebrow: `一 — CHAPTER I` · H2: **"The Clan"**
- Lead: "Every scroll begins with a confession, so here is ours: there are only two of us. That's not the fine print. That's the product."
- Body: "Nakul plans like a general and codes like he's being watched by one. Siddhi finds the detail you didn't ask for and hides it where you'll smile when you find it. Together we take on a small number of projects and give each one both of our full attention — no juniors, no handoffs, no 'the team will get back to you.' We *are* the team."
- The joke (once): "Strictly speaking, pandas don't belong in Japanese paintings. We snuck in. It's kind of our whole thing."
- Facts strip (from `src/config/site.ts`): `02 / founders` · `02 / people on your project` · `01+ / platforms shipped` · `00 / account managers`
**Interactions:** ink-bleed mask reveal of the lead paragraph (§7 C1); brush stroke draws via DrawSVG as the section enters; facts count up quickly (0.6s, once).

### 5.3 · 二 技 Chapter II — The Arts — `Arts.tsx`
**Desktop:** four **kakejiku** (hanging scroll) cards in an uneven 2+2 layout (left pair higher — asymmetry, not three-identical-cards-in-a-row). Each card: thin lacquer rod top, washi-dim body, service name (title), one line, three deliverables (meta list), a small original SVG motif (brush web, lantern grid, coin knot, wave). Below: **tech row** — grayscale-ink `LogoLoop` of the real stack (React, TypeScript, Vite, Tailwind, GSAP, Node). Then the **pricing tiers** band on ink (full-bleed): three tier cards + caveat line.
**Mobile:** cards stack single-column; tiers stack.
**Copy:**
- Eyebrow `二 — CHAPTER II` · H2 **"The Arts"** · Lead: "Four disciplines. One standard: if it ships with our seal on it, it's work we'd sign twice."
- Card 1 **Web Experiences** — "Marketing sites, portfolios, launches. The kind of site that makes scrolling the show." Deliverables: `Landing & campaign sites · Scroll-story pages · Portfolio sites`
- Card 2 **Web Apps & Platforms** — "Dashboards, portals, e-learning — software people actually log back into." `SaaS frontends · Learning platforms · Internal tools`
- Card 3 **Commerce & CMS** — "Stores and content systems your team can edit without calling us. (Call us anyway, we're nice.)" `Storefronts · Headless CMS · Payment flows`
- Card 4 **Motion & Brand Systems** — "Design systems and animation languages, written in code, not in a PDF." `Design tokens · GSAP motion systems · Component libraries`
- Pricing band — H3: **"What a pact costs"** · tiers from `src/data/pricing.ts`:
  - **The Scroll** — "A landmark site, custom-coded." — `from $1,200` — `4–8 weeks`
  - **The Stronghold** — "A full platform or web app." — `from $4,500` — `8–16 weeks`
  - **The Commission** — "Something strange. Our favorite kind." — `let's talk` — `scoped together`
  - Caveat (meta, visible): "Sample figures — the real number comes after one conversation. Deposit upfront, milestones after."
**Interactions:** kakejiku unroll on enter (§7 A1, staggered); brush underline draws under card titles on hover (DrawSVG, 0.35s); tier cards get the 2px lift + ink-blot shadow on hover.

### 5.4 Interlude — services marquee — inside `Arts.tsx` bottom
A single `ScrollVelocity` line between Ch II and III, mono, ink on washi, repeating: `WEB EXPERIENCES — PLATFORMS — COMMERCE — MOTION — ` with small 技 glyphs as separators (aria-hidden, `role="presentation"`). Velocity-reactive skew ≤ 4°.

### 5.5 · 三 功 Chapter III — The Conquests — `Conquests.tsx`
**Desktop:** pinned **horizontal emakimono**: section pins for `300vh`; a horizontal track (`x` scrub) carries project cards over a continuous parallax landscape (3 mountain layers + kasumi mist at 0.2×/0.5×/0.8× scroll speed). Cards: cover image (duotone-treated screenshot/placeholder), title, `[tag]—[tag]` meta, year, one-line outcome. Clicking a card **expands in-page** via GSAP Flip into a modal case panel (gallery, description, stack, link). ESC closes all open panels (Dragonfly nod). Justification for in-page vs link-out: 4 of 5 entries are placeholders and the single-scroll story shouldn't eject the reader.
**Mobile:** no pinning — cards stack vertically full-width with the landscape as a static header band (pinned horizontal scroll on touch is hostile); modal becomes a full-screen sheet.
**Keyboard/a11y:** cards are buttons in DOM order; the horizontal scrub is presentation only — tabbing moves through cards normally and scrolls them into view; modal traps focus, labelled by title.
**Copy:** Eyebrow `三 — CHAPTER III` · H2 **"The Conquests"** · Lead: "Scrolls we've already signed. One is real and live; the rest are concept pieces — shown so you can see how we'd treat yours, and labelled so nobody's fooled."
**Data — `src/data/projects.ts`** (typed `Project[]`; full shape in §10):
1. **The Consistent Academy** — real. client: "Vidya Wankhade, Pune", year: 2025, tags: `[E-learning]—[Platform]—[React]`, outcome: "A 19-year teaching practice brought online — IELTS, TOEFL, PTE and CELPIP prep beside corporate communication and kids' courses, with tests, webinars and a bookshelf in one place." link: `https://theconsistentacademy.in`, cover: screenshot captured during M3 (`public/work/tca.jpg`), `concept: false`.
2. **Karakuri Coffee** — fictional. "Karakuri Coffee Roasters", 2026, `[Commerce]—[Brand]—[Storefront]`, "A roaster's catalog that pours: single-origin pages, subscriptions, and a checkout nobody abandons out of boredom.", link `#`, cover placeholder, `concept: true`.
3. **Paper Crane Stays** — fictional. "Paper Crane Hotels", 2026, `[Booking]—[Microsite]—[Motion]`, "A boutique-stay microsite where the room reveals itself before the price does.", `concept: true`.
4. **Dialed** — fictional. "Dialed Audio", 2025, `[SaaS]—[Dashboard]—[Data-viz]`, "A podcast-analytics dashboard that makes retention graphs feel like a story arc.", `concept: true`.
5. **Moth & Flame** — fictional. "Moth & Flame Games", 2026, `[Games]—[Press kit]—[WebGL]`, "An indie studio press site with one shader and a lot of restraint.", `concept: true`.
Concept entries render a small `matcha-deep` mono tag **`[Concept piece]`** on card and panel — realistic but clearly fictional, visibly (no fake-portfolio ethics problem).
**Interactions:** §7 rows W1–W4; `ImageTrail` on the section's intro zone — cursor trails faint ink-print thumbnails of the covers (desktop only).

### 5.6 · 四 道 Chapter IV — The Way — `Way.tsx`
**Desktop:** ink chapter (full-bleed `--color-ink`, washi text, gold numerals). A vertical brush path (SVG, DrawSVG-scrubbed) descends through 5 stepping stones, alternating left/right (asymmetry). The panda sprite walks the path: at each stone the pose swaps (peek → walk → paint → code → bow). Right margin: `_DSC6706.JPG` (Nakul presenting), ink-duotone, clipped in a tall stone-shaped mask.
**Mobile:** single rail, stones stacked, path line left-aligned; photo dropped.
**Copy:** Eyebrow `四 — CHAPTER IV` · H2 **"The Way"** · Lead: "From first message to launch, the path has five stones. No mystery, no 'process™'."
1. **The brief** — "Tell us what you're building and what haunts you about it. A paragraph is enough."
2. **One conversation** — "Both of us, one call. You'll know by the end of it whether we're your pandas."
3. **The quiet middle** `間` — "Design and build, with room to think. You see real progress weekly, on a live link — not slideware."
4. **The reveal** — "Staging link, your notes, our polish. We argue with pixels so you don't have to."
5. **The launch — and the first moon after** — "We ship it, then stay close for thirty days. Launches wobble; we hold."
**Interactions:** §7 rows P1–P3.

### 5.7 · 五 匠 Chapter V — The Masters — `Masters.tsx`
**Desktop:** back on washi. Two large portrait plates, offset vertically (Nakul's higher-left, Siddhi's lower-right), each: duotone portrait, name in display-2, role line in brush-underlined title, bio body, magnetic LinkedIn button. On hover, a vermilion hanko stamps onto the photo corner revealing the role-kanji-free English title. Between the plates, small: the duo selfie (`IMG_20260321_221918~2.jpg`) duotoned, caption-free, as a torn-washi snapshot. Hover on each primary portrait crossfades to the secondary photo (DSC05158 / 20260201_154833).
**Mobile:** stacked plates, duo snapshot between.
**Copy:** Eyebrow `五 — CHAPTER V` · H2 **"The Masters"** · Lead: "Two names you'll see in your commit history."
- **Nakul Bhadade** — role line: **"The Strategist."** Bio: "Plans the build, argues with the pixels, usually wins. If the site holds together under pressure — deadlines, traffic, scope — that's Nakul's doing. Chairs a mean committee, too." Button: **LinkedIn ↗** (`links.nakulLinkedIn`, `#` for now)
- **Siddhi Dhoke** — role line: **"The Mischief."** Bio: "Finds the detail you didn't know you wanted and hides it where you'll find it. If something on this page made you smile, assume it was Siddhi. The code reviews are less gentle." Button: **LinkedIn ↗** (`links.siddhiLinkedIn`, `#`)
**Interactions:** §7 rows M1–M3; `Magnet` on LinkedIn buttons (strength 0.3, radius 120px).

### 5.8 · 終 印 Epilogue — Seal the Pact + footer — `Pact.tsx`, `chrome/Footer.tsx`
**Desktop:** ink chapter. Centerpiece: a giant round **hanko** (vermilion, 印 + paw monogram) hovering over a washi "contract" sheet listing the pact terms as playful meta lines ("both pandas, every build / weekly live links / thirty days past launch"). The primary CTA is the stamp itself (a real `<button>`): press → stamp slams down, ink splatter, a vermilion paw-seal remains, then the mail client opens (`mailto:nakulccs@gmail.com,sidii0080@gmail.com?subject=A new pact`). Beside it: plain-text email line (copy-on-click with "copied" tick) for people who hate mailto. Below: **FAQ** — 4 items, `<details>` elements styled as washi slips (no JS accordion needed).
**Mobile:** stamp above contract, FAQ stacked.
**Copy:** Eyebrow `終 — EPILOGUE` · H2 **"Seal the Pact"** · Lead: "Every scroll ends with a seal. Tell us what you're building — we read everything, usually twice."
- Stamp button label: **"Stamp it — start the conversation"** · Sub-line: "nakulccs@gmail.com · sidii0080@gmail.com"
- FAQ: **"What do you cost?"** → "The tier figures above are samples; the real number comes after one conversation about scope. Deposit upfront, milestones after." · **"How long will my site take?"** → "A landmark site: four to eight weeks. A platform: longer. We'd rather be honest than fast." · **"Who actually does the work?"** → "Us. Both of us, on everything. Nothing gets handed off, because there's nobody to hand it to." · **"Do you only make Japanese-looking sites?"** → "No — this scroll is ours. Yours will look like you. That's the job."
**Footer (`Footer.tsx`):** ink, hairline-gold top rule. Left: ASCII sleeping panda in `<pre aria-hidden>` + mono line "the pandas will code again soon." Center: anchor nav (chapters) + socials from config. Right: © 2026 SneakyPandas · tagline **"Built quietly. Shipped loudly."** · tiny `終` glyph. ASCII panda (refine art in M5, keep ≤ 10 lines):
```
   _   _
  (.)_(.)
 _(  _  )_    z Z
(_/'-.-'\_)
```

### 5.9 Chrome
- **Preloader** (`chrome/Preloader.tsx`): washi full-screen; small ASCII panda typed via `TextType` + a brush stroke filling 0→100% ("grinding the ink… 0%"). Hard cap **1.8s** (plays alongside font/hero load, not after), click/keypress skips, `sessionStorage['sp-seen']` skips entirely on repeat visits. Under reduced-motion: a static frame for 0.4s.
- **Progress rail** (`chrome/ProgressRail.tsx`): desktop ≥ 1024px only. Right edge, vertical: chapter kanji 序一二三四五終 as anchor links (each `aria-label` = English chapter name), a brush line fills with scroll progress (scaleY scrub). Current chapter's glyph turns vermilion.
- **Custom cursor** (`chrome/Cursor.tsx`): desktop + fine-pointer only. 8px ink dot, lerp-follows at 0.18; swells to 28px ring over links/buttons; becomes a small 印 glyph over the pact stamp. Hidden (and native cursor restored) under reduced-motion or `pointer: coarse`. Native cursor is never hidden for keyboard users (cursor element is decoration; `cursor: none` only on `html:hover` scope).
- **Easter egg**: pressing `p` stamps a small paw print at the cursor position (max 20 on page, fade after 8s). Mono hint hidden in footer: `press p anywhere`.

---

## 6. Motion system

### 6.1 Engine & wiring (exact, brief-mandated)
```ts
// src/components/motion/useLenis.ts
const lenis = new Lenis({ autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
GSAP 3 + ScrollTrigger, SplitText, DrawSVGPlugin, Flip (MorphSVG available; used only if the panda pose-swap needs it — default is crossfade swap, cheaper). All animation code inside `useGSAP(() => {...}, { scope })` with automatic cleanup. `ScrollTrigger.matchMedia` splits desktop/mobile/reduced behaviors.

### 6.2 Named system
Durations: `beat 0.3s · stroke 0.7s · unroll 1.2s · slam 0.45s`. Easings: `brush = power2.out · settle = power3.inOut · stamp-in = power4.in · stamp-settle = elastic.out(1, 0.4) · drift = sine.inOut · scrub = none`. Stagger default `0.06` chars / `0.12` items. **Only `transform`, `opacity`, `clip-path` animate** (the ink-bleed displacement is baked into static SVG, never animated per-frame).

### 6.3 Per-animation spec table

| # | Trigger | Target | Properties | Dur | Ease | Stagger |
|---|---|---|---|---|---|---|
| H1 | load (post-preloader) | hero scroll sheet | `clip-path: inset(46% 0)` → `inset(0)` + roller bars translate apart | 1.2s | settle | — |
| H2 | after H1 −0.4s | wordmark SVG strokes | DrawSVG 0→100% | 0.9s | brush | 0.08/stroke |
| H3 | after H2 | H1 lines (SplitText lines) | `yPercent: 110→0` inside `overflow:hidden` wrappers, opacity 0→1 | 0.7s | brush | 0.09/line |
| H4 | after H3 −0.2s | 忍 hanko | `scale 1.6→1, rotate -8°→-3°`, opacity 0→1 | 0.45s | stamp-in→stamp-settle | — |
| H5 | after H3 | sub, CTAs, scroll hint | opacity 0→1, `y 16→0` | 0.5s | brush | 0.12 |
| H6 | scroll scrub (hero span) | mist layers | `yPercent` 0→−12 / −24 (two depths) | scrub | scrub | — |
| H7 | pointermove (desktop) | panda pupils | `x,y` ±6px lerp 0.1 | — | — | — |
| C1 | enter Ch I 60% | lead paragraph mask | brush-mask `clip-path` polygon sweep L→R (4 strokes) | 0.9s | brush | 0.15/stroke |
| C2 | enter Ch I 60% | divider brush stroke | DrawSVG 0→100% | 0.7s | brush | — |
| C3 | enter facts strip | counter numbers | textContent 0→value | 0.6s | power1.out | 0.1 |
| A1 | each card enters 70% | kakejiku card | `clip-path: inset(0 0 100% 0)` → `inset(0)` + rod `scaleX 0.6→1` | 0.8s | settle | 0.14/card |
| A2 | hover card title | brush underline path | DrawSVG 0→100% (reverse on leave) | 0.35s | brush | — |
| A3 | enter pricing band | tier cards | `y 32→0`, opacity 0→1 | 0.6s | brush | 0.12 |
| V1 | scroll velocity | marquee line | `x` loop; `skewX` ∝ velocity, max 4° | raf | — | — |
| W1 | Ch III pin (300vh) | horizontal track | `x: 0 → -(trackWidth − vw)` | scrub | scrub | — |
| W2 | same scrub | mountain layers ×3 | `x` at 0.2× / 0.5× / 0.8× of W1 | scrub | scrub | — |
| W3 | card click | card → case panel | GSAP `Flip.from(state)` scale+position, washi sheet `clip-path` opens | 0.6s | settle | — |
| W4 | intro zone pointermove | ImageTrail thumbnails | RB default physics, opacity ≤ 0.5, grayscale+vermilion duotone | — | — | — |
| P1 | Ch IV scrub (section span) | path SVG | DrawSVG 0→100% scrubbed | scrub | scrub | — |
| P2 | each stone at path arrival | stone content | opacity 0→1, `x ∓24→0` (alternating) | 0.5s | brush | — |
| P3 | stone arrival | panda sprite | crossfade pose swap + `x` hop 12px | 0.4s | drift | — |
| M1 | enter plate 70% | portrait | duotone layer opacity 1→0.85 + `clip-path` wipe up | 0.7s | settle | 0.2/plate |
| M2 | hover portrait | hanko corner stamp | `scale 1.4→1`, opacity 0→1 | 0.35s | stamp-in→stamp-settle | — |
| M3 | hover LinkedIn btn | button | Magnet translate (≤12px) + underline draw | — | — | — |
| S1 | stamp button press | hanko | `y −36→0, scaleY 1→0.82→1` + splatter particles (12 SVG blots, random vectors, fade 0.6s) + paw-seal opacity 0→1 | 0.45s | stamp-in→stamp-settle | — |
| S2 | enter Epilogue | contract lines | opacity 0→1, `y 12→0` | 0.5s | brush | 0.08 |
| G1 | route-long-idle none | — | **no idle loops anywhere** (calm page; Taste) | — | — | — |

**Banned:** generic fade-in-and-slide-up on arbitrary elements (every reveal above is a themed mechanism: unroll, brush, stamp, draw, scrub). No parallax on body text. Nothing autoplays on loop except the marquee (pausable via reduced-motion and `prefers-reduced-motion` kills it).

### 6.4 Reduced motion
`ScrollTrigger.matchMedia({'(prefers-reduced-motion: reduce)': ...})`: Lenis not instantiated; every timeline replaced by `gsap.set(..., finalState)`; Ch III renders the mobile stacked layout at all widths; preloader 0.4s static; marquee static line; cursor native; stamp press = simple opacity seal + mailto. Full content always visible — acceptance criterion in every milestone.

### 6.5 Performance budget
Lighthouse desktop: **Perf ≥ 85, A11y ≥ 95**. Tactics: only transform/opacity/clip-path; `will-change` only during active tweens (GSAP handles); images `loading="lazy"` below fold + `decoding="async"`, AVIF/WebP with JPEG fallback via `<picture>`; duotone done with CSS `filter: grayscale(1)` + blend overlay (GPU) not SVG feColorMatrix per-frame; one `<canvas>` max (splatter is SVG, so default zero canvases); fonts subset + `font-display: swap` + preload the two display weights; no layout thrash (reads batched, ScrollTrigger `invalidateOnRefresh`).

---

## 7. React Bits shortlist (registry `@react-bits`, TS-TW variants)

| Component | Install | Placement | Restyle |
|---|---|---|---|
| `Noise-TS-TW` | `npx shadcn@latest add @react-bits/Noise-TS-TW` | global grain overlay | opacity 5%, parchment warm alpha, blend `multiply` |
| `ImageTrail-TS-TW` | same pattern | Ch III intro zone | covers duotoned ink/vermilion, opacity ≤ 0.5 |
| `Magnet-TS-TW` | | LinkedIn + stamp CTA | strength 0.3, radius 120 |
| `ScrollVelocity-TS-TW` | | services marquee | mono face, ink on washi, skew ≤ 4° |
| `ClickSpark-TS-TW` | | stamp + primary CTAs | sparks → vermilion ink droplets (dash particles, 600ms) |
| `TextType-TS-TW` | | preloader + footer line | mono, washi-on-ink, cursor block `▮` |
| `LogoLoop-TS-TW` | | Ch II tech row | grayscale-ink logos, pause on hover |
| `ScrollExpand-TS-TW` | | case panel screenshot | radius 2px, ink-blot shadow |
| `BlurText-TS-TW` | | sparing body leads (Ch I joke line only) | blur 6px→0, once |

GSAP SplitText is used directly for display type (not an RB wrapper). Every RB component is installed into `src/components/vendor/` and re-tokened — none ships stock-looking.

---

## 8. Founder photos (`public/developers/`) — assessment & treatment

| File | Shows | Quality/crop | Used where | Treatment |
|---|---|---|---|---|
| `IMG_20260321_221918~2.jpg` | Duo selfie, formalwear, playful hand-signs, dark bg | Good; noise in shadows; crop to 4:3 on faces | Ch V duo snapshot | Ink duotone (ink/washi), +grain, torn-washi mask |
| `DSC05339.JPG` | Nakul profile, black suit, red paisley tie | High; crop left third off (bystander) | **Nakul primary**, Ch V | Duotone with the tie's red let through as the single color pop |
| `DSC05158.JPG` | Nakul side profile, pen raised, thinking | High; crop tight to head+hand | Nakul hover-swap, Ch V | Full ink duotone, heavy crop |
| `IMG_4651.JPG` | Nakul at desk, laptop + gavel, "Executive Board" placard, native B&W | Good; crop placard text out (bottom third) | OG-image candidate / Ch V alt | Washi-tint over mono |
| `IMG_20260321_211823.jpg` | Siddhi portrait, fairy lights, bokeh | High, well-lit; portrait crop 3:4 | **Siddhi primary**, Ch V | Duotone, bokeh kept as washi speckle |
| `20260201_154833.jpg` | Siddhi full-body, sipping a drink, playful | Medium; busy bottle-wall bg | Siddhi hover-swap, Ch V | Ink-wash mask isolating the figure, bg dropped to flat washi |
| `_DSC6706.JPG` | Nakul presenting, pen in hand | Good; crop to subject, drop chairs | Ch IV margin photo | Ink duotone in stone-shaped mask |
| `IMG_20260321_221724.jpg` | Siddhi candid, arm motion-blur | Medium (blur) | **Skipped** — blur reads as error under duotone | — |
| `IMG-20250301-WA0118.jpg` | Duo outdoors at event | Low (WhatsApp compression) | **Skipped** — compression artifacts amplify under duotone | — |
| `IMG-20261027-WA0075.jpg` | Elevator mirror selfie | Low light, reflective clutter | **Skipped** — unusable tonal range | — |

Duotone technique (CSS, GPU-cheap): `<picture>` grayscale base + `::after` overlay `background: var(--color-ink); mix-blend-mode: lighten` and washi `screen` layer; vermilion pop on DSC05339 via a second masked layer. No captions under any photo (Taste rule 1); names/roles are layout text, not captions.

---

## 9. Asset inventory

| Asset | Method | Path | Sections |
|---|---|---|---|
| Wordmark "SneakyPandas" (brush-lettered) | hand-authored SVG, stroke-prepared for DrawSVG | `src/assets/svg/Wordmark.tsx` | nav, hero, footer |
| Hanko seal 忍 + paw monogram | hand-authored SVG | `src/assets/svg/HankoSeal.tsx` | hero, nav, favicon, Ch V stamps |
| Pact seal 印 (round) | hand-authored SVG | `src/assets/svg/PactSeal.tsx` | epilogue stamp |
| Panda poses ×7 (peek, walk, paint, code, bow, stamp, sleep-ASCII excluded) | hand-authored SVG, shared geometry, original design | `src/assets/svg/panda/*.tsx` | hero, Ch I, Ch IV |
| Panda pupils (tracking) | part of peek SVG, separate `<g id="pupils">` | same | hero |
| Mountains ×3 depths | hand-authored SVG silhouettes | `src/assets/svg/Mountains.tsx` | hero, Ch III |
| Kasumi mist bands ×2 | hand-authored SVG, ink-bleed filtered | `src/assets/svg/Kasumi.tsx` | hero, Ch III |
| Seigaiha wave tile | hand-authored SVG `<pattern>` | `src/assets/svg/Seigaiha.tsx` | Ch II card motif, footer rule |
| Bamboo stalks | hand-authored SVG | `src/assets/svg/Bamboo.tsx` | Ch II margin |
| Brush strokes/masks ×4 | hand-authored SVG paths (also used as clip-paths) | `src/assets/svg/Strokes.tsx` | dividers, underlines, C1 mask |
| Plum sprig (single quiet accent) | hand-authored SVG | `src/assets/svg/Plum.tsx` | Ch V corner, once |
| Service motifs ×4 (brush web, lantern grid, coin knot, wave) | hand-authored SVG | `src/assets/svg/ServiceMotifs.tsx` | Ch II cards |
| Paper grain filter | procedural `feTurbulence` | `chrome/Defs.tsx` | global |
| Ink-bleed filter | procedural `feTurbulence`+`feDisplacementMap` | `chrome/Defs.tsx` | dividers, masks |
| Ink splatter particles | procedural SVG blots, GSAP-animated | `motion/SealStamp.tsx` | epilogue |
| TCA screenshot | captured in M3 from live site, 1600×1000 | `public/work/tca.jpg` | Ch III |
| Concept covers ×4 | designed in-code placeholder art: washi card + large mincho initial + motif + duotone gradient (honest placeholders, not fake screenshots) | `src/components/chapters/ConceptCover.tsx` | Ch III |
| Founder photos (5 used) | existing, treated per §8 | `public/developers/*` | Ch IV, V |
| ASCII panda (loader + sleeping) | authored text | `src/data/ascii.ts` | preloader, footer |
| Favicon (hanko, vermilion square 忍) | SVG | `public/favicon.svg` | head |
| OG image 1200×630 | composed at M5 from hero art (screenshot of a dedicated `/og` view) | `public/og.jpg` | head |
| `robots.txt` | static | `public/robots.txt` | — |

**Assets needed from Nakul** (placeholders ship meanwhile):
1. Final **LinkedIn URLs** (both) — config swap, 1 min.
2. **Domain** — config swap.
3. *Optional:* pro founder photo set — consistent lighting, ≥ 2000px, one landscape duo + one 3:4 portrait each; current photos work but a matched-lighting pair would lift Ch V.
4. *Optional:* a real inked hanko scan (≥ 1200px, white bg) to replace the vector pact seal texture.
5. *Optional:* license for Shinju Display (Envato) if the hand-lettered wordmark isn't beloved.

---

## 10. File structure & component tree

```
src/
  main.tsx                     # fonts imports, <App/>
  index.css                    # @theme tokens (§3), base styles, texture classes
  App.tsx                      # Defs, Preloader, Nav, chapters in order, Footer, Cursor, ProgressRail
  config/site.ts               # names, emails (nakulccs@gmail.com, sidii0080@gmail.com),
                               # mailto builder, links{nakulLinkedIn:'#', siddhiLinkedIn:'#', github, instagram},
                               # domain:'sneakypandas.dev', bookingUrl:'', facts[]
  data/copy.ts                 # every string from §5, keyed by chapter
  data/projects.ts             # Project{slug,title,client,year,tags[],stack[],outcome,description,
                               # cover,link,concept} — entries from §5.5
  data/pricing.ts              # Tier{name,blurb,price,duration} ×3  // SAMPLE — replace before launch
  data/ascii.ts                # loader + sleeping panda strings
  components/
    chrome/{Defs,Preloader,Nav,ProgressRail,Cursor,Footer}.tsx
    chapters/{Hero,Clan,Arts,Conquests,Way,Masters,Pact}.tsx
    chapters/ConceptCover.tsx  CasePanel.tsx  PricingBand.tsx  FactsStrip.tsx  Kakejiku.tsx
    motion/{useLenis,useChapterTrigger,useReducedMotion,SealStamp,InkMaskReveal,BrushUnderline}.tsx
    vendor/                    # restyled React Bits installs
  assets/svg/                  # §9 components
scripts/contrast-check.mjs     # asserts §3.1 matrix
docs/PLAN.md                   # this file
public/{developers/, work/, favicon.svg, og.jpg, robots.txt}
```

Dependencies to add in M0: `gsap @gsap/react lenis`. Remove: `@fontsource-variable/geist` import (package may stay installed). Keep `@base-ui/react`/CVA for the FAQ details styling if useful; nothing else from stock shadcn theme survives.

---

## 11. Build milestones & acceptance criteria

**M0 — Foundation.** Tokens, fonts (subset), texture filters, Lenis+GSAP wiring, config/data/copy files, Nav skeleton, contrast script. ✅ Done when: dev server renders a washi page with tokens applied; `contrast-check.mjs` passes; fonts load subset (< 220KB total woff2); Lenis scrolls with ScrollTrigger synced; reduced-motion media query verified switching.
**M1 — Hero + chrome.** Preloader, hero (H1–H7), progress rail, cursor. ✅ Preloader ≤ 1.8s and skippable + session-skipped; hero entrance per spec at 1440 & 390; rail tracks and anchors; cursor desktop-only; reduced-motion shows full static hero; zero console errors.
**M2 — Clan + Arts** (C1–C3, A1–A3, V1, pricing band). ✅ Kakejiku unrolls staggered; facts strip accurate from config; sample-price caveat visible; marquee calm and killable; both widths screenshot-reviewed.
**M3 — Conquests** (W1–W4, data, Flip panels, TCA screenshot). ✅ Pin scrubs smoothly ≥ 55fps desktop; mobile stacks without pinning; `[Concept piece]` tags visible; ESC closes all; focus trap + DOM-order tabbing verified; TCA description matches §5.5 exactly.
**M4 — Way + Masters** (P1–P3, M1–M3, photo treatments). ✅ Path scrub draws with scroll; panda pose swaps at stones; duotones match §8 including the red-tie pop; magnetic buttons keyboard-accessible (magnet is pointer-only).
**M5 — Pact + footer + SEO.** (S1–S2, FAQ, easter egg, favicon, OG, meta, robots). ✅ Stamp slam fires once per press and opens mailto to both addresses; copy-email fallback works; FAQ keyboard-toggles; `p` egg capped at 20; OG/favicon render in checkers.
**M6 — QA loop (Phase 3, per brief §8).** Repeat per section until it survives critique: (1) screenshot 1440 + 390 incl. mid-animation states (Impeccable live-browser scripts / Playwright); (2) critique against brief + references + both skills, list concrete issues; (3) fix, re-screenshot; (4) console sweep + reduced-motion pass + Lighthouse (≥ 85 perf / ≥ 95 a11y desktop) + contrast script + anti-slop checklist walk (no purple gradients, no glassmorphism, no emoji icons, no centered-everything, no 3-identical-cards, no stock phrases, uneven rhythm confirmed, no default shadows/rounded-2xl).
Build opens with Impeccable `context`/`init` (PRODUCT.md) + new-work flow; `craft-floor.md` read before the first UI edit; reference screenshots (1440/390 of the three sites) captured into `docs/reference/` at M0 for QA comparison.

---

## 12. Risks & mitigations

1. **Zen Kaku Gothic New Latin at body size** — judged at M0 first screenshot; fallback Instrument Sans (recorded §4.1).
2. **Pinned horizontal section on low-end devices** — `matchMedia` gives tablets/mobile the stacked layout; desktop scrub animates only `x` transforms.
3. **SVG filter cost** — grain/bleed are static (no per-frame filter animation); if Lighthouse flags paint cost, grain drops to a pre-rendered 512px PNG tile.
4. **Duotone over compressed photos** — the three WhatsApp/low-light photos are already excluded; if DSC05339's crop can't hide the bystander, fall back to DSC05158 as primary.
5. **Panda originality** — poses reviewed in M2/M4 against the "no existing character likeness" rule (no Kung Fu Panda silhouette, costume, or prop echoes).
6. **mailto with two recipients** — works in major clients; the visible copy-email fallback covers the rest.
7. **Sample prices mistaken for real** — visible caveat line + `// SAMPLE` comment + FAQ answer all say so.
8. **Fonts-article licenses** — none shipped; wordmark is original SVG lettering (§4.3).
