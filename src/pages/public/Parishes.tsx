import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { SkeletonGrid } from '@/components/ui/skeleton';
import type { Church } from '@/types';

export default function Parishes() {
  const { items: parishes, loading } = useRealtimeCollection('churches');
  const churchList = parishes
    .filter(item => item.name)
    .sort((a, b) => String(a.name).localeCompare(String(b.name))) as Church[];

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Churches</p>
        <h1>Parishes &amp; Mission Centers</h1>
        <p>Browse the churches and ministry centers served by the Diocese.</p>
      </header>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : churchList.length === 0 ? (
        <p className="admin-empty">No parishes available.</p>
      ) : (
        <section className="public-card-grid">
          {churchList.map(item => (
            <article key={item.id} className="public-media-card">
              {item.image ? (
                <div className="public-media-card-figure">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
              ) : null}
              <div className="public-media-card-body">
                <p className="admin-eyebrow">{item.status || 'Church'}</p>
                <h2>{item.name}</h2>
                <p>{item.patronSaint ? `Patron Saint: ${item.patronSaint}` : 'Serving the community'}</p>
                {item.address ? <p>{item.address}</p> : null}
                <Link to={`/parishes/${item.id}`} className="read-more-btn">
                  View details <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
