import { Link } from 'react-router-dom';
import { UsersRound } from 'lucide-react';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import SmartImage from '@/components/ui/SmartImage';
import type { Priest } from '@/types';

export default function Clergy() {
  const { items: priests, loading, error, refetch } = useRealtimeCollection('priests');
  const clergy = priests
    .filter(item => item.name && String(item.status ?? 'active').toLowerCase() !== 'inactive')
    .sort((a, b) => String(a.name).localeCompare(String(b.name))) as Priest[];

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Public ministry</p>
        <h1>Clergy</h1>
        <p>Meet the priests serving the Diocese of Catarman.</p>
      </header>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : error ? (
        <ErrorState
          title="Unable to load the clergy directory"
          description="The list of priests could not be reached. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : clergy.length === 0 ? (
        <EmptyState
          icon={UsersRound}
          title="No clergy profiles available"
          description="Priest profiles will appear here once they are published by the Diocese."
          action={
            <Link to="/parishes" className="ui-btn ui-btn-secondary">
              Browse parishes
            </Link>
          }
        />
      ) : (
        <section className="public-card-grid" aria-label="Clergy">
          {clergy.map(person => (
            <article key={person.id} className="public-media-card">
              {person.photo ? (
                <div className="public-media-card-figure">
                  <SmartImage src={person.photo} alt={person.name || 'Priest'} fallbackLabel="Priest photo unavailable" />
                </div>
              ) : null}
              <div className="public-media-card-body">
                <p className="admin-eyebrow">{person.assignment || 'Priest'}</p>
                <h2>{person.name}</h2>
                {person.ordinationYear ? <p>Ordained {person.ordinationYear}</p> : null}
                {person.biography ? <p>{person.biography}</p> : null}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
