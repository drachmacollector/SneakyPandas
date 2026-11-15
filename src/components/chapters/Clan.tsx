import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";

/** 一 The Clan — stub, built out in M2. */
export function Clan() {
  const c = copy.clan;
  return (
    <section id="clan" aria-labelledby="clan-title" className="bg-washi py-36 max-md:py-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="clan-title" />
        <p className="mt-10 max-w-[52ch] font-display text-title font-bold">{c.lead}</p>
        <p className="mt-6 max-w-[62ch] text-ink-soft">{c.body}</p>
      </div>
    </section>
  );
}
