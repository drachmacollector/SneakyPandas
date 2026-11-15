import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";

/** 四 The Way — stub, built out in M4. */
export function Way() {
  const c = copy.way;
  return (
    <section id="way" aria-labelledby="way-title" className="bg-ink py-24 text-washi">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="way-title" tone="ink" />
        <p className="mt-10 max-w-[52ch] text-washi/85">{c.lead}</p>
      </div>
    </section>
  );
}
