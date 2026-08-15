"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import useViewport from "../_hooks/useViewport";
import { apiFetch, clearSession, getToken, type AuthUser } from "../_lib/auth";

function LoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#07090d",
        color: "#3d5060",
        fontFamily: "var(--font-display)",
        letterSpacing: 2,
        fontSize: 13,
      }}
    >
      CARREGANDO...
    </div>
  );
}

export default function Shell({
  children,
  fontClass,
}: {
  children: React.ReactNode;
  fontClass: string;
}) {
  const { isMobile } = useViewport();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    apiFetch<{ user: AuthUser }>("/auth/me")
      .then((data) => {
        if (data.user.role !== "admin") throw new Error("Acesso restrito");
        setUser(data.user);
        setReady(true);
      })
      .catch(() => {
        clearSession();
        router.replace("/admin/login");
      });
  }, [router]);

  if (!ready) return <LoadingScreen />;

  const sidebarOpen = isMobile ? mobileOpen : !collapsed;
  const toggleSidebar = () =>
    isMobile ? setMobileOpen((v) => !v) : setCollapsed((v) => !v);
  const closeSidebar = () => setMobileOpen(false);

  return (
    <div
      className={`admin ${fontClass}`}
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "var(--font-body)",
        background: "#07090d",
        color: "#e8edf2",
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9 }}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        onToggle={toggleSidebar}
        onSelect={closeSidebar}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar user={user} isMobile={isMobile} onToggleSidebar={toggleSidebar} />
        <main style={{ flex: 1, overflowY: "auto", padding: 24, animation: "fadeIn 0.3s ease" }}>
          {children}
        </main>
      </div>
    </div>
  );
}