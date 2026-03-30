import React, { useRef, useEffect, useState } from "react";

const MORPH_ITEMS = [
  { icon: "⚡", label: "Performance" },
  { icon: "🎯", label: "Precision" },
  { icon: "🌀", label: "Easing" },
  { icon: "✦", label: "Polish", highlight: true },
  { icon: "🔮", label: "Morph" },
  { icon: "⚗️", label: "Timeline" },
  { icon: "🎪", label: "Scroll" },
  { icon: "🚀", label: "Deploy" },
];

export function MorphGrid() {
  const refs = useRef([]);
  const [allVisible, setAllVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = +e.target.dataset.i;
          setTimeout(() => {
            e.target.style.transition = "opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1)";
            e.target.style.opacity = 1;
            e.target.style.transform = "scale(1)";
          }, i * 80);
        }
      });
    }, { threshold: 0.2 });

    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!allVisible) return;

    refs.current.forEach(el => {
      if (!el) return;
      el.style.transition = "opacity .5s ease, transform .5s cubic-bezier(.34,1.56,.64,1)";
      el.style.opacity = 1;
      el.style.transform = "scale(1)";
    });
  }, [allVisible]);

  return (
    <section id="hover" style={{ padding: "7rem 0", background: "var(--smoke)" }}>
      <div className="container">
        <p className="section-label mb-2">03 — Hover Interactions</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title mb-0">REACTIVE<br/>ELEMENTS</h2>
          
        </div>
        <div className="row g-1">
          {MORPH_ITEMS.map((item, i) => (
            <div key={i} className="col-6 col-md-3">
              <div
                className="morph-cell"
                data-i={i}
                ref={el => { if (el) { el.style.opacity = 1;  refs.current[i] = el; } }}
              >
                <div className="m-icon">{item.icon}</div>
                <div className="m-label" style={item.highlight ? { color: "var(--gold)" } : undefined}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
