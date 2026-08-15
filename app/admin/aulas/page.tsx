"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../_lib/auth";
import {
  PageHeader,
  Panel,
  Field,
  Input,
  Textarea,
  Select,
  Button,
  Toggle,
  Loading,
  ErrorBanner,
  MoveButtons,
  Badge,
} from "../_components/ui";

type Lesson = {
  id: number;
  category_id: number | null;
  project_id: number | null;
  title: string;
  slug: string;
  summary: string | null;
  body: string | null;
  video_url: string | null;
  active: boolean;
  order: number;
  category?: { id: number; name: string } | null;
  project?: { id: number; title: string } | null;
};

type Category = { id: number; name: string };
type Project = { id: number; title: string };

const emptyForm = {
  category_id: "",
  project_id: "",
  title: "",
  slug: "",
  summary: "",
  body: "",
  video_url: "",
  active: true,
};

export default function AulasPage() {
  const [rows, setRows] = useState<Lesson[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const [lessons, cats, proj] = await Promise.all([
        apiFetch<{ lessons: Lesson[] }>("/admin/lessons"),
        apiFetch<{ categories: Category[] }>("/admin/categories"),
        apiFetch<{ projects: Project[] }>("/admin/projects"),
      ]);
      setRows(lessons?.lessons ?? []);
      setCategories(cats?.categories ?? []);
      setProjects(proj?.projects ?? []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar aulas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (l: Lesson) => {
    setForm({
      category_id: l.category_id ? String(l.category_id) : "",
      project_id: l.project_id ? String(l.project_id) : "",
      title: l.title,
      slug: l.slug,
      summary: l.summary ?? "",
      body: l.body ?? "",
      video_url: l.video_url ?? "",
      active: l.active,
    });
    setEditingId(l.id);
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      category_id: form.category_id ? Number(form.category_id) : null,
      project_id: form.project_id ? Number(form.project_id) : null,
      slug: form.slug || undefined,
      video_url: form.video_url || null,
    };
    try {
      if (editingId) {
        await apiFetch(`/admin/lessons/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await apiFetch("/admin/lessons", { method: "POST", body: JSON.stringify(payload) });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar aula");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (l: Lesson) => {
    if (!confirm(`Excluir a aula "${l.title}"?`)) return;
    try {
      await apiFetch(`/admin/lessons/${l.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao excluir aula");
    }
  };

  const reorder = async (ids: number[]) => {
    try {
      await apiFetch("/admin/lessons/reorder", { method: "PATCH", body: JSON.stringify({ ids }) });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao reordenar");
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    if (!rows) return;
    const next = [...rows];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    reorder(next.map((r) => r.id));
  };

  const list = rows ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader
        title="AULAS"
        subtitle="Aulas, vídeos e materiais educacionais"
        action={<Button onClick={showForm ? () => setShowForm(false) : openCreate}>{showForm ? "FECHAR" : "+ NOVA AULA"}</Button>}
      />

      {showForm && (
        <Panel title={editingId ? "Editar aula" : "Nova aula"}>
          <form onSubmit={save} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Título">
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Slug (opcional)">
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-gerado" />
            </Field>
            <Field label="Categoria">
              <Select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">— Sem categoria —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Projeto">
              <Select value={form.project_id} onChange={(e) => setForm({ ...form, project_id: e.target.value })}>
                <option value="">— Sem projeto —</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </Select>
            </Field>
            <Field label="URL do vídeo (embed, opcional)">
              <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." />
            </Field>
            <Field label="Resumo">
              <Input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </Field>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Conteúdo">
                <Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} style={{ minHeight: 140 }} />
              </Field>
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12 }}>
              <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
              <span style={{ fontSize: 13, color: "#c0cdd8" }}>{form.active ? "Visível no site" : "Oculta"}</span>
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
              <Button type="submit" disabled={saving}>{saving ? "SALVANDO..." : "SALVAR"}</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>CANCELAR</Button>
            </div>
          </form>
        </Panel>
      )}

      {error && <ErrorBanner message={error} onRetry={load} />}

      {loading ? (
        <Loading label="CARREGANDO AULAS..." />
      ) : (
        <Panel style={{ padding: 0, overflow: "hidden" }}>
          {list.map((l, i) => (
            <div
              key={l.id}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto auto auto",
                gap: 14,
                alignItems: "center",
                padding: "14px 20px",
                borderBottom: "1px solid rgba(0,212,232,0.06)",
              }}
            >
              <MoveButtons onUp={() => move(i, -1)} onDown={() => move(i, 1)} disabledUp={i === 0} disabledDown={i === list.length - 1} />
              <div>
                <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{l.title}</div>
                <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>
                  {l.category?.name ?? "Sem categoria"} {l.project ? `· ${l.project.title}` : ""}
                </div>
              </div>
              <Badge color={l.video_url ? "var(--accent-blue)" : "var(--text-mute)"}>{l.video_url ? "VÍDEO" : "TEXTO"}</Badge>
              <Badge color={l.active ? "var(--accent)" : "var(--text-faint)"}>{l.active ? "ATIVO" : "OCULTO"}</Badge>
              <button
                onClick={() => openEdit(l)}
                style={{ background: "transparent", border: "none", color: "#00d4e8", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
              >
                EDITAR
              </button>
              <button
                onClick={() => remove(l)}
                style={{ background: "transparent", border: "none", color: "#e84040", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
              >
                EXCLUIR
              </button>
            </div>
          ))}
          {list.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#3d5060", fontSize: 11, letterSpacing: 2, fontFamily: "var(--font-display)" }}>NENHUMA AULA CADASTRADA</div>}
        </Panel>
      )}
    </div>
  );
}
