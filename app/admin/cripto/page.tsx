"use client";

import Sparkline from "../_components/charts/Sparkline";
import { cryptoData } from "../_components/data/mockData";
import { cryptoSparks } from "../_components/data/sparkSets";

export default function CriptoPage() {
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
        CRIPTOATIVOS
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {cryptoData.map((c, i) => (
          <div
            key={i}
            style={{
              background: "#0a0e14",
              border: "1px solid rgba(0,212,232,0.12)",
              borderRadius: 6,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: 1 }}>
                  {c.symbol}
                </div>
                <div style={{ fontSize: 12, color: "#3d5060" }}>{c.name}</div>
              </div>
              <Sparkline values={cryptoSparks[i]} color={c.up ? "#00d4e8" : "#e84040"} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#fff" }}>
              {c.price}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: c.up ? "#00d4e8" : "#e84040", fontSize: 12, fontWeight: 600 }}>{c.change}</span>
              <span style={{ color: "#3d5060", fontSize: 11 }}>Vol: {c.vol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}