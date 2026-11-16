import { useRef, useState } from "react";
import { copy } from "../../data/copy";
import { projects, type Project } from "../../data/projects";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";
import { ConceptCover } from "./ConceptCover";
import { CasePanel } from "./CasePanel";
import ImageTrail from "../vendor/ImageTrail";
import CircularGallery from "../vendor/CircularGallery";

/** 二 The Conquests — the work, spun on a curved gallery, detailed in cards. */
export function Conquests() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const c = copy.conquests;

  const galleryItems = projects.map((p) => ({
    image: p.cover ?? `/work/${p.slug}.jpg`,
    text: p.title,
    alt: p.title,
  }));

  const openProject = (p: Project, el?: HTMLElement | null) => {
    openerRef.current = el ?? null;
    setOpen(p);
  };
  const close = () => {
    setOpen(null);
    openerRef.current?.focus();
  };

  return (
    <section ref={root} id="conquests" aria-labelledby="conquests-title" className="bg-washi pb-16 pt-24 max-md:pb-12 max-md:pt-16">
      <div className="wrap relative">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="conquests-title" />
        <p className="mt-6 max-w-[52ch] text-ink-soft">{c.lead}</p>
        {/* painted scrolls trail the cursor over the intro (desktop flourish) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block" aria-hidden="true">
          <ImageTrail
            items={[
              "/art/conquests-night.jpg",
              "/art/pact-pagoda.jpg",
              "/art/clan-cub.jpg",
              "/art/masters-duo.jpg",
              "/art/hero-panda.jpg",
            ]}
            size={96}
            aspectRatio={0.72}
            lifetime={0.7}
            className="pointer-events-auto h-full w-full"
          />
        </div>
      </div>

      {/* the ride */}
      <div aria-hidden="true" className="mt-8 overflow-hidden">
        <ArtPlate
          name="conquests-charge"
          blend
          className="h-[190px] w-full max-md:h-[140px] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
          position="50% 35%"
        />
      </div>

      {/* the spinning shutter of scrolls — drag, wheel or arrow through, click to open */}
      <div className="mt-6 h-[430px] max-md:h-[330px]">
        <CircularGallery
          items={galleryItems}
          bend={2.6}
          textColor="#1C1915"
          font="700 26px 'Zen Old Mincho', Georgia, serif"
          borderRadius={0.015}
          itemAspect={1.6}
          snap
          openOnClick={false}
          showTitles
          onItemClick={(_item, index) => openProject(projects[index])}
          className="h-full w-full"
        />
      </div>

      {/* the ledger — details on paper */}
      <div className="wrap mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={(e) => openProject(p, e.currentTarget)}
            className="group text-left"
            aria-label={`${c.openLabel}: ${p.title}`}
          >
            <span className="block h-full overflow-hidden rounded-paper border border-ink/12 bg-washi-dim shadow-ink-near transition-transform duration-300 ease-[var(--ease-brush)] group-hover:-translate-y-0.5">
              <span data-cover={p.slug} className="block aspect-[16/10] overflow-hidden">
                {p.cover ? (
                  <picture>
                    <source srcSet={p.cover.replace(/\.jpg$/, ".webp")} type="image/webp" />
                    <img
                      src={p.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-[var(--ease-brush)] group-hover:scale-[1.03] grayscale-[0.25] sepia-[0.12]"
                    />
                  </picture>
                ) : (
                  <span className="block h-full w-full transition-transform duration-500 ease-[var(--ease-brush)] group-hover:scale-[1.03]">
                    <ConceptCover project={p} />
                  </span>
                )}
              </span>
              <span className="block border-t border-ink/10 px-5 py-4">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[1.1rem] font-bold text-ink">{p.title}</span>
                  <span className="font-mono text-meta text-ink-mute tabular-nums">{p.year}</span>
                </span>
                <span className="mt-1 block font-mono text-[0.72rem] text-ink-mute">
                  {p.tags.map((t) => `[${t}]`).join("—")}
                </span>
                <span className="mt-2 block text-[0.9rem] leading-relaxed text-ink-soft">{p.outcome}</span>
                {p.concept && (
                  <span className="mt-2.5 inline-block rounded-paper border border-matcha-deep/40 px-2 py-0.5 font-mono text-[0.6875rem] text-matcha-deep">
                    {c.conceptTag}
                  </span>
                )}
              </span>
            </span>
          </button>
        ))}

        {/* the blank panel */}
        <div className="flex flex-col items-start justify-center gap-4 rounded-paper border border-dashed border-ink/25 px-7 py-8">
          <p className="max-w-[26ch] font-display text-[1.2rem] font-bold leading-snug">
            The next panel of this scroll is blank. On purpose.
          </p>
          <a href="#pact" className="btn btn-ghost text-ink text-[0.9375rem]">
            Put your name on it
          </a>
        </div>
      </div>

      {open && <CasePanel project={open} onClose={close} />}
    </section>
  );
}
