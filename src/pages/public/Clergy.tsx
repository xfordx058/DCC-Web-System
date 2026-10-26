import { useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { SkeletonGrid } from '@/components/ui/skeleton';
import type { Priest } from '@/types';

export default function Clergy() {
  const { items: priests, loading } = useRealtimeCollection('priests');
  const clergy = priests
    .filter(item => item.name)
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
      ) : clergy.length === 0 ? (
        <p className="admin-empty">No clergy members found.</p>
      ) : (
        <section className="public-card-grid">
          {clergy.map(person => (
            <article key={person.id} className="public-media-card">
              {person.photo ? (
                <div className="public-media-card-figure">
                  <img src={person.photo} alt={person.name} loading="lazy" />
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
