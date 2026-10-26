import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';
import { formatDate, useRealtimeCollection } from '@/lib/firebase-data';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';

export default function Announcements() {
  const { items, loading, error, refetch } = useRealtimeCollection('announcements');
  const announcements = items
    .filter(item => item.active !== false && String(item.status ?? 'active').toLowerCase() !== 'inactive')
    .sort(
      (left, right) =>
        (Date.parse(String(right.publishedDate ?? right.createdAt ?? '')) || 0) -
        (Date.parse(String(left.publishedDate ?? left.createdAt ?? '')) || 0)
    );

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Diocese notices</p>
        <h1>Announcements</h1>
        <p>Read the latest updates, notices, and community messages from the Diocese of Catarman.</p>
      </header>

      {loading ? (
        <SkeletonGrid count={3} media={false} />
      ) : error ? (
        <ErrorState
          title="Unable to load announcements"
          description="The latest notices could not be reached. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements right now"
          description="New notices from the Diocese will be published here."
          action={
            <Link to="/events" className="ui-btn ui-btn-secondary">
              Browse upcoming events
            </Link>
          }
        />
      ) : (
        <section className="public-card-grid" aria-label="Announcements">
          {announcements.map(item => (
            <article className="public-content-card" key={item.id}>
              <p className="event-date">{formatDate(item.publishedDate || item.createdAt)}</p>
              <h2>{item.title || 'Diocesan announcement'}</h2>
              <p>{item.content}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
