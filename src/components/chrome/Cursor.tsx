import { useEffect, useRef } from "react";
import { gsap, REDUCED } from "../motion/gsap";

/**
 * Ink-dot cursor (desktop, fine pointers, motion allowed).
 * Pure decoration: the native cursor is never hidden, so nothing breaks.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(REDUCED).matches;
    if (!fine || reduced || !dot.current) return;

    const el = dot.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      el.style.opacity = "1";
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, [role=button], input, textarea, summary",
      );
      gsap.to(el, {
        scale: interactive ? 3.2 : 1,
        opacity: interactive ? 0.35 : 0.85,
        duration: 0.25,
        ease: "power2.out",
      });
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vermilion-deep opacity-0 mix-blend-multiply"
    />
  );
}
