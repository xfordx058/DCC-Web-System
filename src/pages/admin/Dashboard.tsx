import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Activity, CalendarDays, Church, CloudSun, FileText, Megaphone, Plus, UserRound, Wrench } from 'lucide-react';
import { AdminHeader, formatDate, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { formatEventTime, getEventStartMs, getEventStartDate, getEventStatus } from '@/lib/firebase-data';
import { Button } from '@/components/ui/button';
import { Skeleton, SkeletonList, SkeletonStats } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import { useRealtimeValue } from '@/lib/firebase-data';
import type { MaintenanceConfig } from '@/types';
import { useActivityLogs } from '@/lib/activity-log';

type WeatherNow = {
  temperature_2m?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  precipitation?: number;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('search') ?? '');
  const deferredQuery = useDeferredValue(query);
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);
  const [weatherUpdatedAt, setWeatherUpdatedAt] = useState<Date | null>(null);

  const churchesResult = useRealtimeCollection('churches');
  const priestsResult = useRealtimeCollection('priests');
  const bishopsResult = useRealtimeCollection('bishops');
  const eventsResult = useRealtimeCollection('events');
  const announcementsResult = useRealtimeCollection('announcements');
  const yearResult = useRealtimeCollection('yearOf');
  const { churches, priests, bishops, events, announcements, yearThemes } = {
    churches: churchesResult.items,
    priests: priestsResult.items,
    bishops: bishopsResult.items,
    events: eventsResult.items,
    announcements: announcementsResult.items,
    yearThemes: yearResult.items,
  };

  const maintenance = useRealtimeValue<Partial<MaintenanceConfig>>('maintenanceMode/config', {});
  const weatherEnabled = useRealtimeValue<boolean>('settings/weatherEnabled', true);
  const activity = useActivityLogs();

  const anyError = [
    churchesResult.error,
    priestsResult.error,
    bishopsResult.error,
    eventsResult.error,
    announcementsResult.error,
    yearResult.error,
  ].some(Boolean);

  const loading = [
    churchesResult.loading,
    priestsResult.loading,
    bishopsResult.loading,
    eventsResult.loading,
    announcementsResult.loading,
    yearResult.loading,
  ].some(Boolean);

  useEffect(() => {
    if (!weatherEnabled.value) {
      setWeatherLoading(false);
      setWeatherError(false);
      return;
    }
    const controller = new AbortController();
    let active = true;
    setWeatherLoading(true);
    setWeatherError(false);

    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=12.4989&longitude=124.6377&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=Asia%2FManila',
      { signal: controller.signal }
    )
      .then(response => {
        if (!response.ok) throw new Error('Weather request failed');
        return response.json();
      })
      .then(data => {
        if (active) {
          setWeather((data.current ?? null) as WeatherNow | null);
          setWeatherUpdatedAt(new Date());
        }
      })
      .catch(error => {
        if (!active || error?.name === 'AbortError') return;
        setWeather(null);
        setWeatherError(true);
      })
      .finally(() => {
        if (active) setWeatherLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [weatherEnabled.value]);

  const upcomingEvents = useMemo(
    () =>
      [...events]
        .filter(item => getEventStatus(item) !== 'past')
        .sort((a, b) => (getEventStartMs(a) || 0) - (getEventStartMs(b) || 0))
        .slice(0, 6),
    [events]
  );

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) return [];
    return [
      ...churches.map(item => ({ id: item.id, name: item.name, kind: 'Church', path: '/admin/churches' })),
      ...priests.map(item => ({ id: item.id, name: item.name, kind: 'Priest', path: '/admin/priests' })),
      ...events.map(item => ({ id: item.id, name: item.title, kind: 'Event', path: '/admin/events' })),
    ]
      .filter(item => String(item.name ?? '').toLowerCase().includes(normalized))
      .slice(0, 10);
  }, [churches, events, priests, deferredQuery]);

  const stats = [
    { label: 'Churches', value: churches.length, error: churchesResult.error, icon: Church, path: '/admin/churches' },
    { label: 'Priests', value: priests.length, error: priestsResult.error, icon: UserRound, path: '/admin/priests' },
    { label: 'Bishops', value: bishops.length, error: bishopsResult.error, icon: UserRound, path: '/admin/bishops' },
    { label: 'Events', value: events.length, error: eventsResult.error, icon: CalendarDays, path: '/admin/events' },
    { label: 'Announcements', value: announcements.length, error: announcementsResult.error, icon: Megaphone, path: '/admin/announcements' },
    { label: 'Year themes', value: yearThemes.length, error: yearResult.error, icon: FileText, path: '/admin/yearof' },
  ];

  const activityTrend = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(start.getDate() - 29);
    start.setHours(0, 0, 0, 0);
    const days = Array.from({ length: 30 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return { date, count: 0 };
    });
    for (const item of activity.logs) {
      const timestamp = Date.parse(item.createdAt);
      if (!Number.isFinite(timestamp) || timestamp < start.getTime() || timestamp > end.getTime()) continue;
      const dayIndex = Math.floor((new Date(timestamp).setHours(0, 0, 0, 0) - start.getTime()) / 86_400_000);
      if (days[dayIndex]) days[dayIndex].count += 1;
    }
    const max = Math.max(1, ...days.map(day => day.count));
    const points = days.map((day, index) => ({
      ...day,
      x: 36 + index * (528 / (days.length - 1)),
      y: 164 - day.count / max * 128,
    }));
    return { points, max, total: days.reduce((sum, day) => sum + day.count, 0) };
  }, [activity.logs]);

  const distribution = stats.map((stat, index) => ({
    ...stat,
    color: ['#0f4c81', '#0b2545', '#c9a227', '#4f7da5', '#9c7b22', '#7288a0'][index],
  }));
  const distributionTotal = distribution.reduce((sum, item) => sum + (item.error ? 0 : item.value), 0);
  const donutCircumference = 2 * Math.PI * 65;
  let donutOffset = 0;

  const latestChurches = [...churches]
    .sort((left, right) => {
      const leftDate = Date.parse(String(left.createdAt ?? left.updatedAt ?? ''));
      const rightDate = Date.parse(String(right.createdAt ?? right.updatedAt ?? ''));
      if (Number.isFinite(leftDate) && Number.isFinite(rightDate)) return rightDate - leftDate;
      return String(right.id).localeCompare(String(left.id));
    })
    .slice(0, 5);
  const recentAnnouncements = [...announcements]
    .filter(item => item.active !== false && String(item.status ?? 'active').toLowerCase() !== 'inactive')
    .sort((left, right) => Date.parse(String(right.publishedDate ?? right.createdAt ?? '')) - Date.parse(String(left.publishedDate ?? left.createdAt ?? '')))
    .slice(0, 4);

  const currentBishop = bishops.find(item => item.isCurrent);
  const currentYear = yearThemes.find(item => item.isCurrent);
  const maintenanceEnabled = maintenance.value.enabled === true || String(maintenance.value.enabled).toLowerCase() === 'true';
  const maintenanceStatus = (() => {
    if (maintenance.loading) return 'Loading';
    if (maintenance.error) return 'Unavailable';
    if (!maintenanceEnabled) return 'Inactive';
    const now = Date.now();
    const startAt = maintenance.value.startAt ? Date.parse(maintenance.value.startAt) : NaN;
    const endAt = maintenance.value.endAt ? Date.parse(maintenance.value.endAt) : NaN;
    if (Number.isFinite(endAt) && endAt < now) return 'Ended';
    if (Number.isFinite(startAt) && startAt > now) return 'Scheduled';
    return 'Enabled';
  })();
  const maintenanceDetail = [
    maintenance.loading
      ? 'Loading maintenance details…'
      : maintenance.error
        ? 'Maintenance status could not be loaded.'
        : maintenance.value.reason || maintenance.value.message || 'No maintenance note',
    maintenance.value.endAt
      ? `${maintenanceStatus === 'Ended' ? 'Ended' : 'Ends'} ${formatDate(maintenance.value.endAt)}`
      : null,
  ].filter(Boolean).join(' · ');

  const searching = query.trim() !== deferredQuery.trim();

  useEffect(() => {
    setQuery(searchParams.get('search') ?? '');
  }, [searchParams]);

  return (
    <div className="admin-page">
      <AdminHeader
        title="Dashboard"
        description="A live overview of diocesan content, upcoming activity, maintenance state, and weather operations."
        action={
          <div className="admin-header-actions">
            <Button onClick={() => navigate('/admin/events', { state: { openCreate: true } })} className="gap-2">
              <Plus size={16} aria-hidden />
              Add event
            </Button>
            <Button variant="secondary" onClick={() => navigate('/admin/announcements', { state: { openCreate: true } })} className="gap-2">
              <Plus size={16} aria-hidden />
              Add announcement
            </Button>
          </div>
        }
      />

      {anyError ? (
        <ErrorState
          compact
          title="Some dashboard data could not load"
          description="One or more content collections are temporarily unavailable. Try refreshing the summary."
          onRetry={async () => {
            await Promise.all([
              churchesResult.refetch(),
              priestsResult.refetch(),
              bishopsResult.refetch(),
              eventsResult.refetch(),
              announcementsResult.refetch(),
              yearResult.refetch(),
            ]);
          }}
        />
      ) : null}

      {query ? (
        <section className="admin-search-results admin-search-results-page" aria-label="Search results">
          <span id="dashboard-search-status" className="sr-only" aria-live="polite">
            {searching ? 'Searching…' : `${results.length} matches`}
          </span>
            {searching ? (
              <div className="admin-search-loading">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            ) : results.length ? (
              results.map(item => (
                <button key={`${item.kind}-${item.id}`} type="button" onClick={() => navigate(item.path)}>
                  <span>{item.name || 'Untitled'}</span>
                  <small>{item.kind}</small>
                </button>
              ))
            ) : (
              <p>No matches found.</p>
            )}
        </section>
      ) : null}

      {loading ? (
        <SkeletonStats count={4} />
      ) : (
        <section className="admin-stat-grid" aria-label="Content totals">
          {stats.slice(0, 4).map(stat => {
            const Icon = stat.icon;
            return (
              <button
                key={stat.label}
                type="button"
                className="admin-stat"
                onClick={() => navigate(stat.path)}
                aria-label={`Open ${stat.label} (${stat.error ? 'unavailable' : `${stat.value} records`})`}
              >
                <span>
                  <small>{stat.label}</small>
                  <strong>{stat.error ? '—' : stat.value}</strong>
                </span>
                <Icon size={20} aria-hidden />
              </button>
            );
          })}
        </section>
      )}

      <section className="admin-dashboard-grid">
      <section className="admin-table-section admin-chart-card" aria-labelledby="activity-heading">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">Last 30 days</p>
            <h2 id="activity-heading">Content activity</h2>
          </div>
        </div>
        {activity.loading ? (
          <Skeleton className="admin-chart-skeleton" />
        ) : activity.error ? (
          <ErrorState compact description="Activity history could not be loaded." onRetry={() => void activity.refetch()} />
        ) : activityTrend.total === 0 ? (
          <EmptyState compact icon={Activity} title="No recent activity" description="Logged content and administrative changes will appear here." />
        ) : (
          <>
            <svg
              className="admin-activity-chart"
              viewBox="0 0 600 205"
              role="img"
              aria-label={`Daily administrative and content log entries for the last 30 days. ${activityTrend.total} total entries, peak ${activityTrend.max} in one day.`}
              preserveAspectRatio="none"
            >
              <line x1="36" y1="36" x2="564" y2="36" />
              <line x1="36" y1="100" x2="564" y2="100" />
              <line x1="36" y1="164" x2="564" y2="164" />
              <polyline points={activityTrend.points.map(point => `${point.x},${point.y}`).join(' ')} />
              {activityTrend.points.filter(point => point.count > 0).map(point => (
                <circle key={point.date.toISOString()} cx={point.x} cy={point.y} r="3.5">
                  <title>{`${point.date.toLocaleDateString()}: ${point.count} ${point.count === 1 ? 'entry' : 'entries'}`}</title>
                </circle>
              ))}
            </svg>
            <div className="admin-chart-axis" aria-hidden="true">
              <span>{activityTrend.points[0]?.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              <span>{activityTrend.points[9]?.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              <span>{activityTrend.points[19]?.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              <span>{activityTrend.points[29]?.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
            </div>
            <p className="admin-inventory-note">{activityTrend.total} logged actions · sourced from the existing activity and operations logs.</p>
          </>
        )}
      </section>

        <section className="admin-table-section admin-quick-actions" aria-labelledby="quick-actions-heading">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Shortcuts</p>
              <h2 id="quick-actions-heading">Quick actions</h2>
            </div>
          </div>
          <div className="admin-quick-action-grid">
            <button type="button" onClick={() => navigate('/admin/churches', { state: { openCreate: true } })}><Plus size={16} aria-hidden /> Add church</button>
            <button type="button" onClick={() => navigate('/admin/priests', { state: { openCreate: true } })}><Plus size={16} aria-hidden /> Add priest</button>
            <button type="button" onClick={() => navigate('/admin/events', { state: { openCreate: true } })}><Plus size={16} aria-hidden /> Add event</button>
            <button type="button" onClick={() => navigate('/admin/announcements', { state: { openCreate: true } })}><Plus size={16} aria-hidden /> Add announcement</button>
          </div>
        </section>

        <section className="admin-table-section admin-chart-card" aria-labelledby="distribution-heading">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Current records</p>
              <h2 id="distribution-heading">Content distribution</h2>
            </div>
          </div>
          {loading ? (
            <Skeleton className="admin-donut-skeleton" />
          ) : anyError ? (
            <ErrorState compact description="Content distribution is incomplete while some collections are unavailable." onRetry={async () => {
              await Promise.all([churchesResult.refetch(), priestsResult.refetch(), bishopsResult.refetch(), eventsResult.refetch(), announcementsResult.refetch(), yearResult.refetch()]);
            }} />
          ) : distributionTotal === 0 ? (
            <EmptyState compact icon={FileText} title="No content records yet" description="Published and managed records will be summarized here." />
          ) : (
            <div className="admin-distribution">
              <div className="admin-donut" role="group" aria-label={`Content distribution, ${distributionTotal} records`}>
                <svg viewBox="0 0 152 152" aria-label={`${distribution.map(item => `${item.label}: ${item.value}`).join(', ')}.`} className="admin-donut-chart">
                  {distribution.map(item => {
                    const segmentLength = item.value / Math.max(1, distributionTotal) * donutCircumference;
                    const offset = donutOffset;
                    donutOffset += segmentLength;
                    return <circle key={item.label} cx="76" cy="76" r="65" fill="none" stroke={item.color} strokeWidth="22" strokeDasharray={`${segmentLength} ${donutCircumference - segmentLength}`} strokeDashoffset={-offset} className="admin-donut-segment"><title>{`${item.label}: ${item.value} records`}</title></circle>;
                  })}
                </svg>
                <span><strong>{distributionTotal}</strong>records</span>
              </div>
              <ul className="admin-distribution-legend">
                {distribution.map(item => (
                  <li key={item.label} title={`${item.label}: ${item.value} records`}><span style={{ backgroundColor: item.color }} aria-hidden="true" /><span>{item.label}</span><strong>{item.value}</strong></li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="admin-table-section admin-dashboard-events" aria-labelledby="upcoming-heading">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Schedule</p>
              <h2 id="upcoming-heading">Upcoming events</h2>
            </div>
            <button type="button" onClick={() => navigate('/admin/events')}>View all</button>
          </div>
          {eventsResult.loading ? <SkeletonList rows={4} /> : eventsResult.error ? (
            <ErrorState compact description="Events could not be loaded." onRetry={() => void eventsResult.refetch()} />
          ) : upcomingEvents.length ? (
            <div className="admin-list">
              {upcomingEvents.slice(0, 5).map(item => (
                <div key={item.id}>
                  <CalendarDays size={16} aria-hidden="true" />
                  <span><strong>{item.title || 'Untitled event'}</strong><small>{formatDate(getEventStartDate(item))}{item.eventTime ? ` · ${formatEventTime(item.eventTime)}` : ''} · {String(item.description ?? '').slice(0, 90)}</small></span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState compact icon={CalendarDays} title="No upcoming events" description="Events appear here until their end date passes." action={<Button onClick={() => navigate('/admin/events', { state: { openCreate: true } })} className="gap-2"><Plus size={15} aria-hidden /> Add event</Button>} />
          )}
        </section>

        <section className="admin-table-section admin-operations" aria-label="Diocesan operations">
          <button type="button" className={`admin-operation-card ${maintenanceStatus === 'Enabled' ? 'is-warning' : ''}`} onClick={() => navigate('/admin/maintenance')}>
            <Wrench size={20} aria-hidden="true" />
            <span><small>Maintenance mode</small><strong>{maintenance.loading ? <Skeleton className="h-4 w-20" /> : maintenanceStatus}</strong><em>{maintenanceDetail}</em></span>
          </button>
          {weatherEnabled.value ? (
            <button type="button" className="admin-operation-card" onClick={() => navigate('/admin/weather')}>
              <CloudSun size={20} aria-hidden="true" />
              <span><small>Catarman weather</small><strong>{weatherLoading ? <Skeleton className="h-4 w-14" /> : weatherError ? 'Unavailable' : weather?.temperature_2m != null ? `${weather.temperature_2m}°C` : 'No current reading'}</strong><em>{weatherLoading ? 'Refreshing conditions…' : weatherUpdatedAt ? `Updated ${weatherUpdatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : weatherError ? 'Weather service unavailable' : 'No update received'}</em></span>
            </button>
          ) : null}
          <div className="admin-operation-card">
            <UserRound size={20} aria-hidden="true" />
            <span><small>Current bishop and year theme</small><strong>{bishopsResult.loading ? <Skeleton className="h-4 w-32" /> : bishopsResult.error ? 'Bishop unavailable' : currentBishop?.name || 'Not selected'}</strong><em>{yearResult.loading ? 'Loading current theme…' : yearResult.error ? 'Theme unavailable' : currentYear?.name || 'No active year theme'}</em></span>
          </div>
        </section>
      </section>

      <section className="admin-table-section admin-dashboard-table" aria-labelledby="latest-churches-heading">
        <div className="admin-section-heading">
          <div><p className="admin-eyebrow">Directory</p><h2 id="latest-churches-heading">Latest churches</h2></div>
          <Button onClick={() => navigate('/admin/churches', { state: { openCreate: true } })} className="gap-2"><Plus size={15} aria-hidden /> Add church</Button>
        </div>
        {churchesResult.loading ? <SkeletonList rows={4} /> : churchesResult.error ? (
          <ErrorState compact description="Church records could not be loaded." onRetry={() => void churchesResult.refetch()} />
        ) : latestChurches.length ? (
          <div className="admin-table-wrap"><table className="admin-table" aria-label="Latest church records"><thead><tr><th scope="col">Church</th><th scope="col">Location</th><th scope="col">Assigned priest</th><th scope="col">Status</th><th scope="col">Actions</th></tr></thead><tbody>
            {latestChurches.map(church => {
              const mainPriest = priests.find(priest => priest.id === church.mainPriestId);
              return <tr key={church.id}><td>{church.name || 'Untitled church'}</td><td>{church.address || '—'}</td><td>{mainPriest?.name || '—'}</td><td><span className="admin-status">{church.status || 'Church'}</span></td><td><div className="admin-header-actions"><Button variant="secondary" onClick={() => navigate('/admin/churches', { state: { editId: church.id } })}>Edit</Button><Button variant="secondary" onClick={() => navigate('/admin/churches', { state: { deleteId: church.id } })}>Delete</Button></div></td></tr>;
            })}
          </tbody></table></div>
        ) : <EmptyState compact icon={Church} title="No church records yet" description="Add a church to begin building the parish directory." action={<Button onClick={() => navigate('/admin/churches', { state: { openCreate: true } })}><Plus size={15} aria-hidden /> Add church</Button>} />}
      </section>

      <section className="admin-table-section admin-dashboard-table" aria-labelledby="recent-announcements-heading">
        <div className="admin-section-heading">
          <div><p className="admin-eyebrow">Published news</p><h2 id="recent-announcements-heading">Recent announcements</h2></div>
          <div className="admin-header-actions"><Button variant="secondary" onClick={() => navigate('/admin/announcements')}>View all</Button><Button onClick={() => navigate('/admin/announcements', { state: { openCreate: true } })} className="gap-2"><Plus size={15} aria-hidden /> Add news</Button></div>
        </div>
        {announcementsResult.loading ? <SkeletonList rows={3} /> : announcementsResult.error ? (
          <ErrorState compact description="Announcements could not be loaded." onRetry={() => void announcementsResult.refetch()} />
        ) : recentAnnouncements.length ? (
          <div className="admin-list">{recentAnnouncements.map(item => <div key={item.id}><Megaphone size={16} aria-hidden="true" /><span><strong>{item.title || 'Untitled announcement'}</strong><small>{formatDate(item.publishedDate || item.createdAt)}</small></span></div>)}</div>
        ) : <EmptyState compact icon={Megaphone} title="No published announcements" description="Active announcements will appear here." action={<Button onClick={() => navigate('/admin/announcements', { state: { openCreate: true } })}><Plus size={15} aria-hidden /> Add announcement</Button>} />}
      </section>
    </div>
  );
}
