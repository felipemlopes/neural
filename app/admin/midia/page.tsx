"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "../_lib/auth";
import {
  PageHeader,
  Panel,
  Field,
  Input,
  Select,
  Button,
  Loading,
  ErrorBanner,
  MoveButtons,
  Badge,
} from "../_components/ui";

type Media = {
  id: number;
  type: "image" | "pdf" | "video" | "link";
  title: string | null;
  file_path: string | null;
  external_url: string | null;
  order: number;
  file_url: string | null;
};

type Category = { id: number; name: string };
type Project = { id: number; title: string };
type Lesson = { id: number; title: string };

const typeLabel: Record<Media["type"], string> = {
  image: "Imagem",
  pdf: "PDF",
  video: "Vídeo",
  link: "Link",
};

export default function MidiaPage() {
  const [targetType, setTargetType] = useState<"project" | "lesson" | "category">("project");
  const [targetId, setTargetId] = useState("");
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ type: "image" as Media["type"], title: "", external_url: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const loadOptions = useCallback(async () => {
    try {
      let opts: { id: number; name: string }[] = [];
      if (targetType === "project") {
        const d = await apiFetch<{ projects: Project[] }>("/admin/projects");
        opts = (d?.projects ?? []).map((p) => ({ id: p.id, name: p.title }));
      } else if (targetType === "lesson") {
        const d = await apiFetch<{ lessons: Lesson[] }>("/admin/lessons");
        opts = (d?.lessons ?? []).map((l) => ({ id: l.id, name: l.title }));
      } else {
        const d = await apiFetch<{ categories: Category[] }>("/admin/categories");
        opts = (d?.categories ?? []).map((c) => ({ id: c.id, name: c.name }));
      }
      setOptions(opts);
      setTargetId("");
      setMedia([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar opções");
    }
  }, [targetType]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOptions();
  }, [loadOptions]);

  const loadMedia = useCallback(async () => {
    if (!targetId) {
      setMedia([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const d = await apiFetch<{ media: Media[] }>(`/admin/media?mediable_type=${targetType}&mediable_id=${targetId}`);
      setMedia(d?.media ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar mídia");
    } finally {
      setLoading(false);
    }
  }, [targetType, targetId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMedia();
  }, [loadMedia]);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetId) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("mediable_type", targetType);
    fd.append("mediable_id", targetId);
    fd.append("type", form.type);
    if (form.title) fd.append("title", form.title);
    if (form.external_url) fd.append("external_url", form.external_url);
    if (fileRef.current?.files?.[0]) fd.append("file", fileRef.current.files[0]);

    try {
      await apiFetch("/admin/media", { method: "POST", body: fd });
      setForm({ type: "image", title: "", external_url: "" });
      if (fileRef.current) fileRef.current.value = "";
      await loadMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar mídia");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (m: Media) => {
    if (!confirm("Excluir esta mídia?")) return;
    try {
      await apiFetch(`/admin/media/${m.id}`, { method: "DELETE" });
      await loadMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao excluir mídia");
    }
  };

  const reorder = async (ids: number[]) => {
    try {
      await apiFetch("/admin/media/reorder", { method: "PATCH", body: JSON.stringify({ ids }) });
      await loadMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao reordenar");
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    const next = [...media];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    reorder(next.map((r) => r.id));
  };

  const needsFile = form.type === "image" || form.type === "pdf";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader title="MÍDIA" subtitle="Imagens, PDFs, vídeos e links anexados a conteúdos" />

      <Panel title="Selecionar conteúdo">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Tipo de conteúdo">
            <Select value={targetType} onChange={(e) => setTargetType(e.target.value as typeof targetType)}>
              <option value="project">Projeto</option>
              <option value="lesson">Aula</option>
              <option value="category">Categoria</option>
            </Select>
          </Field>
          <Field label="Conteúdo">
            <Select value={targetId} onChange={(e) => setTargetId(e.target.value)}>
              <option value="">— Selecionar —</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </Select>
          </Field>
        </div>
      </Panel>

      {targetId && (
        <Panel title="Adicionar mídia">
          <form onSubmit={upload} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <Field label="Tipo">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Media["type"] })}>
                <option value="image">Imagem</option>
                <option value="pdf">PDF</option>
                <option value="video">Vídeo</option>
                <option value="link">Link</option>
              </Select>
            </Field>
            <Field label="Título (opcional)">
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            {needsFile ? (
              <Field label="Arquivo (ou URL)">
                <input
                  type="file"
                  ref={fileRef}
                  accept={form.type === "image" ? "image/*" : "application/pdf"}
                  style={{
                    width: "100%",
                    background: "#0f1520",
                    border: "1px solid rgba(0,212,232,0.15)",
                    borderRadius: 4,
                    padding: 8,
                    color: "#e8edf2",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                  }}
                />
              </Field>
            ) : (
              <Field label="URL">
                <Input required type="url" value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} placeholder="https://..." />
              </Field>
            )}
            {needsFile && (
              <Field label="URL externa (opcional)">
                <Input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} />
              </Field>
            )}
            <div style={{ gridColumn: "1 / -1" }}>
              <Button type="submit" disabled={uploading}>{uploading ? "ENVIANDO..." : "ADICIONAR"}</Button>
            </div>
          </form>
        </Panel>
      )}

      {error && <ErrorBanner message={error} onRetry={loadMedia} />}

      {loading ? (
        <Loading label="CARREGANDO MÍDIA..." />
      ) : (
        targetId && (
          <Panel style={{ padding: 0, overflow: "hidden" }}>
            {media.map((m, i) => (
              <div
                key={m.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto",
                  gap: 14,
                  alignItems: "center",
                  padding: "13px 20px",
                  borderBottom: "1px solid rgba(0,212,232,0.06)",
                }}
              >
                <MoveButtons onUp={() => move(i, -1)} onDown={() => move(i, 1)} disabledUp={i === 0} disabledDown={i === media.length - 1} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {m.title ?? (m.file_path ?? m.external_url ?? "Mídia")}
                  </div>
                  <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>
                    {m.file_url ? m.file_url : m.external_url}
                  </div>
                </div>
                <Badge color="var(--accent-blue)">{typeLabel[m.type].toUpperCase()}</Badge>
                <button
                  onClick={() => remove(m)}
                  style={{ background: "transparent", border: "none", color: "#e84040", fontSize: 11, cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
                >
                  EXCLUIR
                </button>
              </div>
            ))}
            {media.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#3d5060", fontSize: 11, letterSpacing: 2, fontFamily: "var(--font-display)" }}>NENHUMA MÍDIA</div>}
          </Panel>
        )
      )}
    </div>
  );
}
