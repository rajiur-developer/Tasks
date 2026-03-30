import React from "react";

export function AnimOrb() {
  return (
    <div style={{ position: "relative", width: 280, height: 280 }}>
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: "absolute", inset: `${i*18}px`,
          border: `1px solid rgba(201,168,76,${0.4 - i*0.1})`,
          borderRadius: "50%",
          animation: `spin${i} ${6 + i * 3}s linear infinite`,
        }} />
      ))}
      <style>{`
        @keyframes spin1 { to { transform: rotate(360deg); } }
        @keyframes spin2 { to { transform: rotate(-360deg); } }
        @keyframes spin3 { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        fontFamily: "var(--ff-display)", fontSize: "1rem",
        color: "var(--gold)", letterSpacing: ".2em"
      }}>GSAP</div>
    </div>
  );
}
