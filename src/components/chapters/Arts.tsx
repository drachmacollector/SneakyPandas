import { useRef } from "react";
import { gsap, useGSAP, E, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { Kakejiku } from "./Kakejiku";
import { TechRow } from "./TechRow";
import { PricingBand } from "./PricingBand";
import { InkMarquee } from "./InkMarquee";
import { ArtPlate } from "../art/ArtPlate";

/** 二 The Arts — four hanging scrolls, the stack, and what a pact costs. */
export function Arts() {
  const root = useRef<HTMLElement>(null);
  const c = copy.arts;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // A1: kakejiku unroll, staggered as they enter
        const cards = gsap.utils.toArray<HTMLElement>("[data-kakejiku]");
        cards.forEach((card, i) => {
          const sheet = card.querySelector("[data-sheet]");
          const rod = card.querySelector("[data-rod]");
          gsap.set(sheet, { clipPath: "inset(0 0 100% 0)" });
          gsap.set(rod, { scaleX: 0.6, transformOrigin: "50% 50%" });
          gsap
            .timeline({
              scrollTrigger: { trigger: card, start: "top 78%", once: true },
              delay: (i % 2) * 0.14,
            })
            .to(rod, { scaleX: 1, duration: 0.5, ease: E.settle })
            .to(sheet, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: E.settle }, "-=0.25");
        });
        // A3: pricing tiers rise
        gsap.from("[data-tier]", {
          y: 32,
          opacity: 0,
          duration: 0.6,
          ease: E.brush,
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-pricing]", start: "top 75%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="arts" aria-labelledby="arts-title" className="relative bg-washi-dim pt-32 max-md:pt-20">
      <span aria-hidden="true" className="tategaki absolute right-8 top-36 hidden text-[1.3rem] text-ink/25 2xl:block">
        竹
      </span>

      <div className="wrap">
        <div className="grid items-start gap-16 xl:grid-cols-[1fr_300px]">
          <div>
            <ChapterHead kanji={c.kanji} title={c.chapter} id="arts-title" />
            <p className="mt-8 max-w-[44ch] font-serif text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-snug">
              {c.lead}
            </p>

            <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {c.services.map((s, i) => (
                <div key={s.title} className={i % 2 === 1 ? "md:mt-14" : ""}>
                  <Kakejiku title={s.title} line={s.line} items={s.items} motif={s.motif} />
                </div>
              ))}
            </div>
          </div>

          {/* red-leaf bamboo panda, hung like a scroll beside the arts */}
          <div aria-hidden="true" className="sticky top-24 hidden xl:block">
            <div className="mx-[-5px] h-2.5 rounded-full bg-gradient-to-b from-ink-raise to-ink shadow-ink-near" />
            <ArtPlate name="arts-bamboo" blend className="aspect-[350/624] w-full" />
          </div>
        </div>

        <div className="mt-20">
          <TechRow />
        </div>
      </div>

      <PricingBand />
      <InkMarquee />
    </section>
  );
}
