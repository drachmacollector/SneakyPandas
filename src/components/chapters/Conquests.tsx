import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";

/** 三 The Conquests — stub, built out in M3. */
export function Conquests() {
  const c = copy.conquests;
  return (
    <section id="conquests" aria-labelledby="conquests-title" className="bg-washi py-36 max-md:py-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="conquests-title" />
        <p className="mt-10 max-w-[52ch] text-ink-soft">{c.lead}</p>
      </div>
    </section>
  );
}
