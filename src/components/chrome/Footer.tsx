import { chapters, founders, site } from "../../config/site";
import { copy } from "../../data/copy";
import { pandaSleeping } from "../../data/ascii";

export function Footer() {
  return (
    <footer className="bg-ink text-washi">
      <div className="h-px w-full bg-gold/50" aria-hidden="true" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_auto_auto] md:gap-20">
        <div>
          <pre
            aria-hidden="true"
            className="select-none font-mono text-[0.8rem] leading-snug text-washi/80"
          >
            {pandaSleeping}
          </pre>
          <p className="mt-4 font-mono text-meta text-washi/60">{copy.footer.asciiLine}</p>
          <p className="mt-1 font-mono text-[0.6875rem] text-washi/35">{copy.footer.eggHint}</p>
        </div>

        <nav aria-label="Chapters">
          <ul className="space-y-2.5">
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="link-draw text-[0.9375rem] text-washi/80 hover:text-washi">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-[26ch]">
          <p className="font-display text-title font-bold">{site.tagline}</p>
          <ul className="mt-5 space-y-2.5">
            {founders.map((f) => (
              <li key={f.id}>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw text-[0.9375rem] text-washi/80 hover:text-washi"
                >
                  {f.name} — LinkedIn
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-3 text-washi/60">
            <span className="font-mono text-meta">{copy.footer.rights}</span>
            <span aria-hidden="true" className="font-brush text-gold">
              {copy.footer.endKanji}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
