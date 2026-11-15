import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";
import { projects, type Project } from "../../data/projects";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";
import { ConceptCover } from "./ConceptCover";
import { CasePanel } from "./CasePanel";
import { Kasumi } from "../../assets/svg/scenery";
import ImageTrail from "../vendor/ImageTrail";

/** 三 The Conquests — a pinned emakimono of work, unrolling sideways. */
export function Conquests() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const c = copy.conquests;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const pinwrap = root.current?.querySelector<HTMLElement>("[data-pinwrap]");
        const track = root.current?.querySelector<HTMLElement>("[data-track]");
        if (!pinwrap || !track) return;

        const distance = () => track.scrollWidth - pinwrap.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinwrap,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        // mist drifts slower than the track (depth)
        gsap.to("[data-conq-mist='a']", {
          x: () => -distance() * 0.35,
          ease: "none",
          scrollTrigger: { trigger: pinwrap, start: "top top", end: () => `+=${distance()}`, scrub: 1 },
        });
        gsap.to("[data-conq-mist='b']", {
          x: () => -distance() * 0.6,
          ease: "none",
          scrollTrigger: { trigger: pinwrap, start: "top top", end: () => `+=${distance()}`, scrub: 1 },
        });
      });
    },
    { scope: root },
  );

  const openProject = (p: Project, el: HTMLElement) => {
    openerRef.current = el;
    setOpen(p);
  };
  const close = () => {
    setOpen(null);
    openerRef.current?.focus();
    ScrollTrigger.refresh();
  };

  return (
    <section ref={root} id="conquests" aria-labelledby="conquests-title" className="bg-washi pt-36 max-md:pt-24">
      <div className="wrap relative">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="conquests-title" />
        <p className="mt-8 max-w-[52ch] text-ink-soft">{c.lead}</p>
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
      <div aria-hidden="true" className="mt-12 overflow-hidden">
        <ArtPlate
          name="conquests-charge"
          blend
          className="h-[260px] w-full max-md:h-[180px] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
          position="50% 35%"
        />
      </div>

      {/* pinned emakimono */}
      <div data-pinwrap className="relative lg:h-svh lg:overflow-hidden">
        {/* drifting mist, desktop only */}
        <div data-conq-mist="a" aria-hidden="true" className="absolute left-[60%] top-[12%] hidden w-[480px] opacity-70 lg:block">
          <Kasumi className="w-full" />
        </div>
        <div data-conq-mist="b" aria-hidden="true" className="absolute left-[120%] top-[64%] hidden w-[560px] opacity-60 lg:block">
          <Kasumi flip className="w-full" />
        </div>

        <div
          data-track
          className="wrap flex flex-col gap-10 py-16 will-change-transform lg:h-svh lg:w-max lg:max-w-none lg:flex-row lg:items-center lg:gap-12 lg:px-[6vw] lg:py-0 lg:pr-[12vw]"
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={(e) => openProject(p, e.currentTarget)}
              className={`group w-full text-left lg:w-[420px] lg:shrink-0 ${i % 2 === 1 ? "lg:translate-y-8" : "lg:-translate-y-4"}`}
              aria-label={`${c.openLabel}: ${p.title}`}
            >
              <span className="block overflow-hidden rounded-paper border border-ink/12 bg-washi-dim shadow-ink-near transition-transform duration-300 ease-[var(--ease-brush)] group-hover:-translate-y-0.5">
                <span className="block aspect-[16/10] overflow-hidden">
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
                <span className="block border-t border-ink/10 px-6 py-5">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-[1.2rem] font-bold text-ink">{p.title}</span>
                    <span className="font-mono text-meta text-ink-mute tabular-nums">{p.year}</span>
                  </span>
                  <span className="mt-1.5 block font-mono text-[0.75rem] text-ink-mute">
                    {p.tags.map((t) => `[${t}]`).join("—")}
                  </span>
                  <span className="mt-3 block text-[0.9375rem] leading-relaxed text-ink-soft">
                    {p.outcome}
                  </span>
                  {p.concept && (
                    <span className="mt-3 inline-block rounded-paper border border-matcha-deep/40 px-2 py-0.5 font-mono text-[0.6875rem] text-matcha-deep">
                      {c.conceptTag}
                    </span>
                  )}
                </span>
              </span>
            </button>
          ))}

          {/* end of the scroll: the night watch + your slot */}
          <div className="flex w-full flex-col items-start justify-center gap-6 lg:w-[380px] lg:shrink-0">
            <ArtPlate
              name="conquests-night"
              alt=""
              blend
              vignette
              className="aspect-[707/950] w-56 max-lg:hidden"
            />
            <p className="max-w-[30ch] font-display text-[1.3rem] font-bold leading-snug">
              The next panel of this scroll is blank. On purpose.
            </p>
            <a href="#pact" className="btn btn-ghost text-ink">
              Put your name on it
            </a>
          </div>
        </div>
      </div>

      {open && <CasePanel project={open} onClose={close} />}
    </section>
  );
}
