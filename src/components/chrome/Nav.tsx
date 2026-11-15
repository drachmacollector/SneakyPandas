import { useState } from "react";
import { chapters } from "../../config/site";
import { copy } from "../../data/copy";
import { HankoSeal } from "../../assets/svg/seals";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-vermilion-deep focus:text-washi focus:px-4 focus:py-2 focus:rounded-paper"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[70]">
        <div className="wrap flex items-center justify-between py-4">
          <a
            href="#hero"
            className="flex items-center gap-3 text-ink"
            aria-label="SneakyPandas — back to top"
          >
            <HankoSeal className="h-9 w-9 shrink-0 drop-shadow-sm" />
            <span className="font-display font-bold text-[1.15rem] tracking-tight">
              SneakyPandas
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a href="#pact" className="btn btn-primary text-[0.9375rem] max-sm:hidden">
              {copy.nav.cta}
            </a>
            <button
              type="button"
              className="lg:hidden btn btn-ghost px-4 py-3 text-[0.9375rem] text-ink"
              aria-expanded={open}
              aria-controls="chapter-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : copy.nav.menuLabel}
            </button>
          </div>
        </div>
      </header>

      {/* mobile chapter menu */}
      <nav
        id="chapter-menu"
        aria-label="Chapters"
        className={`fixed inset-0 z-[65] bg-ink text-washi transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-start justify-center gap-5 px-8">
          {chapters.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="link-draw flex items-baseline gap-4 font-display text-3xl font-bold"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true" className="font-brush text-xl text-vermilion">
                  {c.kanji}
                </span>
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
