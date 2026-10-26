import { cn } from '@/lib/utils';

/**
 * Layout-matched skeleton primitives.
 *
 * Each skeleton reserves the same space as the content it replaces so the page
 * does not jump when data arrives. The shimmer is CSS-driven and is disabled by
 * the global reduced-motion rule.
 */

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={cn('skeleton', className)} {...props} />;
}

export function SkeletonText({ lines = 2, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('skeleton-text', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={index === lines - 1 ? 'h-3 w-2/3' : 'h-3 w-full'} />
      ))}
    </div>
  );
}

export function SkeletonCard({ media = true }: { media?: boolean }) {
  return (
    <div className="skeleton-card" aria-hidden="true">
      {media ? <Skeleton className="aspect-[16/10] w-full rounded-none" /> : null}
      <div className="skeleton-card-body">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3, media = true }: { count?: number; media?: boolean }) {
  return (
    <div className="public-card-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} media={media} />
      ))}
    </div>
  );
}

export function SkeletonList({ rows = 5 }: { rows?: number }) {
  return (
    <div className="skeleton-list" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div className="skeleton-list-row" key={index}>
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="skeleton-list-copy">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 6, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="skeleton-table" aria-hidden="true">
      <div className="skeleton-table-head" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div className="skeleton-table-row" key={row} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, column) => (
            <Skeleton key={column} className={column === 0 ? 'h-4 w-3/4' : 'h-3 w-1/2'} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats({ count = 5 }: { count?: number }) {
  return (
    <div className="admin-stat-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="admin-stat skeleton-stat" key={index}>
          <span>
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-10" />
          </span>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** Fallback for lazy-loaded public routes. Matches the public page rhythm. */
export function PublicPageSkeleton() {
  return (
    <div className="public-page-stack" role="status" aria-live="polite" aria-label="Loading page">
      <div className="public-page-heading">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="h-9 w-2/3 max-w-md" />
        <Skeleton className="h-3.5 w-full max-w-xl" />
      </div>
      <SkeletonGrid count={3} />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Fallback for lazy-loaded admin routes. Matches the admin table rhythm. */
export function AdminPageSkeleton() {
  return (
    <div className="admin-page" role="status" aria-live="polite" aria-label="Loading page">
      <div className="admin-page-header">
        <div className="admin-page-headline">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="skeleton-headline-copy">
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-3 w-72 max-w-full" />
          </div>
        </div>
      </div>
      <div className="admin-toolbar">
        <Skeleton className="h-11 w-full max-w-md" />
        <Skeleton className="h-4 w-20" />
      </div>
      <SkeletonTable />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
