import { useState, useEffect } from "react";
import {
  Navbar,
  Hero,
  ScrollCards,
  Timeline,
  MorphGrid,
  TextSection,
  MagneticSection,
  StatsBar,
  Footer,
} from "./components";

/* ─── Bootstrap 5 + Google Fonts via CDN (injected once) ─── */
const BOOTSTRAP_CSS = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css";
const GSAP_CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
const CSS = "";

function useScript(src) {
  const [ready, setReady] = useState(() => !!document.querySelector(`script[src="${src}"]`));

  useEffect(() => {
    if (ready) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => setReady(true);
    document.head.appendChild(s);
    return () => {
      if (s.parentNode) s.parentNode.removeChild(s);
    };
  }, [src, ready]);

  return ready;
}

function useStylesheet(href) {
  useEffect(() => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }, [href]);
}

export default function App() {
  useStylesheet(BOOTSTRAP_CSS);
  useScript(GSAP_CDN);

  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      setScrolled(window.scrollY > 60);
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <div id="scroll-prog" style={{ width: `${progress}%` }} />
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <ScrollCards />
        <Timeline />
        <MorphGrid />
        <TextSection />
        <MagneticSection />
        <StatsBar />
      </main>
      <Footer />
    </>
  );
}
