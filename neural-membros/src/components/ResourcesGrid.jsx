import { RESOURCES } from '../data';

export default function ResourcesGrid() {
  return (
    <>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 2 }}>LINKS E RECURSOS</div>
      </div>
      <div className="resources-grid">
        {RESOURCES.map((res) => (
          <a
            key={res.label}
            href={res.url}
            target="_blank"
            rel="noreferrer"
            className="resource-link"
            style={{
              background: '#040a0a', border: '1px solid rgba(0,212,212,.1)', padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'all .2s',
            }}
          >
            <div style={{ fontSize: 22, flexShrink: 0 }}>{res.icon}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: .5, marginBottom: 3 }}>{res.label}</div>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.4)' }}>{res.type}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(0,212,212,.4)' }}>↗</div>
          </a>
        ))}
      </div>
    </>
  );
}
