import { useRef } from "react";
import { gsap, useGSAP, E, MOTION_OK } from "../motion/gsap";
import { copy } from "../../data/copy";
import { founders, photos, type Founder } from "../../config/site";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";
import { HankoSeal } from "../../assets/svg/seals";
import Magnet from "../vendor/Magnet";

function MasterPlate({ f, offset }: { f: Founder; offset: boolean }) {
  const c = copy.masters;
  return (
    <div data-plate className={offset ? "lg:mt-24" : ""}>
      <div className="group relative">
        <figure className="ink-photo aspect-[3/4] w-full">
          <img
            src={f.photos.primary}
            alt={`Portrait of ${f.name}`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: f.photos.position }}
            className="transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={f.photos.hover}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: f.photos.hoverPosition }}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </figure>
        {/* the collector's seal stamps on hover */}
        <div
          aria-hidden="true"
          className="absolute right-4 top-4 z-10 scale-[1.35] opacity-0 transition-all duration-300 ease-[var(--ease-brush)] group-hover:scale-100 group-hover:opacity-100"
        >
          <HankoSeal className="h-12 w-12" />
        </div>
      </div>

      <h3 className="mt-6 font-serif text-[1.45rem] font-bold">{f.name}</h3>
      <p className="mt-1 font-display text-[1.15rem] italic text-vermilion-deep">{f.role}</p>
      <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-soft">{f.bio}</p>
      <Magnet magnetStrength={3} padding={60} wrapperClassName="mt-5 inline-block">
        <a
          href={f.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost text-[0.9375rem] text-vermilion-deep"
        >
          {c.linkedinLabel} ↗
        </a>
      </Magnet>
    </div>
  );
}

/** 五 The Masters — the two of us, painted and photographed. */
export function Masters() {
  const root = useRef<HTMLElement>(null);
  const c = copy.masters;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((el, i) => {
          gsap.from(el.querySelector(".ink-photo"), {
            clipPath: "inset(100% 0 0 0)",
            duration: 0.7,
            delay: i * 0.15,
            ease: E.settle,
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="masters" aria-labelledby="masters-title" className="bg-washi py-36 max-md:py-24">
      <div className="wrap">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="masters-title" />
        <p className="mt-8 max-w-[52ch] text-ink-soft">{c.lead}</p>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1fr_360px_1fr] lg:gap-12">
          <MasterPlate f={founders[0]} offset={false} />

          {/* the clan, painted and photographed */}
          <div className="order-last mx-auto w-full max-w-[360px] lg:order-none lg:mt-10">
            <ArtPlate
              name="masters-duo"
              alt="Ink painting of two pandas under a pine tree"
              blend
              vignette
              className="aspect-[736/1159] w-full"
            />
            <figure className="ink-photo mx-auto -mt-16 w-44 rotate-[-2.5deg] border-4 border-washi shadow-ink">
              <img
                src={photos.duo.src}
                alt={`${founders[0].name.split(" ")[0]} and ${founders[1].name.split(" ")[0]} together`}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: photos.duo.position }}
                className="aspect-square"
              />
            </figure>
          </div>

          <MasterPlate f={founders[1]} offset />
        </div>
      </div>
    </section>
  );
}
