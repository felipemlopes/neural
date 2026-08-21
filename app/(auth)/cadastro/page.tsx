"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setSession, type AuthUser } from "../../lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function CadastroPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.full_name = "Nome obrigatório.";
    if (!email.trim()) e.email = "E-mail obrigatório.";
    if (password.length < 8) e.password = "Mínimo 8 caracteres.";
    if (password !== passwordConfirmation) e.password_confirmation = "Senhas não coincidem.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Laravel validation errors: { errors: { field: ["msg"] } }
        if (data.errors) {
          const mapped: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.errors as Record<string, string[]>)) {
            mapped[k] = v[0];
          }
          setErrors(mapped);
          return;
        }
        throw new Error(data.message || "Erro ao criar conta.");
      }

      const { user, token } = data as { user: AuthUser; token: string };
      setSession(token, user);
      router.push("/");
    } catch (err) {
      setErrors({ global: err instanceof Error ? err.message : "Erro inesperado." });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
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
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    letterSpacing: ".18em",
    color: "#5c676a",
    textTransform: "uppercase",
    fontFamily: "var(--font-geist-mono)",
    marginBottom: 8,
  };

  const errorStyle: React.CSSProperties = {
    marginTop: 5,
    fontSize: 11,
    color: "#e84040",
    fontFamily: "var(--font-geist-mono)",
    letterSpacing: ".04em",
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

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(18,223,243,.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: 460 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none" }}
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
                <strong style={{ color: "var(--cyan)", fontWeight: 650 }}>CAPITAL</strong>
              </div>
              <div style={{ marginTop: 5, color: "#788285", font: "8px var(--font-geist-mono)", letterSpacing: ".2em" }}>
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
            NOVA CONTA
          </div>

          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "clamp(26px, 5vw, 36px)",
              lineHeight: 0.95,
              fontWeight: 300,
              letterSpacing: "-.04em",
              color: "#d8dcdd",
            }}
          >
            CRIAR ACESSO<span style={{ color: "var(--cyan)" }}>.</span>
          </h1>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
            Junte-se ao ecossistema Neural Capital.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Nome */}
            <div>
              <label style={labelStyle}>NOME COMPLETO</label>
              <input
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(18,223,243,.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              />
              {errors.full_name && <p style={errorStyle}>{errors.full_name}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>E-MAIL</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(18,223,243,.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
            </div>

            {/* Senha */}
            <div>
              <label style={labelStyle}>SENHA</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(18,223,243,.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              />
              {errors.password && <p style={errorStyle}>{errors.password}</p>}
            </div>

            {/* Confirmar senha */}
            <div>
              <label style={labelStyle}>CONFIRMAR SENHA</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Repita a senha"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(18,223,243,.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              />
              {errors.password_confirmation && (
                <p style={errorStyle}>{errors.password_confirmation}</p>
              )}
            </div>

            {errors.global && (
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
                {errors.global}
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
              {loading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
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
              Já tem conta?{" "}
              <Link
                href="/login"
                style={{
                  color: "var(--cyan)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 12,
                  letterSpacing: ".08em",
                }}
              >
                ENTRAR
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
