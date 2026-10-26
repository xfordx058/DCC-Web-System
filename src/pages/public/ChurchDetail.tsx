import { Link, useParams } from 'react-router-dom';
import { useRealtimeRecord } from '@/lib/firebase-data';
import { Skeleton } from '@/components/ui/skeleton';
import type { Church } from '@/types';

export default function ChurchDetail() {
  const { id } = useParams();
  const { data: church, loading } = useRealtimeRecord<Church>(`churches/${id ?? ''}`);

  if (loading) {
    return (
      <div className="public-page-stack">
        <Skeleton className="h-5 w-32" />
        <div className="public-detail">
          <div className="public-detail-hero">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="public-detail-body">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!church) {
    return (
      <div className="public-page-stack">
        <Link to="/parishes" className="section-link">← Back to parishes</Link>
        <div className="public-detail-panel">This church could not be found.</div>
      </div>
    );
  }

  return (
    <div className="public-page-stack">
      <Link to="/parishes" className="section-link">← Back to parishes</Link>

      <article className="public-detail">
        {church.image ? (
          <div className="public-detail-hero">
            <img src={church.image} alt={church.name} />
          </div>
        ) : null}

        <div className="public-detail-body">
          <div className="public-detail-head">
            <p className="admin-eyebrow">Church details</p>
            <h1>{church.name}</h1>
            {church.address ? <p>{church.address}</p> : null}
          </div>

          <div className="public-detail-grid">
            <div className="public-detail-panel">
              <h2>Overview</h2>
              <dl className="public-detail-list">
                <div><dt>Patron Saint</dt><dd>{church.patronSaint || '—'}</dd></div>
                <div><dt>Status</dt><dd>{church.status || '—'}</dd></div>
                <div><dt>Secretary</dt><dd>{church.secretary || '—'}</dd></div>
              </dl>
            </div>

            <div className="public-detail-panel">
              <h2>Leadership</h2>
              <dl className="public-detail-list">
                <div><dt>Main Priest</dt><dd>{church.mainPriestId || '—'}</dd></div>
                <div>
                  <dt>Assistant Priests</dt>
                  <dd>{church.assistantPriests ? (Array.isArray(church.assistantPriests) ? church.assistantPriests.filter(Boolean).join(', ') : church.assistantPriests) : '—'}</dd>
                </div>
              </dl>
            </div>
          </div>

          {church.history ? (
            <div className="public-detail-panel">
              <h2>History</h2>
              <p>{church.history}</p>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}
