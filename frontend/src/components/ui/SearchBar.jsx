import { useCallback, useRef } from 'react';
import { FiSearch, FiX, FiFilter, FiChevronDown } from 'react-icons/fi';
import { useNotes } from '../../context/NotesContext';
import { CATEGORIES, SORT_OPTIONS, NOTE_COLORS, debounce } from '../../utils/helpers';

const FilterChip = ({ label, value, current, onChange, options }) => (
  <div className="relative">
    <select
      value={current}
      onChange={e => onChange(e.target.value)}
      className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer outline-none"
      style={{
        background: current !== 'all' && current !== 'newest' ? 'rgba(99,102,241,0.08)' : '#F8FAFF',
        borderColor: current !== 'all' && current !== 'newest' ? '#A5B4FC' : '#E8EEFF',
        color: current !== 'all' && current !== 'newest' ? '#4F46E5' : '#334155',
      }}
    >
      <option value="all">{label}</option>
      {options.map(o => (
        <option key={o.value || o} value={o.value || o}>{o.label || o}</option>
      ))}
    </select>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600"><FiChevronDown size={12} /></div>
  </div>
);

const SearchBar = () => {
  const { filters, updateFilters, resetFilters } = useNotes();
  const inputRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce((value) => updateFilters({ search: value }), 300),
    [updateFilters]
  );

  const clearSearch = () => {
    if (inputRef.current) inputRef.current.value = '';
    updateFilters({ search: '' });
  };

  const hasActiveFilters =
    filters.search || filters.category !== 'all' ||
    filters.color !== 'all' || filters.priority !== 'all' || filters.sort !== 'newest';

  const activeCount = [
    filters.search, filters.category !== 'all', filters.color !== 'all',
    filters.priority !== 'all', filters.sort !== 'newest'
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-3">
      {/* Search row */}
      <div className="flex items-center gap-3">
        {/* Filter icon badge */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 relative"
          style={{ background: 'rgba(99,102,241,0.08)', color: '#6366F1' }}
        >
          <FiFilter size={15} />
          {activeCount > 0 && (
            <div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: '#6366F1', fontSize: 9 }}
            >
              {activeCount}
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2"
            size={16}
            style={{ color: '#475569' }}
          />
          <input
            ref={inputRef}
            id="search-notes"
            type="text"
            placeholder="Search notes by title, content, or tags..."
            defaultValue={filters.search}
            onChange={e => debouncedSearch(e.target.value)}
            className="w-full outline-none text-sm font-medium transition-all rounded-xl"
            style={{
              background: '#F8FAFF',
              border: '1.5px solid #E8EEFF',
              padding: '10px 38px 10px 40px',
              color: '#020617',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#6366F1';
              e.target.style.background = '#FFFFFF';
              e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#E8EEFF';
              e.target.style.background = '#F8FAFF';
              e.target.style.boxShadow = 'none';
            }}
          />
          {filters.search && (
            <button
              onClick={clearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all"
              style={{ background: '#E2E8F0', color: '#334155' }}
            >
              <FiX size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Filter chips row */}
      <div className="flex items-center gap-2 flex-wrap pl-12">
        <FilterChip
          label="All Categories"
          current={filters.category}
          onChange={v => updateFilters({ category: v })}
          options={['Work','Personal','Study','Health','Finance','Ideas','Travel','Other'].map(c => ({ value: c, label: c }))}
        />
        <FilterChip
          label="All Priorities"
          current={filters.priority}
          onChange={v => updateFilters({ priority: v })}
          options={[
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
          ]}
        />
        <FilterChip
          label="Newest First"
          current={filters.sort}
          onChange={v => updateFilters({ sort: v })}
          options={SORT_OPTIONS}
        />

        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {NOTE_COLORS.slice(0, 7).map(c => (
            <button
              key={c.value}
              title={c.label}
              onClick={() => updateFilters({ color: filters.color === c.value ? 'all' : c.value })}
              className="rounded-full border-2 transition-all"
              style={{
                width: 20, height: 20,
                background: c.value === '#FFFFFF' ? 'linear-gradient(135deg, #f8f8f8, #e2e8f0)' : c.value,
                borderColor: filters.color === c.value ? '#6366F1' : 'rgba(0,0,0,0.1)',
                transform: filters.color === c.value ? 'scale(1.25)' : 'scale(1)',
                boxShadow: filters.color === c.value ? '0 0 0 2px #FFFFFF, 0 0 0 4px #6366F1' : 'none',
              }}
            />
          ))}
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            id="reset-filters"
            onClick={resetFilters}
            className="ml-auto text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
            style={{ color: '#6366F1', background: 'rgba(99,102,241,0.08)' }}
            onMouseEnter={e => e.target.style.background = 'rgba(99,102,241,0.15)'}
            onMouseLeave={e => e.target.style.background = 'rgba(99,102,241,0.08)'}
          >
            <FiX size={12} className="inline mr-1" /> Reset filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

