"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../_lib/auth";
import { PageHeader, Panel, Field, Input, Button, Toggle, Loading, ErrorBanner } from "../_components/ui";

const textFields = [
  { key: "site_name", label: "Nome da Plataforma" },
  { key: "support_email", label: "Email de Suporte" },
  { key: "timezone", label: "Timezone" },
  { key: "base_currency", label: "Moeda Base" },
];

const toggleFields = [
  { key: "email_notifications", label: "Notificações por email" },
  { key: "two_factor_auth", label: "Autenticação 2FA" },
  { key: "maintenance_mode", label: "Modo manutenção" },
  { key: "access_logs", label: "Logs de acesso" },
];

export default function ConfigPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<{ settings: Record<string, string> }>("/admin/settings");
      setSettings(data?.settings ?? {});
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar configurações");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const set = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      await apiFetch("/admin/settings", { method: "POST", body: JSON.stringify({ settings }) });
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  const toggle = (key: string) => {
    set(key, settings[key] === "1" ? "0" : "1");
  };

  if (loading) return <Loading label="CARREGANDO CONFIGURAÇÕES..." />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <PageHeader
        title="CONFIGURAÇÕES"
        subtitle="Preferências gerais do portal"
        action={
          <Button onClick={save} disabled={saving}>
            {saving ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
          </Button>
        }
      />

      {saved && !error && (
        <div style={{ background: "rgba(0,212,232,0.08)", border: "1px solid rgba(0,212,232,0.3)", borderRadius: 4, padding: "10px 14px", fontSize: 12, color: "#00d4e8" }}>
          Configurações salvas com sucesso.
        </div>
      )}
      {error && <ErrorBanner message={error} onRetry={load} />}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        <Panel title="Configurações gerais">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {textFields.map((f) => (
              <Field key={f.key} label={f.label}>
                <Input value={settings[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
              </Field>
            ))}
          </div>
        </Panel>

        <Panel title="Preferências do sistema">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {toggleFields.map((t) => (
              <div
                key={t.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 12,
                  borderBottom: "1px solid rgba(0,212,232,0.06)",
                }}
              >
                <span style={{ fontSize: 13, color: "#c0cdd8" }}>{t.label}</span>
                <Toggle checked={(settings[t.key] ?? "0") === "1"} onChange={() => toggle(t.key)} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
