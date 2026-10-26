import { Link } from 'react-router-dom';
import { ArrowRight, Church } from 'lucide-react';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { SkeletonGrid } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import SmartImage from '@/components/ui/SmartImage';
import type { Church as ChurchType } from '@/types';

export default function Parishes() {
  const { items: parishes, loading, error, refetch } = useRealtimeCollection('churches');
  const churchList = parishes
    .filter(item => item.name)
    .sort((a, b) => String(a.name).localeCompare(String(b.name))) as ChurchType[];

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Churches</p>
        <h1>Parishes &amp; Mission Centers</h1>
        <p>Browse the churches and ministry centers served by the Diocese.</p>
      </header>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : error ? (
        <ErrorState
          title="Unable to load the parish directory"
          description="The list of churches could not be reached. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : churchList.length === 0 ? (
        <EmptyState
          icon={Church}
          title="No parishes listed yet"
          description="Parish and mission center details will appear here once published."
          action={
            <Link to="/contact" className="ui-btn ui-btn-secondary">
              Contact the Diocese
            </Link>
          }
        />
      ) : (
        <section className="public-card-grid" aria-label="Parishes and mission centers">
          {churchList.map(item => (
            <article key={item.id} className="public-media-card">
              <div className="public-media-card-figure">
                {item.image ? <SmartImage src={item.image} alt={`${item.name || 'Church'} exterior`} fallbackLabel="Church photo unavailable" /> : <span className="public-parish-placeholder" aria-hidden="true"><Church size={28} /></span>}
              </div>
              <div className="public-media-card-body">
                <p className="admin-eyebrow">{item.status || 'Church'}</p>
                <h2>{item.name}</h2>
                <p>{item.patronSaint ? `Patron Saint: ${item.patronSaint}` : 'Serving the community'}</p>
                {item.address ? <p>{item.address}</p> : null}
                <Link to={`/parishes/${item.id}`} className="read-more-btn" aria-label={`View parish: ${item.name}`}>
                  View parish <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
