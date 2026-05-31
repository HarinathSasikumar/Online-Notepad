import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiFileText, FiBookmark, FiArchive, FiClock, FiPlus, FiTrendingUp, FiStar
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { getGreeting } from '../utils/helpers';
import SearchBar from '../components/ui/SearchBar';
import NoteGrid from '../components/notes/NoteGrid';
import NoteModal from '../components/notes/NoteModal';
import EmptyState from '../components/notes/EmptyState';

/* â”€â”€ Animated Count â”€â”€ */
const AnimatedCount = ({ value, delay = 0 }) => (
  <motion.span
    key={value}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    {value}
  </motion.span>
);

/* â”€â”€ Premium Stat Card â”€â”€ */
const StatCard = ({ icon, label, value, from, to, textColor, iconBg, delay }) => (
  <motion.div
    className="relative rounded-2xl p-5 overflow-hidden cursor-default select-none"
    style={{
      background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      boxShadow: `0 8px 32px ${from}55`,
    }}
    initial={{ opacity: 0, y: 28, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.45, ease: 'easeOut' }}
    whileHover={{ scale: 1.04, y: -4, boxShadow: `0 16px 48px ${from}66` }}
  >
    {/* Decorative circles */}
    <div className="absolute -right-5 -bottom-5 w-24 h-24 rounded-full opacity-20"
      style={{ background: 'rgba(255,255,255,0.6)' }} />
    <div className="absolute -right-2 -top-8 w-16 h-16 rounded-full opacity-10"
      style={{ background: 'rgba(255,255,255,0.8)' }} />

    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-1.5 opacity-70" style={{ color: textColor }}>
          {label}
        </p>
        <p className="text-4xl font-extrabold" style={{ color: textColor }}>
          <AnimatedCount value={value} delay={delay + 0.2} />
        </p>
      </div>
      <motion.div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-md"
        style={{ background: iconBg, color: textColor }}
        whileHover={{ rotate: 12, scale: 1.15 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        {icon}
      </motion.div>
    </div>

    {/* Mini trend bar */}
    <div className="relative z-10 mt-3 flex items-center gap-1.5">
      <div className="flex gap-0.5 items-end h-5">
        {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full opacity-40"
            style={{ background: textColor, height: `${h}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: delay + 0.3 + i * 0.05 }}
          />
        ))}
      </div>
      <span className="text-xs font-semibold opacity-60" style={{ color: textColor }}>
        this week
      </span>
    </div>
  </motion.div>
);

/* â”€â”€ Section Header â”€â”€ */
const SectionHeader = ({ icon, label, count }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
      style={{ background: 'rgba(99,102,241,0.08)' }}>
      <span className="text-indigo-500 text-xs">{icon}</span>
      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{label}</span>
      {count > 0 && (
        <span className="text-xs font-bold text-indigo-500 bg-indigo-100 rounded-full px-2 py-0.5">
          {count}
        </span>
      )}
    </div>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.2), transparent)' }} />
  </div>
);

/* â”€â”€ Main Dashboard â”€â”€ */
const DashboardPage = () => {
  const { user } = useAuth();
  const { notes, stats, loading, filters } = useNotes();
  const [modalOpen, setModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const openCreate = () => { setNoteToEdit(null); setModalOpen(true); };
  const openEdit = (note) => { setNoteToEdit(note); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setNoteToEdit(null); };

  const hasActiveFilters =
    filters.search || filters.category !== 'all' ||
    filters.color !== 'all' || filters.priority !== 'all';
  const emptyType = hasActiveFilters ? 'search' : 'notes';

  const recentCount = notes.filter(n => {
    const diff = Date.now() - new Date(n.updatedAt);
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  return (
    <motion.div
      className="flex flex-col gap-6 max-w-7xl mx-auto w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >

      {/* â•â•â•â•â•â•â•â•â•â•â• HERO WELCOME BANNER â•â•â•â•â•â•â•â•â•â•â• */}
      <motion.div
        className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 35%, #8B5CF6 65%, #7C3AED 100%)',
          boxShadow: '0 20px 60px rgba(99,102,241,0.35)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute rounded-full"
            style={{ width: 260, height: 260, background: 'rgba(255,255,255,0.06)', top: -80, right: -60 }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full"
            style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.04)', bottom: -40, left: '30%' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          {/* Floating dots */}
          {[[10, 70, 5], [75, 20, 6], [55, 80, 4], [85, 60, 5], [20, 40, 4]].map(([l, t, s], i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, background: 'rgba(255,255,255,0.35)' }}
              animate={{ y: [0, -12, 0], opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }} />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-between gap-6 flex-wrap">
          <div>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold mb-4"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Premium Workspace
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {getGreeting(user?.name)}
            </motion.h1>

            <motion.p
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {loading
                ? 'Loading your notes...'
                : stats.totalNotes === 0
                  ? "You haven't created any notes yet. Let's get started!"
                  : `You have ${stats.totalNotes} note${stats.totalNotes !== 1 ? 's' : ''}${stats.pinnedNotes > 0 ? ` Â· ${stats.pinnedNotes} pinned` : ''}`
              }
            </motion.p>
          </div>

          {/* CTA button */}
          <motion.button
            id="create-note-fab-desktop"
            onClick={openCreate}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#4F46E5',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,1)', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            >
              <FiPlus size={18} />
            </motion.div>
            New Note
          </motion.button>
        </div>

        {/* Mini quick-action pills */}
        <motion.div
          className="relative z-10 flex gap-2 mt-5 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: 'Quick Note', action: openCreate },
            { label: 'View Pinned' },
            { label: 'Ideas' },
          ].map((pill, i) => (
            <button
              key={i}
              onClick={pill.action}
              className="text-xs font-semibold rounded-xl px-3 py-1.5 transition-all"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
            >
              {pill.label}
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* â•â•â•â•â•â•â•â•â•â•â• STATS CARDS â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FiFileText />}
          label="Total Notes"
          value={stats.totalNotes}
          from="#6366F1" to="#818CF8"
          textColor="#FFFFFF"
          iconBg="rgba(255,255,255,0.2)"
          delay={0}
        />
        <StatCard
          icon={<FiBookmark />}
          label="Pinned"
          value={stats.pinnedNotes}
          from="#F59E0B" to="#FBBF24"
          textColor="#FFFFFF"
          iconBg="rgba(255,255,255,0.2)"
          delay={0.08}
        />
        <StatCard
          icon={<FiArchive />}
          label="Archived"
          value={stats.archivedNotes}
          from="#10B981" to="#34D399"
          textColor="#FFFFFF"
          iconBg="rgba(255,255,255,0.2)"
          delay={0.16}
        />
        <StatCard
          icon={<FiClock />}
          label="Recent (7d)"
          value={recentCount}
          from="#3B82F6" to="#60A5FA"
          textColor="#FFFFFF"
          iconBg="rgba(255,255,255,0.2)"
          delay={0.24}
        />
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â• SEARCH & FILTERS â•â•â•â•â•â•â•â•â•â•â• */}
      <motion.div
        className="rounded-2xl p-4"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8EEFF',
          boxShadow: '0 4px 20px rgba(99,102,241,0.06)',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <SearchBar />
      </motion.div>

      {/* â•â•â•â•â•â•â•â•â•â•â• NOTES GRID â•â•â•â•â•â•â•â•â•â•â• */}
      {!loading && notes.length === 0 ? (
        <EmptyState type={emptyType} onAction={openCreate} />
      ) : (
        <div className="flex flex-col gap-6">
          {pinnedNotes.length > 0 && (
            <div>
              <SectionHeader icon={<FiBookmark />} label="Pinned" count={pinnedNotes.length} />
              <NoteGrid notes={pinnedNotes} loading={false} onEdit={openEdit} />
            </div>
          )}
          {(otherNotes.length > 0 || loading) && (
            <div>
              {pinnedNotes.length > 0 && (
                <SectionHeader icon={<FiFileText />} label="All Notes" count={otherNotes.length} />
              )}
              <NoteGrid notes={otherNotes} loading={loading} onEdit={openEdit} />
            </div>
          )}
        </div>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â• FAB â€“ mobile â•â•â•â•â•â•â•â•â•â•â• */}
      <motion.button
        id="create-note-fab"
        onClick={openCreate}
        className="fab lg:hidden"
        aria-label="Create new note"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        animate={{ boxShadow: ['0 8px 30px rgba(99,102,241,0.4)', '0 12px 40px rgba(99,102,241,0.6)', '0 8px 30px rgba(99,102,241,0.4)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiPlus size={24} />
      </motion.button>

      <NoteModal isOpen={modalOpen} onClose={closeModal} noteToEdit={noteToEdit} />
    </motion.div>
  );
};

export default DashboardPage;

