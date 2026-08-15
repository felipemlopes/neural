"use client";

import { forexData } from "../_components/data/mockData";
import { forexVolumeBars, monthLabels } from "../_components/data/sparkSets";

export default function ForexPage() {
  const maxBar = Math.max(...forexVolumeBars);

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
        FOREX
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 16 }}>
            PARES DISPONÍVEIS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {forexData.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 1fr 90px",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(0,212,232,0.06)",
                  alignItems: "center",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#fff" }}>
                  {f.pair}
                </span>
                <div>
                  <div style={{ fontSize: 9, color: "#3d5060", letterSpacing: 1 }}>BID</div>
                  <div style={{ fontSize: 13, color: "#c0cdd8" }}>{f.bid}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: "#3d5060", letterSpacing: 1 }}>ASK</div>
                  <div style={{ fontSize: 13, color: "#c0cdd8" }}>{f.ask}</div>
                </div>
                <span style={{ fontSize: 12, fontFamily: "var(--font-display)", letterSpacing: 1, color: f.up ? "#00d4e8" : "#e84040", textAlign: "right" }}>
                  {f.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 16 }}>
            VOLUME DIÁRIO — USD/BRL
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, paddingBottom: 4 }}>
            {forexVolumeBars.map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: i === forexVolumeBars.length - 1 ? "#00d4e8" : "rgba(0,212,232,0.2)",
                  borderRadius: "2px 2px 0 0",
                  height: `${(v / maxBar) * 100}%`,
                  transition: "height 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {monthLabels.map((m, i) => (
              <div key={i} style={{ fontSize: 9, color: "#3d5060", textAlign: "center" }}>
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}