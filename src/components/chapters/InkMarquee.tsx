import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";

/** Velocity-reactive services marquee between The Arts and The Conquests. */
export function InkMarquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current?.querySelector<HTMLElement>("[data-track]");
        if (!track) return;

        const loop = gsap.to(track, { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power2.out" });

        const st = ScrollTrigger.create({
          onUpdate(self) {
            const v = self.getVelocity();
            skewTo(gsap.utils.clamp(-4, 4, v / 400));
            loop.timeScale(gsap.utils.clamp(0.6, 3, 1 + Math.abs(v) / 1500));
          },
        });
        return () => {
          st.kill();
          loop.kill();
        };
      });
    },
    { scope: root },
  );

  const items = copy.marquee;
  const run = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold uppercase tracking-tight text-ink/80">
            {w}
          </span>
          <span aria-hidden="true" className="font-brush text-[1.2rem] text-vermilion">
            技
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="overflow-hidden border-y border-ink/10 bg-washi py-5 motion-reduce:hidden"
    >
      <div data-track className="flex w-max will-change-transform">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
