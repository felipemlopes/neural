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

type Project = {
  id: number;
  market: "forex" | "crypto";
  category_id: number | null;
  index: string;
  title: string;
  slug: string | null;
  description: string;
  cover_image: string | null;
  cta: string;
  target: string;
  external_url: string | null;
  active: boolean;
  order: number;
  category?: { id: number; name: string } | null;
};

type Category = { id: number; parent_id: number | null; name: string; active: boolean; order: number };

const emptyForm = {
  market: "forex",
  category_id: "",
  index: "",
  title: "",
  slug: "",
  description: "",
  cta: "Conhecer",
  target: "#",
  external_url: "",
  cover_image: "",
  active: true,
};

export default function ProjetosPage() {
  const [rows, setRows] = useState<Project[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const [proj, cats] = await Promise.all([
        apiFetch<{ projects: Project[] }>("/admin/projects"),
        apiFetch<{ categories: Category[] }>("/admin/categories"),
      ]);
      setRows(proj?.projects ?? []);
      setCategories(cats?.categories ?? []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar projetos");
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

  const openEdit = (p: Project) => {
    setForm({
      market: p.market,
      category_id: p.category_id ? String(p.category_id) : "",
      index: p.index,
      title: p.title,
      slug: p.slug ?? "",
      description: p.description,
      cta: p.cta,
      target: p.target,
      external_url: p.external_url ?? "",
      cover_image: p.cover_image ?? "",
      active: p.active,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      category_id: form.category_id ? Number(form.category_id) : null,
      slug: form.slug || undefined,
      external_url: form.external_url || null,
      cover_image: form.cover_image || null,
    };
    try {
      if (editingId) {
        await apiFetch(`/admin/projects/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await apiFetch("/admin/projects", { method: "POST", body: JSON.stringify(payload) });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar projeto");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: Project) => {
    if (!confirm(`Excluir o projeto "${p.title}"?`)) return;
    try {
      await apiFetch(`/admin/projects/${p.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao excluir projeto");
    }
  };

  const toggleActive = async (p: Project) => {
    try {
      await apiFetch(`/admin/projects/${p.id}`, {
        method: "PUT",
        body: JSON.stringify({ active: !p.active }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao atualizar projeto");
    }
  };

  const reorder = async (ids: number[]) => {
    try {
      await apiFetch("/admin/projects/reorder", { method: "PATCH", body: JSON.stringify({ ids }) });
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
        title="PROJETOS"
        subtitle="Cadastre, edite, oculte e ordene os projetos do portal"
        action={<Button onClick={showForm ? () => setShowForm(false) : openCreate}>{showForm ? "FECHAR" : "+ NOVO PROJETO"}</Button>}
      />

      {showForm && (
        <Panel title={editingId ? "Editar projeto" : "Novo projeto"}>
          <form onSubmit={save} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Título">
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Nome do projeto" />
            </Field>
            <Field label="Slug (opcional)">
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-gerado" />
            </Field>
            <Field label="Mercado">
              <Select value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value as "forex" | "crypto" })}>
                <option value="forex">Forex</option>
                <option value="crypto">Criptoativos</option>
              </Select>
            </Field>
            <Field label="Categoria">
              <Select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">— Sem categoria —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Índice">
              <Input value={form.index} onChange={(e) => setForm({ ...form, index: e.target.value })} placeholder="01" />
            </Field>
            <Field label="CTA (texto do botão)">
              <Input value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} />
            </Field>
            <Field label="Descrição">
              <Textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <Field label="Link externo (opcional)">
              <Input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} placeholder="https://..." />
            </Field>
            <Field label="Imagem de capa (URL, opcional)">
              <Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
            </Field>
            <Field label="Âncora (target)">
              <Input value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} placeholder="#forex" />
            </Field>
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12 }}>
              <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
              <span style={{ fontSize: 13, color: "#c0cdd8" }}>{form.active ? "Visível no site" : "Oculto"}</span>
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
        <Loading label="CARREGANDO PROJETOS..." />
      ) : (
        <Panel style={{ padding: 0, overflow: "hidden" }}>
          {list.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto auto auto auto",
                gap: 14,
                alignItems: "center",
                padding: "14px 20px",
                borderBottom: "1px solid rgba(0,212,232,0.06)",
              }}
            >
              <MoveButtons onUp={() => move(i, -1)} onDown={() => move(i, 1)} disabledUp={i === 0} disabledDown={i === list.length - 1} />
              <div>
                <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>
                  {p.market === "forex" ? "Forex" : "Criptoativos"} · {p.category?.name ?? "Sem categoria"}
                </div>
              </div>
              <Badge color={p.active ? "var(--accent)" : "var(--text-faint)"}>{p.active ? "ATIVO" : "OCULTO"}</Badge>
              <button
                onClick={() => toggleActive(p)}
                style={{ background: "transparent", border: "none", color: "#5a7a8a", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
              >
                {p.active ? "OCULTAR" : "MOSTRAR"}
              </button>
              <button
                onClick={() => openEdit(p)}
                style={{ background: "transparent", border: "none", color: "#00d4e8", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
              >
                EDITAR
              </button>
              <button
                onClick={() => remove(p)}
                style={{ background: "transparent", border: "none", color: "#e84040", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
              >
                EXCLUIR
              </button>
            </div>
          ))}
          {list.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#3d5060", fontSize: 11, letterSpacing: 2, fontFamily: "var(--font-display)" }}>NENHUM PROJETO CADASTRADO</div>}
        </Panel>
      )}
    </div>
  );
}
