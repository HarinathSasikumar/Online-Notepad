import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiBookmark, FiArchive } from 'react-icons/fi';

const configs = {
  notes: {
    gradient: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
    iconBg: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    borderColor: 'rgba(99,102,241,0.15)',
    illustration: (
      <div className="relative w-32 h-32">
        {/* Stacked note cards illustration */}
        {[
          { rotate: -12, bg: '#FEF3C7', top: 8, left: 8 },
          { rotate: 6, bg: '#DBEAFE', top: 4, left: 4 },
          { rotate: 0, bg: '#FFFFFF', top: 0, left: 0 },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-28 rounded-2xl shadow-md flex flex-col p-3 gap-2"
            style={{
              background: card.bg,
              transform: `rotate(${card.rotate}deg)`,
              top: card.top,
              left: card.left,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
            animate={{ y: i === 2 ? [0, -6, 0] : 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <div className="h-2 bg-slate-200 rounded-full w-3/4" />
            <div className="h-1.5 bg-slate-100 rounded-full w-full" />
            <div className="h-1.5 bg-slate-100 rounded-full w-5/6" />
            {i === 2 && (
              <div className="mt-auto flex gap-1">
                <div className="h-4 w-10 rounded-full bg-indigo-100" />
                <div className="h-4 w-8 rounded-full bg-amber-100" />
              </div>
            )}
          </motion.div>
        ))}
        {/* Plus icon floating */}
        <motion.div
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: 'white' }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiPlus size={18} />
        </motion.div>
      </div>
    ),
    title: 'Start your note journey',
    subtitle: "Capture ideas, tasks, and thoughts in one beautiful place. Create your first note to get started.",
    action: 'Create your first note',
  },
  search: {
    gradient: 'linear-gradient(135deg, #F0F9FF 0%, #EFF6FF 100%)',
    iconBg: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    borderColor: 'rgba(59,130,246,0.15)',
    illustration: (
      <motion.div
        className="relative w-28 h-28 flex items-center justify-center"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #DBEAFE, #EFF6FF)', border: '2px dashed #93C5FD' }}>
          <FiSearch size={40} style={{ color: '#60A5FA' }} />
        </div>
        {/* Ripple rings */}
        {[1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ inset: -i * 12, border: '1.5px solid rgba(96,165,250,0.3)' }}
            animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </motion.div>
    ),
    title: 'No results found',
    subtitle: "We couldn't find any notes matching your search. Try different keywords or clear your filters.",
    action: null,
  },
  pinned: {
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    iconBg: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    borderColor: 'rgba(245,158,11,0.2)',
    illustration: (
      <motion.div
        className="relative w-28 h-28 flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', border: '2px dashed #FCD34D' }}>
          <FiBookmark size={40} style={{ color: '#F59E0B' }} />
        </div>
      </motion.div>
    ),
    title: 'No pinned notes',
    subtitle: "Pin your most important notes to keep them front and center for quick access.",
    action: null,
  },
  archived: {
    gradient: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
    iconBg: 'linear-gradient(135deg, #10B981, #34D399)',
    borderColor: 'rgba(16,185,129,0.15)',
    illustration: (
      <motion.div
        className="relative w-28 h-28 flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)', border: '2px dashed #6EE7B7' }}>
          <FiArchive size={38} style={{ color: '#10B981' }} />
        </div>
      </motion.div>
    ),
    title: 'Archive is empty',
    subtitle: "Notes you archive will appear here. Archive notes to keep things tidy without deleting them.",
    action: null,
  },
};

const EmptyState = ({ type = 'notes', onAction }) => {
  const config = configs[type] || configs.notes;

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-3xl relative overflow-hidden"
      style={{
        background: config.gradient,
        border: `1.5px dashed ${config.borderColor}`,
        minHeight: 380,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full opacity-20"
          style={{ width: 200, height: 200, background: 'rgba(99,102,241,0.1)', top: -60, right: -60 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute rounded-full opacity-15"
          style={{ width: 140, height: 140, background: 'rgba(139,92,246,0.1)', bottom: -40, left: -40 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      </div>

      {/* Illustration */}
      <div className="relative z-10 mb-6">
        {config.illustration}
      </div>

      {/* Text */}
      <div className="relative z-10 max-w-sm">
        <motion.h3
          className="text-xl font-extrabold mb-2.5"
          style={{ color: '#020617' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {config.title}
        </motion.h3>
        <motion.p
          className="text-sm leading-relaxed"
          style={{ color: '#334155' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {config.subtitle}
        </motion.p>
      </div>

      {/* Action */}
      {config.action && onAction && (
        <motion.button
          id="empty-state-action"
          onClick={onAction}
          className="relative z-10 mt-7 flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white overflow-hidden"
          style={{
            background: config.iconBg,
            boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(99,102,241,0.45)' }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
          />
          <FiPlus size={18} />
          {config.action}
        </motion.button>
      )}

      {/* Hint dots */}
      <motion.div
        className="relative z-10 flex gap-1.5 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#CBD5E1' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;

