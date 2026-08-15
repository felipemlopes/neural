"use client";

import { useState } from "react";
import { transactions, statusColor } from "../_components/data/mockData";

const FILTERS = ["Todos", "Concluída", "Pendente", "Cancelada"];

export default function TransacoesPage() {
  const [filter, setFilter] = useState("Todos");
  const rows = filter === "Todos" ? transactions : transactions.filter((t) => t.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: 2,
            color: "#fff",
          }}
        >
          TRANSAÇÕES
        </h1>
        <div style={{ fontSize: 11, color: "#3d5060", marginTop: 4 }}>Histórico completo de operações</div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 4,
              border: `1px solid ${filter === f ? "#00d4e8" : "rgba(0,212,232,0.15)"}`,
              background: filter === f ? "rgba(0,212,232,0.1)" : "transparent",
              color: filter === f ? "#00d4e8" : "#5a7a8a",
              fontFamily: "var(--font-display)",
              fontSize: 11,
              letterSpacing: 1.5,
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "130px 1fr 80px 110px 90px 100px",
            gap: 12,
            padding: "10px 20px",
            borderBottom: "1px solid rgba(0,212,232,0.08)",
          }}
        >
          {["ID", "USUÁRIO", "TIPO", "VALOR", "STATUS", "DATA"].map((h, i) => (
            <span key={i} style={{ fontSize: 9, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)" }}>
              {h}
            </span>
          ))}
        </div>
        {rows.map((t, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "130px 1fr 80px 110px 90px 100px",
              gap: 12,
              padding: "13px 20px",
              borderBottom: "1px solid rgba(0,212,232,0.06)",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 11, color: "#3d5060", fontFamily: "var(--font-display)", letterSpacing: 1 }}>{t.id}</span>
            <span style={{ fontSize: 13, color: "#c0cdd8" }}>{t.user}</span>
            <span style={{ fontSize: 12, color: "#5a7a8a" }}>{t.tipo}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#e8edf2" }}>{t.valor}</span>
            <span style={{ fontSize: 11, fontFamily: "var(--font-display)", letterSpacing: 1, color: statusColor(t.status) }}>
              {t.status}
            </span>
            <span style={{ fontSize: 12, color: "#3d5060" }}>{t.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}