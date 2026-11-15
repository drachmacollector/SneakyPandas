import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED } from "./gsap";

/**
 * Lenis smooth scroll, synced with GSAP's ticker exactly as the brief mandates.
 * Not instantiated under prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return;

    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
