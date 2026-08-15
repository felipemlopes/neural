"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../_lib/auth";
import { statusColor } from "../_components/data/mockData";
import useViewport from "../_hooks/useViewport";

interface ApiUser {
  id: number;
  email: string;
  full_name: string | null;
  role: string;
  last_seen_at: string | null;
  created_at: string;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ name, size = 30 }: { name: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#00d4e8,#0077aa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        color: "#07090d",
        fontFamily: "var(--font-display)",
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

function displayName(u: ApiUser): string {
  return u.full_name || u.email.split("@")[0];
}

function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("pt-BR");
  } catch {
    return "—";
  }
}

function roleLabel(role: string): string {
  return role === "admin" ? "Admin" : "Member";
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#0f1520",
  border: "1px solid rgba(0,212,232,0.15)",
  borderRadius: 4,
  padding: "9px 12px",
  color: "#e8edf2",
  fontFamily: "var(--font-body)",
  fontSize: 13,
  outline: "none",
};

export default function UsuariosPage() {
  const { isMobile } = useViewport();
  const [rows, setRows] = useState<ApiUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "member" });

  const load = useCallback(async () => {
    try {
      const data = await apiFetch<{ users: ApiUser[] }>("/admin/users");
      setRows(data.users);
      setError("");
    } catch (err) {
      setRows(null);
      setError(err instanceof Error ? err.message : "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const changeRole = async (u: ApiUser) => {
    const next = u.role === "admin" ? "member" : "admin";
    try {
      await apiFetch(`/admin/users/${u.id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: next }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao alterar role");
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await apiFetch("/admin/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ full_name: "", email: "", password: "", role: "member" });
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao criar usuário");
    } finally {
      setSaving(false);
    }
  };

  const list = rows ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <h1
          style={{
            fontSize: isMobile ? 18 : 22,
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            letterSpacing: 2,
            color: "#fff",
          }}
        >
          USUÁRIOS
        </h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            background: "#00d4e8",
            color: "#07090d",
            border: "none",
            padding: "9px 18px",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: 2,
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          {showForm ? "FECHAR" : "+ NOVO USUÁRIO"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createUser}
          style={{
            background: "#0a0e14",
            border: "1px solid rgba(0,212,232,0.12)",
            borderRadius: 6,
            padding: 20,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 110px auto",
            gap: 14,
            alignItems: "end",
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 6 }}>
              NOME
            </label>
            <input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="Nome completo"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 6 }}>
              EMAIL
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="usuario@email.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 6 }}>
              SENHA
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="mín. 8 caracteres"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: 1.5, color: "#3d5060", fontFamily: "var(--font-display)", marginBottom: 6 }}>
              ROLE
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="member">member</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{
              background: "rgba(0,212,232,0.12)",
              border: "1px solid #00d4e8",
              color: "#00d4e8",
              padding: "9px 18px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 2,
              cursor: saving ? "wait" : "pointer",
              borderRadius: 4,
            }}
          >
            {saving ? "SALVANDO..." : "CRIAR"}
          </button>
        </form>
      )}

      {error && (
        <div
          style={{
            background: "rgba(232,64,64,0.08)",
            border: "1px solid rgba(232,64,64,0.3)",
            borderRadius: 4,
            padding: "10px 14px",
            fontSize: 12,
            color: "#e84040",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span>{error}</span>
          <button
            onClick={() => {
              setLoading(true);
              load();
            }}
            style={{
              background: "transparent",
              border: "1px solid rgba(232,64,64,0.4)",
              color: "#e84040",
              padding: "5px 12px",
              fontFamily: "var(--font-display)",
              fontSize: 11,
              letterSpacing: 1.5,
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            TENTAR NOVAMENTE
          </button>
        </div>
      )}

      {loading ? (
        <div
          style={{
            background: "#0a0e14",
            border: "1px solid rgba(0,212,232,0.12)",
            borderRadius: 6,
            padding: 40,
            textAlign: "center",
            fontSize: 12,
            letterSpacing: 2,
            color: "#3d5060",
            fontFamily: "var(--font-display)",
          }}
        >
          CARREGANDO USUÁRIOS...
        </div>
      ) : isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((u) => (
            <div
              key={u.id}
              style={{
                background: "#0a0e14",
                border: "1px solid rgba(0,212,232,0.12)",
                borderRadius: 6,
                padding: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={displayName(u)} size={34} />
                <div>
                  <div style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{displayName(u)}</div>
                  <div style={{ fontSize: 11, color: "#3d5060", marginTop: 2 }}>{u.email}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, fontFamily: "var(--font-display)", letterSpacing: 1, color: statusColor(u.role === "admin" ? "Ativo" : "Inativo") }}>
                  {roleLabel(u.role)}
                </div>
                <div style={{ fontSize: 11, color: "#00d4e8", cursor: "pointer", marginTop: 4, letterSpacing: 1, fontFamily: "var(--font-display)" }}>
                  ALTERAR
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: "#0a0e14", border: "1px solid rgba(0,212,232,0.12)", borderRadius: 6, overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr 80px 90px 100px 70px",
              gap: 12,
              padding: "10px 20px",
              borderBottom: "1px solid rgba(0,212,232,0.08)",
            }}
          >
            {["NOME", "EMAIL", "ROLE", "STATUS", "CADASTRO", "AÇÃO"].map((h, i) => (
              <span key={i} style={{ fontSize: 9, letterSpacing: 2, color: "#3d5060", fontFamily: "var(--font-display)" }}>
                {h}
              </span>
            ))}
          </div>
          {list.map((u) => (
            <div
              key={u.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr 80px 90px 100px 70px",
                gap: 12,
                padding: "14px 20px",
                borderBottom: "1px solid rgba(0,212,232,0.06)",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={displayName(u)} />
                <span style={{ fontSize: 13, color: "#c0cdd8", fontWeight: 500 }}>{displayName(u)}</span>
              </div>
              <span style={{ fontSize: 12, color: "#5a7a8a" }}>{u.email}</span>
              <span style={{ fontSize: 11, fontFamily: "var(--font-display)", letterSpacing: 1, color: u.role === "admin" ? "var(--accent)" : "var(--text-faint)" }}>
                {roleLabel(u.role)}
              </span>
              <span style={{ fontSize: 11, fontFamily: "var(--font-display)", letterSpacing: 1, color: statusColor("Ativo") }}>
                Ativo
              </span>
              <span style={{ fontSize: 12, color: "#3d5060" }}>{formatDate(u.created_at)}</span>
              <span
                onClick={() => changeRole(u)}
                style={{ fontSize: 11, color: "#00d4e8", cursor: "pointer", letterSpacing: 1, fontFamily: "var(--font-display)" }}
              >
                {u.role === "admin" ? "REBAIXAR" : "PROMOVER"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}