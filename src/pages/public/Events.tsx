import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { eventEndMs, formatDate, isEventActive } from '@/lib/firebase-data';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import SmartImage from '@/components/ui/SmartImage';

const fallbackImage = 'https://images.unsplash.com/photo-1528150177508-6d41ea4c26ce?auto=format&fit=crop&w=1200&q=80';

export default function Events() {
  const { items, loading, error, refetch } = useRealtimeCollection('events');
  const events = items
    .filter(item => isEventActive(item.dateExpired))
    .sort((left, right) => (eventEndMs(left.dateExpired) || 0) - (eventEndMs(right.dateExpired) || 0));

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Diocesan calendar</p>
        <h1>Upcoming Events</h1>
        <p>Stay connected with masses, pastoral gatherings, celebrations, and ministry activities.</p>
      </header>

      {loading ? (
        <SkeletonGrid count={3} />
      ) : error ? (
        <ErrorState
          title="Unable to load upcoming events"
          description="The diocesan calendar could not be reached. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No upcoming events right now"
          description="New masses, gatherings, and celebrations will appear here as soon as they are scheduled."
          action={
            <Link to="/announcements" className="ui-btn ui-btn-secondary">
              Read announcements
            </Link>
          }
        />
      ) : (
        <section className="public-card-grid public-event-grid" aria-label="Upcoming events">
          {events.map(item => (
            <article className="public-content-card public-event-card" key={item.id}>
              <SmartImage
                src={String(item.image || item.image_url || fallbackImage)}
                alt={item.title ? `${item.title} event image` : ''}
                fallbackLabel="Event image unavailable"
              />
              <div>
                <p className="event-date">Until {formatDate(item.dateExpired)}</p>
                <h2>{item.title || 'Diocesan event'}</h2>
                <p>{item.description}</p>
                <Link className="read-more-btn" to="/#latest">
                  View on homepage <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
