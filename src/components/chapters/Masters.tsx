import { copy } from "../../data/copy";
import { founders } from "../../config/site";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";

/** 五 The Masters — stub + the duo painting; full plates land in M4. */
export function Masters() {
  const c = copy.masters;
  return (
    <section id="masters" aria-labelledby="masters-title" className="bg-washi py-36 max-md:py-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="masters-title" />
        <p className="mt-8 max-w-[52ch] text-ink-soft">{c.lead}</p>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_380px_1fr]">
          {founders.map((f, i) => (
            <div key={f.id} className={i === 1 ? "lg:order-3" : ""}>
              <h3 className="font-display text-title font-bold">{f.name}</h3>
              <p className="mt-1 font-display text-[1.05rem] font-bold text-vermilion-deep">{f.role}</p>
              <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">{f.bio}</p>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-draw mt-5 inline-block font-mono text-meta text-vermilion-deep"
              >
                {c.linkedinLabel} ↗
              </a>
            </div>
          ))}
          {/* the clan, as painted */}
          <ArtPlate
            name="masters-duo"
            alt="Ink painting of two pandas under a pine tree"
            blend
            vignette
            className="order-2 mx-auto w-full max-w-[380px] aspect-[736/1159]"
          />
        </div>
      </div>
    </section>
  );
}
