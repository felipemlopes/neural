import { STATS } from '../data';

export default function StatsRow() {
  return (
    <div className="stats-grid">
      {STATS.map((stat) => (
        <div key={stat.label} style={{ background: '#040a0a', border: '1px solid rgba(0,212,212,.12)', padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.5)', letterSpacing: 2, marginBottom: 8 }}>{stat.label}</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 38, color: '#00d4d4', lineHeight: 1 }}>{stat.value}</div>
          <div style={{ fontSize: 10, color: 'rgba(224,240,240,.3)', marginTop: 4 }}>{stat.sub}</div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg,#00d4d4 ${stat.pct},transparent ${stat.pct})`,
          }} />
        </div>
      ))}
    </div>
  );
}
