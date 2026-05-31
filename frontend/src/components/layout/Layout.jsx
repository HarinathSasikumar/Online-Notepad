import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ onCreateNote }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('smartnotes_dark') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('smartnotes_dark', darkMode);
  }, [darkMode]);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F6FD' }}>
      {/* Subtle dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
        }}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onCreateNote={onCreateNote}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(d => !d)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

