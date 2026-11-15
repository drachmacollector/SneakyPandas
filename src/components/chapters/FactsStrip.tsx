import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../motion/gsap";
import { facts } from "../../config/site";

/** Honest field-guide stat blocks; numerals count up once on enter. */
export function FactsStrip() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const nums = root.current?.querySelectorAll<HTMLElement>("[data-count]");
        nums?.forEach((el) => {
          const target = el.dataset.count ?? "0";
          const numeric = parseInt(target, 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: numeric,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate() {
              el.textContent = String(Math.round(obj.v)).padStart(2, "0") + (target.endsWith("+") ? "+" : "");
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid grid-cols-2 gap-px bg-ink/15 md:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label} className="bg-washi px-5 py-6">
          <span
            data-count={f.value}
            className="block font-mono text-[2rem] font-medium leading-none text-ink tabular-nums"
          >
            {f.value}
          </span>
          <span className="mt-2 block text-meta text-ink-mute">{f.label}</span>
        </div>
      ))}
    </div>
  );
}
