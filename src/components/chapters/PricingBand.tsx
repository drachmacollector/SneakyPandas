import { tiers } from "../../data/pricing";
import { copy } from "../../data/copy";

/** Good-fella-style tier framing on an ink band. Figures are SAMPLES (data/pricing.ts). */
export function PricingBand() {
  return (
    <div data-pricing className="mt-24 bg-ink py-20 text-washi max-md:mt-16 max-md:py-14">
      <div className="wrap">
        <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
          {copy.arts.pricingTitle}
        </h3>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              data-tier
              className={`rounded-paper bg-ink-raise p-7 transition-transform duration-300 ease-[var(--ease-brush)] hover:-translate-y-0.5 ${
                i === 1 ? "md:-mt-4" : ""
              }`}
            >
              <h4 className="font-display text-[1.2rem] font-bold">{t.name}</h4>
              <p className="mt-2 min-h-[2lh] text-[0.9375rem] leading-relaxed text-washi/70">
                {t.blurb}
              </p>
              <p className="mt-5 font-mono text-[1.4rem] font-medium text-gold tabular-nums">
                {t.price}
              </p>
              <p className="mt-1 font-mono text-meta text-washi/60">{t.duration}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-mono text-meta text-washi/60">{copy.arts.pricingCaveat}</p>
      </div>
    </div>
  );
}
