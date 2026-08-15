"use client";

import { useRouter } from "next/navigation";
import { IconSearch, IconBell } from "./icons";
import { apiFetch, clearSession, type AuthUser } from "../_lib/auth";

function initials(user: AuthUser): string {
  const name = user.full_name || user.email;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Topbar({
  user,
  isMobile,
  onToggleSidebar,
}: {
  user: AuthUser | null;
  isMobile: boolean;
  onToggleSidebar: () => void;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // token local é removido mesmo se a API falhar
    }
    clearSession();
    router.push("/admin/login");
  };

  return (
    <header
      style={{
        height: 56,
        background: "#0a0e14",
        borderBottom: "1px solid rgba(0,212,232,0.1)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 12,
        flexShrink: 0,
      }}
    >
      {isMobile && (
        <div
          onClick={onToggleSidebar}
          style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: 4 }}
        >
          <div style={{ width: 18, height: 2, background: "#6b7c8f", borderRadius: 1 }} />
          <div style={{ width: 18, height: 2, background: "#6b7c8f", borderRadius: 1 }} />
          <div style={{ width: 18, height: 2, background: "#6b7c8f", borderRadius: 1 }} />
        </div>
      )}

      <div style={{ flex: 1 }}>
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#0f1520",
              border: "1px solid rgba(0,212,232,0.12)",
              borderRadius: 4,
              padding: "7px 12px",
              maxWidth: 320,
            }}
          >
            <IconSearch />
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "#e8edf2",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                width: "100%",
              }}
            />
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <IconBell />
          <div
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 7,
              height: 7,
              background: "#00d4e8",
              borderRadius: "50%",
              border: "1.5px solid #0a0e14",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#00d4e8,#0077aa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 13,
              color: "#07090d",
            }}
          >
            {initials(user ?? { id: 0, email: "Admin", full_name: "Admin", role: "admin" })}
          </div>
          <div style={{ display: isMobile ? "none" : "block" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e8edf2", lineHeight: 1.2 }}>
              {user?.full_name || "Admin"}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#3d5060",
                letterSpacing: 1,
                fontFamily: "var(--font-display)",
              }}
            >
              GESTOR
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid rgba(0,212,232,0.25)",
            color: "#6b7c8f",
            padding: "6px 12px",
            fontFamily: "var(--font-display)",
            fontSize: 11,
            letterSpacing: 1.5,
            cursor: "pointer",
            borderRadius: 4,
          }}
        >
          SAIR
        </button>
      </div>
    </header>
  );
}