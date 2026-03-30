import React, { useState, useRef, useEffect } from "react";

const STATS = [
  { n: 99, suffix: "", label: "FPS Maintained" },
  { n: 12, suffix: "+", label: "GSAP Plugins" },
  { n: 11, suffix: "M", label: "Downloads" },
  { n: 60, suffix: "+", label: "Ease Curves" },
];

export function StatsBar() {
  const [vals, setVals] = useState(STATS.map(() => 0));
  const started = useRef(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        STATS.forEach((s, i) => {
          const start = Date.now();
          const dur = 2000;
          const run = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVals(v => { const nv = [...v]; nv[i] = Math.round(s.n * ease); return nv; });
            if (p < 1) requestAnimationFrame(run);
          };
          requestAnimationFrame(run);
        });
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" className="stats-bar" ref={ref}>
      <div className="container">
        <div className="row g-0 align-items-center">
          {STATS.map((s, i) => (
            <>
              <div key={i} className="col text-center py-3">
                <div className="stat-n">{vals[i]}{s.suffix}</div>
                <div className="stat-l">{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="stat-divider d-none d-md-block" style={{ height: 80, width: 1, background: "rgba(255,255,255,.08)" }} />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
