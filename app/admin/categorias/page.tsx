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

type Category = {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  active: boolean;
  order: number;
};

const emptyForm = {
  parent_id: "",
  name: "",
  slug: "",
  description: "",
  cover_image: "",
  active: true,
};

export default function CategoriasPage() {
  const [rows, setRows] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<{ categories: Category[] }>("/admin/categories");
      setRows(data?.categories ?? []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const openCreate = (parentId?: number) => {
    setForm({ ...emptyForm, parent_id: parentId ? String(parentId) : "" });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (c: Category) => {
    setForm({
      parent_id: c.parent_id ? String(c.parent_id) : "",
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      cover_image: c.cover_image ?? "",
      active: c.active,
    });
    setEditingId(c.id);
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      parent_id: form.parent_id ? Number(form.parent_id) : null,
      slug: form.slug || undefined,
      cover_image: form.cover_image || null,
    };
    try {
      if (editingId) {
        await apiFetch(`/admin/categories/${editingId}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await apiFetch("/admin/categories", { method: "POST", body: JSON.stringify(payload) });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar categoria");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c: Category) => {
    if (!confirm(`Excluir a categoria "${c.name}"?`)) return;
    try {
      await apiFetch(`/admin/categories/${c.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao excluir categoria");
    }
  };

  const toggleActive = async (c: Category) => {
    try {
      await apiFetch(`/admin/categories/${c.id}`, { method: "PUT", body: JSON.stringify({ active: !c.active }) });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao atualizar categoria");
    }
  };

  const reorder = async (ids: number[]) => {
    try {
      await apiFetch("/admin/categories/reorder", { method: "PATCH", body: JSON.stringify({ ids }) });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao reordenar");
    }
  };

  const move = (list: Category[], i: number, dir: -1 | 1) => {
    const next = [...list];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    reorder(next.map((r) => r.id));
  };

  const list = rows ?? [];

  const renderLevel = (parentId: number | null, depth: number) => {
    const items = list.filter((c) => c.parent_id === parentId);
    return items.map((c, i) => {
      const siblings = items;
      return (
        <div key={c.id}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto auto auto auto",
              gap: 14,
              alignItems: "center",
              padding: "13px 20px",
              borderBottom: "1px solid rgba(0,212,232,0.06)",
              paddingLeft: 20 + depth * 24,
            }}
          >
            <MoveButtons
              onUp={() => move(siblings, i, -1)}
              onDown={() => move(siblings, i, 1)}
              disabledUp={i === 0}
              disabledDown={i === siblings.length - 1}
            />
            <div>
              <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>/{c.slug}</div>
            </div>
            <Badge color={c.active ? "var(--accent)" : "var(--text-faint)"}>{c.active ? "ATIVO" : "OCULTO"}</Badge>
            <button
              onClick={() => toggleActive(c)}
              style={{ background: "transparent", border: "none", color: "#5a7a8a", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
            >
              {c.active ? "OCULTAR" : "MOSTRAR"}
            </button>
            <button
              onClick={() => openCreate(c.id)}
              style={{ background: "transparent", border: "none", color: "#5a7a8a", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
            >
              +SUB
            </button>
            <button
              onClick={() => openEdit(c)}
              style={{ background: "transparent", border: "none", color: "#00d4e8", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
            >
              EDITAR
            </button>
            <button
              onClick={() => remove(c)}
              style={{ background: "transparent", border: "none", color: "#e84040", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
            >
              EXCLUIR
            </button>
          </div>
          {renderLevel(c.id, depth + 1)}
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader
        title="CATEGORIAS"
        subtitle="Organize o conteúdo em categorias hierárquicas"
        action={<Button onClick={showForm ? () => setShowForm(false) : () => openCreate()}>{showForm ? "FECHAR" : "+ NOVA CATEGORIA"}</Button>}
      />

      {showForm && (
        <Panel title={editingId ? "Editar categoria" : "Nova categoria"}>
          <form onSubmit={save} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Nome">
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Slug (opcional)">
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-gerado" />
            </Field>
            <Field label="Categoria pai">
              <Select value={form.parent_id} onChange={(e) => setForm({ ...form, parent_id: e.target.value })}>
                <option value="">— Raiz —</option>
                {list
                  .filter((c) => c.id !== editingId)
                  .map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
              </Select>
            </Field>
            <Field label="Imagem de capa (URL, opcional)">
              <Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
            </Field>
            <div style={{ gridColumn: "1 / -1" }}>
              <Field label="Descrição">
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </Field>
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12 }}>
              <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
              <span style={{ fontSize: 13, color: "#c0cdd8" }}>{form.active ? "Visível" : "Oculta"}</span>
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
        <Loading label="CARREGANDO CATEGORIAS..." />
      ) : (
        <Panel style={{ padding: 0, overflow: "hidden" }}>
          {renderLevel(null, 0)}
          {list.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#3d5060", fontSize: 11, letterSpacing: 2, fontFamily: "var(--font-display)" }}>NENHUMA CATEGORIA</div>}
        </Panel>
      )}
    </div>
  );
}
