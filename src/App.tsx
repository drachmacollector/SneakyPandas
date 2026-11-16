import { useEffect, useState } from "react";
import { useLenis } from "./components/motion/useLenis";
import { Defs } from "./components/chrome/Defs";
import { Preloader, preloaderSeen } from "./components/chrome/Preloader";
import { Nav } from "./components/chrome/Nav";
import { ProgressRail } from "./components/chrome/ProgressRail";
import { Cursor } from "./components/chrome/Cursor";
import { Footer } from "./components/chrome/Footer";
import { PawEgg } from "./components/chrome/PawEgg";
import { Hero } from "./components/chapters/Hero";
import { Clan } from "./components/chapters/Clan";
import { Arts } from "./components/chapters/Arts";
import { Conquests } from "./components/chapters/Conquests";
import { Way } from "./components/chapters/Way";
import { Masters } from "./components/chapters/Masters";
import { Pact } from "./components/chapters/Pact";

export default function App() {
  // the hero entrance starts behind the preloader so the page settles early
  const [started, setStarted] = useState(() => preloaderSeen());
  const [loaderDone, setLoaderDone] = useState(() => preloaderSeen());
  useLenis();

  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), 700);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <div className="relative">
      <Defs />
      {!loaderDone && (
        <Preloader
          onDone={() => {
            setLoaderDone(true);
            setStarted(true);
          }}
        />
      )}
      <Nav />
      <ProgressRail />
      <main id="main">
        <Hero start={started} />
        <Clan />
        <Conquests />
        <Arts />
        <Way />
        <Masters />
        <Pact />
      </main>
      <Footer />
      <PawEgg />
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />
    </div>
  );
}
