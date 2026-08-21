"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CYAN, CYAN_DIM, LINE, TEXT, MUTED, NAV_ITEMS } from "../_lib/constants";
import type { AuthUser } from "../../lib/auth";

function initials(user: AuthUser) {
  return user.full_name
    ? user.full_name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : user.email[0].toUpperCase();
}

export default function MembersSidebar({
  user, open, onClose, onLogout,
}: {
  user: AuthUser;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={`m-sidebar${open ? " open" : ""}`}>

      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${LINE}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flex: 1, minWidth: 0 }}>
            <div style={{
              width: 32, height: 32, display: "grid", placeItems: "center", flexShrink: 0,
              border: "1px solid rgba(18,223,243,.55)", color: CYAN,
              font: "700 18px var(--font-geist-mono, monospace)",
              clipPath: "polygon(0 0,100% 0,100% 82%,82% 100%,0 100%)",
              background: "rgba(18,223,243,.05)",
            }}>N</div>
            <div>
              <div style={{ fontSize: 13, letterSpacing: ".16em", color: "#cbd1d2", fontFamily: "var(--font-geist-mono, monospace)" }}>
                NEURAL <strong style={{ color: CYAN }}>CAPITAL</strong>
              </div>
              <div style={{ fontSize: 8, color: "#788285", letterSpacing: ".2em", fontFamily: "var(--font-geist-mono, monospace)", marginTop: 3 }}>
                ÁREA DE MEMBROS
              </div>
            </div>
          </Link>
          <button type="button" className="m-sidebar-close" onClick={onClose} aria-label="Fechar menu">✕</button>
        </div>
      </div>

      {/* Usuário */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${LINE}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg,${CYAN},#0099aa)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 12, color: "#041013",
        }}>{initials(user)}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user.full_name?.split(" ")[0] ?? user.email}
          </div>
          <div style={{ fontSize: 9, color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: ".1em" }}>
            {user.role === "admin" ? "ADMIN" : "MEMBRO"}
          </div>
        </div>
        <div style={{
          marginLeft: "auto", width: 7, height: 7, borderRadius: "50%",
          background: CYAN, animation: "m-pulse-dot 2s infinite", flexShrink: 0,
        }} />
      </div>

      {/* Navegação */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              className={`m-nav-item${active ? " active" : ""}`}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                background: active ? "rgba(18,223,243,.06)" : undefined,
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 14, opacity: .7 }}>{item.icon}</span>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
                color: active ? CYAN : MUTED,
                fontFamily: "var(--font-geist-mono, monospace)",
              }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div style={{ padding: "16px 24px", borderTop: `1px solid ${LINE}` }}>
        {user.role === "admin" && (
          <Link href="/admin/dashboard" style={{
            display: "block", marginBottom: 10, fontSize: 10, letterSpacing: "1.5px",
            color: CYAN_DIM, fontFamily: "var(--font-geist-mono, monospace)", textDecoration: "none",
          }}>
            ⚙ PAINEL ADMIN
          </Link>
        )}
        <button onClick={onLogout} style={{
          width: "100%", background: "transparent",
          border: "1px solid rgba(18,223,243,.15)",
          color: MUTED, fontSize: 10, letterSpacing: "1.5px",
          padding: "9px 0", cursor: "pointer",
          fontFamily: "var(--font-geist-mono, monospace)",
        }}>SAIR →</button>
      </div>
    </aside>
  );
}

