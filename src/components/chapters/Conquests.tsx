import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";

/** 三 The Conquests — stub + the cavalry ride; full horizontal scroll lands in M3. */
export function Conquests() {
  const c = copy.conquests;
  return (
    <section id="conquests" aria-labelledby="conquests-title" className="bg-washi pb-28 pt-36 max-md:pb-20 max-md:pt-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="conquests-title" />
        <p className="mt-8 max-w-[52ch] text-ink-soft">{c.lead}</p>
      </div>
      {/* the ride — full-bleed ink cavalry under the heading */}
      <div aria-hidden="true" className="mt-12 overflow-hidden">
        <ArtPlate
          name="conquests-charge"
          blend
          className="h-[300px] w-full max-md:h-[200px] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
          position="50% 35%"
        />
      </div>
    </section>
  );
}
