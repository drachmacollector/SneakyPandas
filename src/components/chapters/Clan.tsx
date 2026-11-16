import { useRef } from "react";
import { gsap, useGSAP, D, E, MOTION_OK, DrawSVGPlugin } from "../motion/gsap";
import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { BrushStroke, PawPrint } from "../../assets/svg/seals";
import { ArtPlate } from "../art/ArtPlate";

void DrawSVGPlugin; // registered in motion/gsap

/** 一 The Clan — who we are, told tight. */
export function Clan() {
  const root = useRef<HTMLElement>(null);
  const c = copy.clan;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-lead]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: E.brush,
            scrollTrigger: { trigger: "[data-lead]", start: "top 70%", once: true },
          },
        );
        gsap.from("[data-divider] [data-stroke]", {
          drawSVG: "0%",
          duration: D.stroke,
          ease: E.brush,
          scrollTrigger: { trigger: "[data-divider]", start: "top 92%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="clan" aria-labelledby="clan-title" className="relative bg-washi pb-14 pt-24 max-md:pb-10 max-md:pt-16">
      <span aria-hidden="true" className="tategaki absolute left-6 top-28 hidden text-[1.3rem] text-ink/25 2xl:block">
        墨
      </span>

      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <ChapterHead kanji={c.kanji} title={c.chapter} id="clan-title" />
            <p data-lead className="mt-8 max-w-[26ch] font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-[1.35]">
              {c.lead}
            </p>
            <p className="mt-6 max-w-[62ch] text-ink-soft">{c.body}</p>
            <p className="mt-6 flex max-w-[52ch] items-start gap-3 font-medium text-ink">
              <PawPrint className="mt-1 h-5 w-5 shrink-0" />
              <span>{c.joke}</span>
            </p>
          </div>

          {/* the cub hangs in from the top edge, mid-sneak */}
          <div aria-hidden="true" className="relative mx-auto w-60 max-lg:hidden lg:-mt-20">
            <ArtPlate name="clan-cub" blend vignette className="aspect-[706/1000] w-full" />
          </div>
        </div>
      </div>

      <div data-divider aria-hidden="true" className="wrap mt-10 text-ink/40">
        <BrushStroke className="h-3.5 w-72 max-w-full" />
      </div>
    </section>
  );
}
