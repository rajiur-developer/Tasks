import React, { useState, useCallback } from "react";
import { CodeBlock } from "./CodeBlock";

const WORDS = ["ANYTHING","ELEMENTS","SEQUENCES","TIMELINES","INTERFACES","EXPERIENCES"];
const CHARS = "!<>-_\\/[]{}—=+*^?#█▓▒░";

export function TextSection() {
  const [word, setWord] = useState(0);
  const [displayed, setDisplayed] = useState(WORDS[0]);

  const scramble = useCallback((target) => {
    let iter = 0;
    const run = setInterval(() => {
      setDisplayed(target.split("").map((_, idx) => {
        if (idx < iter) return target[idx];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (iter >= target.length) clearInterval(run);
      iter += 0.5;
    }, 38);
  }, []);

  const next = () => {
    const n = (word + 1) % WORDS.length;
    setWord(n);
    scramble(WORDS[n]);
  };

  return (
    <section id="text" style={{ padding: "7rem 0" }}>
      <div className="container">
        <p className="section-label mb-2">04 — Text Animation</p>
        <div className="ticker-wrap my-4">
          <div className="ticker-inner">
            {["SCROLL TRIGGER","TIMELINE","STAGGER","MORPH","GSAP 3.12","EASE","PIN","SCRUB",
              "SCROLL TRIGGER","TIMELINE","STAGGER","MORPH","GSAP 3.12","EASE","PIN","SCRUB"].map((t,i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-7">
            <div className="scramble-box">
              <h2 className="scramble-big">Animate<br/><span id="s-word">{displayed}</span></h2>
              <p className="scramble-sub mt-3 mb-4">
                Custom character-cycling scramble effect — no plugin needed. React state drives each character frame at 38ms intervals, revealing the target string progressively.
              </p>
              <button className="btn-ink px-4 py-2" onClick={next}><em>↺ Scramble</em></button>
            </div>
          </div>
          <div className="col-lg-5 d-flex align-items-center justify-content-center mt-4 mt-lg-0">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
