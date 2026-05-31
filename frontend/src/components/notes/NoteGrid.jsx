import { AnimatePresence, motion } from 'framer-motion';
import NoteCard from './NoteCard';
import { SkeletonGrid } from '../ui/SkeletonCard';

const NoteGrid = ({ notes, loading, onEdit }) => {
  if (loading) {
    return <SkeletonGrid count={6} />;
  }

  return (
    <motion.div
      layout
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(268px, 1fr))',
        gap: '16px',
        alignItems: 'start',
      }}
    >
      <AnimatePresence mode="popLayout">
        {notes.map((note, index) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoteGrid;

