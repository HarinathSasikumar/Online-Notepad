import { FiMenu, FiSun, FiMoon, FiPlus } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageTitles = {
  '/dashboard': { title: 'All Notes', subtitle: 'Manage and organize your thoughts' },
  '/pinned': { title: 'Pinned Notes', subtitle: 'Your most important notes' },
  '/archived': { title: 'Archived Notes', subtitle: 'Notes stored for later' },
};

const Navbar = ({ onMenuClick, onCreateNote, darkMode, onDarkModeToggle }) => {
  const location = useLocation();
  const page = pageTitles[location.pathname] || { title: 'SmartNotes Pro', subtitle: '' };

  return (
    <header
      className="h-16 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30"
      style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #F1F5F9',
        boxShadow: '0 1px 10px rgba(0,0,0,0.04)',
      }}
    >
      {/* Mobile menu */}
      <motion.button
        id="mobile-menu-btn"
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all"
        style={{ color: '#334155' }}
        whileHover={{ background: '#F1F5F9', color: '#020617' }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open menu"
      >
        <FiMenu size={20} />
      </motion.button>

      {/* Page title */}
      <div className="flex-1 min-w-0 flex items-center gap-2.5">
        <div>
          <h2 className="text-base font-extrabold leading-none" style={{ color: '#0F172A' }}>
            {page.title}
          </h2>
          <p className="text-xs mt-0.5 hidden sm:block" style={{ color: '#475569' }}>
            {page.subtitle}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <motion.button
          id="dark-mode-toggle"
          onClick={onDarkModeToggle}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all tooltip"
          data-tip={darkMode ? 'Light Mode' : 'Dark Mode'}
          style={{ color: '#334155' }}
          whileHover={{ background: '#F1F5F9', color: '#6366F1', scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
        >
          <motion.div
            key={darkMode ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.div>
        </motion.button>

        {/* Create note button (desktop) */}
        {onCreateNote && (
          <motion.button
            id="navbar-create-note"
            onClick={onCreateNote}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            >
              <FiPlus size={16} />
            </motion.div>
            New Note
          </motion.button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

