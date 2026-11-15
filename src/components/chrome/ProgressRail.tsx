import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, REDUCED } from "../motion/gsap";
import { chapters, type ChapterId } from "../../config/site";

/**
 * Desktop-only chapter rail: kanji anchors down the right edge,
 * a brush line filling with scroll, current chapter in vermilion.
 */
export function ProgressRail() {
  const line = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ChapterId>("hero");

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED).matches;
    const triggers: ScrollTrigger[] = [];

    if (!reduced && line.current) {
      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          onUpdate: (self) => {
            gsap.set(line.current, { scaleY: self.progress });
          },
        }),
      );
    }

    for (const c of chapters) {
      const el = document.getElementById(c.id);
      if (!el) continue;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(c.id),
        }),
      );
    }
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <nav
      aria-label="Chapter progress"
      className="fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/15" aria-hidden="true" />
        <div
          ref={line}
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-[2px] origin-top -translate-x-1/2 bg-vermilion-deep"
          style={{ transform: "translateX(-50%) scaleY(0)" }}
        />
        {chapters.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={c.title}
            aria-current={active === c.id ? "true" : undefined}
            className={`relative z-10 grid h-9 w-9 place-items-center rounded-full border bg-washi font-brush text-[0.95rem] leading-none transition-colors duration-300 ${
              active === c.id
                ? "border-vermilion-deep text-vermilion-deep"
                : "border-ink/20 text-ink-mute hover:text-ink"
            }`}
          >
            <span aria-hidden="true">{c.kanji}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
