import React from "react";

const MAG_LABELS = ["GSAP","SCROLL","TIMELINE","STAGGER","EASE","FLIP","MORPH SVG","INERTIA"];

export function MagneticSection() {
  const handleMove = (e) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    btn.style.transition = "transform .3s ease";
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = (e) => {
    e.currentTarget.style.transition = "transform .6s cubic-bezier(.34,1.56,.64,1)";
    e.currentTarget.style.transform = "translate(0,0)";
  };

  return (
    <section id="interactive" style={{ padding: "7rem 0", background: "var(--smoke)" }}>
      <div className="container">
        <p className="section-label mb-2">05 — Magnetic Buttons</p>
        <h2 className="section-title mb-5">INTERACTIVE<br/>STATES</h2>
        <div className="d-flex flex-wrap gap-3 p-5" style={{ border: "1px solid rgba(0,0,0,.08)", background: "var(--paper)" }}>
          {MAG_LABELS.map(label => (
            <button key={label} className="mag-btn" onMouseMove={handleMove} onMouseLeave={handleLeave}>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
