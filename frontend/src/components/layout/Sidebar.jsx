import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFileText, FiBookmark, FiArchive, FiLogOut, FiX, FiZap, FiSettings
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNotes } from '../../context/NotesContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { stats } = useNotes();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      to: '/dashboard',
      icon: <FiFileText size={17} />,
      label: 'All Notes',
      count: stats.totalNotes,
      id: 'nav-all-notes',
    },
    {
      to: '/pinned',
      icon: <FiBookmark size={17} />,
      label: 'Pinned',
      count: stats.pinnedNotes,
      id: 'nav-pinned',
      countColor: '#F59E0B',
    },
    {
      to: '/archived',
      icon: <FiArchive size={17} />,
      label: 'Archived',
      count: stats.archivedNotes,
      id: 'nav-archived',
      countColor: '#10B981',
    },
  ];

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ background: '#FFFFFF' }}>
      {/* Logo */}
      <div
        className="px-5 py-5 flex items-center gap-3"
        style={{ borderBottom: '1px solid #F1F5F9' }}
      >
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)' }}
          whileHover={{ rotate: 15, scale: 1.05 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <FiZap size={17} className="text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-extrabold leading-none" style={{ color: '#0F172A' }}>
            SmartNotes
          </h1>
          <span
            className="text-xs font-bold"
            style={{
              background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Pro
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800 lg:hidden p-1 rounded-lg hover:bg-slate-100 transition-all"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p
          className="text-xs font-bold uppercase tracking-widest px-3 mb-3"
          style={{ color: '#CBD5E1' }}
        >
          Menu
        </p>
        {navItems.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            id={item.id}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            {({ isActive }) => (
              <>
                <span
                  className="flex-shrink-0 transition-colors"
                  style={{ color: isActive ? '#6366F1' : '#475569' }}
                >
                  {item.icon}
                </span>
                <span className="flex-1 text-sm">{item.label}</span>
                {item.count > 0 && (
                  <motion.span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: isActive ? 'rgba(99,102,241,0.12)' : '#F1F5F9',
                      color: isActive ? '#6366F1' : item.countColor || '#334155',
                    }}
                    key={item.count}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                  >
                    {item.count}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      <div className="px-3 pb-4" style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-2xl transition-all cursor-pointer group"
          style={{ background: '#F8FAFF' }}
        >
          {/* Avatar */}
          <motion.div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
            whileHover={{ scale: 1.05 }}
          >
            {initials}
          </motion.div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-none mb-0.5 truncate" style={{ color: '#020617' }}>
              {user?.name}
            </p>
            <p className="text-xs truncate" style={{ color: '#475569' }}>{user?.email}</p>
          </div>

          {/* Logout */}
          <motion.button
            id="logout-btn"
            onClick={handleLogout}
            className="p-1.5 rounded-lg transition-all tooltip flex-shrink-0"
            data-tip="Logout"
            aria-label="Logout"
            whileHover={{ background: '#FEF2F2', color: '#EF4444', scale: 1.1 }}
            initial={{ color: '#CBD5E1', background: 'transparent' }}
          >
            <FiLogOut size={15} />
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 h-full flex-shrink-0"
        style={{ background: '#FFFFFF', borderRight: '1px solid #F1F5F9' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="sidebar-overlay lg:hidden" onClick={onClose} />
            <motion.aside
              className="fixed left-0 top-0 h-full w-64 z-50 lg:hidden flex flex-col"
              style={{ background: '#FFFFFF', borderRight: '1px solid #F1F5F9' }}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

