import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";

/** 五 The Masters — stub, built out in M4. */
export function Masters() {
  const c = copy.masters;
  return (
    <section id="masters" aria-labelledby="masters-title" className="bg-washi py-36 max-md:py-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="masters-title" />
        <p className="mt-10 max-w-[52ch] text-ink-soft">{c.lead}</p>
      </div>
    </section>
  );
}
