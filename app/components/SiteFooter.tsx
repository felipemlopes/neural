import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="shell footer-top">
        <Link href="/" className="brand" aria-label="Neural Capital — início">
          <span className="brand-symbol" aria-hidden="true">N</span>
          <span className="brand-name">
            <b>NEURAL</b> CAPITAL
            <small>QUANTITATIVE SYSTEMS</small>
          </span>
        </Link>
        <div className="footer-links">
          <div>
            <b>Navegação</b>
            <Link href="/">Início</Link>
            <Link href="/#forex">Forex</Link>
            <Link href="/#criptoativos">Criptoativos</Link>
          </div>
          <div>
            <b>Conecte-se</b>
            <Link href="/#comunidade">Comunidade</Link>
            <Link href="/#comunidade">Suporte</Link>
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
  );
}
