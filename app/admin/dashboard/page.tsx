"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../_lib/auth";
import { Panel, Loading, ErrorBanner, Badge } from "../_components/ui";

type Project = { id: number; title: string; market: string; active: boolean; category?: { id: number; name: string } | null };
type Lesson = { id: number; title: string; active: boolean; category?: { id: number; name: string } | null };
type LinkItem = { id: number; label: string; type: string; active: boolean };
type Category = { id: number; name: string; active: boolean };

type DashboardData = {
  projects: Project[];
  categories: Category[];
  lessons: Lesson[];
  links: LinkItem[];
};

function Kpi({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, padding: 20, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#00d4e8,transparent)" }} />
      <div style={{ fontSize: 9, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 8 }}>{label.toUpperCase()}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#fff", fontFamily: "var(--font-display)", letterSpacing: 1 }}>{value}</div>
      <div style={{ marginTop: 8, fontSize: 11, color: "#3d5060" }}>{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [projects, categories, lessons, links] = await Promise.all([
        apiFetch<{ projects: Project[] }>("/admin/projects"),
        apiFetch<{ categories: Category[] }>("/admin/categories"),
        apiFetch<{ lessons: Lesson[] }>("/admin/lessons"),
        apiFetch<{ links: LinkItem[] }>("/admin/community-links"),
      ]);
      setData({
        projects: projects?.projects ?? [],
        categories: categories?.categories ?? [],
        lessons: lessons?.lessons ?? [],
        links: links?.links ?? [],
      });
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (loading) return <Loading label="CARREGANDO DASHBOARD..." />;

  const d = data ?? { projects: [], categories: [], lessons: [], links: [] };
  const activeProjects = d.projects.filter((p) => p.active).length;
  const activeLessons = d.lessons.filter((l) => l.active).length;
  const activeCategories = d.categories.filter((c) => c.active).length;
  const activeLinks = d.links.filter((l) => l.active).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: 2, color: "#fff" }}>
        DASHBOARD
      </h1>

      {error && <ErrorBanner message={error} onRetry={load} />}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
        <Kpi label="Projetos ativos" value={activeProjects} sub={`${d.projects.length} no total`} />
        <Kpi label="Categorias" value={activeCategories} sub={`${d.categories.length} no total`} />
        <Kpi label="Aulas" value={activeLessons} sub={`${d.lessons.length} no total`} />
        <Kpi label="Links" value={activeLinks} sub={`${d.links.length} no total`} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        <Panel title="Últimos projetos" style={{ padding: 0, overflow: "hidden" }}>
          {d.projects.slice(0, 6).map((p) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(0,212,232,0.06)" }}>
              <div>
                <div style={{ fontSize: 13, color: "#c0cdd8" }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>{p.market === "forex" ? "Forex" : "Criptoativos"}</div>
              </div>
              <Badge color={p.active ? "var(--accent)" : "var(--text-faint)"}>{p.active ? "ATIVO" : "OCULTO"}</Badge>
            </div>
          ))}
          {d.projects.length === 0 && <div style={{ padding: 30, textAlign: "center", color: "#3d5060", fontSize: 11 }}>Nenhum projeto.</div>}
        </Panel>

        <Panel title="Últimas aulas" style={{ padding: 0, overflow: "hidden" }}>
          {d.lessons.slice(0, 6).map((l) => (
            <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid rgba(0,212,232,0.06)" }}>
              <div>
                <div style={{ fontSize: 13, color: "#c0cdd8" }}>{l.title}</div>
                <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>{l.category?.name ?? "Sem categoria"}</div>
              </div>
              <Badge color={l.active ? "var(--accent)" : "var(--text-faint)"}>{l.active ? "ATIVO" : "OCULTO"}</Badge>
            </div>
          ))}
          {d.lessons.length === 0 && <div style={{ padding: 30, textAlign: "center", color: "#3d5060", fontSize: 11 }}>Nenhuma aula.</div>}
        </Panel>
      </div>
    </div>
  );
}
