import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { AdminHeader, formatDate, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
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
  temperature_2m?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
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
  const [regionName, setRegionName] = useState(regions[0].name);
  const [weather, setWeather] = useState<Weather>({});
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [intervalMinutes, setIntervalMinutes] = useState(10);
  const [error, setError] = useState('');
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const { items: logs, loading: logsLoading, error: logsError, refetch: refetchLogs } =
    useRealtimeCollection('weatherEventLogs');
  const requestRef = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);
  const region = regions.find(item => item.name === regionName) ?? regions[0];

  const loadWeather = useCallback(async () => {
    const requestId = ++requestRef.current;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError('');
    try {
      const current = ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'precipitation', 'weather_code'].join(',');
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${region.latitude}&longitude=${region.longitude}&current=${current}&timezone=Asia%2FManila`,
        { signal: controller.signal }
      );
      if (!response.ok) throw new Error('The weather service is unavailable right now.');
      const data = await response.json();
      if (requestId !== requestRef.current) return;
      const next = data.current ?? {};
      setWeather(next);
      setUpdatedAt(new Date());

      const severity = severityFor(next);
      if (severity !== 'low') {
        const idRef = push(ref(db, 'weatherEventLogs'));
        if (idRef.key) {
          await set(idRef, {
            date: new Date().toISOString(),
            region: region.name,
            eventType: (next.precipitation ?? 0) >= 5 ? 'Heavy precipitation' : 'Strong winds',
            severity,
            description: `${next.precipitation ?? 0} mm precipitation, ${next.wind_speed_10m ?? 0} km/h winds`,
            createdAt: new Date().toISOString(),
          });
        }
      }
    } catch (caught) {
      if (requestId !== requestRef.current || controller.signal.aborted) return;
      setError(caught instanceof Error ? caught.message : 'Unable to load weather.');
    } finally {
      if (requestId === requestRef.current) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  }, [region.latitude, region.longitude, region.name]);

  useEffect(() => () => controllerRef.current?.abort(), []);

  useEffect(() => {
    void loadWeather();
  }, [loadWeather]);

  useEffect(() => {
    if (!autoRefresh) return;
    const timer = window.setInterval(() => void loadWeather(), intervalMinutes * 60_000);
    return () => window.clearInterval(timer);
  }, [autoRefresh, intervalMinutes, loadWeather]);

  const severity = severityFor(weather);
  const activeAlert =
    severity === 'low'
      ? null
      : {
          type: (weather.precipitation ?? 0) >= 5 ? 'Heavy precipitation' : 'Strong winds',
          severity,
        };

  const sortedLogs = useMemo(
    () =>
      [...logs].sort(
        (a, b) => Date.parse(String(b.date ?? b.createdAt ?? '')) - Date.parse(String(a.date ?? a.createdAt ?? ''))
      ),
    [logs]
  );

  function exportCsv() {
    const rows = [
      ['Date', 'Region', 'Event Type', 'Severity', 'Description'],
      ...sortedLogs.map(item => [item.date, item.region, item.eventType, item.severity, item.description]),
    ];
    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
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
      details: `${sortedLogs.length} records`,
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
        {updatedAt ? <span className="admin-hint">Updated {updatedAt.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}</span> : null}
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

      <section className="admin-weather-grid">
        <div className="admin-map">
          <LiveWeatherMap region={region.name} weather={weather} />
        </div>
        <div className="admin-weather-panel" aria-busy={loading}>
          <p className="admin-eyebrow">Current conditions · {region.name}</p>
          {loading && !updatedAt ? (
            <div className="weather-metrics" aria-label="Loading current conditions">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index}>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-3 w-20" />
                </span>
              ))}
            </div>
          ) : (
            <div className="weather-metrics">
              <span><strong>{weather.temperature_2m ?? '—'}°C</strong>Temperature</span>
              <span><strong>{weather.relative_humidity_2m ?? '—'}%</strong>Humidity</span>
              <span><strong>{weather.wind_speed_10m ?? '—'} km/h</strong>Wind speed</span>
              <span><strong>{weather.precipitation ?? '—'} mm</strong>Precipitation</span>
            </div>
          )}
          <div className={`weather-alert severity-${activeAlert?.severity ?? 'low'}`} role="status">
            <strong>{activeAlert ? activeAlert.type : 'No severe alert'}</strong>
            <span>
              {activeAlert
                ? `${severityLabel(activeAlert.severity)} conditions detected for ${region.name}.`
                : 'Current readings are below configured warning thresholds.'}
            </span>
          </div>
        </div>
      </section>

      <section className="admin-table-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-eyebrow">Historical log</p>
            <h2>Weather events</h2>
          </div>
          <Button variant="secondary" onClick={exportCsv} disabled={!sortedLogs.length}>
            Export CSV
          </Button>
        </div>
        <div className="admin-table-wrap">
          {logsLoading ? (
            <SkeletonTable columns={5} rows={4} />
          ) : logsError ? (
            <ErrorState
              compact
              title="Unable to load weather events"
              description="The event log could not be reached."
              onRetry={() => void refetchLogs()}
            />
          ) : sortedLogs.length === 0 ? (
            <EmptyState
              compact
              icon={CloudSun}
              title="No severe weather events recorded"
              description="Events are recorded automatically when wind or rainfall passes the warning thresholds."
            />
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
                {sortedLogs.map(item => (
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
      </section>
    </div>
  );
}
