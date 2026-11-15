/**
 * The SneakyPandas mascot — original, geometric-sumi design.
 * Built from ink blobs and washi negative space; deliberately unlike any
 * existing panda character. All poses share one head grammar:
 * tilted oval ears, tilted teardrop eye patches, small ink nose.
 * Every instance is decorative: wrap with aria-hidden where used.
 */

type P = { className?: string };

const ink = "var(--color-ink)";
const washi = "var(--color-washi)";

/** Shared head, drawn around (0,0) facing forward. Scale/translate via <g>. */
function Head({ pupils = true }: { pupils?: boolean }) {
  return (
    <g>
      {/* ears */}
      <ellipse cx="-46" cy="-54" rx="24" ry="21" fill={ink} transform="rotate(-16 -46 -54)" />
      <ellipse cx="46" cy="-54" rx="24" ry="21" fill={ink} transform="rotate(16 46 -54)" />
      {/* face */}
      <path
        d="M-62 6 C-66 -40 -34 -68 0 -68 C34 -68 66 -40 62 6 C58 40 32 56 0 56 C-32 56 -58 40 -62 6 Z"
        fill={washi}
        stroke={ink}
        strokeWidth="4.5"
      />
      {/* eye patches */}
      <path d="M-40 -14 C-48 2 -42 18 -28 20 C-16 22 -10 8 -14 -8 C-18 -22 -32 -28 -40 -14 Z" fill={ink} />
      <path d="M40 -14 C48 2 42 18 28 20 C16 22 10 8 14 -8 C18 -22 32 -28 40 -14 Z" fill={ink} />
      {pupils && (
        <g data-pupils>
          <circle cx="-26" cy="2" r="6.5" fill={washi} />
          <circle cx="26" cy="2" r="6.5" fill={washi} />
          <circle cx="-25" cy="3" r="3" fill={ink} />
          <circle cx="27" cy="3" r="3" fill={ink} />
        </g>
      )}
      {/* nose + mouth */}
      <path d="M-8 32 Q0 25 8 32 Q0 41 -8 32 Z" fill={ink} />
      <path d="M0 38 Q0 44 7 46" stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
}

/** Peeking over an edge — ears, eyes and paws only. Pupils trackable via [data-pupils]. */
export function PandaPeek({ className }: P) {
  return (
    <svg viewBox="0 0 260 132" fill="none" aria-hidden="true" className={className}>
      <g transform="translate(130 128) scale(1.05)">
        {/* only the top of the head shows */}
        <g transform="translate(0 10)">
          <Head />
        </g>
      </g>
      {/* paws gripping the edge */}
      <path d="M34 132 q3 -17 21 -17 q18 0 21 17 Z" fill={ink} />
      <path d="M184 132 q3 -17 21 -17 q18 0 21 17 Z" fill={ink} />
      {/* claws hint */}
      <path d="M44 120 v-5 M55 117 v-5 M66 120 v-5 M194 120 v-5 M205 117 v-5 M216 120 v-5" stroke={washi} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Tip-toe sneak, side profile silhouette. */
export function PandaSneak({ className }: P) {
  return (
    <svg viewBox="0 0 220 170" fill="none" aria-hidden="true" className={className}>
      {/* body silhouette leaning forward on tiptoes */}
      <path
        d="M52 150 C40 128 44 96 68 82 C86 72 112 70 132 78 C156 88 168 108 164 128 C160 146 144 156 124 158 L118 166 L106 158 C92 158 76 160 68 166 L62 156 C56 154 54 152 52 150 Z"
        fill={ink}
      />
      {/* head, turned to viewer, slightly ahead of body */}
      <g transform="translate(152 52) scale(0.62)">
        <Head />
      </g>
      {/* reaching front paw */}
      <path d="M176 118 q26 2 30 22 q-22 8 -34 -8 Z" fill={ink} />
      {/* motion whiskers */}
      <path d="M30 96 h18 M24 112 h16 M32 128 h14" stroke={ink} strokeWidth="3" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/** Seated, painting a brush stroke (stroke path is separate, [data-brushline]). */
export function PandaPaint({ className }: P) {
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-hidden="true" className={className}>
      {/* seated body, right side */}
      <path
        d="M168 206 C156 172 164 138 196 126 C222 116 252 120 268 136 C284 152 288 180 278 198 C274 208 268 212 260 214 L176 214 C172 212 168 210 168 206 Z"
        fill={ink}
      />
      {/* belly */}
      <ellipse cx="226" cy="182" rx="30" ry="24" fill={washi} />
      {/* head */}
      <g transform="translate(224 78) scale(0.74)">
        <Head />
      </g>
      {/* brush arm reaching left-down toward the paper */}
      <path d="M186 152 q-26 10 -34 34" stroke={ink} strokeWidth="13" strokeLinecap="round" fill="none" />
      {/* brush held at the stroke's start */}
      <g transform="rotate(-38 146 182)">
        <rect x="142" y="150" width="7" height="32" rx="3" fill={ink} />
        <path d="M141 182 q4.5 13 9 0 Z" fill={ink} />
      </g>
      {/* the stroke being painted, flowing left across the paper */}
      <path
        data-brushline
        d="M138 196 C110 206 66 208 18 200"
        stroke={ink}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}

/** Seated at a laptop. */
export function PandaCode({ className }: P) {
  return (
    <svg viewBox="0 0 240 200" fill="none" aria-hidden="true" className={className}>
      <path
        d="M52 186 C42 152 52 120 84 108 C110 98 140 100 160 114 C180 128 188 156 180 178 C176 188 170 192 162 194 L58 194 C54 192 52 190 52 186 Z"
        fill={ink}
      />
      <g transform="translate(112 58) scale(0.74)">
        <Head />
      </g>
      {/* laptop */}
      <g>
        <path d="M70 170 L170 170 L178 190 L62 190 Z" fill={ink} />
        <rect x="80" y="132" width="80" height="42" rx="3" fill={washi} stroke={ink} strokeWidth="4" />
        {/* code lines */}
        <path d="M90 142 h28 M90 150 h44 M90 158 h36" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M140 158 h10" stroke="var(--color-vermilion)" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      {/* paws on the keyboard */}
      <ellipse cx="86" cy="172" rx="11" ry="8" fill={ink} />
      <ellipse cx="154" cy="172" rx="11" ry="8" fill={ink} />
    </svg>
  );
}

/** Bowing. */
export function PandaBow({ className }: P) {
  return (
    <svg viewBox="0 0 240 170" fill="none" aria-hidden="true" className={className}>
      {/* body, rump up */}
      <path
        d="M130 150 C106 152 84 142 76 120 C70 100 80 80 102 70 C124 62 152 66 168 82 C182 96 184 118 174 134 C164 148 148 150 130 150 Z"
        fill={ink}
      />
      {/* head lowered */}
      <g transform="translate(78 118) scale(0.66) rotate(-24)">
        <Head pupils={false} />
      </g>
      {/* closed humble eyes drawn over patches */}
      <path d="M52 112 q6 5 12 0 M86 108 q6 5 12 0" stroke={washi} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* front paws extended */}
      <path d="M28 152 q16 -10 36 -6 l-4 12 l-32 0 Z" fill={ink} />
    </svg>
  );
}

/** Holding a hanko overhead, about to stamp. */
export function PandaStamp({ className }: P) {
  return (
    <svg viewBox="0 0 240 220" fill="none" aria-hidden="true" className={className}>
      <path
        d="M58 206 C48 170 58 136 90 124 C116 114 146 116 166 130 C186 146 194 174 186 198 C182 208 176 212 168 214 L64 214 C60 212 58 210 58 206 Z"
        fill={ink}
      />
      <ellipse cx="122" cy="184" rx="32" ry="24" fill={washi} />
      <g transform="translate(116 84) scale(0.76)">
        <Head />
      </g>
      {/* both arms up holding the seal */}
      <path d="M86 118 q-14 -34 10 -56" stroke={ink} strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M152 118 q18 -32 -2 -56" stroke={ink} strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* hanko */}
      <g data-hanko>
        <rect x="104" y="18" width="34" height="42" rx="6" fill="var(--color-vermilion)" />
        <rect x="108" y="56" width="26" height="8" rx="2" fill={ink} />
      </g>
    </svg>
  );
}

/** Sleeping curl (static, footer-adjacent uses ASCII instead — this is for spares). */
export function PandaSleep({ className }: P) {
  return (
    <svg viewBox="0 0 200 120" fill="none" aria-hidden="true" className={className}>
      <path
        d="M30 100 C22 70 44 46 84 44 C128 42 164 60 170 84 C174 98 164 106 148 108 L48 108 C38 106 32 104 30 100 Z"
        fill={ink}
      />
      <g transform="translate(64 78) scale(0.5) rotate(-8)">
        <Head pupils={false} />
      </g>
      <path d="M44 74 q5 4 10 0 M72 72 q5 4 10 0" stroke={washi} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
