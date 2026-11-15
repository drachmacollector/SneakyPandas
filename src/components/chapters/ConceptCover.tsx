import type { Project } from "../../data/projects";

const accents: Record<Project["accent"], string> = {
  vermilion: "#C73E2D",
  gold: "#B08D45",
  matcha: "#6F7D5C",
  ink: "#3A352E",
};

/**
 * Honest typographic cover for concept projects — a composition, not a fake
 * product shot: sun disc, seigaiha strip, oversized initial.
 */
export function ConceptCover({ project, className = "" }: { project: Project; className?: string }) {
  const accent = accents[project.accent];
  return (
    <div className={`relative h-full w-full overflow-hidden bg-washi-dim ${className}`} aria-hidden="true">
      {/* sun disc */}
      <span
        className="absolute -right-10 -top-14 h-44 w-44 rounded-full opacity-[0.55]"
        style={{ background: accent }}
      />
      {/* seigaiha strip */}
      <svg className="absolute inset-x-0 bottom-0 h-16 w-full" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#seigaiha)" />
      </svg>
      {/* oversized initial */}
      <span className="absolute -bottom-7 left-3 select-none font-display text-[7.5rem] font-black leading-none text-ink/12">
        {project.title.charAt(0)}
      </span>
      {/* client mark */}
      <span className="absolute left-4 top-4 font-mono text-[0.6875rem] tracking-[0.18em] text-ink-mute uppercase">
        {project.client.split("·")[0]?.trim()}
      </span>
    </div>
  );
}
