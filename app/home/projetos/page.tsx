"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "../../lib/auth";
import type { Project } from "../../lib/types";
import { membrosApiFetch } from "../_lib/api";
import { CYAN, CYAN_DIM, PANEL, LINE, TEXT, MUTED } from "../_lib/constants";

export default function ProjetosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<"todos" | "forex" | "crypto">("todos");

  useEffect(() => {
    membrosApiFetch<{ forex: Project[]; crypto: Project[] }>("/projects", getToken())
      .then((res) => setProjects([...(res?.forex ?? []), ...(res?.crypto ?? [])]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "todos" ? projects : projects.filter((p) => p.market === filter);

  const accents = [CYAN, "#0099aa", "#007070", "#005555", "#12dff3", "#00cccc"];

  if (loading) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", fontSize: 9, color: CYAN_DIM, letterSpacing: "3px", fontFamily: "var(--font-geist-mono, monospace)", animation: "m-pulse-dot 1.5s infinite" }}>
        CARREGANDO PROJETOS...
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "2px", color: TEXT }}>PROJETOS</div>
          <div style={{ fontSize: 9, color: MUTED, marginTop: 4, fontFamily: "var(--font-geist-mono, monospace)" }}>{filtered.length} ENCONTRADOS</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["todos", "forex", "crypto"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "rgba(18,223,243,.12)" : "transparent",
                border: `1px solid ${filter === f ? "rgba(18,223,243,.5)" : LINE}`,
                color: filter === f ? CYAN : MUTED,
                fontSize: 9, letterSpacing: "1.5px", padding: "5px 14px",
                cursor: "pointer", fontFamily: "var(--font-geist-mono, monospace)",
                textTransform: "uppercase", transition: "all .2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: "60px 24px", border: `1px dashed ${LINE}`, textAlign: "center", fontSize: 10, color: MUTED, fontFamily: "var(--font-geist-mono, monospace)" }}>
          NENHUM PROJETO DISPONÍVEL
        </div>
      ) : (
        <div className="m-projects-grid">
          {filtered.map((proj, i) => {
            const accent = accents[i % accents.length];
            const href = proj.slug ? `/projeto/${proj.slug}` : (proj.external_url ?? "#");
            return (
              <div key={proj.id} className="m-project-card" style={{ background: PANEL, border: `1px solid ${LINE}`, overflow: "hidden", transition: "border-color .2s, transform .2s" }}>
                <div style={{ height: 3, background: `linear-gradient(90deg,${accent},transparent)` }} />
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 8, color: CYAN_DIM, letterSpacing: "2px", marginBottom: 4, fontFamily: "var(--font-geist-mono, monospace)", textTransform: "uppercase" }}>
                        {proj.market}
                        {proj.category?.name ? ` · ${proj.category.name}` : ""}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: TEXT }}>{proj.title}</div>
                    </div>
                    <span style={{ background: "rgba(18,223,243,.07)", border: "1px solid rgba(18,223,243,.22)", padding: "3px 8px", fontSize: 8, color: CYAN, flexShrink: 0, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1px" }}>
                      ATIVO
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6, marginBottom: 16 }}>{proj.description}</div>
                  <div style={{ paddingTop: 12, borderTop: `1px solid ${LINE}`, display: "flex", justifyContent: "flex-end" }}>
                    <Link href={href} style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1px", textDecoration: "none", transition: "color .2s" }}>
                      {proj.cta || "ACESSAR"} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

