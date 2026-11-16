import { useRef } from "react";
import { gsap, useGSAP, E, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";

/** 四 The Way — five stones down the path, the line drawing itself with the scroll. */
export function Way() {
  const root = useRef<HTMLElement>(null);
  const c = copy.way;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-path-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-steps]",
              start: "top 70%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-stone]").forEach((el) => {
          gsap.from(el, {
            x: -24,
            opacity: 0,
            duration: 0.5,
            ease: E.brush,
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="way" aria-labelledby="way-title" className="bg-ink py-28 text-washi max-md:py-20">
      <div className="wrap grid items-start gap-14 lg:grid-cols-[1fr_340px]">
        <div>
          <ChapterHead kanji={c.kanji} title={c.chapter} id="way-title" tone="ink" />
          <p className="mt-8 max-w-[52ch] text-washi/85">{c.lead}</p>
          <div data-steps className="relative mt-14">
            {/* the path draws itself */}
            <span aria-hidden="true" className="absolute bottom-2 left-[13px] top-2 w-px bg-washi/15" />
            <span
              data-path-line
              aria-hidden="true"
              className="absolute bottom-2 left-[12.5px] top-2 w-[2px] origin-top bg-gold/70"
              style={{ transform: "scaleY(0)" }}
            />
            <ol className="space-y-10">
              {c.steps.map((s, i) => (
                <li key={s.title} data-stone className="relative flex gap-6 pl-10">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0.5 grid h-7 w-7 place-items-center rounded-full border border-gold/50 bg-ink font-mono text-[0.75rem] text-gold tabular-nums"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.15rem] font-bold">
                      {s.title}
                      {"kanji" in s && s.kanji ? (
                        <span aria-hidden="true" className="ml-3 font-brush text-[1rem] text-gold">
                          {s.kanji}
                        </span>
                      ) : null}
                    </h3>
                    <p className="mt-1.5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-washi/70">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <ArtPlate
          name="way-path"
          alt=""
          framed
          className="sticky top-24 hidden aspect-[736/1104] lg:block"
        />
      </div>
    </section>
  );
}
