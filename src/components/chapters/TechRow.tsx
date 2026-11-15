import {
  siReact,
  siTypescript,
  siVite,
  siTailwindcss,
  siGreensock,
  siNodedotjs,
} from "simple-icons";
import { copy } from "../../data/copy";

const icons = [siReact, siTypescript, siVite, siTailwindcss, siGreensock, siNodedotjs];

/** Real stack logos (official simple-icons paths), set in ink, slow marquee. */
export function TechRow() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14"
    >
      {icons.map((icon) => (
        <li key={icon.slug} className="flex items-center gap-3 text-ink/60">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d={icon.path} />
          </svg>
          <span className="font-mono text-meta">{icon.title}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex items-center gap-8">
      <span className="shrink-0 font-mono text-meta tracking-[0.18em] text-ink-mute uppercase">
        {copy.arts.stackLabel}
      </span>
      <div
        className="group relative flex-1 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-[tech-marquee_28s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
