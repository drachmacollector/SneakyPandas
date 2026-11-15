import { copy } from "../../data/copy";
import { ChapterHead } from "./ChapterHead";
import { mailto } from "../../config/site";

/** 終 Seal the Pact — stub, built out in M5. */
export function Pact() {
  const c = copy.pact;
  return (
    <section id="pact" aria-labelledby="pact-title" className="bg-ink py-24 text-washi">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="pact-title" tone="ink" />
        <p className="mt-10 max-w-[52ch] text-washi/85">{c.lead}</p>
        <a href={mailto()} className="btn btn-primary mt-10">
          {c.stampCta}
        </a>
      </div>
    </section>
  );
}
