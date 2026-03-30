import React from "react";

export function Navbar({ scrolled }) {
  return (
    <nav className={`navbar navbar-expand-lg anim-nav fixed-top px-4${scrolled ? " scrolled" : ""}`}>
      <a className="nav-brand navbar-brand" href="#">MOTION/LAB</a>
      <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navMenu">
        <div className="d-flex gap-2">
          {["Scroll","Timeline","Hover","Text","Stats"].map(t => (
            <a key={t} href={`#${t.toLowerCase()}`} className="nav-link-custom">{t}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
