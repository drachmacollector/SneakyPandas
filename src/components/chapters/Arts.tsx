import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";

/** 二 The Arts — stub, built out in M2. */
export function Arts() {
  const c = copy.arts;
  return (
    <section id="arts" aria-labelledby="arts-title" className="bg-washi-dim py-36 max-md:py-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="arts-title" />
        <p className="mt-10 max-w-[52ch] font-display text-title font-bold">{c.lead}</p>
      </div>
    </section>
  );
}
