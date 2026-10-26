import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Activity, Search } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminPrimitives';
import { useActivityLogs, type ActivityLogEntry } from '@/lib/activity-log';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import { Button } from '@/components/ui/button';

const PAGE_SIZE = 20;

function displayTimestamp(item: ActivityLogEntry) {
  if (!item.createdAt) return '—';
  const date = new Date(item.createdAt);
  return Number.isNaN(date.getTime()) ? item.createdAt : date.toLocaleString('en-PH');
}

function severityClass(severity: string) {
  const value = severity.toLowerCase();
  if (value === 'low' || value === 'info') return 'admin-status is-active';
  if (value === 'moderate' || value === 'medium' || value === 'warning') return 'admin-status is-warning';
  if (value === 'high' || value === 'severe' || value === 'error') return 'admin-status is-danger';
  return 'admin-status';
}

function severityLabel(severity: string) {
  if (!severity) return 'Info';
  return severity.charAt(0).toUpperCase() + severity.slice(1);
}

export default function AdminLogs() {
  const { logs: allLogs, loading, error, refetch } = useActivityLogs();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [source, setSource] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(0);

  const sources = useMemo(
    () => Array.from(new Set(allLogs.map(item => item.source))).sort((left, right) => left.localeCompare(right)),
    [allLogs]
  );

  const searchIndex = useMemo(
    () => allLogs.map(item => ({ item, haystack: JSON.stringify(item).toLowerCase() })),
    [allLogs]
  );

  const logs = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const start = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : 0;
    const end = dateTo ? new Date(`${dateTo}T23:59:59`).getTime() : Number.POSITIVE_INFINITY;

    return searchIndex
      .filter(entry => source === 'all' || entry.item.source.toLowerCase() === source)
      .filter(entry => {
        const timestamp = Date.parse(entry.item.createdAt) || 0;
        return timestamp >= start && timestamp <= end;
      })
      .filter(entry => !normalized || entry.haystack.includes(normalized))
      .map(entry => entry.item);
  }, [dateFrom, dateTo, deferredQuery, searchIndex, source]);

  const pageCount = Math.max(1, Math.ceil(logs.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageLogs = logs.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    if (page > pageCount - 1) setPage(0);
  }, [page, pageCount]);

  const filtering = Boolean(query.trim() || source !== 'all' || dateFrom || dateTo);

  function clearFilters() {
    setQuery('');
    setSource('all');
    setDateFrom('');
    setDateTo('');
    setPage(0);
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Activity Logs"
        description="Every administrative change, sign-in, maintenance action, and recorded severe-weather event from one operational timeline."
      />

      <div className="admin-toolbar admin-log-filters">
        <div className="admin-search-field">
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder="Search activity…"
            aria-label="Search activity logs"
          />
        </div>
        <select
          value={source}
          aria-label="Filter by source"
          onChange={event => {
            setSource(event.target.value);
            setPage(0);
          }}
        >
          <option value="all">All sources</option>
          {sources.map(option => (
            <option key={option} value={option.toLowerCase()}>{option}</option>
          ))}
        </select>
        <label className="admin-date-field">
          <span>From</span>
          <input
            aria-label="From date"
            type="date"
            value={dateFrom}
            onChange={event => {
              setDateFrom(event.target.value);
              setPage(0);
            }}
          />
        </label>
        <label className="admin-date-field">
          <span>To</span>
          <input
            aria-label="To date"
            type="date"
            value={dateTo}
            onChange={event => {
              setDateTo(event.target.value);
              setPage(0);
            }}
          />
        </label>
        <span aria-live="polite">{loading ? 'Loading…' : `${logs.length} records`}</span>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <SkeletonTable columns={6} />
        ) : error ? (
          <ErrorState
            title="Unable to load activity logs"
            description="The activity log could not be reached. Try loading it again."
            onRetry={() => void refetch()}
            compact
          />
        ) : pageLogs.length === 0 ? (
          <EmptyState
            icon={filtering ? Search : Activity}
            title={filtering ? 'No matching activity found' : 'No activity recorded yet'}
            description={
              filtering
                ? 'Try a different search term, source, or date range.'
                : 'Administrative actions will appear here as soon as they happen.'
            }
            action={
              filtering ? (
                <Button variant="secondary" onClick={clearFilters}>Clear filters</Button>
              ) : undefined
            }
          />
        ) : (
          <table className="admin-table" aria-label="Activity log">
            <thead>
              <tr>
                <th scope="col">Timestamp</th>
                <th scope="col">Source</th>
                <th scope="col">Action / event</th>
                <th scope="col">Admin / region</th>
                <th scope="col">Details</th>
                <th scope="col">Severity</th>
              </tr>
            </thead>
            <tbody>
              {pageLogs.map(item => (
                <tr key={`${item.source}-${item.id}`}>
                  <td className="admin-nowrap">{displayTimestamp(item)}</td>
                  <td>{item.source}</td>
                  <td>{item.action || 'Recorded activity'}</td>
                  <td>{item.admin || '—'}</td>
                  <td><span className="admin-clamp">{item.details || '—'}</span></td>
                  <td>
                    {item.severity ? (
                      <span className={severityClass(String(item.severity))}>{severityLabel(String(item.severity))}</span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && !error && logs.length > PAGE_SIZE ? (
        <div className="admin-pagination">
          <span>
            Showing {safePage * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE + PAGE_SIZE, logs.length)} of {logs.length}
          </span>
          <div className="admin-pagination-controls">
            <Button variant="secondary" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={safePage === 0}>
              Previous
            </Button>
            <span>Page {safePage + 1} of {pageCount}</span>
            <Button variant="secondary" onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))} disabled={safePage >= pageCount - 1}>
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
