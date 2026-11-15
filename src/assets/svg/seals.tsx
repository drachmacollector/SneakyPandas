/**
 * Seals & strokes — the hanko identity system.
 * Decorative kanji carry aria-hidden; interactive seals get real labels where used.
 */

type P = { className?: string };

/** Square brand seal: vermilion field, carved 忍 (stealth) in brush face. */
export function HankoSeal({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="60" height="60" rx="7" fill="var(--color-vermilion)" />
      {/* carved inner border, slightly irregular like a cut stone */}
      <path
        d="M10 12 C10 9 12 8 15 8 L50 9 C53 9 55 11 55 14 L54 50 C54 53 52 55 49 55 L14 54 C11 54 9 52 9 49 Z"
        fill="none"
        stroke="var(--color-washi)"
        strokeWidth="2.5"
        opacity="0.9"
      />
      <text
        x="32"
        y="35"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-stack-brush)"
        fontSize="34"
        fill="var(--color-washi)"
      >
        忍
      </text>
    </svg>
  );
}

/** Round pact seal: paw monogram ringed by a carved border. */
export function PactSeal({ className }: P) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={className}>
      <circle cx="80" cy="80" r="76" fill="var(--color-vermilion)" />
      <circle cx="80" cy="80" r="64" fill="none" stroke="var(--color-washi)" strokeWidth="3" opacity="0.9" />
      {/* paw monogram */}
      <g fill="var(--color-washi)">
        <ellipse cx="80" cy="96" rx="26" ry="21" />
        <ellipse cx="52" cy="66" rx="10" ry="12" transform="rotate(-18 52 66)" />
        <ellipse cx="80" cy="56" rx="10" ry="13" />
        <ellipse cx="108" cy="66" rx="10" ry="12" transform="rotate(18 108 66)" />
      </g>
      <text
        x="80"
        y="134"
        textAnchor="middle"
        fontFamily="var(--font-stack-brush)"
        fontSize="20"
        fill="var(--color-washi)"
      >
        印
      </text>
    </svg>
  );
}

/** Small paw print — easter egg stamp. */
export function PawPrint({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <g fill="var(--color-vermilion)" opacity="0.85">
        <ellipse cx="24" cy="30" rx="11" ry="9" />
        <ellipse cx="12" cy="18" rx="4.5" ry="5.5" transform="rotate(-18 12 18)" />
        <ellipse cx="24" cy="13" rx="4.5" ry="6" />
        <ellipse cx="36" cy="18" rx="4.5" ry="5.5" transform="rotate(18 36 18)" />
      </g>
    </svg>
  );
}

/** Wide tapering brush stroke — divider / underline. DrawSVG-ready single path. */
export function BrushStroke({ className }: P) {
  return (
    <svg viewBox="0 0 600 24" fill="none" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        data-stroke
        d="M4 14 C80 6 180 4 300 10 C420 16 520 14 596 8"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* dry-brush flick */}
      <path d="M560 12 C575 10 586 9 596 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Short underline stroke for hover draws. */
export function BrushUnderline({ className }: P) {
  return (
    <svg viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        data-stroke
        d="M3 8 C40 3 90 2 120 5 C150 8 175 7 197 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Ink splatter blots for the stamp slam — positioned & animated by SealStamp. */
export function InkSplatter({ className }: P) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <g fill="var(--color-vermilion)">
        {[
          [100, 30, 5],
          [150, 55, 4],
          [172, 102, 6],
          [148, 150, 4.5],
          [100, 172, 5.5],
          [52, 148, 4],
          [28, 100, 6],
          [54, 52, 4.5],
          [126, 38, 3],
          [168, 130, 3],
          [72, 166, 3],
          [34, 70, 3],
        ].map(([x, y, r], i) => (
          <circle key={i} data-blot cx={x} cy={y} r={r} />
        ))}
      </g>
    </svg>
  );
}
