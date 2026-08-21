"use client";

import { CYAN, CYAN_DIM, PANEL, LINE, TEXT, MUTED, RECURSOS_FIXOS } from "../_lib/constants";

export default function RecursosPage() {
  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "2px", color: TEXT, marginBottom: 6 }}>LINKS E RECURSOS</div>
        <div style={{ fontSize: 12, color: MUTED, maxWidth: 480, lineHeight: 1.6 }}>
          Ferramentas, materiais e acessos disponíveis para membros da Neural Capital.
        </div>
      </div>

      <div className="m-resources-grid">
        {RECURSOS_FIXOS.map((res) => (
          <a
            key={res.label}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="m-resource-link"
            style={{
              background: PANEL, border: `1px solid ${LINE}`,
              padding: "20px", display: "flex", flexDirection: "column",
              gap: 12, cursor: "pointer", transition: "all .2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 40, height: 40, background: "rgba(18,223,243,.07)",
                border: `1px solid rgba(18,223,243,.2)`, display: "grid",
                placeItems: "center", fontSize: 20, flexShrink: 0,
              }}>{res.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 3 }}>{res.label}</div>
                <div style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1.5px" }}>{res.type}</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 16, color: CYAN_DIM }}>↗</div>
            </div>
          </a>
        ))}
      </div>

      {/* Nota */}
      <div style={{ marginTop: 32, padding: "16px 20px", border: `1px solid ${LINE}`, fontSize: 11, color: MUTED, lineHeight: 1.7 }}>
        <span style={{ color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", fontSize: 9, letterSpacing: "1.5px", display: "block", marginBottom: 6 }}>AVISO</span>
        Recursos marcados com # estão em processo de configuração e serão disponibilizados em breve. 
        Entre em contato via suporte se precisar de acesso antecipado.
      </div>
    </>
  );
}

