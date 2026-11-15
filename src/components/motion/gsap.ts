/** Central GSAP registration + the named motion system (docs/PLAN.md §6.2). */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip, useGSAP);

/** Named durations (seconds). */
export const D = {
  beat: 0.3,
  stroke: 0.7,
  unroll: 1.2,
  slam: 0.45,
} as const;

/** Named eases. */
export const E = {
  brush: "power2.out",
  settle: "power3.inOut",
  stampIn: "power4.in",
  stampSettle: "elastic.out(1, 0.4)",
  drift: "sine.inOut",
} as const;

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip, useGSAP };
