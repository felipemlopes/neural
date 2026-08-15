"use client";

import { useState } from "react";
import { configFields, configToggles } from "../_components/data/mockData";

export default function ConfigPage() {
  const [toggles, setToggles] = useState(configToggles);

  const toggle = (i: number) => {
    setToggles((prev) => prev.map((t, idx) => (idx === i ? { ...t, on: !t.on } : t)));
  };

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
        CONFIGURAÇÕES
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 16 }}>
            CONFIGURAÇÕES GERAIS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {configFields.map((f, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 6 }}>
                  {f.label.toUpperCase()}
                </div>
                <input
                  defaultValue={f.val}
                  style={{
                    width: "100%",
                    background: "#0f1520",
                    border: "1px solid rgba(0,212,232,0.15)",
                    borderRadius: 4,
                    padding: "9px 12px",
                    color: "#e8edf2",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>
          <button
            style={{
              marginTop: 20,
              background: "#00d4e8",
              color: "#07090d",
              border: "none",
              padding: "10px 20px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 2,
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            SALVAR ALTERAÇÕES
          </button>
        </div>

        <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 16 }}>
            PREFERÊNCIAS DO SISTEMA
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {toggles.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(0,212,232,0.06)",
                }}
              >
                <span style={{ fontSize: 13, color: "#c0cdd8" }}>{t.label}</span>
                <div
                  onClick={() => toggle(i)}
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    background: t.on ? "#00d4e8" : "#1e2d35",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: t.on ? "#07090d" : "#3d5060",
                      position: "absolute",
                      top: 3,
                      left: t.on ? 21 : 3,
                      transition: "left 0.2s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}