"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "../../lib/auth";
import type { Lesson } from "../../lib/types";
import { membrosApiFetch } from "../_lib/api";
import { CYAN, CYAN_DIM, PANEL, LINE, TEXT, MUTED } from "../_lib/constants";

export default function AulasPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState<string>("todos");

  useEffect(() => {
    membrosApiFetch<{ lessons: Lesson[] }>("/lessons", getToken())
      .then((res) => setLessons(res?.lessons ?? []))
      .finally(() => setLoading(false));
  }, []);

  const getYouTubeId = (url?: string | null) => {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&]+)/);
    return m ? m[1] : null;
  };

  // Categorias únicas para filtro
  const categories = Array.from(
    new Set(lessons.map((l) => l.category?.name).filter(Boolean) as string[])
  );

  const filtered = filter === "todos" ? lessons : lessons.filter((l) => l.category?.name === filter);
  const active = filtered[activeIdx];
  const ytId = getYouTubeId(active?.video_url);

  if (loading) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", fontSize: 9, color: CYAN_DIM, letterSpacing: "3px", fontFamily: "var(--font-geist-mono, monospace)", animation: "m-pulse-dot 1.5s infinite" }}>
        CARREGANDO AULAS...
      </div>
    );
  }

  return (
    <>
      {/* Header + filtros */}
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "2px", color: TEXT }}>AULAS</div>
          <div style={{ fontSize: 9, color: MUTED, marginTop: 4, fontFamily: "var(--font-geist-mono, monospace)" }}>
            {filtered.length} DISPONÍVEIS
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["todos", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setActiveIdx(0); }}
              style={{
                background: filter === cat ? "rgba(18,223,243,.12)" : "transparent",
                border: `1px solid ${filter === cat ? "rgba(18,223,243,.5)" : LINE}`,
                color: filter === cat ? CYAN : MUTED,
                fontSize: 9, letterSpacing: "1.5px", padding: "5px 12px",
                cursor: "pointer", fontFamily: "var(--font-geist-mono, monospace)",
                textTransform: "uppercase", transition: "all .2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: "60px 24px", border: `1px dashed ${LINE}`, textAlign: "center", fontSize: 10, color: MUTED, fontFamily: "var(--font-geist-mono, monospace)" }}>
          NENHUMA AULA DISPONÍVEL
        </div>
      ) : (
        <div className="m-video-grid">
          {/* Player */}
          <div style={{ background: PANEL, border: `1px solid ${LINE}`, overflow: "hidden" }}>
            <div style={{ position: "relative", aspectRatio: "16/9", background: "#020609", overflow: "hidden" }}>
              {ytId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                  title={active?.title ?? "Aula"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "radial-gradient(ellipse at 30% 50%,rgba(18,223,243,.06),transparent 70%)" }}>
                  <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(18,223,243,.012) 40px,rgba(18,223,243,.012) 41px)" }} />
                  <div className="m-play-btn" style={{ position: "relative", zIndex: 1, width: 64, height: 64, border: `2px solid ${CYAN}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}>
                    <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: `22px solid ${CYAN}`, marginLeft: 4 }} />
                  </div>
                  <div style={{ position: "relative", zIndex: 1, fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", fontFamily: "var(--font-geist-mono, monospace)" }}>
                    SEM VÍDEO VINCULADO
                  </div>
                </div>
              )}
            </div>
            {active && (
              <div style={{ padding: "20px 24px" }}>
                <div style={{ fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", marginBottom: 6, fontFamily: "var(--font-geist-mono, monospace)" }}>
                  {active.category?.name?.toUpperCase() ?? "AULA"}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "1px", marginBottom: 6, color: TEXT }}>{active.title}</div>
                {active.summary && <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{active.summary}</div>}
                <Link href={`/aula/${active.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, color: CYAN, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1.5px", textDecoration: "none" }}>
                  VER AULA COMPLETA →
                </Link>
              </div>
            )}
          </div>

          {/* Playlist filtrada */}
          <div style={{ background: PANEL, border: `1px solid ${LINE}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${LINE}` }}>
              <div style={{ fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", fontFamily: "var(--font-geist-mono, monospace)" }}>
                PLAYLIST — {filtered.length} AULAS
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", maxHeight: 480 }}>
              {filtered.map((ep, i) => (
                <div
                  key={ep.id}
                  className="m-playlist-item"
                  role="button" tabIndex={0}
                  onClick={() => setActiveIdx(i)}
                  onKeyDown={(e) => e.key === "Enter" && setActiveIdx(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 20px",
                    borderBottom: `1px solid rgba(160,201,208,.06)`, cursor: "pointer",
                    transition: "background .2s",
                    background: i === activeIdx ? "rgba(18,223,243,.06)" : "transparent",
                  }}
                >
                  <div style={{ fontSize: 10, color: CYAN_DIM, width: 20, flexShrink: 0, fontFamily: "var(--font-geist-mono, monospace)" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: i === activeIdx ? CYAN : TEXT }}>{ep.title}</div>
                    {ep.category?.name && <div style={{ fontSize: 9, color: MUTED, marginTop: 2, fontFamily: "var(--font-geist-mono, monospace)" }}>{ep.category.name.toUpperCase()}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === activeIdx ? CYAN : LINE }} />
                    {ep.video_url && <div style={{ fontSize: 8, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)" }}>▶</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

