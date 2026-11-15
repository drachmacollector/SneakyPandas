import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { mailto } from "../../config/site";
import { ArtPlate } from "../art/ArtPlate";

/** 終 Seal the Pact — stub + the pagoda woodblock; stamp ritual lands in M5. */
export function Pact() {
  const c = copy.pact;
  return (
    <section id="pact" aria-labelledby="pact-title" className="bg-ink py-28 text-washi max-md:py-20">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_320px]">
        <div>
          <ChapterHead kanji={c.kanji} title={c.chapter} id="pact-title" tone="ink" />
          <p className="mt-8 max-w-[52ch] text-washi/85">{c.lead}</p>
          <a href={mailto()} className="btn btn-primary mt-10">
            {c.stampCta}
          </a>
        </div>
        <ArtPlate name="pact-pagoda" alt="" framed className="hidden aspect-[714/948] lg:block" />
      </div>
    </section>
  );
}
