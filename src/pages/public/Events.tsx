import { ArrowRight } from 'lucide-react';
import { eventEndMs, formatDate, isEventActive, useRealtimeCollection } from '@/components/admin/AdminPrimitives';

const fallbackImage = 'https://images.unsplash.com/photo-1528150177508-6d41ea4c26ce?auto=format&fit=crop&w=1200&q=80';

export default function Events() {
  const { items, loading } = useRealtimeCollection('events');
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
      <section className="public-card-grid public-event-grid">
        {loading ? <p className="admin-empty">Loading events?</p> : events.length ? events.map(item => (
          <article className="public-content-card public-event-card" key={item.id}>
            <img src={item.image || item.image_url || fallbackImage} alt="" />
            <div>
              <p className="event-date">Until {formatDate(item.dateExpired)}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a className="read-more-btn" href={`/#latest`}>View on homepage <ArrowRight size={16} /></a>
            </div>
          </article>
        )) : <p className="admin-empty">No upcoming events are available.</p>}
      </section>
    </div>
  );
}
