/**
 * Landscape & motif SVGs — sumi-e wash rendered as layered opacity silhouettes.
 * All decorative: wrap with aria-hidden where used.
 */

type P = { className?: string };

const ink = "var(--color-ink)";

/** Three mountain depths in one SVG; layers addressable via [data-depth]. */
export function Mountains({ className }: P) {
  return (
    <svg viewBox="0 0 900 360" fill="none" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className={className}>
      <g data-depth="far" opacity="0.1">
        <path d="M0 360 L90 220 C110 190 140 190 160 222 L300 360 Z" fill={ink} />
        <path d="M340 360 L480 150 C500 120 530 122 548 154 L700 360 Z" fill={ink} />
      </g>
      <g data-depth="mid" opacity="0.2">
        <path d="M120 360 L300 140 C320 115 352 116 372 146 L560 360 Z" fill={ink} />
        <path d="M580 360 L720 200 C740 176 768 178 786 206 L900 360 Z" fill={ink} />
      </g>
      <g data-depth="near" opacity="0.38">
        <path d="M420 360 L630 100 C652 72 688 74 708 106 L900 340 L900 360 Z" fill={ink} />
        <path d="M0 360 L60 300 C76 282 100 284 114 304 L170 360 Z" fill={ink} />
      </g>
    </svg>
  );
}

/** Kasumi mist band — the classic squared, staggered horizontal cloud. */
export function Kasumi({ className, flip = false }: P & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 640 90"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="var(--color-washi)">
        <rect x="0" y="28" width="420" height="34" rx="17" />
        <rect x="120" y="4" width="330" height="34" rx="17" />
        <rect x="230" y="52" width="410" height="34" rx="17" />
      </g>
      <g fill={ink} opacity="0.07">
        <rect x="0" y="28" width="420" height="34" rx="17" />
        <rect x="120" y="4" width="330" height="34" rx="17" />
      </g>
    </svg>
  );
}

/** Bamboo stalks with leaves. */
export function Bamboo({ className }: P) {
  return (
    <svg viewBox="0 0 120 420" fill="none" aria-hidden="true" className={className}>
      <g stroke={ink} strokeLinecap="round">
        {/* stalk 1 */}
        <path d="M40 420 L40 20" strokeWidth="10" opacity="0.8" />
        <path d="M31 330 h18 M31 230 h18 M31 130 h18" strokeWidth="5" />
        {/* stalk 2, thinner, behind */}
        <path d="M86 420 L86 90" strokeWidth="6" opacity="0.4" />
        <path d="M80 320 h12 M80 210 h12" strokeWidth="4" opacity="0.4" />
      </g>
      {/* leaves */}
      <g fill={ink}>
        <path d="M40 60 C60 44 86 40 108 48 C88 62 62 68 40 60 Z" opacity="0.85" />
        <path d="M40 96 C24 78 20 56 26 36 C42 52 48 76 40 96 Z" opacity="0.6" />
        <path d="M86 128 C102 114 120 110 136 116 C122 130 102 136 86 128 Z" opacity="0.35" />
      </g>
    </svg>
  );
}

/** Seigaiha (wave) tile — render as a repeating pattern fill. */
export function SeigaihaPattern({ id = "seigaiha", opacity = 0.12 }: { id?: string; opacity?: number }) {
  return (
    <pattern id={id} width="56" height="28" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={ink} strokeWidth="1.5" opacity={opacity}>
        {[0, 28, 56].map((x) => (
          <g key={x}>
            <circle cx={x} cy="28" r="26" />
            <circle cx={x} cy="28" r="18" />
            <circle cx={x} cy="28" r="10" />
          </g>
        ))}
        {[14, 42].map((x) => (
          <g key={x}>
            <circle cx={x} cy="14" r="26" />
            <circle cx={x} cy="14" r="18" />
            <circle cx={x} cy="14" r="10" />
          </g>
        ))}
      </g>
    </pattern>
  );
}

/** Single plum sprig — the one quiet floral accent on the site. */
export function PlumSprig({ className }: P) {
  return (
    <svg viewBox="0 0 220 160" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8 152 C60 130 96 104 128 64 M96 96 C112 92 130 94 142 102 M70 118 C78 104 80 90 76 76"
        stroke={ink}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {[
        [146, 56],
        [170, 78],
        [118, 40],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle
              key={a}
              cx={Math.cos((a * Math.PI) / 180) * 8}
              cy={Math.sin((a * Math.PI) / 180) * 8}
              r="6.5"
              fill="var(--color-vermilion)"
              opacity="0.85"
            />
          ))}
          <circle r="3" fill={ink} />
        </g>
      ))}
    </svg>
  );
}

/** Service card motifs — one stroke weight, ink, authored set. */
export function ServiceMotif({ kind, className }: P & { kind: "web" | "lantern" | "coin" | "wave" }) {
  const common = { stroke: ink, strokeWidth: 3, strokeLinecap: "round" as const, fill: "none" };
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      {kind === "web" && (
        <g {...common}>
          <path d="M8 44 C20 20 44 20 56 44" />
          <path d="M8 44 H56" />
          <path d="M18 44 C24 32 40 32 46 44" />
          <circle cx="32" cy="27" r="3" fill={ink} stroke="none" />
        </g>
      )}
      {kind === "lantern" && (
        <g {...common}>
          <rect x="22" y="8" width="20" height="6" rx="3" />
          <path d="M18 32 C18 20 26 14 32 14 C38 14 46 20 46 32 C46 44 38 50 32 50 C26 50 18 44 18 32 Z" />
          <path d="M22 24 H42 M22 40 H42" />
          <path d="M32 50 V58" />
        </g>
      )}
      {kind === "coin" && (
        <g {...common}>
          <circle cx="32" cy="32" r="22" />
          <rect x="25" y="25" width="14" height="14" />
        </g>
      )}
      {kind === "wave" && (
        <g {...common}>
          <path d="M6 40 C14 28 22 28 28 36 C34 44 42 44 50 34 C54 29 57 27 60 27" />
          <path d="M6 50 C14 42 20 42 26 48 C32 54 42 54 50 46" opacity="0.5" />
          <path d="M44 22 C48 16 54 14 60 16" opacity="0.7" />
        </g>
      )}
    </svg>
  );
}
