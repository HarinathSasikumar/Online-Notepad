import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import { useNotes } from '../context/NotesContext';
import NoteGrid from '../components/notes/NoteGrid';
import NoteModal from '../components/notes/NoteModal';
import EmptyState from '../components/notes/EmptyState';

const ArchivedPage = () => {
  const { notes, loading, updateFilters, toggleArchive, deleteNote } = useNotes();
  const [modalOpen, setModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    updateFilters({ archived: true, pinned: false });
  }, []);

  const openEdit = (note) => {
    setNoteToEdit(note);
    setModalOpen(true);
  };

  const handleRestoreAll = async () => {
    if (window.confirm('Restore all archived notes?')) {
      for (const note of notes) {
        await toggleArchive(note._id);
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-6 max-w-7xl mx-auto w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Archived Notes</h1>
          <p className="text-slate-700 text-sm mt-1">
            {!loading && `${notes.length} archived note${notes.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        {notes.length > 0 && (
          <button
            id="restore-all-btn"
            onClick={handleRestoreAll}
            className="btn-secondary flex items-center gap-2 text-sm"
            style={{ borderRadius: '12px' }}
          >
            <FiRotateCcw size={15} />
            Restore All
          </button>
        )}
      </div>

      {/* Info banner */}
      {notes.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 flex items-center gap-2">
          <span>Archived notes are stored here. Hover a note and click restore to bring it back.</span>
        </div>
      )}

      {!loading && notes.length === 0 ? (
        <EmptyState type="archived" />
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

export default ArchivedPage;

