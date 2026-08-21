import { FEATURED_VIDEO } from '../data';

export default function FeaturedVideo({ playing, onToggle }) {
  return (
    <div style={{ background: '#040a0a', border: '1px solid rgba(0,212,212,.12)', overflow: 'hidden' }}>
      <div
        onClick={onToggle}
        style={{
          position: 'relative', aspectRatio: '16/9', background: '#020707', display: 'flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%,rgba(0,212,212,.08) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(0,212,212,.015) 40px,rgba(0,212,212,.015) 41px)' }} />

        {!playing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div className="play-button" style={{
              width: 64, height: 64, border: '2px solid #00d4d4', borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
            }}>
              <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid #00d4d4', marginLeft: 4 }} />
            </div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(0,212,212,.6)', letterSpacing: 2 }}>REPRODUZIR AULA</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 40, opacity: .4 }}>⏸</div>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(0,212,212,.6)', letterSpacing: 2 }}>EM REPRODUÇÃO...</div>
          </div>
        )}

        <div style={{
          position: 'absolute', top: 12, left: 12, background: 'rgba(0,212,212,.15)', border: '1px solid rgba(0,212,212,.3)',
          padding: '3px 10px', fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#00d4d4', letterSpacing: 2,
        }}>AO VIVO</div>
        <div style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: "'Share Tech Mono',monospace", fontSize: 10, color: 'rgba(224,240,240,.4)' }}>{FEATURED_VIDEO.duration}</div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.5)', letterSpacing: 2, marginBottom: 6 }}>{FEATURED_VIDEO.category}</div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: 1, marginBottom: 6 }}>{FEATURED_VIDEO.title}</div>
        <div style={{ fontSize: 12, color: 'rgba(224,240,240,.5)', lineHeight: 1.5 }}>{FEATURED_VIDEO.desc}</div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.5)', letterSpacing: 1 }}>PROGRESSO</span>
            <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#00d4d4' }}>{FEATURED_VIDEO.progress}%</span>
          </div>
          <div style={{ height: 2, background: 'rgba(255,255,255,.08)', borderRadius: 1, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#00d4d4', width: `${FEATURED_VIDEO.progress}%`, transition: 'width .3s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
