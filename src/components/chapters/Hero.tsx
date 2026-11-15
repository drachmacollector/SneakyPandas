import { useEffect, useRef } from "react";
import { gsap, useGSAP, D, E, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";
import { Mountains, Kasumi } from "../../assets/svg/scenery";
import { PandaPeek } from "../../assets/svg/panda";
import { HankoSeal } from "../../assets/svg/seals";

/** 序 Prologue — the scroll unrolls. */
export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const band = () => window.innerHeight * 0.46;

        // initial states live here only — reduced motion sees everything.
        gsap.set("[data-sheet]", { clipPath: "inset(46% 0% 46% 0%)" });
        gsap.set("[data-roller='top']", { y: band });
        gsap.set("[data-roller='bottom']", { y: () => -band() });
        gsap.set("[data-hero-line]", { yPercent: 110 });
        gsap.set("[data-hero-fade]", { opacity: 0, y: 16 });
        gsap.set("[data-hanko]", { opacity: 0, scale: 1.6, rotate: -8 });
        gsap.set("[data-panda]", { yPercent: 62 });
        gsap.set("[data-glyph]", { opacity: 0 });

        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: E.brush } })
          .to("[data-sheet]", { clipPath: "inset(0% 0% 0% 0%)", duration: D.unroll, ease: E.settle })
          .to("[data-roller='top']", { y: 0, duration: D.unroll, ease: E.settle }, "<")
          .to("[data-roller='bottom']", { y: 0, duration: D.unroll, ease: E.settle }, "<")
          .to("[data-hero-line]", { yPercent: 0, duration: D.stroke, stagger: 0.09 }, "-=0.45")
          .to("[data-glyph]", { opacity: 1, duration: D.stroke }, "<")
          .to(
            "[data-hanko]",
            { opacity: 1, scale: 1, rotate: -3, duration: D.slam, ease: E.stampIn },
            "-=0.2",
          )
          .to("[data-hanko]", { scale: 1.06, duration: 0.3, ease: E.stampSettle }, ">-0.05")
          .to("[data-hanko]", { scale: 1, duration: 0.25, ease: "power1.out" }, ">")
          .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.5")
          .to("[data-panda]", { yPercent: 0, duration: 0.8, ease: E.settle }, "-=0.4");

        // scroll scrub: mist drifts, mountains breathe
        const st = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        st.to("[data-mist='a']", { yPercent: -14, xPercent: 6 }, 0)
          .to("[data-mist='b']", { yPercent: -26, xPercent: -8 }, 0)
          .to("[data-depth='near']", { yPercent: 8 }, 0);
      });

      // pupils track the cursor (fine pointers; harmless if skipped)
      mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
        const pupils = root.current?.querySelectorAll("[data-pupils]");
        if (!pupils?.length) return;
        const xs = Array.from(pupils).map((p) => gsap.quickTo(p, "x", { duration: 0.3 }));
        const ys = Array.from(pupils).map((p) => gsap.quickTo(p, "y", { duration: 0.3 }));
        const onMove = (e: PointerEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 12;
          const ny = (e.clientY / window.innerHeight - 0.5) * 8;
          xs.forEach((fn) => fn(nx));
          ys.forEach((fn) => fn(ny));
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
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
      {/* the unrolling sheet */}
      <div data-sheet className="absolute inset-0" style={{ clipPath: "inset(0 0 0 0)" }}>
        {/* landscape, right side */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[40%] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[58%] max-md:opacity-80"
        >
          <Mountains className="absolute bottom-0 right-0 h-[62%] w-full max-md:h-full" />
          <div data-mist="a" className="absolute bottom-[34%] right-[6%] w-[70%]">
            <Kasumi className="w-full opacity-90" />
          </div>
          <div data-mist="b" className="absolute bottom-[18%] right-[28%] w-[58%]">
            <Kasumi flip className="w-full opacity-75" />
          </div>
        </div>

        {/* content */}
        <div className="wrap relative flex min-h-svh flex-col justify-center pb-28 pt-24">
          <div className="relative max-w-[780px]">
            {/* 序 glyph column, part of the lockup */}
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
              {copy.hero.h1.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <span data-hero-line className="block">
                    {i === copy.hero.h1.length - 1 ? (
                      <>
                        {line.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-vermilion">{line.split(" ").at(-1)}</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <div
              data-hanko
              aria-hidden="true"
              className="absolute right-0 -top-8 md:-right-6 md:top-auto md:bottom-[30%] xl:-right-10"
            >
              <HankoSeal className="h-14 w-14 md:h-[76px] md:w-[76px]" />
            </div>

            <p data-hero-fade className="mt-7 max-w-[46ch] text-[1.125rem] leading-relaxed text-ink-soft">
              {copy.hero.sub}
            </p>

            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#pact" className="btn btn-primary">
                {copy.hero.ctaPrimary}
              </a>
              <a href="#clan" className="btn btn-ghost text-ink">
                {copy.hero.ctaGhost}
              </a>
            </div>
          </div>
        </div>

        {/* panda peeking over the bottom roller */}
        <div
          data-panda
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[1.4rem] right-[8%] w-40 md:right-[16%] md:w-52"
        >
          <PandaPeek className="block w-full" />
        </div>

        {/* scroll hint */}
        <p
          data-hero-fade
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 font-mono text-meta text-ink-mute md:block"
        >
          {copy.hero.scrollHint}
        </p>
      </div>

      {/* lacquer rollers */}
      <div
        data-roller="top"
        aria-hidden="true"
        className="absolute left-[-2%] top-0 z-10 h-6 w-[104%] rounded-full bg-gradient-to-b from-ink-raise to-ink shadow-ink-near"
      >
        <span className="absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gold" />
        <span className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gold" />
      </div>
      <div
        data-roller="bottom"
        aria-hidden="true"
        className="absolute bottom-0 left-[-2%] z-10 h-6 w-[104%] rounded-full bg-gradient-to-t from-ink-raise to-ink shadow-ink-near"
      >
        <span className="absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gold" />
        <span className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-gold" />
      </div>
    </section>
  );
}
