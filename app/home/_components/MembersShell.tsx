"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getStoredUser, clearSession, type AuthUser } from "../../lib/auth";
import { CYAN, CYAN_DIM, BG } from "../_lib/constants";
import MembersSidebar from "./MembersSidebar";
import MembersTopbar from "./MembersTopbar";
import { NAV_ITEMS } from "../_lib/constants";
import "../membros.css";

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", background: BG, display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, margin: "0 auto 20px",
          display: "grid", placeItems: "center",
          border: "1px solid rgba(18,223,243,.55)", color: CYAN,
          font: "700 22px var(--font-geist-mono, monospace)",
          clipPath: "polygon(0 0,100% 0,100% 82%,82% 100%,0 100%)",
          background: "rgba(18,223,243,.05)",
        }}>N</div>
        <div style={{
          fontSize: 9, color: CYAN_DIM, letterSpacing: "3px",
          fontFamily: "var(--font-geist-mono, monospace)",
          animation: "m-pulse-dot 1.5s infinite",
        }}>CARREGANDO...</div>
      </div>
    </div>
  );
}

export default function MembersShell({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [user, setUser]           = useState<AuthUser | null>(null);
  const [ready, setReady]         = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth guard
  useEffect(() => {
    const stored = getStoredUser();
    if (!stored) {
      router.replace("/login");
      return;
    }
    setUser(stored);
    setReady(true);
  }, [router]);

  // Bloqueia scroll body quando sidebar mobile aberta
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleLogout = useCallback(() => {
    clearSession();
    router.push("/");
  }, [router]);

  // Resolve título pela rota atual
  const currentNav = NAV_ITEMS.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/"),
  );
  const title = currentNav?.label ?? "DASHBOARD";

  if (!ready || !user) return <LoadingScreen />;

  return (
    <div className="m-shell">
      {/* Scanline sutil */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999,
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.025) 2px,rgba(0,0,0,.025) 4px)",
        }}
      />

      {/* Overlay mobile */}
      <div
        className={`m-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <MembersSidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main className="m-main">
        <MembersTopbar
          user={user}
          title={title}
          onMenu={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <div className="m-content">
          {children}
        </div>
      </main>
    </div>
  );
}

