import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { eventEndMs, formatDate, formatEventTime, getEventEndDate, getEventStartDate, getEventStartMs, getEventStatus } from '@/lib/firebase-data';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import SmartImage from '@/components/ui/SmartImage';

const fallbackImage = 'https://images.unsplash.com/photo-1528150177508-6d41ea4c26ce?auto=format&fit=crop&w=1200&q=80';

export default function Events() {
  const { items, loading, error, refetch } = useRealtimeCollection('events');
  const [period, setPeriod] = useState<'upcoming' | 'past'>('upcoming');
  const events = items
    .filter(item => period === 'past' ? getEventStatus(item) === 'past' : getEventStatus(item) !== 'past')
    .sort((left, right) => period === 'past'
      ? (getEventStartMs(right) || 0) - (getEventStartMs(left) || 0)
      : (getEventStartMs(left) || eventEndMs(getEventEndDate(left)) || 0) - (getEventStartMs(right) || eventEndMs(getEventEndDate(right)) || 0));

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Diocesan calendar</p>
        <h1>Diocesan Events</h1>
        <p>Stay connected with masses, pastoral gatherings, celebrations, and ministry activities.</p>
      </header>

      <div className="public-event-period" role="group" aria-label="Choose event period">
        <button type="button" className={period === 'upcoming' ? 'is-active' : ''} aria-pressed={period === 'upcoming'} onClick={() => setPeriod('upcoming')}>Upcoming</button>
        <button type="button" className={period === 'past' ? 'is-active' : ''} aria-pressed={period === 'past'} onClick={() => setPeriod('past')}>Past events</button>
      </div>

      {loading ? (
        <SkeletonGrid count={3} />
      ) : error ? (
        <ErrorState
          title="Unable to load events"
          description="The diocesan calendar could not be reached. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={period === 'past' ? 'No past events to show' : 'No upcoming events right now'}
          description={period === 'past' ? 'Completed diocesan events will appear here.' : 'New masses, gatherings, and celebrations will appear here as soon as they are scheduled.'}
          action={
            <Link to="/announcements" className="ui-btn ui-btn-secondary">
              Read announcements
            </Link>
          }
        />
      ) : (
        <section className="public-card-grid public-event-grid" aria-label={period === 'past' ? 'Past events' : 'Upcoming events'}>
          {events.map(item => (
            <article className="public-content-card public-event-card" key={item.id}>
              <SmartImage
                src={String(item.image || item.image_url || fallbackImage)}
                alt={item.title ? `${item.title} event image` : ''}
                fallbackLabel="Event image unavailable"
              />
              <div>
                <p className="event-date">
                  {getEventStatus(item) === 'past' ? 'Past event' : getEventStatus(item) === 'ongoing' ? 'Happening now' : 'Upcoming'} · {formatDate(getEventStartDate(item))}
                  {item.eventTime ? `, ${formatEventTime(item.eventTime)}` : ''}
                  {getEventEndDate(item) && getEventEndDate(item) !== getEventStartDate(item)
                    ? ` – ${formatDate(getEventEndDate(item))}${item.endTime ? `, ${formatEventTime(item.endTime)}` : ''}`
                    : item.endTime ? ` – ${formatEventTime(item.endTime)}` : ''}
                </p>
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
