import { useRealtimeCollection } from '@/lib/firebase-data';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/ui/states';
import SmartImage from '@/components/ui/SmartImage';

const fallback = {
  name: 'Year of Faith',
  description:
    'The Diocese dedicates this year to renewing our commitment to faith and strengthening community bonds through dedicated programs and spiritual exercises.',
  image:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
};

export default function YearOf() {
  const { items, loading, error, refetch } = useRealtimeCollection('yearOf');
  const current: Record<string, any> = items.find(item => item.isCurrent) ?? fallback;

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Pastoral focus</p>
        <h1>Current Year Theme</h1>
        <p>Walk with the Diocese through this year’s shared pastoral direction.</p>
      </header>

      {error ? (
        <ErrorState
          title="Unable to load the current year theme"
          description="The pastoral theme could not be reached. Check your connection and try again."
          onRetry={() => void refetch()}
        />
      ) : loading ? (
        <article className="public-theme-card" aria-hidden="true">
          <Skeleton className="h-64 w-full rounded-none" />
          <div className="skeleton-card-body">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </article>
      ) : (
        <article className="public-theme-card">
          <SmartImage
            src={String(current.image || fallback.image)}
            alt={current.name ? `${current.name} theme image` : ''}
            fallbackLabel="Theme image unavailable"
          />
          <div>
            <p className="admin-eyebrow">Current theme</p>
            <h2>{current.name || current.title || 'Year theme'}</h2>
            <p>{current.description}</p>
          </div>
        </article>
      )}
    </div>
  );
}
