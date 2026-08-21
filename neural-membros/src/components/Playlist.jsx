import { PLAYLIST } from '../data';

export default function Playlist() {
  return (
    <div style={{ background: '#040a0a', border: '1px solid rgba(0,212,212,.12)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,212,212,.08)' }}>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.5)', letterSpacing: 2 }}>PLAYLIST</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {PLAYLIST.map((ep) => (
          <div
            key={ep.num}
            className="playlist-item"
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
              borderBottom: '1px solid rgba(0,212,212,.05)', cursor: 'pointer', transition: 'background .2s',
            }}
          >
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: 'rgba(0,212,212,.4)', width: 20, flexShrink: 0 }}>{ep.num}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: ep.titleColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ep.title}</div>
              <div style={{ fontSize: 10, color: 'rgba(224,240,240,.3)', marginTop: 2, fontFamily: "'Share Tech Mono',monospace" }}>{ep.duration}</div>
            </div>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ep.dotColor, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
