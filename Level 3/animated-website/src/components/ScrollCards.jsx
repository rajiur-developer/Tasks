import React, { useRef, useEffect } from "react";

const CARDS = [
  ["01","ScrollTrigger","Elements animate as they enter the viewport. Each card triggers independently using IntersectionObserver polyfilled with GSAP."],
  ["02","Stagger Delay","GSAP stagger distributes timing across siblings, creating a natural cascade that draws the eye through the layout."],
  ["03","Ease Curves","Custom easing like power3.out gives motion personality — fast arrival, confident deceleration, zero jank."],
  ["04","Timeline API","gsap.timeline() chains animations with precise overlap and sequencing control. Master timelines own child tweens."],
  ["05","Scrub & Pin","ScrollTrigger's scrub binds animation progress directly to scroll position for cinematic parallax."],
  ["06","Performance","GSAP uses transform and opacity only, keeping animations on the compositor thread for buttery 60fps."],
];

export function ScrollCards() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity .7s ease, transform .7s ease";
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    refs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transitionDelay = `${(i % 3) * 0.12}s`;
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section id="scroll" className="py-6" style={{ padding: "7rem 0" }}>
      <div className="container">
        <p className="section-label mb-2">01 — Scroll Reveal</p>
        <h2 className="section-title mb-5">STAGGERED<br/>ENTRANCE</h2>
        <div className="row g-1">
          {CARDS.map(([num, title, body], i) => (
            <div key={i} className="col-md-4">
              <div className="reveal-card h-100" ref={el => refs.current[i] = el}>
                <div className="card-num text-light">{num}</div>
                <div className="card-title-sm">{title}</div>
                <div className="card-body-sm">{body}</div>
                <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", border: "1px solid rgba(255,255,255,.1)", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", transition: "transform .3s, background .3s, border-color .3s" }} className="card-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
