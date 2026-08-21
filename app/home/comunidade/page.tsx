"use client";

import { useEffect, useState } from "react";
import { getToken } from "../../lib/auth";
import type { CommunityLink } from "../../lib/types";
import { membrosApiFetch } from "../_lib/api";
import { CYAN, CYAN_DIM, PANEL, LINE, TEXT, MUTED } from "../_lib/constants";

const ICON: Record<string, string> = { telegram: "✈", whatsapp: "💬", other: "🔗" };
const LABEL: Record<string, string> = { telegram: "TELEGRAM", whatsapp: "WHATSAPP", other: "LINK" };

export default function ComunidadePage() {
  const [links, setLinks]   = useState<CommunityLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    membrosApiFetch<{ links: CommunityLink[] }>("/community-links", getToken())
      .then((res) => setLinks(res?.links ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", fontSize: 9, color: CYAN_DIM, letterSpacing: "3px", fontFamily: "var(--font-geist-mono, monospace)", animation: "m-pulse-dot 1.5s infinite" }}>
        CARREGANDO...
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "2px", color: TEXT, marginBottom: 6 }}>COMUNIDADE</div>
        <div style={{ fontSize: 12, color: MUTED, maxWidth: 480, lineHeight: 1.6 }}>
          Acesse os canais oficiais da Neural Capital para conteúdo, atualizações e suporte.
        </div>
      </div>

      {/* Banner */}
      <div style={{ background: `radial-gradient(ellipse at 85% 50%,rgba(18,223,243,.08),transparent 50%),${PANEL}`, border: `1px solid rgba(18,223,243,.22)`, padding: "40px 32px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: .2, background: "linear-gradient(35deg,transparent 35%,rgba(18,223,243,.2) 35.1%,transparent 35.3%),linear-gradient(145deg,transparent 68%,rgba(18,223,243,.15) 68.1%,transparent 68.3%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: CYAN, fontSize: 10, letterSpacing: ".22em", fontFamily: "var(--font-geist-mono, monospace)", marginBottom: 14 }}>
            <span style={{ width: 22, height: 1, background: CYAN, display: "inline-block" }} />
            CONECTE-SE
          </div>
          <div style={{ fontWeight: 300, fontSize: "clamp(28px,4vw,42px)", lineHeight: 1, letterSpacing: "-.04em", color: "#d8dcdd", marginBottom: 10 }}>
            Faça parte do ecossistema<br /><span style={{ color: CYAN }}>Neural Capital.</span>
          </div>
          <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>
            Conteúdo exclusivo, análises semanais e suporte direto com a equipe.
          </div>
        </div>
      </div>

      {links.length === 0 ? (
        <div style={{ padding: "60px 24px", border: `1px dashed ${LINE}`, textAlign: "center", fontSize: 10, color: MUTED, fontFamily: "var(--font-geist-mono, monospace)" }}>
          LINKS EM BREVE
        </div>
      ) : (
        <div className="m-resources-grid">
          {links.map((lnk) => (
            <a
              key={lnk.id}
              href={lnk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="m-resource-link"
              style={{ background: PANEL, border: `1px solid ${LINE}`, padding: "22px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "all .2s" }}
            >
              <div style={{ fontSize: 26, flexShrink: 0 }}>{ICON[lnk.type] ?? "🔗"}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{lnk.label}</div>
                <div style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1.5px" }}>
                  {LABEL[lnk.type] ?? "LINK"}
                </div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 14, color: CYAN_DIM }}>↗</div>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

