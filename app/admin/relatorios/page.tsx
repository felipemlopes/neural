"use client";

import { reports } from "../_components/data/mockData";

export default function RelatoriosPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          letterSpacing: 2,
          color: "#fff",
        }}
      >
        RELATÓRIOS
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {reports.map((r, i) => (
          <div
            key={i}
            style={{
              background: "#0a0e14",
              border: "1px solid rgba(0,212,232,0.12)",
              borderRadius: 6,
              padding: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "1px solid rgba(0,212,232,0.2)",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: 10,
                  letterSpacing: 1,
                  color: "#00d4e8",
                }}
              >
                {r.type}
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>
                  {r.size} · {r.date}
                </div>
              </div>
            </div>
            <button
              style={{
                background: "transparent",
                border: "1px solid rgba(0,212,232,0.3)",
                color: "#00d4e8",
                padding: "7px 14px",
                fontFamily: "var(--font-display)",
                fontSize: 11,
                letterSpacing: 1.5,
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              DOWNLOAD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}