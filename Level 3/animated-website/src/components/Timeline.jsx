import React, { useState, useEffect, useRef, useCallback } from "react";

const TL_DATA = [
  { year: "2019", title: "Foundation", body: "GSAP 3 launches with a unified API. gsap.timeline() becomes the standard for complex, orchestrated animation sequences." },
  { year: "2020", title: "ScrollTrigger", body: "The most powerful GSAP plugin arrives — binding any animation to scroll position with pixel-perfect precision and zero dependencies." },
  { year: "2022", title: "GSAP 3.x", body: "Context-aware animations, reduced bundle size, and dramatically improved performance. React integration via useGSAP() hook." },
  { year: "2024", title: "Free Forever", body: "All Club plugins go free — ScrollSmoother, SplitText, MorphSVG, Flip. The complete toolkit now available to everyone." },
];

export function Timeline() {
  const [active, setActive] = useState(-1);
  const [progH, setProgH] = useState(0);
  const itemRefs = useRef([]);
  const played = useRef(false);

  const play = useCallback(() => {
    setActive(-1);
    setProgH(0);

    itemRefs.current.forEach(el => {
      if (el) {
        el.style.opacity = 0;
        el.style.transform = el.dataset.side === "left" ? "translateX(-40px)" : "translateX(40px)";
      }
    });

    TL_DATA.forEach((_, i) => {
      setTimeout(() => {
        setProgH(((i + 1) / TL_DATA.length) * 100);
        setActive(i);
        const el = itemRefs.current[i];
        if (el) {
          el.style.transition = "opacity .6s ease, transform .6s cubic-bezier(.34,1.56,.64,1)";
          el.style.opacity = 1;
          el.style.transform = "translateX(0)";
        }
      }, i * 700);
    });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !played.current) {
        played.current = true;
        setTimeout(play, 300);
      }
    }, { threshold: 0.3 });

    const sec = document.getElementById("timeline");
    if (sec) obs.observe(sec);
    return () => obs.disconnect();
  }, [play]);

  return (
    <section id="timeline" className="tl-section" style={{ padding: "7rem 0" }}>
      <div className="container">
        <p className="section-label mb-2">02 — Timeline Sequence</p>
        <h2 className="section-title mb-5">ORCHESTRATED<br/>MOTION</h2>
        <div style={{ position: "relative", paddingBottom: "2rem" }}>
          <div className="tl-line" />
          <div className="tl-progress-fill" style={{ height: `${progH}%` }} />
          <div className="d-flex flex-column gap-4" style={{ position: "relative", zIndex: 1 }}>
            {TL_DATA.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="row align-items-center">
                  {isLeft ? (
                    <>
                      <div className="col-5">
                        <div className={`tl-item left${active >= i ? " active" : ""}`} ref={el => { if (el) { el.dataset.side = "left"; itemRefs.current[i] = el; } }}>
                          <div className="tl-dot" />
                          <div className="tl-card">
                            <div className="tl-year">{item.year}</div>
                            <div className="tl-ttl">{item.title}</div>
                            <div className="tl-body">{item.body}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-2" />
                      <div className="col-5" />
                    </>
                  ) : (
                    <>
                      <div className="col-5" />
                      <div className="col-2" />
                      <div className="col-5">
                        <div className={`tl-item right${active >= i ? " active" : ""}`} ref={el => { if (el) { el.dataset.side = "right"; itemRefs.current[i] = el; } }}>
                          <div className="tl-dot" />
                          <div className="tl-card">
                            <div className="tl-year">{item.year}</div>
                            <div className="tl-ttl">{item.title}</div>
                            <div className="tl-body">{item.body}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button className="btn-ink px-4 py-2 mt-4" onClick={play}>
          <em>▶ Replay Sequence</em>
        </button>
      </div>
    </section>
  );
}
