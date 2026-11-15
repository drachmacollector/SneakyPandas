import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";

/** 四 The Way — stub + the mounted path painting; full path build lands in M4. */
export function Way() {
  const c = copy.way;
  return (
    <section id="way" aria-labelledby="way-title" className="bg-ink py-28 text-washi max-md:py-20">
      <div className="wrap grid items-start gap-14 lg:grid-cols-[1fr_340px]">
        <div>
          <ChapterHead kanji={c.kanji} title={c.chapter} id="way-title" tone="ink" />
          <p className="mt-8 max-w-[52ch] text-washi/85">{c.lead}</p>
          <ol className="mt-12 space-y-8">
            {c.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span aria-hidden="true" className="font-mono text-[1.1rem] text-gold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.15rem] font-bold">
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
