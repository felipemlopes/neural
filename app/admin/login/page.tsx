"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, setSession, type AuthUser } from "../_lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch<{ user: AuthUser; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (data.user.role !== "admin") {
        setError("Acesso restrito: este painel é exclusivo para administradores.");
        return;
      }

      setSession(data.token, data.user);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#07090d",
        color: "#e8edf2",
        fontFamily: "var(--font-body)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#0a0e14",
          border: "1px solid rgba(0,212,232,0.12)",
          borderRadius: 8,
          padding: "36px 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: "linear-gradient(135deg,#00d4e8,#0099aa)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polygon points="9,2 16,6 16,12 9,16 2,12 2,6" stroke="#07090d" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="2.5" fill="#07090d" />
              <line x1="9" y1="2" x2="9" y2="6.5" stroke="#07090d" strokeWidth="1.2" />
              <line x1="9" y1="11.5" x2="9" y2="16" stroke="#07090d" strokeWidth="1.2" />
              <line x1="2" y1="6" x2="6.5" y2="8" stroke="#07090d" strokeWidth="1.2" />
              <line x1="11.5" y1="10" x2="16" y2="12" stroke="#07090d" strokeWidth="1.2" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: 3,
              color: "#fff",
            }}
          >
            NEURAL <span style={{ color: "#00d4e8" }}>CAPITAL</span>
          </span>
        </div>

        <h1
          style={{
            margin: "0 0 6px",
            fontFamily: "var(--font-display)",
            fontSize: 26,
            letterSpacing: 2,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          PAINEL ADMIN
        </h1>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "#3d5060" }}>
          Acesse com suas credenciais de gestor.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: 10,
                letterSpacing: 1.5,
                color: "#3d5060",
                fontFamily: "var(--font-display)",
                marginBottom: 6,
              }}
            >
              EMAIL
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@neuralcapital.com"
              style={{
                width: "100%",
                background: "#0f1520",
                border: "1px solid rgba(0,212,232,0.15)",
                borderRadius: 4,
                padding: "10px 12px",
                color: "#e8edf2",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: 10,
                letterSpacing: 1.5,
                color: "#3d5060",
                fontFamily: "var(--font-display)",
                marginBottom: 6,
              }}
            >
              SENHA
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              style={{
                width: "100%",
                background: "#0f1520",
                border: "1px solid rgba(0,212,232,0.15)",
                borderRadius: 4,
                padding: "10px 12px",
                color: "#e8edf2",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "rgba(232,64,64,0.08)",
                border: "1px solid rgba(232,64,64,0.3)",
                borderRadius: 4,
                padding: "10px 12px",
                fontSize: 12,
                color: "#e84040",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              background: "#00d4e8",
              color: "#07090d",
              border: "none",
              padding: "12px 20px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              cursor: loading ? "wait" : "pointer",
              borderRadius: 4,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>

        <Link
          href="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: 20,
            fontSize: 12,
            color: "#3d5060",
            letterSpacing: 1,
          }}
        >
          ← Voltar ao site
        </Link>
      </div>
    </div>
  );
}