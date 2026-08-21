import { PROJECTS } from '../data';

export default function ProjectsGrid() {
  return (
    <>
      <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 2 }}>PROJETOS</div>
        <div className="ver-todos" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.5)', letterSpacing: 2, cursor: 'pointer' }}>VER TODOS →</div>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((proj) => (
          <div key={proj.name} className="project-card" style={{ background: '#040a0a', border: '1px solid rgba(0,212,212,.12)', overflow: 'hidden', cursor: 'pointer', transition: 'border-color .2s' }}>
            <div style={{ height: 4, background: proj.accent }} />
            <div style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: 'rgba(0,212,212,.4)', letterSpacing: 2, marginBottom: 4 }}>{proj.category}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>{proj.name}</div>
                </div>
                <div style={{ background: 'rgba(0,212,212,.08)', border: '1px solid rgba(0,212,212,.2)', padding: '3px 8px', fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#00d4d4', flexShrink: 0 }}>{proj.status}</div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(224,240,240,.4)', lineHeight: 1.5, marginBottom: 14 }}>{proj.desc}</div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(224,240,240,.3)' }}>CONCLUSÃO</span>
                  <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#00d4d4' }}>{proj.pct}%</span>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }}>
                  <div style={{ height: '100%', background: proj.accent, width: `${proj.pct}%` }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, rowGap: 10 }}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: 'rgba(0,212,212,.5)', border: '1px solid rgba(0,212,212,.15)', padding: '2px 8px' }}>{tag}</span>
                ))}
                <div style={{ marginLeft: 'auto', fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,212,212,.6)', cursor: 'pointer' }}>ACESSAR →</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
