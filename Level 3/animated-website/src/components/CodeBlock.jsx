import React from "react";

export function CodeBlock() {
  const lines = [
    { indent: 0, text: "const tl = gsap.timeline()", color: "var(--ink)" },
    { indent: 0, text: ".from('.hero', {", color: "var(--ink)" },
    { indent: 1, text: "y: 80, opacity: 0,", color: "var(--slate)" },
    { indent: 1, text: "duration: 1,", color: "var(--slate)" },
    { indent: 1, text: "ease: 'power4.out',", color: "var(--rust)" },
    { indent: 1, text: "stagger: 0.15", color: "var(--gold)" },
    { indent: 0, text: "})", color: "var(--ink)" },
    { indent: 0, text: ".to('.card', {", color: "var(--ink)" },
    { indent: 1, text: "scrollTrigger: {", color: "var(--slate)" },
    { indent: 2, text: "trigger: '.card',", color: "var(--dim)" },
    { indent: 2, text: "start: 'top 80%'", color: "var(--gold)" },
    { indent: 1, text: "}", color: "var(--slate)" },
    { indent: 0, text: "})", color: "var(--ink)" },
  ];

  return (
    <div style={{ background: "var(--smoke)", border: "1px solid rgba(0,0,0,.08)", padding: "2rem", fontFamily: "var(--ff-mono)", fontSize: ".68rem", lineHeight: 2, width: "100%" }}>
      <div style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--dim)", marginBottom: "1rem" }}>GSAP Timeline API</div>
      {lines.map((l, i) => (
        <div key={i} style={{ paddingLeft: `${l.indent * 1.2}rem`, color: l.color, animation: `fadeIn .4s ease ${i * 0.06}s both` }}>
          {l.text}
        </div>
      ))}
      <style>{`@keyframes fadeIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }`}</style>
    </div>
  );
}
