import { motion } from 'framer-motion';
import { FiBookmark, FiEdit2, FiArchive, FiTrash2, FiRotateCcw } from 'react-icons/fi';
import { useNotes } from '../../context/NotesContext';
import {
  getCategoryClass,
  getPriorityClass,
  formatRelativeTime,
  getColorBorder,
  truncate
} from '../../utils/helpers';

const PRIORITY_DOTS = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' };

const NoteCard = ({ note, onEdit, index = 0 }) => {
  const { togglePin, toggleArchive, deleteNote } = useNotes();
  const borderColor = getColorBorder(note.color);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${note.title}"? This cannot be undone.`)) {
      deleteNote(note._id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
      className="relative flex flex-col overflow-hidden cursor-pointer group"
      style={{
        background: note.color || '#FFFFFF',
        borderRadius: 20,
        border: `1px solid rgba(0,0,0,0.06)`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        minHeight: 175,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      whileHover={{
        y: -5,
        boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
      }}
      onClick={() => onEdit(note)}
      role="article"
      aria-label={`Note: ${note.title}`}
    >
      {/* Colored top bar */}
      <div
        className="h-1.5 w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${borderColor}, ${borderColor}88)`,
        }}
      />

      {/* Pin badge */}
      {note.isPinned && (
        <motion.div
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <FiBookmark size={13} fill="currentColor" />
        </motion.div>
      )}

      {/* Card body */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Title */}
        <h3
          className="text-sm font-bold leading-snug pr-8 line-clamp-2"
          style={{ color: '#020617' }}
        >
          {note.title}
        </h3>

        {/* Content */}
        {note.content && (
          <p className="text-xs leading-relaxed line-clamp-3 flex-1" style={{ color: '#334155' }}>
            {truncate(note.content, 180)}
          </p>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {note.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1' }}
              >
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 pb-3.5 flex items-center gap-1.5"
        style={{ borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: 8 }}
      >
        {/* Priority dot */}
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: PRIORITY_DOTS[note.priority] || '#10B981' }}
          title={note.priority}
        />
        {/* Category badge */}
        <span className={`badge ${getCategoryClass(note.category)}`} style={{ fontSize: '0.65rem' }}>
          {note.category}
        </span>
        {/* Time */}
        <span className="text-xs ml-auto" style={{ color: '#475569' }}>
          {formatRelativeTime(note.updatedAt)}
        </span>
      </div>

      {/* Action bar â€” slides up on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 px-3 py-2.5"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '0 0 20px 20px',
        }}
        initial={{ y: '100%' }}
        whileHover={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        // Use group-hover instead of on the card (CSS approach)
      >
        {[
          {
            id: `pin-note-${note._id}`,
            icon: <FiBookmark size={14} fill={note.isPinned ? 'currentColor' : 'none'} />,
            tip: note.isPinned ? 'Unpin' : 'Pin',
            action: () => togglePin(note._id),
            active: note.isPinned,
            activeColor: '#F59E0B',
          },
          {
            id: `edit-note-${note._id}`,
            icon: <FiEdit2 size={14} />,
            tip: 'Edit',
            action: () => onEdit(note),
          },
          {
            id: `archive-note-${note._id}`,
            icon: note.isArchived ? <FiRotateCcw size={14} /> : <FiArchive size={14} />,
            tip: note.isArchived ? 'Restore' : 'Archive',
            action: () => toggleArchive(note._id),
          },
          {
            id: `delete-note-${note._id}`,
            icon: <FiTrash2 size={14} />,
            tip: 'Delete',
            action: handleDelete,
            danger: true,
          },
        ].map(btn => (
          <motion.button
            key={btn.id}
            id={btn.id}
            onClick={btn.action}
            className="flex items-center justify-center rounded-xl transition-all tooltip"
            data-tip={btn.tip}
            aria-label={btn.tip}
            style={{ width: 34, height: 34 }}
            whileHover={{
              background: btn.danger ? 'rgba(239,68,68,0.1)' : btn.active ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)',
              color: btn.danger ? '#EF4444' : btn.active ? btn.activeColor : '#6366F1',
              scale: 1.1,
            }}
            initial={{
              color: btn.active ? btn.activeColor : '#475569',
              background: 'transparent',
            }}
          >
            {btn.icon}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NoteCard;

