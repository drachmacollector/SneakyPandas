import { useEffect, useRef } from "react";
import { gsap, useGSAP, D, E, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";
import { HankoSeal } from "../../assets/svg/seals";
import { ArtPlate } from "../art/ArtPlate";
import { PetalField } from "../art/PetalField";
import { BloomingBranches } from "../art/BloomingBranches";

/**
 * 序 Prologue — the scroll unrolls onto a sumi-e painting.
 * The panda painting sits INSIDE the headline stack (lines 1–2 behind it,
 * line 3 in front), with vermilion petals and gold flecks drifting over it.
 */
export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const band = () => window.innerHeight * 0.46;

        gsap.set("[data-sheet]", { clipPath: "inset(46% 0% 46% 0%)" });
        gsap.set("[data-roller='top']", { y: band });
        gsap.set("[data-roller='bottom']", { y: () => -band() });
        gsap.set("[data-hero-line]", { yPercent: 112 });
        gsap.set("[data-hero-fade]", { opacity: 0, y: 16 });
        gsap.set("[data-hanko]", { opacity: 0, scale: 1.6, rotate: -8 });
        gsap.set("[data-art]", { opacity: 0, y: 36 });
        gsap.set("[data-glyph]", { opacity: 0 });

        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: E.brush } })
          .to("[data-sheet]", { clipPath: "inset(0% 0% 0% 0%)", duration: D.unroll, ease: E.settle })
          .to("[data-roller='top']", { y: 0, duration: D.unroll, ease: E.settle }, "<")
          .to("[data-roller='bottom']", { y: 0, duration: D.unroll, ease: E.settle }, "<")
          .to("[data-art]", { opacity: 1, y: 0, duration: 1.0, ease: E.settle }, "-=0.55")
          .to("[data-hero-line]", { yPercent: 0, duration: D.stroke, stagger: 0.09 }, "-=0.7")
          .to("[data-glyph]", { opacity: 1, duration: D.stroke }, "<")
          .to(
            "[data-hanko]",
            { opacity: 1, scale: 1, rotate: -3, duration: D.slam, ease: E.stampIn },
            "-=0.2",
          )
          .to("[data-hanko]", { scale: 1.06, duration: 0.3, ease: E.stampSettle }, ">-0.05")
          .to("[data-hanko]", { scale: 1, duration: 0.25, ease: "power1.out" }, ">")
          .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.5");

        // gentle scroll parallax on the painting
        gsap.to("[data-art]", {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (start) tl.current?.play();
  }, [start]);

  return (
    <section
      ref={root}
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-washi"
    >
      <div data-sheet className="absolute inset-0" style={{ clipPath: "inset(0 0 0 0)" }}>
        {/* plum boughs grow in and bloom across the whole sheet */}
        <BloomingBranches start={start} className="absolute inset-0 z-[6] h-full w-full" />

        {/* the painting — between headline layers */}
        <div
          data-art
          className="absolute bottom-[-4%] right-[-6%] z-20 w-[min(62vw,350px)] md:right-[2%] md:w-[min(42vw,510px)] lg:right-[4%]"
        >
          <ArtPlate
            name="hero-panda"
            alt=""
            eager
            blend
            vignette
            className="aspect-[556/716] w-full"
          />
        </div>

        {/* petals drift above the painting, below the front line of type */}
        <PetalField className="absolute inset-0 z-[25]" />

        {/* content */}
        <div className="wrap relative flex min-h-svh flex-col justify-center pb-24 pt-24">
          <div className="relative max-w-[880px]">
            <div
              data-glyph
              aria-hidden="true"
              className="absolute -left-24 top-2 hidden w-10 select-none flex-col items-center gap-4 xl:flex"
            >
              <span className="font-brush text-[2.5rem] leading-none text-vermilion">
                {copy.hero.kanji}
              </span>
              <span className="h-16 w-px bg-ink/20" />
              <span className="font-mono text-[0.625rem] tracking-[0.3em] text-ink-mute [writing-mode:vertical-rl]">
                {copy.hero.chapter.toUpperCase()}
              </span>
            </div>

            <h1 id="hero-title" className="font-display font-black text-display-1 text-ink">
              {copy.hero.h1.map((line, i) => {
                const front = i === copy.hero.h1.length - 1;
                return (
                  <span
                    key={i}
                    className={`relative block overflow-hidden pb-[0.08em] -mb-[0.08em] ${
                      front ? "z-30" : "z-10"
                    }`}
                  >
                    <span data-hero-line className="block">
                      {front ? (
                        <>
                          {line.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="text-vermilion">{line.split(" ").at(-1)}</span>
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  </span>
                );
              })}
            </h1>

            <div data-hanko aria-hidden="true" className="absolute right-0 -top-8 z-30 md:-right-2 md:top-auto md:bottom-[26%]">
              <HankoSeal className="h-14 w-14 md:h-[72px] md:w-[72px]" />
            </div>

            <p
              data-hero-fade
              className="relative z-30 mt-7 max-w-[44ch] text-[1.125rem] leading-relaxed text-ink-soft"
            >
              {copy.hero.sub}
            </p>

            <div data-hero-fade className="relative z-30 mt-10 flex flex-wrap items-center gap-4">
              <a href="#pact" className="btn btn-primary">
                {copy.hero.ctaPrimary}
              </a>
              <a href="#clan" className="btn btn-ghost text-ink">
                {copy.hero.ctaGhost}
              </a>
            </div>
          </div>
        </div>

        <p
          data-hero-fade
          className="absolute bottom-10 left-1/2 z-30 hidden -translate-x-1/2 font-mono text-meta text-ink-mute md:block"
        >
          {copy.hero.scrollHint}
        </p>
      </div>

      {/* lacquer rollers */}
      <div
        data-roller="top"
        aria-hidden="true"
        className="absolute left-[-2%] top-0 z-40 h-6 w-[104%] rounded-full bg-gradient-to-b from-ink-raise to-ink shadow-ink-near"
      />
      <div
        data-roller="bottom"
        aria-hidden="true"
        className="absolute bottom-0 left-[-2%] z-40 h-6 w-[104%] rounded-full bg-gradient-to-t from-ink-raise to-ink shadow-ink-near"
      />
    </section>
  );
}
