import { SeigaihaPattern } from "../../assets/svg/scenery";

/** Mounted once in App — shared SVG filters & patterns. */
export function Defs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        {/* ink-bleed: roughens edges of dividers & masks (static, never animated) */}
        <filter id="ink-bleed" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.09" numOctaves="3" result="n" seed="7" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="ink-bleed-soft" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="2" result="n" seed="3" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <SeigaihaPattern id="seigaiha" />
      </defs>
    </svg>
  );
}
