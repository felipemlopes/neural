"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../_lib/auth";
import {
  PageHeader,
  Panel,
  Field,
  Input,
  Select,
  Button,
  Toggle,
  Loading,
  ErrorBanner,
  MoveButtons,
  Badge,
} from "../_components/ui";

type Link = {
  id: number;
  label: string;
  url: string;
  type: "telegram" | "whatsapp" | "other";
  active: boolean;
  order: number;
};

const emptyForm = { label: "", url: "", type: "telegram" as Link["type"], active: true };

const typeLabel: Record<Link["type"], string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  other: "Outro",
};

export default function LinksPage() {
  const [rows, setRows] = useState<Link[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<{ links: Link[] }>("/admin/community-links");
      setRows(data?.links ?? []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar links");
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

  const openEdit = (l: Link) => {
    setForm({ label: l.label, url: l.url, type: l.type, active: l.active });
    setEditingId(l.id);
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await apiFetch(`/admin/community-links/${editingId}`, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await apiFetch("/admin/community-links", { method: "POST", body: JSON.stringify(form) });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar link");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (l: Link) => {
    if (!confirm(`Excluir o link "${l.label}"?`)) return;
    try {
      await apiFetch(`/admin/community-links/${l.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao excluir link");
    }
  };

  const reorder = async (ids: number[]) => {
    try {
      await apiFetch("/admin/community-links/reorder", { method: "PATCH", body: JSON.stringify({ ids }) });
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
        title="LINKS DA COMUNIDADE"
        subtitle="Botões de WhatsApp, Telegram e outras comunidades"
        action={<Button onClick={showForm ? () => setShowForm(false) : openCreate}>{showForm ? "FECHAR" : "+ NOVO LINK"}</Button>}
      />

      {showForm && (
        <Panel title={editingId ? "Editar link" : "Novo link"}>
          <form onSubmit={save} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <Field label="Rótulo">
              <Input required value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Telegram" />
            </Field>
            <Field label="Tipo">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Link["type"] })}>
                <option value="telegram">Telegram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="other">Outro</option>
              </Select>
            </Field>
            <Field label="URL">
              <Input required type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
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
        <Loading label="CARREGANDO LINKS..." />
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
                <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{l.label}</div>
                <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>{l.url}</div>
              </div>
              <Badge color="var(--accent-blue)">{typeLabel[l.type].toUpperCase()}</Badge>
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
          {list.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#3d5060", fontSize: 11, letterSpacing: 2, fontFamily: "var(--font-display)" }}>NENHUM LINK CADASTRADO</div>}
        </Panel>
      )}
    </div>
  );
}
