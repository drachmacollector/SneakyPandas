import { useRef, useState } from "react";
import { copy } from "../../data/copy";
import { projects, type Project } from "../../data/projects";
import { ChapterHead } from "./ChapterHead";
import { ArtPlate } from "../art/ArtPlate";
import { CasePanel } from "./CasePanel";
import ImageTrail from "../vendor/ImageTrail";
import CircularCarousel from "../vendor/CircularCarousel";

/** 二 The Conquests — the work, spun on a curved gallery, detailed in cards. */
export function Conquests() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const c = copy.conquests;

  const carouselItems = projects.map((p) => ({
    src: p.cover ?? `/work/${p.slug}.jpg`,
    title: p.title,
    subtitle: p.tags.map((t) => `[${t}]`).join("—"),
    alt: p.title,
  }));

  const openProject = (p: Project, el?: HTMLElement | null) => {
    openerRef.current = el ?? null;
    setOpen(p);
  };
  const close = () => {
    setOpen(null);
    openerRef.current?.focus();
  };

  return (
    <section ref={root} id="conquests" aria-labelledby="conquests-title" className="bg-washi pb-16 pt-24 max-md:pb-12 max-md:pt-16">
      <div className="wrap relative">
        <ChapterHead kanji={c.kanji} title={c.chapter} id="conquests-title" />
        <p className="mt-6 max-w-[52ch] text-ink-soft">{c.lead}</p>
        {/* painted scrolls trail the cursor over the intro (desktop flourish) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] lg:block" aria-hidden="true">
          <ImageTrail
            items={[
              "/art/conquests-night.jpg",
              "/art/pact-pagoda.jpg",
              "/art/clan-cub.jpg",
              "/art/masters-duo.jpg",
              "/art/hero-panda.jpg",
            ]}
            size={96}
            aspectRatio={0.72}
            lifetime={0.7}
            className="pointer-events-auto h-full w-full"
          />
        </div>
      </div>

      {/* the ride */}
      <div aria-hidden="true" className="mt-8 overflow-hidden">
        <ArtPlate
          name="conquests-charge"
          blend
          className="h-[190px] w-full max-md:h-[140px] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
          position="50% 35%"
        />
      </div>

      {/* the spinning ring of scrolls — drag it round, click a panel to open */}
      <div className="mt-6 h-[540px] max-md:h-[440px] [&_h3]:font-serif">
        <CircularCarousel
          items={carouselItems}
          preset="cylinder"
          intro="rise"
          cardWidth={760}
          aspectRatio={1.6}
          gap={26}
          autoplay="drift"
          speed={0.16}
          pauseOnHover
          draggable
          snap
          focusOnClick
          captions
          cornerRadius={5}
          depthFade={0.45}
          fadeColor="#F4EFE3"
          onItemClick={(_item, index) => openProject(projects[index])}
          className="h-full w-full"
        />
      </div>

      {open && <CasePanel project={open} onClose={close} />}
    </section>
  );
}
