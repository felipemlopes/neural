"use client";

import Link from "next/link";
import { CYAN_DIM, LINE, TEXT, MUTED } from "../_lib/constants";
import type { AuthUser } from "../../lib/auth";

export default function MembersTopbar({
  user, title, onMenu, onLogout,
}: {
  user: AuthUser;
  title: string;
  onMenu: () => void;
  onLogout: () => void;
}) {
  const date = new Date().toLocaleDateString("pt-BR", {
    weekday: "short", day: "2-digit", month: "short", year: "numeric",
  }).toUpperCase();

  return (
    <header className="m-topbar">
      <button type="button" className="m-hamburger" onClick={onMenu} aria-label="Abrir menu">☰</button>

      <div style={{
        fontWeight: 700, fontSize: 16, letterSpacing: "2px", color: TEXT,
        fontFamily: "var(--font-geist-mono, monospace)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{title}</div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        <div className="m-topbar-date" style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)" }}>
          {date}
        </div>
        <div style={{ width: 1, height: 20, background: LINE }} />
        {user.role === "admin" && (
          <Link href="/admin/dashboard" style={{
            fontSize: 10, letterSpacing: "1.2px", color: CYAN_DIM,
            fontFamily: "var(--font-geist-mono, monospace)", textDecoration: "none",
          }}>
            ADMIN
          </Link>
        )}
        <button
          onClick={onLogout}
          className="m-topbar-btn"
          style={{
            background: "none", border: "none", fontSize: 10, letterSpacing: "1px",
            color: MUTED, cursor: "pointer",
            fontFamily: "var(--font-geist-mono, monospace)",
            transition: "color .2s", padding: 0,
          }}
        >SAIR</button>
      </div>
    </header>
  );
}

