import { BarChart3 } from 'lucide-react';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';

export default function Statistics() {
  const churchesResult = useRealtimeCollection('churches');
  const priestsResult = useRealtimeCollection('priests');
  const bishopsResult = useRealtimeCollection('bishops');

  const loading = churchesResult.loading || priestsResult.loading || bishopsResult.loading;
  const error = churchesResult.error || priestsResult.error || bishopsResult.error;

  const stats = [
    { value: churchesResult.items.length, label: 'Total churches and mission centers' },
    { value: priestsResult.items.length, label: 'Total priests serving the Diocese' },
    { value: bishopsResult.items.length, label: 'Bishops recorded in diocesan history' },
    { value: 1, label: 'Diocese united in faith and service' },
  ];

  const totalRecords = churchesResult.items.length + priestsResult.items.length + bishopsResult.items.length;

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">A living Diocese</p>
        <h1>Diocese Statistics</h1>
        <p>Explore the communities and ministers serving Northern Samar.</p>
      </header>

      {error ? (
        <ErrorState
          title="Unable to load diocesan statistics"
          description="One or more data sources could not be reached. Check your connection and try again."
          onRetry={async () => {
            await Promise.all([churchesResult.refetch(), priestsResult.refetch(), bishopsResult.refetch()]);
          }}
        />
      ) : loading ? (
        <section className="public-statistics public-statistics-page" aria-label="Loading statistics">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-10 w-16" />
              <Skeleton className="h-3 w-40 max-w-full" />
            </div>
          ))}
        </section>
      ) : (
        <>
          <section className="public-statistics public-statistics-page" aria-label="Diocesan statistics">
            {stats.map(stat => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </section>
          {totalRecords === 0 ? (
            <EmptyState
              icon={BarChart3}
              title="Statistics are being prepared"
              description="Diocesan records will be reflected here once they are published."
            />
          ) : null}
        </>
      )}
    </div>
  );
}
