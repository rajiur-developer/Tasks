import React from "react";

export function Footer() {
  return (
    <footer style={{ padding: "2.5rem 0", borderTop: "1px solid var(--smoke)" }}>
      <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
        <span style={{ fontFamily: "var(--ff-display)", fontWeight: 800, fontSize: "1.3rem" }}>MOTION/LAB</span>
        <span style={{ fontSize: ".62rem", letterSpacing: ".1em", color: "var(--dim)" }}>React · Bootstrap 5 · GSAP 3.12 · ScrollTrigger</span>
      </div>
    </footer>
  );
}
