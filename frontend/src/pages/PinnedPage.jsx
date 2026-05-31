import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNotes } from '../context/NotesContext';
import NoteGrid from '../components/notes/NoteGrid';
import NoteModal from '../components/notes/NoteModal';
import EmptyState from '../components/notes/EmptyState';

const PinnedPage = () => {
  const { notes, loading, updateFilters, resetFilters } = useNotes();
  const [modalOpen, setModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    updateFilters({ pinned: true, archived: false });
    return () => resetFilters();
  }, []);

  const openEdit = (note) => {
    setNoteToEdit(note);
    setModalOpen(true);
  };

  return (
    <motion.div
      className="flex flex-col gap-6 max-w-7xl mx-auto w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-950">Pinned Notes</h1>
        <p className="text-slate-700 text-sm mt-1">
          {!loading && `${notes.length} pinned note${notes.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {!loading && notes.length === 0 ? (
        <EmptyState type="pinned" />
      ) : (
        <NoteGrid notes={notes} loading={loading} onEdit={openEdit} />
      )}

      <NoteModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setNoteToEdit(null); }}
        noteToEdit={noteToEdit}
      />
    </motion.div>
  );
};

export default PinnedPage;

