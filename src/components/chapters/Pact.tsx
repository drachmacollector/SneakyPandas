import { useRef, useState } from "react";
import { gsap, useGSAP, E, REDUCED } from "../motion/gsap";
import { copy } from "../../data/copy";
import { mailto, site } from "../../config/site";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";
import { PactSeal, PawPrint, InkSplatter } from "../../assets/svg/seals";
import ClickSpark from "../vendor/ClickSpark";

/** 終 Seal the Pact — the stamp comes down, the conversation begins. */
export function Pact() {
  const root = useRef<HTMLElement>(null);
  const stamping = useRef(false);
  const [copied, setCopied] = useState<string | null>(null);
  const c = copy.pact;

  useGSAP(() => {}, { scope: root });

  const stamp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia(REDUCED).matches) return; // plain mailto
    e.preventDefault();
    if (stamping.current) return;
    stamping.current = true;
    const scope = root.current;
    if (!scope) return;
    const seal = scope.querySelector("[data-seal]");
    const mark = scope.querySelector("[data-mark]");
    const blots = scope.querySelectorAll("[data-blot]");
    const splatter = scope.querySelector("[data-splatter]");
    if (!seal || !mark || !splatter) return;
    gsap
      .timeline({
        onComplete: () => {
          stamping.current = false;
          window.location.href = mailto();
        },
      })
      .to(seal, { y: 26, scaleY: 0.86, duration: 0.18, ease: E.stampIn })
      .set(mark, { opacity: 1 }, ">-0.02")
      .set(splatter, { opacity: 1 }, "<")
      .fromTo(
        blots,
        { scale: 0, opacity: 1, transformOrigin: "center" },
        { scale: 1, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.015 },
        "<",
      )
      .to(seal, { y: 0, scaleY: 1, duration: 0.5, ease: E.stampSettle }, ">-0.45")
      .set(splatter, { opacity: 0 })
      .to({}, { duration: 0.25 });
  };

  const copyEmail = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
      setCopied(addr);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section ref={root} id="pact" aria-labelledby="pact-title" className="bg-ink py-20 text-washi max-md:py-14">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="pact-title" tone="ink" />
        <p className="mt-6 max-w-[52ch] text-washi/85">{c.lead}</p>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,560px)_1fr_300px]">
          {/* the contract */}
          <div className="relative rounded-paper bg-washi p-8 pb-24 text-ink shadow-ink md:p-10 md:pb-28">
            <p className="font-display text-[1.2rem] font-bold">The pact, in plain ink:</p>
            <ul className="mt-5 space-y-3">
              {c.terms.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[0.9875rem] text-ink-soft">
                  <span aria-hidden="true" className="mt-0.5 font-brush text-vermilion">
                    一
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-ink/10 pt-5">
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-mute uppercase">
                {c.copyHint}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {site.emails.map((addr) => (
                  <button
                    key={addr}
                    type="button"
                    onClick={() => copyEmail(addr)}
                    className="rounded-paper border border-ink/20 px-3 py-1.5 font-mono text-meta text-ink-soft transition-colors hover:border-vermilion-deep hover:text-vermilion-deep"
                  >
                    {copied === addr ? `${c.copied} ✓` : addr}
                  </button>
                ))}
              </div>
            </div>
            {/* where the seal lands */}
            <div data-mark aria-hidden="true" className="absolute bottom-6 right-8 opacity-0">
              <span className="grid h-16 w-16 rotate-[-6deg] place-items-center rounded-full border-2 border-vermilion">
                <PawPrint className="h-9 w-9" />
              </span>
            </div>
          </div>

          {/* the stamp */}
          <div className="relative flex flex-col items-center gap-6 lg:pt-6">
            <ClickSpark
              sparkColor={["#C73E2D", "#9B2D1F"]}
              shape="streak"
              sparkCount={10}
              sparkRadius={26}
              duration={520}
            >
              <a
                href={mailto()}
                onClick={stamp}
                className="group relative block rounded-full focus-visible:outline-offset-8"
                aria-label={c.stampCta}
              >
                <span data-seal className="block transition-transform duration-200 group-hover:-translate-y-1.5">
                  <PactSeal className="h-40 w-40 drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)] md:h-48 md:w-48" />
                </span>
                <span data-splatter aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
                  <InkSplatter className="h-full w-full scale-[1.7]" />
                </span>
              </a>
            </ClickSpark>
            <p className="max-w-[26ch] text-center font-display text-[1.1rem] font-bold">
              {c.stampCta}
            </p>
            <p className="text-center font-mono text-meta text-washi/60">
              {site.emails.join(" · ")}
            </p>
          </div>

          <ArtPlate name="pact-pagoda" alt="" framed className="hidden aspect-[504/948] max-w-[260px] justify-self-end lg:block" />
        </div>

        {/* traveler's questions */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {c.faq.map((f) => (
            <details key={f.q} className="group rounded-paper bg-ink-raise p-5 open:pb-6">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-display text-[1.05rem] font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="font-mono text-gold transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-relaxed text-washi/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
