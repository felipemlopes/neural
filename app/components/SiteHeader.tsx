"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "../lib/types";

export default function SiteHeader({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Neural Capital — início">
          <span className="brand-symbol" aria-hidden="true">N</span>
          <span className="brand-name">
            <b>NEURAL</b> CAPITAL
            <small>QUANTITATIVE SYSTEMS</small>
          </span>
        </Link>
        <nav
          className={open ? "main-nav open" : "main-nav"}
          aria-label="Navegação principal"
        >
          <Link href="/" onClick={() => setOpen(false)}>Início</Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/categoria/${c.slug}`} onClick={() => setOpen(false)}>
              {c.name}
            </Link>
          ))}
          <Link href="/#comunidade" onClick={() => setOpen(false)}>Comunidade</Link>
          <Link
            className="mobile-community"
            href="/#comunidade"
            onClick={() => setOpen(false)}
          >
            Entrar na comunidade
          </Link>
        </nav>
        <Link className="button button-small desktop-community" href="/#comunidade">
          Entrar na comunidade
        </Link>
        <button
          className={open ? "menu-toggle active" : "menu-toggle"}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
