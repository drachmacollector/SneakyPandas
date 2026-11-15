import { useEffect, useRef, useState } from "react";
import { PawPrint } from "../../assets/svg/seals";

type Stamp = { id: number; x: number; y: number; r: number };

/** Press `p` anywhere → a vermilion paw print stamps at the cursor. Max 20, gone after 8s. */
export function PawEgg() {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const id = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "p" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const stamp: Stamp = {
        id: id.current++,
        x: pos.current.x,
        y: pos.current.y + window.scrollY,
        r: Math.random() * 50 - 25,
      };
      setStamps((s) => [...s.slice(-19), stamp]);
      setTimeout(() => setStamps((s) => s.filter((p) => p.id !== stamp.id)), 8000);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!stamps.length) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[55] overflow-hidden">
      {stamps.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{ left: s.x - 20, top: s.y - 20, transform: `rotate(${s.r}deg)` }}
        >
          <PawPrint className="h-10 w-10" />
        </div>
      ))}
    </div>
  );
}
