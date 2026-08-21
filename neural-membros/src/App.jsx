import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleNavChange = (key) => {
    setActiveNav(key);
    setSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      {/* Scanline overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999,
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.03) 2px,rgba(0,0,0,.03) 4px)',
      }} />

      <div className={`sidebar-overlay${sidebarOpen ? ' is-open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <Sidebar activeNav={activeNav} onNavChange={handleNavChange} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <Topbar title="DASHBOARD" onMenuClick={() => setSidebarOpen(true)} />

        <div className="content-area">
          <Dashboard videoPlaying={videoPlaying} onToggleVideo={() => setVideoPlaying((p) => !p)} />
        </div>
      </main>
    </div>
  );
}
