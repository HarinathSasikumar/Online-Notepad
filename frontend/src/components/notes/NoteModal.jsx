import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../ui/Modal';
import { FiTag, FiX, FiCheck, FiSave, FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import { useNotes } from '../../context/NotesContext';
import { NOTE_COLORS, CATEGORIES, PRIORITIES, parseTags } from '../../utils/helpers';

const INITIAL_FORM = {
  title: '',
  content: '',
  color: '#FFFFFF',
  category: 'Personal',
  priority: 'low',
  tags: [],
};

const NoteModal = ({ isOpen, onClose, noteToEdit = null }) => {
  const { createNote, updateNote } = useNotes();
  const [form, setForm] = useState(INITIAL_FORM);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const isEditing = !!noteToEdit;

  useEffect(() => {
    if (isOpen) {
      if (noteToEdit) {
        setForm({
          title: noteToEdit.title || '',
          content: noteToEdit.content || '',
          color: noteToEdit.color || '#FFFFFF',
          category: noteToEdit.category || 'Personal',
          priority: noteToEdit.priority || 'low',
          tags: noteToEdit.tags || [],
        });
        setTagInput('');
      } else {
        setForm(INITIAL_FORM);
        setTagInput('');
      }
      setFocusedField('title'); // auto-focus title mentally for styles
    }
  }, [isOpen, noteToEdit]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, '');
      if (val && !form.tags.includes(val)) {
        setForm(prev => ({ ...prev, tags: [...prev.tags, val] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const finalTags = [...form.tags];
      if (tagInput.trim()) {
        parseTags(tagInput).forEach(t => {
          if (!finalTags.includes(t)) finalTags.push(t);
        });
      }
      const payload = { ...form, tags: finalTags };

      if (isEditing) {
        await updateNote(noteToEdit._id, payload);
      } else {
        await createNote(payload);
      }
      onClose();
    } catch (error) {
      // handled in context
    } finally {
      setSaving(false);
    }
  };

  const priorityConfig = {
    low: { label: 'Low', color: '#10B981', bg: '#D1FAE5', border: '#34D399' },
    medium: { label: 'Medium', color: '#F59E0B', bg: '#FEF3C7', border: '#FBBF24' },
    high: { label: 'High', color: '#EF4444', bg: '#FEE2E2', border: '#F87171' },
  };

  // Top accent bar color derivation
  const accentColor = form.color === '#FFFFFF' ? '#6366F1' : form.color;

  return (
    <Modal
      id="note-modal"
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Note' : 'Create New Note'}
      size="lg"
      customHeader={
        <div className="relative pt-6 px-6 pb-4">
          <motion.div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: accentColor }}
            layoutId="modal-top-bar"
          />
          <h2 className="text-xl font-extrabold text-slate-950">
            {isEditing ? 'Edit Note' : 'Create Note'}
          </h2>
          <p className="text-xs text-slate-700 mt-1">
            Capture your thoughts and organize them perfectly.
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 pb-6 pt-2">

        {/* Title */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <div
            className="relative rounded-2xl transition-all"
            style={{
              background: focusedField === 'title' ? '#FFFFFF' : '#F8FAFF',
              border: `2px solid ${focusedField === 'title' ? '#6366F1' : '#E8EEFF'}`,
              boxShadow: focusedField === 'title' ? '0 0 0 4px rgba(99,102,241,0.1)' : 'none',
            }}
          >
            <input
              id="note-title"
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              placeholder="What's this note about?"
              className="w-full bg-transparent outline-none px-4 py-3 text-base font-bold text-slate-950 placeholder-slate-400"
              required
              autoFocus
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Content
          </label>
          <div
            className="relative rounded-2xl transition-all"
            style={{
              background: focusedField === 'content' ? '#FFFFFF' : '#F8FAFF',
              border: `2px solid ${focusedField === 'content' ? '#6366F1' : '#E8EEFF'}`,
              boxShadow: focusedField === 'content' ? '0 0 0 4px rgba(99,102,241,0.1)' : 'none',
            }}
          >
            <textarea
              id="note-content"
              value={form.content}
              onChange={e => handleChange('content', e.target.value)}
              onFocus={() => setFocusedField('content')}
              onBlur={() => setFocusedField(null)}
              placeholder="Write your note here... (Markdown supported)"
              className="w-full bg-transparent outline-none px-4 py-3 text-sm text-slate-900 placeholder-slate-400 resize-none min-h-[140px]"
              style={{ lineHeight: 1.6 }}
            />
            {/* Markdown hint */}
            <div className="absolute bottom-2 right-3 flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg shadow-sm border border-slate-100 text-[10px] font-bold text-slate-600">
              <FiAlertCircle size={10} /> Markdown supported
            </div>
          </div>
        </div>

        {/* Color picker */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
            Card Color
          </label>
          <div className="flex flex-wrap gap-3">
            {NOTE_COLORS.map(c => {
              const isSelected = form.color === c.value;
              return (
                <motion.button
                  key={c.value}
                  type="button"
                  title={c.label}
                  onClick={() => handleChange('color', c.value)}
                  className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: c.value === '#FFFFFF' ? 'linear-gradient(135deg, #fdfdfd, #f1f5f9)' : c.value,
                    border: c.value === '#FFFFFF' ? '1px solid #E2E8F0' : 'none',
                    boxShadow: isSelected ? '0 0 0 2px #FFFFFF, 0 0 0 4px #6366F1' : '0 2px 5px rgba(0,0,0,0.05)',
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Select ${c.label} color`}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                      >
                        <FiCheck size={14} color={c.value === '#FFFFFF' || c.value === '#FEF3C7' ? '#020617' : '#FFFFFF'} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Category + Priority grid */}
        <div className="grid grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Category
            </label>
            <div
              className="relative rounded-2xl transition-all"
              style={{
                background: focusedField === 'category' ? '#FFFFFF' : '#F8FAFF',
                border: `2px solid ${focusedField === 'category' ? '#6366F1' : '#E8EEFF'}`,
              }}
            >
              <select
                id="note-category"
                value={form.category}
                onChange={e => handleChange('category', e.target.value)}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent outline-none px-4 py-2.5 text-sm font-semibold text-slate-900 cursor-pointer appearance-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600"><FiChevronDown size={14} /></div>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map(p => {
                const cfg = priorityConfig[p.value];
                const isSelected = form.priority === p.value;
                return (
                  <motion.button
                    key={p.value}
                    type="button"
                    onClick={() => handleChange('priority', p.value)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors"
                    style={{
                      background: isSelected ? cfg.bg : '#F8FAFF',
                      color: isSelected ? cfg.color : '#475569',
                      border: `1.5px solid ${isSelected ? cfg.border : '#E8EEFF'}`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {p.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
            <FiTag size={12} /> Tags
          </label>
          <div
            className="relative rounded-2xl transition-all p-2 flex flex-wrap gap-2 items-center min-h-[48px] cursor-text"
            style={{
              background: focusedField === 'tags' ? '#FFFFFF' : '#F8FAFF',
              border: `2px solid ${focusedField === 'tags' ? '#6366F1' : '#E8EEFF'}`,
              boxShadow: focusedField === 'tags' ? '0 0 0 4px rgba(99,102,241,0.1)' : 'none',
            }}
            onClick={() => document.getElementById('tag-input')?.focus()}
          >
            <AnimatePresence>
              {form.tags.map(tag => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(99,102,241,0.1)', color: '#4F46E5' }}
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors"
                  >
                    <FiX size={10} />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            <input
              id="tag-input"
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              onFocus={() => setFocusedField('tags')}
              onBlur={() => setFocusedField(null)}
              placeholder={form.tags.length === 0 ? "Type and press Enter..." : ""}
              className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400 px-2"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-slate-100">
          <motion.button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ color: '#334155', background: '#F1F5F9' }}
            whileHover={{ background: '#E2E8F0', color: '#020617' }}
            whileTap={{ scale: 0.96 }}
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            disabled={!form.title.trim() || saving}
            className="relative px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 overflow-hidden"
            style={{
              background: (!form.title.trim() || saving)
                ? '#A5B4FC'
                : 'linear-gradient(135deg, #6366F1, #4F46E5)',
              boxShadow: (!form.title.trim() || saving)
                ? 'none'
                : '0 4px 15px rgba(99,102,241,0.3)',
              cursor: (!form.title.trim() || saving) ? 'not-allowed' : 'pointer',
            }}
            whileHover={(!form.title.trim() || saving) ? {} : { scale: 1.03, boxShadow: '0 8px 25px rgba(99,102,241,0.4)' }}
            whileTap={(!form.title.trim() || saving) ? {} : { scale: 0.96 }}
          >
            {/* Shimmer */}
            {!saving && form.title.trim() && (
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            )}
            
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave size={16} />
                {isEditing ? 'Save Changes' : 'Create Note'}
              </>
            )}
          </motion.button>
        </div>

      </form>
    </Modal>
  );
};

export default NoteModal;

