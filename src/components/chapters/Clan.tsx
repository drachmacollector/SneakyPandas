import { useRef } from "react";
import { gsap, useGSAP, D, E, MOTION_OK, DrawSVGPlugin } from "../motion/gsap";
import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { FactsStrip } from "./FactsStrip";
import { BrushStroke, PawPrint } from "../../assets/svg/seals";
import { ArtPlate } from "../art/ArtPlate";

void DrawSVGPlugin; // registered in motion/gsap

/** 一 The Clan — who we are; the panda paints the confession in. */
export function Clan() {
  const root = useRef<HTMLElement>(null);
  const c = copy.clan;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // C1: the lead sweeps in like a brush pass
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
        // C2: the section divider draws itself
        gsap.from("[data-divider] [data-stroke]", {
          drawSVG: "0%",
          duration: D.stroke,
          ease: E.brush,
          scrollTrigger: { trigger: "[data-divider]", start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="clan" aria-labelledby="clan-title" className="relative bg-washi pb-28 pt-36 max-md:pb-20 max-md:pt-24">
      {/* 墨 margin strip */}
      <span aria-hidden="true" className="tategaki absolute left-6 top-40 hidden text-[1.3rem] text-ink/25 2xl:block">
        墨
      </span>

      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="clan-title" />

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[1fr_360px] lg:gap-20">
          <div>
            <p data-lead className="max-w-[24ch] font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.35]">
              {c.lead}
            </p>
            <p className="mt-8 max-w-[62ch] text-ink-soft">{c.body}</p>
            <p className="mt-8 flex max-w-[52ch] items-start gap-3 font-medium text-ink">
              <PawPrint className="mt-1 h-5 w-5 shrink-0" />
              <span>{c.joke}</span>
            </p>
          </div>

          {/* the cub hangs in from the top of the section, mid-sneak */}
          <div aria-hidden="true" className="relative mx-auto w-72 max-lg:order-first max-lg:w-56 lg:-mt-24">
            <ArtPlate name="clan-cub" blend vignette className="aspect-[706/1000] w-full" />
          </div>
        </div>

        <div className="mt-20">
          <FactsStrip />
        </div>
      </div>

      {/* divider stroke */}
      <div data-divider aria-hidden="true" className="wrap mt-20 text-ink/40 max-md:mt-14">
        <BrushStroke className="h-3.5 w-72 max-w-full" />
      </div>
    </section>
  );
}
