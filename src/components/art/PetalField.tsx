import { useEffect, useRef } from "react";
import { REDUCED } from "../motion/gsap";

type Mote = {
  x: number;
  y: number;
  size: number;
  vy: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  angle: number;
  spin: number;
  alpha: number;
  kind: "petal" | "fleck";
  deep: boolean;
};

/**
 * Drifting vermilion petals + gold paper flecks (the oneshot-sakura nod),
 * drawn on one canvas, multiply-blended into the washi. Pauses off-screen;
 * absent entirely under prefers-reduced-motion.
 */
export function PetalField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia(REDUCED).matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let motes: Mote[] = [];

    const spawn = (randomY: boolean): Mote => {
      const fleck = Math.random() < 0.35;
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : -20,
        size: fleck ? 1 + Math.random() * 1.8 : 5 + Math.random() * 6,
        vy: fleck ? 6 + Math.random() * 8 : 16 + Math.random() * 22,
        swayAmp: fleck ? 6 : 18 + Math.random() * 26,
        swayFreq: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.6,
        alpha: fleck ? 0.35 + Math.random() * 0.25 : 0.22 + Math.random() * 0.26,
        kind: fleck ? "fleck" : "petal",
        deep: Math.random() < 0.3,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = (w < 768 ? 14 : 26) + 10; // petals + flecks mixed
      motes = Array.from({ length: count }, () => spawn(true));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(canvas);

    const drawPetal = (m: Mote, t: number) => {
      const sway = Math.sin(t * m.swayFreq + m.phase) * m.swayAmp;
      ctx.save();
      ctx.translate(m.x + sway, m.y);
      ctx.rotate(m.angle);
      ctx.globalAlpha = m.alpha;
      if (m.kind === "fleck") {
        ctx.fillStyle = "#B08D45";
        ctx.beginPath();
        ctx.arc(0, 0, m.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = m.deep ? "#9B2D1F" : "#C73E2D";
        const s = m.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.9, -s * 0.15, 0, s);
        ctx.quadraticCurveTo(-s * 0.9, -s * 0.15, 0, -s);
        ctx.fill();
      }
      ctx.restore();
    };

    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y += m.vy * dt;
        m.angle += m.spin * dt;
        if (m.y > h + 24) motes[i] = spawn(false);
        else drawPetal(m, t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (!document.hidden && visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none mix-blend-multiply ${className}`}
    />
  );
}
