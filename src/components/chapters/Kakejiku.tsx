import type { ReactNode } from "react";
import { ServiceMotif } from "../../assets/svg/scenery";
import { BrushUnderline } from "../../assets/svg/seals";

/**
 * A hanging-scroll (kakejiku) service card: lacquer rod on top, washi body.
 * Unroll animation is driven by the parent (targets [data-kakejiku]).
 */
export function Kakejiku({
  title,
  line,
  items,
  motif,
}: {
  title: string;
  line: string;
  items: readonly string[];
  motif: "web" | "lantern" | "coin" | "wave";
  children?: ReactNode;
}) {
  return (
    <article data-kakejiku className="group">
      {/* rod */}
      <div
        data-rod
        aria-hidden="true"
        className="mx-[-6px] h-2.5 rounded-full bg-gradient-to-b from-ink-raise to-ink shadow-ink-near"
      />
      {/* sheet */}
      <div data-sheet className="border-x border-b border-ink/10 bg-washi px-7 pb-8 pt-7 shadow-ink-near">
        <ServiceMotif kind={motif} aria-hidden="true" className="h-11 w-11 text-ink" />
        <h3 className="mt-5 font-serif text-[1.35rem] font-bold leading-tight text-ink">
          {title}
          <BrushUnderline className="mt-1 block h-[7px] w-36 text-vermilion [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1] [&_path]:[transition:stroke-dashoffset_0.35s_var(--ease-brush)] group-hover:[&_path]:[stroke-dashoffset:0]" />
        </h3>
        <p className="mt-3 text-[0.9875rem] leading-relaxed text-ink-soft">{line}</p>
        <ul className="mt-5 space-y-1.5 border-t border-ink/10 pt-4">
          {items.map((it) => (
            <li key={it} className="font-mono text-meta text-ink-mute">
              <span aria-hidden="true" className="mr-2 text-vermilion">
                —
              </span>
              {it}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
