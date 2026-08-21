"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredUser, clearSession } from "./lib/auth";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Project = {
  id: number;
  market: "forex" | "crypto";
  index: string;
  title: string;
  slug: string | null;
  description: string;
  cta: string;
  target: string;
};

type CommunityLink = {
  id: number;
  label: string;
  url: string;
  type: "telegram" | "whatsapp" | "other";
};

type Props = {
  forexProjects: Project[];
  cryptoProjects: Project[];
  communityLinks: CommunityLink[];
};

// ─── Componentes de apoio ─────────────────────────────────────────────────────

const navItems = [
  ["Início", "#inicio"],
  ["Forex", "#forex"],
  ["Criptoativos", "#criptoativos"],
  ["Comunidade", "#comunidade"],
  ["Suporte", "#comunidade"],
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#inicio" aria-label="Neural Capital — início">
      <span className="brand-symbol" aria-hidden="true">N</span>
      <span className="brand-name">
        <b>NEURAL</b> CAPITAL
        {!compact && <small>QUANTITATIVE SYSTEMS</small>}
      </span>
    </a>
  );
}

function ArrowIcon() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-title">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ProjectCard({
  index,
  title,
  description,
  cta = "Conhecer",
  target = "#",
  slug,
}: Pick<Project, "index" | "title" | "description" | "cta" | "target" | "slug">) {
  const href = slug ? `/projeto/${slug}` : target;
  return (
    <article className="project-card">
      <div className="card-top">
        <span>{index}</span>
        <span className="card-node" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href}>
        {cta}
        <ArrowIcon />
      </Link>
    </article>
  );
}

// ─── Avatar / perfil no header ───────────────────────────────────────────────

