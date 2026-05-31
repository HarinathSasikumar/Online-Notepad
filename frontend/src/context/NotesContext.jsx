import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notes, setNotes] = useState([]);
  const [stats, setStats] = useState({ totalNotes: 0, pinnedNotes: 0, archivedNotes: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    color: 'all',
    priority: 'all',
    pinned: false,
    archived: false,
    sort: 'newest',
  });

  const fetchNotes = useCallback(async (overrideFilters = null) => {
    setLoading(true);
    try {
      const f = overrideFilters || filters;
      const params = new URLSearchParams();
      if (f.search) params.append('search', f.search);
      if (f.category && f.category !== 'all') params.append('category', f.category);
      if (f.color && f.color !== 'all') params.append('color', f.color);
      if (f.priority && f.priority !== 'all') params.append('priority', f.priority);
      if (f.pinned) params.append('pinned', 'true');
      params.append('archived', f.archived ? 'true' : 'false');
      params.append('sort', f.sort || 'newest');

      const res = await api.get(`/notes?${params.toString()}`);
      setNotes(res.data.data);
      setStats(res.data.stats);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated, filters]);

  const createNote = useCallback(async (noteData) => {
    try {
      const res = await api.post('/notes', noteData);
      await fetchNotes();
      toast.success('Note created!');
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create note';
      toast.error(msg);
      throw error;
    }
  }, [fetchNotes]);

  const updateNote = useCallback(async (id, noteData) => {
    try {
      const res = await api.put(`/notes/${id}`, noteData);
      await fetchNotes();
      toast.success('Note updated!');
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update note';
      toast.error(msg);
      throw error;
    }
  }, [fetchNotes]);

  const deleteNote = useCallback(async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      await fetchNotes();
      toast.success('Note deleted');
    } catch (error) {
      toast.error('Failed to delete note');
      throw error;
    }
  }, [fetchNotes]);

  const togglePin = useCallback(async (id) => {
    try {
      const res = await api.patch(`/notes/${id}/pin`);
      setNotes(prev => prev.map(n => n._id === id ? res.data.data : n));
      setStats(prev => ({
        ...prev,
        pinnedNotes: res.data.data.isPinned ? prev.pinnedNotes + 1 : prev.pinnedNotes - 1
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error('Failed to update note');
    }
  }, []);

  const toggleArchive = useCallback(async (id) => {
    try {
      const res = await api.patch(`/notes/${id}/archive`);
      await fetchNotes();
      toast.success(res.data.message);
    } catch (error) {
      toast.error('Failed to update note');
    }
  }, [fetchNotes]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'all',
      color: 'all',
      priority: 'all',
      pinned: false,
      archived: false,
      sort: 'newest',
    });
  }, []);

  return (
    <NotesContext.Provider value={{
      notes, stats, loading, filters,
      fetchNotes, createNote, updateNote, deleteNote,
      togglePin, toggleArchive,
      updateFilters, resetFilters
    }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
};

export default NotesContext;

