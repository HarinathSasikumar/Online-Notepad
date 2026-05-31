const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-3" style={{ minHeight: 180 }}>
    <div className="skeleton h-4 w-3/4 rounded-lg" />
    <div className="skeleton h-3 w-full rounded-lg" />
    <div className="skeleton h-3 w-5/6 rounded-lg" />
    <div className="skeleton h-3 w-2/3 rounded-lg" />
    <div className="mt-auto flex gap-2">
      <div className="skeleton h-5 w-16 rounded-full" />
      <div className="skeleton h-5 w-12 rounded-full" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '16px',
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;

