const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/notes
// @desc    Get all notes with search, filter, sort
// @access  Private
router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      category,
      color,
      priority,
      pinned,
      archived = 'false',
      sort = 'newest',
      page = 1,
      limit = 100
    } = req.query;

    const query = {
      user: req.user._id,
      isArchived: archived === 'true'
    };

    // Pinned filter
    if (pinned === 'true') query.isPinned = true;

    // Category filter
    if (category && category !== 'all') query.category = category;

    // Color filter
    if (color && color !== 'all') query.color = color;

    // Priority filter
    if (priority && priority !== 'all') query.priority = priority;

    // Search in title and content
    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: { $in: [searchRegex] } }
      ];
    }

    // Sort options
    let sortObj = {};
    switch (sort) {
      case 'oldest':
        sortObj = { isPinned: -1, createdAt: 1 };
        break;
      case 'az':
        sortObj = { isPinned: -1, title: 1 };
        break;
      case 'za':
        sortObj = { isPinned: -1, title: -1 };
        break;
      case 'priority':
        sortObj = { isPinned: -1, priority: -1, updatedAt: -1 };
        break;
      default: // newest
        sortObj = { isPinned: -1, updatedAt: -1 };
    }

    const notes = await Note.find(query)
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Note.countDocuments(query);

    // Stats counts
    const [totalNotes, pinnedNotes, archivedNotes] = await Promise.all([
      Note.countDocuments({ user: req.user._id, isArchived: false }),
      Note.countDocuments({ user: req.user._id, isPinned: true, isArchived: false }),
      Note.countDocuments({ user: req.user._id, isArchived: true })
    ]);

    res.json({
      success: true,
      data: notes,
      total,
      stats: { totalNotes, pinnedNotes, archivedNotes }
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching notes' });
  }
});

// @route   POST /api/notes
// @desc    Create a note
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, content, color, category, priority, tags } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Note title is required' });
    }

    const note = await Note.create({
      user: req.user._id,
      title: title.trim(),
      content: content || '',
      color: color || '#FFFFFF',
      category: category || 'Personal',
      priority: priority || 'low',
      tags: Array.isArray(tags) ? tags.filter(t => t.trim()) : []
    });

    res.status(201).json({ success: true, data: note, message: 'Note created successfully' });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ success: false, message: 'Server error creating note' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    const { title, content, color, category, priority, tags } = req.body;

    note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        ...(title !== undefined && { title: title.trim() }),
        ...(content !== undefined && { content }),
        ...(color !== undefined && { color }),
        ...(category !== undefined && { category }),
        ...(priority !== undefined && { priority }),
        ...(tags !== undefined && { tags: Array.isArray(tags) ? tags.filter(t => t.trim()) : [] })
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: note, message: 'Note updated successfully' });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ success: false, message: 'Server error updating note' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting note' });
  }
});

// @route   PATCH /api/notes/:id/pin
// @desc    Toggle pin on a note
// @access  Private
router.patch('/:id/pin', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      success: true,
      data: note,
      message: note.isPinned ? 'Note pinned' : 'Note unpinned'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PATCH /api/notes/:id/archive
// @desc    Toggle archive on a note
// @access  Private
router.patch('/:id/archive', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    note.isArchived = !note.isArchived;
    if (note.isArchived) note.isPinned = false; // Unpin when archiving
    await note.save();

    res.json({
      success: true,
      data: note,
      message: note.isArchived ? 'Note archived' : 'Note restored'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
