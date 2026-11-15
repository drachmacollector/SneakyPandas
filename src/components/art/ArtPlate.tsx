/**
 * A processed painting from public/art (see scripts/prepare-art.mjs).
 * - blend: multiply onto washi so the painting reads as inked on the page
 * - framed: mounted-scroll presentation for ink sections
 * - vignette: soft mask so edges dissolve into the paper
 */
export function ArtPlate({
  name,
  alt = "",
  className = "",
  imgClassName = "",
  blend = false,
  framed = false,
  vignette = false,
  position,
  eager = false,
}: {
  name: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  blend?: boolean;
  framed?: boolean;
  vignette?: boolean;
  position?: string;
  eager?: boolean;
}) {
  return (
    <figure
      aria-hidden={alt === "" ? true : undefined}
      className={`${framed ? "art-framed" : ""} ${vignette ? "art-vignette" : ""} ${className}`}
    >
      <picture>
        <source srcSet={`/art/${name}.webp`} type="image/webp" />
        <img
          src={`/art/${name}.jpg`}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={`block h-full w-full object-cover ${blend ? "art-blend" : ""} ${imgClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
    </figure>
  );
}
