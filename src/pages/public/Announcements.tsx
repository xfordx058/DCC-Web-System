import { formatDate, useRealtimeCollection } from '@/components/admin/AdminPrimitives';

export default function Announcements() {
  const { items, loading } = useRealtimeCollection('announcements');
  const announcements = items
    .filter(item => item.active !== false && String(item.status ?? 'active').toLowerCase() !== 'inactive')
    .sort((left, right) => (Date.parse(String(right.publishedDate ?? right.createdAt ?? '')) || 0) - (Date.parse(String(left.publishedDate ?? left.createdAt ?? '')) || 0));

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Diocese notices</p>
        <h1>Announcements</h1>
        <p>Read the latest updates, notices, and community messages from the Diocese of Catarman.</p>
      </header>
      <section className="public-card-grid">
        {loading ? <p className="admin-empty">Loading announcements?</p> : announcements.length ? announcements.map(item => (
          <article className="public-content-card" key={item.id}>
            <p className="event-date">{formatDate(item.publishedDate || item.createdAt)}</p>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </article>
        )) : <p className="admin-empty">No active announcements are available.</p>}
      </section>
    </div>
  );
}
