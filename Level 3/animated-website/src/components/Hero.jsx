import React, { useRef, useEffect } from "react";
import { AnimOrb } from "./AnimOrb";

export function Hero() {
  const ref = useRef();

  useEffect(() => {
    const els = ref.current.querySelectorAll("[data-hero]");
    els.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = `opacity .8s ease ${i * 0.15}s, transform .8s ease ${i * 0.15}s`;
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 200);
    });
  }, []);

  return (
    <section className="hero-section" ref={ref}>
      <div className="hero-grid-bg" />
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <p className="hero-label mb-3" data-hero>React · Bootstrap 5 · GSAP</p>
            <h1 className="hero-title mb-4" data-hero>
              <span className="d-block">MOTION</span>
              <span className="d-block outline">CRAFT</span>
            </h1>
            <p className="hero-subtitle" data-hero>
              Advanced animations built with React components, Bootstrap 5 layout grid, and GSAP-powered timeline sequences. Scroll-triggered, interactive, accessible.
            </p>
            <div className="d-flex gap-3 mt-4 flex-wrap" data-hero>
              <a href="#scroll" className="btn-ink px-4 py-2"><em>↓ Explore</em></a>
              <a href="#timeline" className="btn-ghost px-4 py-2">Timeline Demo</a>
            </div>
            <div className="hero-badge" data-hero>
              <span /> Live Animations Running
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-flex justify-content-center align-items-center">
            <AnimOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
