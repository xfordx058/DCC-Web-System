import { useMemo, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminPrimitives';
import { useActivityLogs, type ActivityLogEntry } from '@/lib/activity-log';

function displayTimestamp(item: ActivityLogEntry) {
  if (!item.createdAt) return '?';
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

export default function AdminLogs() {
  const { logs: allLogs, loading } = useActivityLogs();
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const sources = useMemo(
    () => Array.from(new Set(allLogs.map(item => item.source))).sort((left, right) => left.localeCompare(right)),
    [allLogs]
  );

  const logs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const start = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : 0;
    const end = dateTo ? new Date(`${dateTo}T23:59:59`).getTime() : Number.POSITIVE_INFINITY;

    return allLogs
      .filter(item => source === 'all' || item.source.toLowerCase() === source)
      .filter(item => {
        const timestamp = Date.parse(item.createdAt) || 0;
        return timestamp >= start && timestamp <= end;
      })
      .filter(item => !normalized || JSON.stringify(item).toLowerCase().includes(normalized));
  }, [allLogs, dateFrom, dateTo, query, source]);

  return (
    <div className="admin-page">
      <AdminHeader title="Activity Logs" description="Every administrative change, sign-in, maintenance action, and recorded severe-weather event from one operational timeline." />

      <section className="admin-table-section">
        <div className="admin-toolbar admin-log-filters">
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search activity?" />
          <select value={source} onChange={event => setSource(event.target.value)}>
            <option value="all">All sources</option>
            {sources.map(option => (
              <option key={option} value={option.toLowerCase()}>{option}</option>
            ))}
          </select>
          <input aria-label="From date" type="date" value={dateFrom} onChange={event => setDateFrom(event.target.value)} />
          <input aria-label="To date" type="date" value={dateTo} onChange={event => setDateTo(event.target.value)} />
          <span>{logs.length} records</span>
        </div>

        <div className="admin-table-wrap">
          {loading ? <p className="admin-empty">Loading…</p> : logs.length ? (
            <table className="admin-table">
              <thead><tr><th>Timestamp</th><th>Source</th><th>Action / event</th><th>Admin / region</th><th>Details</th><th>Severity</th></tr></thead>
              <tbody>{logs.map(item => (
                <tr key={`${item.source}-${item.id}`}>
                  <td>{displayTimestamp(item)}</td>
                  <td>{item.source}</td>
                  <td>{item.action || 'Recorded activity'}</td>
                  <td>{item.admin || '?'}</td>
                  <td><span className="admin-clamp">{item.details || '—'}</span></td>
                  <td>{item.severity ? <span className={severityClass(String(item.severity))}>{item.severity}</span> : '?'}</td>
                </tr>
              ))}</tbody>
            </table>
          ) : <p className="admin-empty">No matching activity found.</p>}
        </div>
      </section>
    </div>
  );
}
