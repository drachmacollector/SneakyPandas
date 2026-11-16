import { useEffect, useRef } from "react";
import { gsap, useGSAP, E, MOTION_OK } from "../motion/gsap";

/**
 * Full-bleed plum branches that draw themselves in, then bloom — the
 * oneshot-sakura growing-branch moment, hand-authored to match the hero
 * painting: gnarled sumi branches, crimson five-petal plum blossoms,
 * ink stamens. Original geometry; colors sampled from the painting.
 * Composition keeps the headline zone (left-center) clear.
 */

const INK = "#2A2520";
const PETALS = ["#A6333F", "#B8404A", "#C65A5C", "#9C2F38", "#B04A52"];

type Bloom = { x: number; y: number; s: number; r: number; bud?: boolean };

// hand-placed along the branch ends and elbows
const blooms: Bloom[] = [
  // droop cluster (center-right, over the painting's canopy line)
  { x: 868, y: 346, s: 15, r: 10 },
  { x: 838, y: 318, s: 12, r: 140 },
  { x: 886, y: 302, s: 13, r: 260 },
  { x: 852, y: 372, s: 10, r: 40, bud: true },
  { x: 822, y: 250, s: 12, r: 80 },
  { x: 842, y: 214, s: 9, r: 200, bud: true },
  // upper twig A4 (top-center-left)
  { x: 538, y: 32, s: 14, r: 0 },
  { x: 498, y: 44, s: 11, r: 220 },
  { x: 562, y: 52, s: 10, r: 120, bud: true },
  // twig A5 (top-center-right)
  { x: 846, y: 56, s: 13, r: 310 },
  { x: 806, y: 44, s: 10, r: 70 },
  { x: 876, y: 76, s: 9, r: 150, bud: true },
  // along the main bough
  { x: 158, y: 68, s: 11, r: 30 },
  { x: 356, y: 102, s: 10, r: 300, bud: true },
  { x: 248, y: 76, s: 9, r: 180, bud: true },
  { x: 652, y: 72, s: 10, r: 250 },
  // top-right branch B
  { x: 1156, y: 296, s: 15, r: 190 },
  { x: 1188, y: 268, s: 12, r: 20 },
  { x: 1128, y: 252, s: 11, r: 320 },
  { x: 1172, y: 330, s: 9, r: 90, bud: true },
  { x: 1254, y: 76, s: 12, r: 230 },
  { x: 1310, y: 58, s: 10, r: 110, bud: true },
  { x: 1118, y: 148, s: 11, r: 160 },
  { x: 1086, y: 180, s: 8, r: 10, bud: true },
];

function BlossomArt({ b, i }: { b: Bloom; i: number }) {
  const color = PETALS[(i * 7 + 3) % PETALS.length];
  return (
    <g transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}>
      <g data-bloom style={{ transformOrigin: "0px 0px" }}>
        {b.bud ? (
          <>
            <circle r={b.s * 0.48} fill={color} />
            <circle r={b.s * 0.2} cx={b.s * 0.12} cy={-b.s * 0.12} fill="#D98A8E" opacity="0.7" />
          </>
        ) : (
          <>
            {[0, 72, 144, 216, 288].map((a, p) => (
              <ellipse
                key={a}
                transform={`rotate(${a + ((i * 13) % 10) - 5})`}
                cx={b.s * 0.55}
                cy={0}
                rx={b.s * 0.52}
                ry={b.s * 0.4}
                fill={p === (i % 5) ? "#D07A7E" : color}
                stroke={INK}
                strokeWidth={0.6}
                strokeOpacity={0.28}
                opacity={0.92}
              />
            ))}
            <circle r={b.s * 0.24} fill="#EFE2CC" opacity="0.9" />
            {[20, 110, 200, 290].map((a) => (
              <circle
                key={a}
                cx={Math.cos((a * Math.PI) / 180) * b.s * 0.3}
                cy={Math.sin((a * Math.PI) / 180) * b.s * 0.3}
                r={b.s * 0.07}
                fill={INK}
              />
            ))}
          </>
        )}
      </g>
    </g>
  );
}

const mainBranch: Array<[string, number]> = [
  ["M-60 110 C160 30 360 120 560 85", 18],
  ["M560 85 C660 70 740 95 800 150", 10],
  ["M800 150 C830 220 820 290 870 350", 7],
  ["M300 95 C360 55 450 40 540 30", 6],
  ["M640 78 C700 55 770 45 850 55", 5],
];

const rightBranch: Array<[string, number]> = [
  ["M1500 60 C1340 40 1220 70 1120 140", 14],
  ["M1200 110 C1150 170 1140 240 1160 300", 7],
  ["M1130 135 C1090 150 1070 170 1082 196", 4],
];

export function BloomingBranches({ start, className = "" }: { start: boolean; className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-branch]", { drawSVG: "0%" });
        gsap.set("[data-bloom]", { scale: 0 });

        tl.current = gsap
          .timeline({
            paused: true,
            onComplete: () => {
              // idle: the boughs breathe
              gsap.to("[data-branches='main']", {
                rotate: 0.7,
                svgOrigin: "-60 110",
                yoyo: true,
                repeat: -1,
                duration: 7,
                ease: E.drift,
              });
              gsap.to("[data-branches='right']", {
                rotate: -0.9,
                svgOrigin: "1500 60",
                yoyo: true,
                repeat: -1,
                duration: 8.5,
                ease: E.drift,
              });
            },
          })
          .to("[data-branch]", {
            drawSVG: "100%",
            duration: 1.1,
            ease: E.brush,
            stagger: 0.13,
          })
          .to(
            "[data-bloom]",
            {
              scale: 1,
              duration: 0.55,
              ease: "back.out(2.1)",
              stagger: { each: 0.05, from: "start" },
            },
            "-=0.9",
          );

        // gentle lift as the hero scrolls away
        gsap.to(root.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current?.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (start) tl.current?.play();
  }, [start]);

  return (
    <svg
      ref={root}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <g data-branches="main" filter="url(#ink-bleed-soft)">
        {mainBranch.map(([d, w], i) => (
          <g key={i}>
            <path data-branch d={d} stroke={INK} strokeWidth={w} strokeLinecap="round" fill="none" opacity={0.88} />
            {/* dry-brush carve: a pale thread through the stroke */}
            <path
              data-branch
              d={d}
              stroke="var(--color-washi)"
              strokeWidth={Math.max(1.2, w * 0.22)}
              strokeLinecap="round"
              fill="none"
              opacity={0.3}
              transform="translate(1.5 -2)"
            />
          </g>
        ))}
      </g>
      <g data-branches="right" filter="url(#ink-bleed-soft)">
        {rightBranch.map(([d, w], i) => (
          <g key={i}>
            <path data-branch d={d} stroke={INK} strokeWidth={w} strokeLinecap="round" fill="none" opacity={0.85} />
            <path
              data-branch
              d={d}
              stroke="var(--color-washi)"
              strokeWidth={Math.max(1.2, w * 0.22)}
              strokeLinecap="round"
              fill="none"
              opacity={0.3}
              transform="translate(-1.5 -2)"
            />
          </g>
        ))}
      </g>
      <g data-branches="main-blooms">
        {blooms.slice(0, 16).map((b, i) => (
          <BlossomArt key={i} b={b} i={i} />
        ))}
      </g>
      <g data-branches="right-blooms">
        {blooms.slice(16).map((b, i) => (
          <BlossomArt key={i + 16} b={b} i={i + 16} />
        ))}
      </g>
    </svg>
  );
}
