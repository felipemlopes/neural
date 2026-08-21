"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setSession, type AuthUser } from "../../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.errors?.email?.[0] || "Credenciais inválidas.");
      }

      const { user, token } = data as { user: AuthUser; token: string };
      setSession(token, user);

      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid de fundo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(83,137,143,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(83,137,143,.12) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Glow radial */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(18,223,243,.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                display: "grid",
                placeItems: "center",
                border: "1px solid rgba(18,223,243,.55)",
                color: "var(--cyan)",
                font: "700 22px var(--font-geist-mono)",
                clipPath: "polygon(0 0,100% 0,100% 82%,82% 100%,0 100%)",
                background: "rgba(18,223,243,.05)",
              }}
            >
              N
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: ".16em",
                  color: "#cbd1d2",
                  lineHeight: 1.05,
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                NEURAL{" "}
                <strong style={{ color: "var(--cyan)", fontWeight: 650 }}>
                  CAPITAL
                </strong>
              </div>
              <div
                style={{
                  marginTop: 5,
                  color: "#788285",
                  font: "8px var(--font-geist-mono)",
                  letterSpacing: ".2em",
                }}
              >
                QUANTITATIVE SYSTEMS
              </div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            padding: "36px 32px",
            position: "relative",
          }}
        >
          {/* Linha ciano topo */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, var(--cyan), transparent)",
              opacity: 0.6,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--cyan)",
              textTransform: "uppercase",
              font: "10px var(--font-geist-mono)",
              letterSpacing: ".22em",
              marginBottom: 18,
            }}
          >
            <span style={{ width: 22, height: 1, background: "var(--cyan)", display: "inline-block" }} />
            ACESSO À PLATAFORMA
          </div>

          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "clamp(28px, 5vw, 38px)",
              lineHeight: 0.95,
              fontWeight: 300,
              letterSpacing: "-.04em",
              color: "#d8dcdd",
            }}
          >
            BEM-VINDO<span style={{ color: "var(--cyan)" }}>.</span>
          </h1>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: 14,
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            Entre com suas credenciais para acessar o ecossistema.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  letterSpacing: ".18em",
                  color: "#5c676a",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-geist-mono)",
                  marginBottom: 8,
                }}
              >
                E-MAIL
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={{
                  width: "100%",
                  background: "#060a0d",
                  border: "1px solid var(--line)",
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: 14,
                  outline: "none",
                  transition: ".2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(18,223,243,.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--line)")
                }
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  letterSpacing: ".18em",
                  color: "#5c676a",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-geist-mono)",
                  marginBottom: 8,
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
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "#060a0d",
                  border: "1px solid var(--line)",
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: 14,
                  outline: "none",
                  transition: ".2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(18,223,243,.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--line)")
                }
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(232,64,64,.07)",
                  border: "1px solid rgba(232,64,64,.3)",
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#e84040",
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: ".04em",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="button"
              style={{
                marginTop: 4,
                width: "100%",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? "AUTENTICANDO..." : "ENTRAR"}
              {!loading && <span className="arrow" style={{ fontSize: 14 }}>→</span>}
            </button>
          </form>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Não tem conta?{" "}
              <Link
                href="/cadastro"
                style={{
                  color: "var(--cyan)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 12,
                  letterSpacing: ".08em",
                }}
              >
                CADASTRAR
              </Link>
            </span>
            <Link
              href="/"
              style={{
                fontSize: 12,
                color: "#5c676a",
                textDecoration: "none",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: ".08em",
              }}
            >
              ← VOLTAR
            </Link>
          </div>
        </div>

        {/* Rodapé */}
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#3a4548",
            font: "9px var(--font-geist-mono)",
            letterSpacing: ".14em",
            textTransform: "uppercase",
          }}
        >
          © 2026 Neural Capital — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
