export const CYAN     = "#12dff3";
export const CYAN_DIM = "rgba(18,223,243,.4)";
export const CYAN_BG  = "rgba(18,223,243,.06)";
export const BG       = "#07090b";
export const PANEL    = "#0d1114";
export const LINE     = "rgba(160,201,208,.16)";
export const TEXT     = "#f2f5f5";
export const MUTED    = "#99a4a7";
export const API_URL  = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const NAV_ITEMS = [
  { key: "dashboard",  label: "DASHBOARD",  icon: "◈", href: "/home/dashboard"  },
  { key: "aulas",      label: "AULAS",      icon: "▶", href: "/home/aulas"      },
  { key: "projetos",   label: "PROJETOS",   icon: "◉", href: "/home/projetos"   },
  { key: "comunidade", label: "COMUNIDADE", icon: "○", href: "/home/comunidade" },
  { key: "recursos",   label: "RECURSOS",   icon: "◎", href: "/home/recursos"   },
] as const;

export const RECURSOS_FIXOS = [
  { label: "Planilha de Gestão",    type: "GOOGLE SHEETS",   icon: "📊", url: "#" },
  { label: "Script Pine",           type: "TRADINGVIEW",     icon: "📈", url: "#" },
  { label: "Manual do Trader",      type: "PDF · 48 PÁG",   icon: "📄", url: "#" },
  { label: "Robô MT5",              type: "DOWNLOAD EA",     icon: "🤖", url: "#" },
  { label: "Calendário Econômico",  type: "LINK EXTERNO",    icon: "📅", url: "#" },
  { label: "Análises Semanais",     type: "YOUTUBE PRIVADO", icon: "🎬", url: "#" },
  { label: "Suporte Direto",        type: "WHATSAPP",        icon: "💬", url: "#" },
  { label: "Grupo VIP",             type: "TELEGRAM",        icon: "✈",  url: "#" },
];

