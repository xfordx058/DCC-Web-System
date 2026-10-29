import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, CloudSun, Droplets, RefreshCw, Thermometer, Wind } from 'lucide-react';
import { AdminHeader, formatDate, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { AdminViewToggle, useAdminViewPreference } from '@/components/admin/AdminViewToggle';
import { Button } from '@/components/ui/button';
import { LiveWeatherMap } from '@/components/weather/LiveWeatherMap';
import { db, push, ref, set } from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';
import { Skeleton, SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, Spinner } from '@/components/ui/states';

const regions = [
  { name: 'Catarman', latitude: 12.4989, longitude: 124.6377 },
  { name: 'Allen', latitude: 12.5006, longitude: 124.2849 },
  { name: 'Laoang', latitude: 12.5698, longitude: 125.0141 },
  { name: 'Catubig', latitude: 12.4099, longitude: 125.0549 },
];

type Weather = {
  time?: string;
  temperature_2m?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  wind_direction_10m?: number;
  precipitation?: number;
  weather_code?: number;
};

function severityFor(weather: Weather) {
  if ((weather.wind_speed_10m ?? 0) >= 62 || (weather.precipitation ?? 0) >= 30) return 'severe';
  if ((weather.wind_speed_10m ?? 0) >= 40 || (weather.precipitation ?? 0) >= 15) return 'high';
  if ((weather.wind_speed_10m ?? 0) >= 25 || (weather.precipitation ?? 0) >= 5) return 'moderate';
  return 'low';
}

function severityLabel(value: string) {
  if (!value) return 'Low';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AdminWeather() {
  const { mode: viewMode, updateMode: setViewMode } = useAdminViewPreference('weather-events');
  const [regionName, setRegionName] = useState(regions[0].name);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherRegion, setWeatherRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [intervalMinutes, setIntervalMinutes] = useState(10);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [updatedRegion, setUpdatedRegion] = useState('');
  const [nextRefreshAt, setNextRefreshAt] = useState<Date | null>(null);
  const [eventSaveError, setEventSaveError] = useState('');
  const [logsRegion, setLogsRegion] = useState('all');
  const [logPage, setLogPage] = useState(0);
  const { items: logs, loading: logsLoading, error: logsError, refetch: refetchLogs } =
    useRealtimeCollection('weatherEventLogs');
  const requestRef = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);
  const logsRef = useRef(logs);
  logsRef.current = logs;
  const region = regions.find(item => item.name === regionName) ?? regions[0];

  const loadWeather = useCallback(async () => {
    if (document.visibilityState !== 'visible' || controllerRef.current) return;
    const requestId = ++requestRef.current;
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError('');
    try {
      const current = ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'wind_direction_10m', 'precipitation', 'weather_code'].join(',');
      const params = new URLSearchParams({ latitude: String(region.latitude), longitude: String(region.longitude), current, timezone: 'Asia/Manila', wind_speed_unit: 'kmh' });
      const timeoutSignal = AbortSignal.timeout(15_000);
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: AbortSignal.any([controller.signal, timeoutSignal]) });
      if (!response.ok) throw new Error('The weather service is unavailable right now.');
      const data = await response.json();
      if (requestId !== requestRef.current) return;
      const next = data.current;
      if (!next || typeof next !== 'object') throw new Error('No current weather readings were returned for this location.');
      setWeather(next);
      setWeatherRegion(region.name);
      const providerTime = typeof next.time === 'string' ? new Date(next.time) : new Date();
      const successfulTime = Number.isNaN(providerTime.getTime()) ? new Date() : providerTime;
      setUpdatedAt(successfulTime);
      setUpdatedRegion(region.name);

      const severity = severityFor(next);
      if (severity !== 'low') {
        const eventType = (next.precipitation ?? 0) >= 5 ? 'Heavy precipitation' : 'Strong winds';
        const hasRecentDuplicate = logsRef.current.some(item => {
          const time = Date.parse(String(item.date ?? item.createdAt ?? ''));
          return item.region === region.name && item.severity === severity && item.eventType === eventType && Number.isFinite(time) && Date.now() - time < 6 * 60 * 60_000;
        });
        if (!hasRecentDuplicate) {
          const idRef = push(ref(db, 'weatherEventLogs'));
          if (idRef.key) {
            const recordedAt = new Date().toISOString();
            void set(idRef, {
              date: recordedAt,
              region: region.name,
              eventType,
              severity,
              description: `${next.precipitation ?? '—'} mm precipitation, ${next.wind_speed_10m ?? '—'} km/h winds`,
              createdAt: recordedAt,
            }).then(() => setEventSaveError('')).catch(() => setEventSaveError('Current weather loaded, but its event could not be saved to the history log.'));
          }
        }
      }
    } catch (caught) {
      if (requestId !== requestRef.current || controller.signal.aborted) return;
      setError(caught instanceof DOMException && caught.name === 'TimeoutError'
        ? 'The weather request timed out. Please try again.'
        : caught instanceof Error ? caught.message : 'Unable to load weather.');
    } finally {
      if (requestId === requestRef.current) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  }, [region.latitude, region.longitude, region.name]);

  useEffect(() => {
    controllerRef.current?.abort();
    void loadWeather();
    return () => {
      const activeController = controllerRef.current;
      activeController?.abort();
      if (controllerRef.current === activeController) controllerRef.current = null;
    };
  }, [loadWeather]);

  useEffect(() => {
    if (!autoRefresh) {
      setNextRefreshAt(null);
      return;
    }
    let cancelled = false;
    let timer = 0;
    const scheduleNext = () => {
      const next = new Date(Date.now() + intervalMinutes * 60_000);
      setNextRefreshAt(next);
      timer = window.setTimeout(() => {
        if (document.visibilityState === 'visible') void loadWeather();
        if (!cancelled) scheduleNext();
      }, intervalMinutes * 60_000);
    };
    scheduleNext();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [autoRefresh, intervalMinutes, loadWeather]);

  const hasCurrentData = Boolean(weather && weatherRegion === region.name);
  const currentWeather = hasCurrentData ? weather : null;
  const canEvaluateAlerts = Boolean(currentWeather && (Number.isFinite(currentWeather.wind_speed_10m) || Number.isFinite(currentWeather.precipitation)));
  const severity = canEvaluateAlerts && currentWeather ? severityFor(currentWeather) : null;
  const activeAlert =
    severity === 'low' || severity === null
      ? null
      : {
          type: (currentWeather?.precipitation ?? 0) >= 5 ? 'Heavy precipitation' : 'Strong winds',
          severity,
        };

  const sortedLogs = useMemo(
    () =>
      [...logs].sort(
        (a, b) => Date.parse(String(b.date ?? b.createdAt ?? '')) - Date.parse(String(a.date ?? a.createdAt ?? ''))
      ),
    [logs]
  );

  const filteredLogs = useMemo(() => logsRegion === 'all' ? sortedLogs : sortedLogs.filter(item => item.region === logsRegion), [logsRegion, sortedLogs]);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const visibleLogs = filteredLogs.slice(logPage * pageSize, (logPage + 1) * pageSize);

  function exportCsv() {
    const rows = [
      ['Date', 'Region', 'Event Type', 'Severity', 'Description'],
      ...filteredLogs.map(item => [item.date ?? item.createdAt, item.region, item.eventType, item.severity, item.description]),
    ];
    const csv = rows.map(row => row.map(value => {
      const raw = String(value ?? '');
      const safe = /^[\s]*[=+@-]/.test(raw) ? `'${raw}` : raw;
      return `"${safe.replace(/"/g, '""')}"`;
    }).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `weather-alerts-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    void recordActivity({
      source: 'Weather',
      action: 'Exported weather alert CSV',
      details: `${filteredLogs.length} records`,
    });
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Weather Forecast Management"
        description="Monitor current conditions across diocesan regions and retain severe-weather event records."
        action={
          <Button
            onClick={() => {
              void loadWeather();
              void recordActivity({ source: 'Weather', action: 'Refreshed weather data', details: region.name });
            }}
            className="gap-2"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? <Spinner label="Refreshing weather" /> : <RefreshCw size={16} aria-hidden />}
            {loading ? 'Refreshing…' : 'Refresh now'}
          </Button>
        }
      />

      <div className="admin-toolbar admin-weather-toolbar">
        <select value={regionName} onChange={event => setRegionName(event.target.value)} aria-label="Weather region">
          {regions.map(item => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>
        <label className="admin-checkbox">
          <input type="checkbox" checked={autoRefresh} onChange={event => setAutoRefresh(event.target.checked)} />
          <span>Auto refresh</span>
        </label>
        <select
          value={intervalMinutes}
          onChange={event => setIntervalMinutes(Number(event.target.value))}
          disabled={!autoRefresh}
          aria-label="Auto refresh interval"
        >
          <option value={5}>Every 5 minutes</option>
          <option value={10}>Every 10 minutes</option>
          <option value={30}>Every 30 minutes</option>
        </select>
        <span className="admin-hint weather-auto-status" role="status">{autoRefresh ? `Auto refresh on · next check ${nextRefreshAt?.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }) ?? 'scheduled'}` : 'Auto refresh off'}</span>
        {updatedAt && updatedRegion === region.name ? <span className={`admin-hint weather-updated${error ? ' is-stale' : ''}`} role="status">{error ? 'Showing last successful update · ' : 'Updated '}{updatedAt.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}{error ? ' · Stale' : ''}</span> : <span className="admin-hint weather-updated">{loading ? 'Updating selected location…' : 'No successful update for this location yet'}</span>}
      </div>

      {error ? (
        <ErrorState
          compact
          title="Weather data is unavailable"
          description={error}
          onRetry={() => void loadWeather()}
          retrying={loading}
        />
      ) : null}
      {eventSaveError ? <p className="weather-log-save-error" role="alert">{eventSaveError}</p> : null}

      <section className="admin-weather-grid">
        <div className="admin-map">
          <LiveWeatherMap region={region.name} locations={regions} weather={currentWeather} />
        </div>
        <div className="admin-weather-panel" aria-busy={loading}>
          <div className="weather-conditions-heading"><div><p className="admin-eyebrow">Observation</p><h2>Current conditions</h2></div><span>{region.name}</span></div>
          {loading && !currentWeather ? (
            <div className="weather-metrics" aria-label="Loading current conditions">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index}>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-20" />
                </span>
              ))}
            </div>
          ) : currentWeather ? (
            <div className="weather-metrics">
              <span><i><Thermometer size={17} aria-hidden="true" /></i><strong>{currentWeather.temperature_2m == null ? '—' : `${currentWeather.temperature_2m.toFixed(1)} °C`}</strong><small>Temperature</small></span>
              <span><i><Activity size={17} aria-hidden="true" /></i><strong>{currentWeather.relative_humidity_2m == null ? '—' : `${currentWeather.relative_humidity_2m}%`}</strong><small>Humidity</small></span>
              <span><i><Wind size={17} aria-hidden="true" /></i><strong>{currentWeather.wind_speed_10m == null ? '—' : `${currentWeather.wind_speed_10m.toFixed(1)} km/h`}</strong><small>{currentWeather.wind_direction_10m == null ? 'Wind direction unavailable' : `Wind · ${Math.round(currentWeather.wind_direction_10m)}°`}</small></span>
              <span><i><Droplets size={17} aria-hidden="true" /></i><strong>{currentWeather.precipitation == null ? '—' : `${currentWeather.precipitation.toFixed(1)} mm`}</strong><small>Precipitation</small></span>
            </div>
          ) : <div className="weather-no-readings" role="status"><CloudSun size={21} aria-hidden="true" /><span>{error ? 'Current conditions could not be loaded.' : 'No current readings are available.'}</span></div>}
          {currentWeather && updatedAt && updatedRegion === region.name ? <p className="weather-source-note"><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Weather data by Open-Meteo</a> · Observation time {currentWeather.time ? new Date(currentWeather.time).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }) : updatedAt.toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</p> : null}
          {!canEvaluateAlerts ? (
            <div className="weather-alert severity-unknown" role="status"><strong>Alert status unknown</strong><span>Current readings are unavailable, so configured thresholds cannot be checked.</span></div>
          ) : (
            <div className={`weather-alert severity-${activeAlert?.severity ?? 'low'}`} role="status">
              <strong>{activeAlert ? `${severityLabel(activeAlert.severity)} · ${activeAlert.type}` : 'No configured threshold exceeded'}</strong>
              <span>
                {activeAlert
                  ? `${region.name}: ${currentWeather?.precipitation ?? '—'} mm precipitation and ${currentWeather?.wind_speed_10m ?? '—'} km/h wind. Observed ${updatedAt?.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }) ?? 'time unavailable'}.`
                  : 'Latest readings are below the existing weather warning thresholds.'}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="admin-table-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">Historical log</p>
            <h2>Weather events</h2>
          </div>
          <div className="weather-history-actions">
            <label className="weather-history-filter">Filter region<select value={logsRegion} onChange={event => { setLogsRegion(event.target.value); setLogPage(0); }} aria-label="Filter weather events by region"><option value="all">All regions</option>{regions.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}</select></label>
            <Button variant="secondary" onClick={exportCsv} disabled={!filteredLogs.length}>Export CSV</Button>
            <AdminViewToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>
        <div className={`admin-table-wrap${viewMode === 'grid' ? ' is-grid-view' : ''}`}>
          {logsLoading ? (
            <SkeletonTable columns={5} rows={4} />
          ) : logsError ? (
            <ErrorState
              compact
              title="Unable to load weather events"
              description="The event log could not be reached."
              onRetry={() => void refetchLogs()}
            />
          ) : filteredLogs.length === 0 ? (
            <EmptyState
              compact
              icon={CloudSun}
              title="No severe weather events recorded"
              description="Events are recorded automatically when wind or rainfall passes the warning thresholds."
            />
          ) : viewMode === 'grid' ? (
            <div className="admin-record-grid">
              {visibleLogs.map(item => (
                <article className="admin-record-card" key={item.id}>
                  <header className="admin-record-card-head">
                    <h3>{item.eventType || 'Weather event'}</h3>
                    <span className={`admin-status severity-${item.severity}`}>{severityLabel(String(item.severity ?? ''))}</span>
                  </header>
                  <dl className="admin-record-card-details">
                    <div><dt>Date</dt><dd>{formatDate(item.date || item.createdAt)}</dd></div>
                    <div><dt>Region</dt><dd>{item.region || '—'}</dd></div>
                    <div><dt>Description</dt><dd>{item.description || '—'}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          ) : (
            <table className="admin-table" aria-label="Weather event log">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Region</th>
                  <th scope="col">Event</th>
                  <th scope="col">Severity</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {visibleLogs.map(item => (
                  <tr key={item.id}>
                    <td>{formatDate(item.date || item.createdAt)}</td>
                    <td>{item.region}</td>
                    <td>{item.eventType}</td>
                    <td>
                      <span className={`admin-status severity-${item.severity}`}>{severityLabel(String(item.severity ?? ''))}</span>
                    </td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!logsLoading && !logsError && filteredLogs.length > pageSize ? <div className="weather-pagination"><span>Showing {logPage * pageSize + 1}–{Math.min((logPage + 1) * pageSize, filteredLogs.length)} of {filteredLogs.length}</span><div><Button className="weather-small-button" variant="secondary" disabled={logPage === 0} onClick={() => setLogPage(page => Math.max(0, page - 1))}>Previous</Button><span aria-live="polite">Page {logPage + 1} of {pageCount}</span><Button className="weather-small-button" variant="secondary" disabled={logPage >= pageCount - 1} onClick={() => setLogPage(page => Math.min(pageCount - 1, page + 1))}>Next</Button></div></div> : null}
      </section>
    </div>
  );
}
