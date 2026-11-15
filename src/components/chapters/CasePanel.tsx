import { useEffect, useRef } from "react";
import { gsap, E, REDUCED } from "../motion/gsap";
import type { Project } from "../../data/projects";
import { copy } from "../../data/copy";
import { ConceptCover } from "./ConceptCover";

/** In-page case study panel. ESC or the overlay closes it. */
export function CasePanel({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const c = copy.conquests;

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED).matches;
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus();
    if (!reduced) {
      gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
      gsap.fromTo(
        panel.current,
        { y: 48, opacity: 0, clipPath: "inset(0 0 14% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: E.settle },
      );
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[85] flex items-center justify-center bg-ink/70 p-4 md:p-8"
      onClick={(e) => e.target === overlay.current && onClose()}
      role="presentation"
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        tabIndex={-1}
        data-lenis-prevent
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-paper bg-washi shadow-ink outline-none"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink/10">
          {project.cover ? (
            <picture>
              <source srcSet={project.cover.replace(/\.jpg$/, ".webp")} type="image/webp" />
              <img
                src={project.cover}
                alt={`Screenshot of ${project.title}`}
                className="h-full w-full object-cover object-top"
              />
            </picture>
          ) : (
            <ConceptCover project={project} />
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-paper bg-ink/80 px-3.5 py-2 font-mono text-meta text-washi transition-colors hover:bg-vermilion-deep"
          >
            {c.closeLabel} · esc
          </button>
        </div>

        <div className="p-7 md:p-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="font-display text-[1.6rem] font-bold">{project.title}</h3>
            <span className="font-mono text-meta text-ink-mute">{project.year}</span>
            {project.concept && (
              <span className="rounded-paper border border-matcha-deep/40 px-2 py-0.5 font-mono text-[0.6875rem] text-matcha-deep">
                {c.conceptTag}
              </span>
            )}
          </div>
          <p className="mt-1 font-mono text-meta text-ink-mute">{project.client}</p>
          <p className="mt-5 max-w-[62ch] text-[0.9875rem] leading-relaxed text-ink-soft">
            {project.description}
          </p>
          <p className="mt-5 font-mono text-meta text-ink-mute">
            {project.tags.map((t) => `[${t}]`).join("—")}
            <span className="mx-3 text-ink/30">·</span>
            {project.stack.join(" / ")}
          </p>
          {!project.concept && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-8 text-[0.9375rem]"
            >
              {c.visitLabel} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
