/**
 * Chapter title lockup: brush kanji numeral + display title in one composition.
 * The kanji is decorative (aria-hidden); the English heading carries semantics.
 */
export function ChapterHead({
  kanji,
  title,
  id,
  tone = "washi",
}: {
  kanji: string;
  title: string;
  id: string;
  tone?: "washi" | "ink";
}) {
  return (
    <div className="flex items-end gap-4 md:gap-6">
      <span
        aria-hidden="true"
        className={`font-brush leading-none text-[2.2rem] md:text-[3rem] ${
          tone === "ink" ? "text-gold" : "text-vermilion"
        }`}
      >
        {kanji}
      </span>
      <h2
        id={id}
        className={`font-display font-bold text-display-2 ${
          tone === "ink" ? "text-washi" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
