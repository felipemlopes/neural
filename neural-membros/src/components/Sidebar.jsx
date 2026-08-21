import { NAV_ITEMS, QUICK_LINKS, CYAN } from '../data';

export default function Sidebar({ activeNav, onNavChange, open, onClose }) {
  return (
    <aside className={`sidebar${open ? ' is-open' : ''}`}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(0,212,212,.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, border: '2px solid #00d4d4', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900, fontSize: 18, color: '#00d4d4', flexShrink: 0,
          }}>N</div>
          <div>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 15, color: '#00d4d4', letterSpacing: 2 }}>NEURAL</span>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: '#e0f0f0', letterSpacing: 2 }}> CAPITAL</span>
          </div>
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Fechar menu"
          >✕</button>
        </div>
        <div style={{ marginTop: 8, fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.5)', letterSpacing: 2 }}>ÁREA DE MEMBROS</div>
      </div>

      {/* User */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,212,212,.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4d4 0%,#006666 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#040a0a', flexShrink: 0,
        }}>A</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#e0f0f0' }}>Alex Silva</div>
          <div style={{ fontSize: 10, color: 'rgba(0,212,212,.6)', fontFamily: "'Share Tech Mono',monospace" }}>PRO MEMBER</div>
        </div>
        <div style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#00d4d4', animation: 'pulse-dot 2s infinite', flexShrink: 0 }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 0' }}>
        {NAV_ITEMS.map((item) => {
          const active = item.key === activeNav;
          return (
            <div
              key={item.key}
              className="nav-item"
              onClick={() => onNavChange(item.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 24px', cursor: 'pointer',
                borderLeft: `2px solid ${active ? 'rgba(0,212,212,.4)' : 'transparent'}`, transition: 'all .2s',
              }}
            >
              <span style={{ fontSize: 16, opacity: .7 }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: active ? CYAN : 'rgba(224,240,240,.5)' }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: 'auto', background: '#00d4d4', color: '#040a0a', fontSize: 9, fontWeight: 700,
                  padding: '1px 6px', borderRadius: 10, fontFamily: "'Share Tech Mono',monospace",
                }}>{item.badge}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,212,212,.08)' }}>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.3)', letterSpacing: 2, marginBottom: 10 }}>ACESSO RÁPIDO</div>
        {QUICK_LINKS.map((lnk) => (
          <a
            key={lnk.label}
            href={lnk.url}
            target="_blank"
            rel="noreferrer"
            className="quick-link"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', fontSize: 11,
              color: 'rgba(224,240,240,.5)', letterSpacing: .5, transition: 'color .2s',
            }}
          >
            <span>↗</span>{lnk.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
