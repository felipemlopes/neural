export default function Topbar({ title, onMenuClick }) {
  const currentDate = new Date()
    .toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();

  return (
    <header className="topbar">
      <button
        type="button"
        className="hamburger-btn"
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >☰</button>

      <div style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 2,
        color: '#e0f0f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{title}</div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div className="topbar-date" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(0,212,212,.5)' }}>{currentDate}</div>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <span style={{ fontSize: 18, opacity: .6 }}>🔔</span>
          <div style={{
            position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: '#00d4d4',
            borderRadius: '50%', animation: 'badge-pulse 2s infinite',
          }} />
        </div>
        <div style={{ width: 1, height: 20, background: 'rgba(0,212,212,.15)' }} />
        <div className="logout-link" style={{ fontSize: 11, letterSpacing: 1, color: 'rgba(0,212,212,.7)', cursor: 'pointer' }}>SAIR</div>
      </div>
    </header>
  );
}
