// Color options for notes
export const NOTE_COLORS = [
  { value: '#FFFFFF', label: 'White', tw: 'bg-white' },
  { value: '#FEF3C7', label: 'Amber', tw: 'bg-amber-100' },
  { value: '#D1FAE5', label: 'Emerald', tw: 'bg-emerald-100' },
  { value: '#DBEAFE', label: 'Blue', tw: 'bg-blue-100' },
  { value: '#EDE9FE', label: 'Violet', tw: 'bg-violet-100' },
  { value: '#FCE7F3', label: 'Pink', tw: 'bg-pink-100' },
  { value: '#FEE2E2', label: 'Red', tw: 'bg-red-100' },
  { value: '#F3F4F6', label: 'Gray', tw: 'bg-gray-100' },
  { value: '#FFF7ED', label: 'Orange', tw: 'bg-orange-50' },
  { value: '#ECFDF5', label: 'Green', tw: 'bg-green-50' },
];

export const CATEGORIES = ['Work', 'Personal', 'Study', 'Health', 'Finance', 'Ideas', 'Travel', 'Other'];

export const PRIORITIES = [
  { value: 'low', label: 'Low', color: '#16A34A' },
  { value: 'medium', label: 'Medium', color: '#D97706' },
  { value: 'high', label: 'High', color: '#DC2626' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
  { value: 'priority', label: 'By Priority' },
];

// Get category class for badge styling
export const getCategoryClass = (category) => {
  const map = {
    Work: 'cat-work',
    Personal: 'cat-personal',
    Study: 'cat-study',
    Health: 'cat-health',
    Finance: 'cat-finance',
    Ideas: 'cat-ideas',
    Travel: 'cat-travel',
    Other: 'cat-other',
  };
  return map[category] || 'cat-other';
};

// Get priority class
export const getPriorityClass = (priority) => {
  const map = {
    low: 'priority-low',
    medium: 'priority-medium',
    high: 'priority-high',
  };
  return map[priority] || 'priority-low';
};

// Format relative time
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Get time-based greeting
export const getGreeting = (name = '') => {
  const hour = new Date().getHours();
  let greeting = '';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  return name ? `${greeting}, ${name.split(' ')[0]}!` : `${greeting}!`;
};

// Truncate text
export const truncate = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
};

// Parse tags from comma-separated string or array
export const parseTags = (input) => {
  if (Array.isArray(input)) return input.filter(t => t.trim());
  if (!input) return [];
  return input.split(',').map(t => t.trim()).filter(Boolean);
};

// Get color border style for note card
export const getColorBorder = (color) => {
  const borderMap = {
    '#FFFFFF': '#E2E8F0',
    '#FEF3C7': '#F59E0B',
    '#D1FAE5': '#10B981',
    '#DBEAFE': '#3B82F6',
    '#EDE9FE': '#8B5CF6',
    '#FCE7F3': '#EC4899',
    '#FEE2E2': '#EF4444',
    '#F3F4F6': '#6B7280',
    '#FFF7ED': '#F97316',
    '#ECFDF5': '#22C55E',
  };
  return borderMap[color] || '#E2E8F0';
};

// Debounce function
export const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
