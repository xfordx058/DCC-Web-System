import { useRealtimeCollection } from '@/components/admin/AdminPrimitives';

const fallback = {
  name: 'Year of Faith',
  description: 'The Diocese dedicates this year to renewing our commitment to faith and strengthening community bonds through dedicated programs and spiritual exercises.',
  image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
};

export default function YearOf() {
  const { items, loading } = useRealtimeCollection('yearOf');
  const current: Record<string, any> = items.find(item => item.isCurrent) ?? fallback;

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Pastoral focus</p>
        <h1>Current Year Theme</h1>
        <p>Walk with the Diocese through this year?s shared pastoral direction.</p>
      </header>
      <article className="public-theme-card">
        <img src={current.image || fallback.image} alt="" />
        <div><p className="admin-eyebrow">{loading ? 'Loading theme' : 'Current theme'}</p><h2>{current.name || current.title}</h2><p>{current.description}</p></div>
      </article>
    </div>
  );
}
