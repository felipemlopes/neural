"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "../../lib/auth";
import type { Project, Lesson } from "../../lib/types";
import { membrosApiFetch } from "../_lib/api";
import { CYAN, CYAN_DIM, PANEL, LINE, TEXT, MUTED } from "../_lib/constants";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lessons, setLessons]   = useState<Lesson[]>([]);
  const [loading, setLoading]   = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const token = getToken();
    Promise.all([
      membrosApiFetch<{ forex: Project[]; crypto: Project[] }>("/projects", token),
      membrosApiFetch<{ lessons: Lesson[] }>("/lessons", token),
    ]).then(([pRes, lRes]) => {
      setProjects([...(pRes?.forex ?? []), ...(pRes?.crypto ?? [])]);
      setLessons(lRes?.lessons ?? []);
    }).finally(() => setLoading(false));
  }, []);

  const getYouTubeId = (url?: string | null) => {
    if (!url) return null;
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&]+)/);
    return m ? m[1] : null;
  };

  const stats = [
    { label: "MERCADOS",    value: "02", sub: "Forex & Cripto",      pct: "60%"  },
    { label: "PROJETOS",    value: loading ? "—" : String(projects.length).padStart(2, "0"), sub: "Ativos", pct: `${Math.min(100, projects.length * 7)}%` },
    { label: "AULAS",       value: loading ? "—" : String(lessons.length).padStart(2, "0"), sub: "Disponíveis", pct: `${Math.min(100, lessons.length * 3)}%` },
    { label: "ECOSSISTEMA", value: "01", sub: "Plataforma unificada", pct: "100%" },
  ];

  const activeLesson = lessons[activeIdx];
  const ytId = getYouTubeId(activeLesson?.video_url);

  return (
    <>
      {/* Stats */}
      <div className="m-stats-grid">
        {stats.map((s) => (
          <div key={s.label} style={{ background: PANEL, border: `1px solid ${LINE}`, padding: "20px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", marginBottom: 8, fontFamily: "var(--font-geist-mono, monospace)" }}>{s.label}</div>
            <div style={{ fontWeight: 700, fontSize: 38, color: CYAN, lineHeight: 1, fontFamily: "var(--font-geist-mono, monospace)" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: MUTED, marginTop: 4 }}>{s.sub}</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${CYAN} ${s.pct},transparent ${s.pct})` }} />
          </div>
        ))}
      </div>

      {/* Vídeo + Playlist */}
      {loading ? (
        <div style={{ padding: "40px 0", textAlign: "center", fontSize: 9, color: CYAN_DIM, letterSpacing: "3px", fontFamily: "var(--font-geist-mono, monospace)", animation: "m-pulse-dot 1.5s infinite", marginBottom: 24 }}>
          CARREGANDO...
        </div>
      ) : (
        <div className="m-video-grid" style={{ marginBottom: 24 }}>
          {/* Player */}
          <div style={{ background: PANEL, border: `1px solid ${LINE}`, overflow: "hidden" }}>
            <div style={{ position: "relative", aspectRatio: "16/9", background: "#020609", overflow: "hidden" }}>
              {ytId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                  title={activeLesson?.title ?? "Aula"}
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
                    {lessons.length === 0 ? "NENHUMA AULA DISPONÍVEL" : "SEM VÍDEO VINCULADO"}
                  </div>
                </div>
              )}
              <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(18,223,243,.12)", border: "1px solid rgba(18,223,243,.3)", padding: "3px 10px", fontSize: 9, color: CYAN, letterSpacing: "2px", fontFamily: "var(--font-geist-mono, monospace)", zIndex: 2 }}>
                AO VIVO
              </div>
            </div>
            {activeLesson && (
              <div style={{ padding: "20px 24px" }}>
                <div style={{ fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", marginBottom: 6, fontFamily: "var(--font-geist-mono, monospace)" }}>
                  {activeLesson.category?.name?.toUpperCase() ?? "AULA"}
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "1px", marginBottom: 6, color: TEXT }}>{activeLesson.title}</div>
                {activeLesson.summary && <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{activeLesson.summary}</div>}
                <Link href={`/aula/${activeLesson.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 10, color: CYAN, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1.5px", textDecoration: "none" }}>
                  VER AULA COMPLETA →
                </Link>
              </div>
            )}
          </div>

          {/* Playlist */}
          <div style={{ background: PANEL, border: `1px solid ${LINE}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${LINE}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", fontFamily: "var(--font-geist-mono, monospace)" }}>PLAYLIST</div>
              <Link href="/home/aulas" style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", textDecoration: "none" }}>VER TODAS →</Link>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {lessons.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", fontSize: 10, color: MUTED, fontFamily: "var(--font-geist-mono, monospace)" }}>SEM AULAS</div>
              ) : lessons.map((ep, i) => (
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
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === activeIdx ? CYAN : LINE, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projetos destaque */}
      {!loading && projects.length > 0 && (
        <>
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "2px", textTransform: "uppercase", color: TEXT }}>PROJETOS EM DESTAQUE</div>
            <Link href="/home/projetos" style={{ fontSize: 9, color: CYAN_DIM, letterSpacing: "2px", fontFamily: "var(--font-geist-mono, monospace)", textDecoration: "none" }}>VER TODOS →</Link>
          </div>
          <div className="m-projects-grid">
            {projects.slice(0, 3).map((proj, i) => {
              const accents = [CYAN, "#0099aa", "#007070"];
              const accent = accents[i % accents.length];
              const href = proj.slug ? `/projeto/${proj.slug}` : (proj.external_url ?? "#");
              return (
                <div key={proj.id} className="m-project-card" style={{ background: PANEL, border: `1px solid ${LINE}`, overflow: "hidden", transition: "border-color .2s, transform .2s" }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg,${accent},transparent)` }} />
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ fontSize: 8, color: CYAN_DIM, letterSpacing: "2px", marginBottom: 4, fontFamily: "var(--font-geist-mono, monospace)", textTransform: "uppercase" }}>{proj.market}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: TEXT, marginBottom: 8 }}>{proj.title}</div>
                    <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{proj.description}</div>
                    <div style={{ paddingTop: 12, borderTop: `1px solid ${LINE}`, display: "flex", justifyContent: "flex-end" }}>
                      <Link href={href} style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "1px", textDecoration: "none" }}>
                        {proj.cta || "ACESSAR"} →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