function UserMenu() {
  const [user, setUser] = useState<ReturnType<typeof getStoredUser>>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="button button-small desktop-community"
        style={{ whiteSpace: "nowrap" }}
      >
        Entrar
      </Link>
    );
  }

  const initials = user.full_name
    ? user.full_name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu do usuário"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(18,223,243,.07)",
          border: "1px solid rgba(18,223,243,.3)",
          padding: "6px 12px 6px 6px",
          cursor: "pointer",
          color: "var(--text)",
        }}
      >
        {/* Avatar */}
        <span
          style={{
            width: 30,
            height: 30,
            background: "linear-gradient(135deg,#12dff3,#0099aa)",
            display: "grid",
            placeItems: "center",
            color: "#041013",
            font: "700 12px var(--font-geist-mono)",
            flexShrink: 0,
          }}
        >
          {initials}
        </span>
        <span
          style={{
            fontSize: 12,
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: ".08em",
            maxWidth: 110,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#cbd1d2",
          }}
        >
          {user.full_name?.split(" ")[0] ?? user.email}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{ color: "var(--cyan)", transition: ".2s", transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 180,
            background: "#0d1114",
            border: "1px solid var(--line)",
            zIndex: 100,
          }}
        >
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 2 }}>
              {user.full_name ?? "Usuário"}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}>
              {user.email}
            </div>
          </div>

          <Link
            href="/home"
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 14px",
              fontSize: 12,
              color: "#e0f0f0",
              fontFamily: "var(--font-geist-mono)",
              letterSpacing: ".08em",
              borderBottom: "1px solid var(--line)",
              textDecoration: "none",
            }}
          >
            ◈ ÁREA DE MEMBROS
          </Link>

          {user.role === "admin" && (
            <Link
              href="/admin/dashboard"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 14px",
                fontSize: 12,
                color: "var(--cyan)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: ".08em",
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
              }}
            >
              ⚙ PAINEL ADMIN
            </Link>
          )}

          <button
            onClick={() => {
              clearSession();
              setUser(null);
              setOpen(false);
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 14px",
              fontSize: 12,
              color: "#e84040",
              fontFamily: "var(--font-geist-mono)",
              letterSpacing: ".08em",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            → SAIR
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function HomeClient({
  forexProjects,
  cryptoProjects,
  communityLinks,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Separa links por tipo para os botões da seção comunidade
  const telegramLink = communityLinks.find((l) => l.type === "telegram");
  const whatsappLink = communityLinks.find((l) => l.type === "whatsapp");

  return (
    <main>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="site-header">
        <div className="shell header-inner">
          <Brand compact />
          <nav
            className={menuOpen ? "main-nav open" : "main-nav"}
            aria-label="Navegação principal"
          >
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <Link
              className="mobile-community"
              href="/login"
              onClick={() => setMenuOpen(false)}
            >
              Entrar
            </Link>
          </nav>
          <UserMenu />
          <button
            className={menuOpen ? "menu-toggle active" : "menu-toggle"}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="signal signal-one" aria-hidden="true" />
        <div className="signal signal-two" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <i />
              Inteligência aplicada a mercados
            </span>
            <h1>
              <span>NEURAL</span>
              <br />
              CAPITAL
            </h1>
            <p className="hero-lead">Forex &amp; Criptoativos em um único ecossistema.</p>
            <p className="hero-text">
              Tecnologia, automação, educação e acesso aos nossos projetos em
              mercados financeiros e ativos digitais.
            </p>
            <div className="hero-actions">
              <a className="button" href="#forex">
                Explorar Forex <ArrowIcon />
              </a>
              <a className="button button-ghost" href="#criptoativos">
                Explorar Criptoativos <ArrowIcon />
              </a>
            </div>
            <div className="hero-metrics" aria-label="Áreas do ecossistema">
              <div>
                <strong>02</strong>
                <span>Mercados</span>
              </div>
              <div>
                <strong>{String(forexProjects.length + cryptoProjects.length).padStart(2, "0")}</strong>
                <span>Projetos</span>
              </div>
              <div>
                <strong>01</strong>
                <span>Ecossistema</span>
              </div>
            </div>
          </div>

          <div
            className="brand-showcase"
            aria-label="Neural Capital — Quantitative Systems, Institutional Investments"
          >
            <div className="n-stage">
              <div
                className="n-spinner"
                role="img"
                aria-label="Símbolo N original da Neural Capital"
              >
                <img className="n-face n-front" src="/neural-capital-n-original.png" alt="" aria-hidden="true" />
                <img className="n-face n-back" src="/neural-capital-n-original.png" alt="" aria-hidden="true" />
                <img className="n-face n-quarter n-quarter-one" src="/neural-capital-n-original.png" alt="" aria-hidden="true" />
                <img className="n-face n-quarter n-quarter-two" src="/neural-capital-n-original.png" alt="" aria-hidden="true" />
              </div>
            </div>
            <div className="showcase-name">
              <strong>NEURAL</strong>
              <span>CAPITAL</span>
            </div>
            <div className="showcase-tagline">
              QUANTITATIVE SYSTEMS <i>•</i> INSTITUTIONAL INVESTMENTS
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#forex">
          <span />
          DESCUBRA O ECOSSISTEMA
        </a>
      </section>

      {/* ── Forex ──────────────────────────────────────────────────────── */}
      <section className="market-section" id="forex">
        <div className="shell">
          <SectionTitle
            eyebrow="Mercado global"
            title="Forex"
            text="Tecnologia e automação para acompanhar o mercado de câmbio com uma visão estruturada."
          />
          <div className="cards-grid forex-grid">
            {forexProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Criptoativos ───────────────────────────────────────────────── */}
      <section className="market-section crypto-section" id="criptoativos">
        <div className="shell">
          <SectionTitle
            eyebrow="Ativos digitais"
            title="Criptoativos"
            text="Acesso organizado aos projetos, conteúdos e oportunidades que compõem nosso ecossistema digital."
          />
          <div className="cards-grid crypto-grid">
            {cryptoProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Caminho ────────────────────────────────────────────────────── */}
      <section className="path-section">
        <div className="shell path-grid">
          <div>
            <span className="eyebrow">
              <i />
              Comece por aqui
            </span>
            <h2>
              Não sabe por
              <br />
              onde começar?
            </h2>
            <p>Escolha o assunto que mais combina com o que você procura.</p>
          </div>
          <div className="path-links">
            {[
              ["Quero conhecer Forex", "#forex"],
              ["Quero conhecer Criptoativos", "#criptoativos"],
              ["Quero um robô gratuito", "#forex"],
              ["Quero conhecer Copy Trading", "#forex"],
              ["Quero aprender sobre DeFi", "#criptoativos"],
            ].map(([label, href], i) => (
              <a href={href} key={label}>
                <span>0{i + 1}</span>
                {label}
                <ArrowIcon />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comunidade ─────────────────────────────────────────────────── */}
      <section className="community-section" id="comunidade">
        <div className="shell community-card">
          <div className="community-lines" aria-hidden="true" />
          <span className="eyebrow">
            <i />
            Conecte-se
          </span>
          <h2>
            Faça parte do ecossistema
            <br />
            <span>Neural Capital</span>
          </h2>
          <p>Conteúdo, atualizações e suporte em nossos canais oficiais.</p>
          <div className="community-actions">
            <a
              className="button"
              href={telegramLink?.url ?? "#comunidade"}
              aria-label={telegramLink ? "Entrar no Telegram" : "Link do Telegram em breve"}
              {...(telegramLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Entrar na comunidade Telegram <ArrowIcon />
            </a>
            <a
              className="button button-ghost"
              href={whatsappLink?.url ?? "#comunidade"}
              aria-label={whatsappLink ? "Suporte via WhatsApp" : "Link do WhatsApp em breve"}
              {...(whatsappLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Suporte via WhatsApp <ArrowIcon />
            </a>
          </div>
          {!telegramLink && !whatsappLink && (
            <small>Links oficiais serão disponibilizados em breve.</small>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer>
        <div className="shell footer-top">
          <Brand />
          <div className="footer-links">
            <div>
              <b>Navegação</b>
              <a href="#inicio">Início</a>
              <a href="#forex">Forex</a>
              <a href="#criptoativos">Criptoativos</a>
            </div>
            <div>
              <b>Conecte-se</b>
              <a href="#comunidade">Comunidade</a>
              <a href="#comunidade">Suporte</a>
            </div>
            <div>
              <b>Institucional</b>
              <a href="#footer-note">Termos de Uso</a>
              <a href="#footer-note">Política de Privacidade</a>
              <a href="#footer-note">Aviso de Risco</a>
            </div>
          </div>
        </div>
        <div className="shell footer-bottom" id="footer-note">
          <p>
            Operações envolvendo Forex e criptoativos possuem riscos. Conteúdos
            disponibilizados têm caráter exclusivamente informativo e educacional.
          </p>
          <span>© 2026 NEURAL CAPITAL</span>
        </div>
      </footer>
    </main>
  );
}
