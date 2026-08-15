"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconDash, IconUsers, IconProjects, IconCategory, IconLesson, IconMedia, IconLink, IconConfig, IconChevron } from "./icons";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "DASHBOARD", Icon: IconDash },
  { href: "/admin/projetos", label: "PROJETOS", Icon: IconProjects },
  { href: "/admin/categorias", label: "CATEGORIAS", Icon: IconCategory },
  { href: "/admin/aulas", label: "AULAS", Icon: IconLesson },
  { href: "/admin/midia", label: "MÍDIA", Icon: IconMedia },
  { href: "/admin/links", label: "LINKS", Icon: IconLink },
  { href: "/admin/usuarios", label: "USUÁRIOS", Icon: IconUsers },
  { href: "/admin/config", label: "CONFIGURAÇÕES", Icon: IconConfig },
];

export default function Sidebar({
  sidebarOpen,
  isMobile,
  onToggle,
  onSelect,
}: {
  sidebarOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onSelect: () => void;
}) {
  const pathname = usePathname();
  const sidebarW = isMobile ? (sidebarOpen ? "220px" : "0px") : sidebarOpen ? "220px" : "56px";

  return (
    <aside
      style={{
        width: sidebarW,
        minWidth: sidebarW,
        background: "#0a0e14",
        borderRight: "1px solid rgba(0,212,232,0.1)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s",
        overflow: "hidden",
        position: isMobile ? "fixed" : "relative",
        top: 0,
        left: 0,
        height: "100%",
        zIndex: 10,
      }}
    >
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(0,212,232,0.1)", flexShrink: 0 }}>
        <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
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
          {sidebarOpen && (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 3,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              NEURAL <span style={{ color: "#00d4e8" }}>CAPITAL</span>
            </span>
          )}
        </Link>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard" || pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.Icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onSelect}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 16px",
                cursor: "pointer",
                position: "relative",
                borderLeft: `2px solid ${active ? "#00d4e8" : "transparent"}`,
                background: active ? "rgba(0,212,232,0.06)" : "transparent",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  color: active ? "#00d4e8" : "#3d5060",
                  flexShrink: 0,
                  width: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon />
              </div>
              {sidebarOpen && (
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    color: active ? "#e8edf2" : "#4a6070",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div
        onClick={onToggle}
        style={{
          padding: 16,
          borderTop: "1px solid rgba(0,212,232,0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: sidebarOpen ? "flex-end" : "center",
        }}
      >
        <IconChevron
          style={{
            color: "#6b7c8f",
            transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.25s",
          }}
        />
      </div>
    </aside>
  );
}