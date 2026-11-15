import { useEffect, useRef, useState } from "react";
import { gsap, E, REDUCED } from "../motion/gsap";
import { pandaLoaderFrames } from "../../data/ascii";
import { copy } from "../../data/copy";

const SEEN_KEY = "sp-seen";

export function preloaderSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Washi loading screen: ASCII panda grinds ink while a brush bar fills.
 * Hard cap 1.8s; any key/click skips; session repeat skips entirely.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED).matches;
    const total = reduced ? 400 : 1600;
    const start = performance.now();

    const finish = () => {
      if (done.current) return;
      done.current = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* private mode */
      }
      gsap.to(root.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduced ? 0 : 0.5,
        ease: E.settle,
        onComplete: onDone,
      });
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      setPct(Math.round(t * 100));
      setFrame(Math.min(pandaLoaderFrames.length - 1, Math.floor(t * pandaLoaderFrames.length)));
      if (t >= 1) finish();
      else if (!done.current) raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-washi"
      style={{ clipPath: "inset(0)" }}
      role="status"
      aria-label="Loading"
    >
      <pre aria-hidden="true" className="font-mono text-[0.9rem] leading-snug text-ink select-none">
        {pandaLoaderFrames[frame]}
      </pre>
      <div className="w-44">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-washi-dim">
          <div
            className="h-full bg-vermilion-deep transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 flex justify-between font-mono text-meta text-ink-mute">
          <span>{copy.preloader.line}</span>
          <span>{pct}%</span>
        </p>
      </div>
      <p className="font-mono text-[0.6875rem] text-ink-mute">{copy.preloader.skipHint}</p>
    </div>
  );
}
