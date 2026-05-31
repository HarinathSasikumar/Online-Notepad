const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
      type: String,
      default: '',
      maxlength: [50000, 'Content is too long']
    },
    color: {
      type: String,
      default: '#FFFFFF',
      enum: [
        '#FFFFFF', // White
        '#FEF3C7', // Amber
        '#D1FAE5', // Emerald
        '#DBEAFE', // Blue
        '#EDE9FE', // Violet
        '#FCE7F3', // Pink
        '#FEE2E2', // Red
        '#F3F4F6', // Gray
        '#FFF7ED', // Orange
        '#ECFDF5', // Green
      ]
    },
    category: {
      type: String,
      default: 'Personal',
      enum: ['Work', 'Personal', 'Study', 'Health', 'Finance', 'Ideas', 'Travel', 'Other']
    },
    priority: {
      type: String,
      default: 'low',
      enum: ['low', 'medium', 'high']
    },
    tags: {
      type: [String],
      default: []
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Indexes for search performance
noteSchema.index({ user: 1, isArchived: 1, isPinned: 1 });
noteSchema.index({ user: 1, title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);
