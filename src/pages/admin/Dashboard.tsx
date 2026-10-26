import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Church, CloudSun, FileText, Megaphone, Plus, Search, UserRound, Wrench } from 'lucide-react';
import { AdminHeader, eventEndMs, formatDate, isEventActive, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { Button } from '@/components/ui/button';
import { db, onValue, ref } from '@/db/firebase';

function useSetting<T>(path: string, fallback: T) {
  const [value, setValue] = useState(fallback);
  useEffect(() => onValue(ref(db, path), snapshot => setValue(snapshot.exists() ? snapshot.val() : fallback)), [fallback, path]);
  return value;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<Record<string, any> | null>(null);
  const { items: churches } = useRealtimeCollection('churches');
  const { items: priests } = useRealtimeCollection('priests');
  const { items: bishops } = useRealtimeCollection('bishops');
  const { items: events } = useRealtimeCollection('events');
  const { items: announcements } = useRealtimeCollection('announcements');
  const { items: yearThemes } = useRealtimeCollection('yearOf');
  const maintenance = useSetting<Record<string, any>>('maintenanceMode/config', {});
  const weatherEnabled = useSetting<boolean>('settings/weatherEnabled', true);
  const { items: weatherLogs } = useRealtimeCollection('weatherEventLogs');

  useEffect(() => {
    if (!weatherEnabled) return;
    fetch('https://api.open-meteo.com/v1/forecast?latitude=12.4989&longitude=124.6377&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=Asia%2FManila')
      .then(response => response.json())
      .then(data => setWeather(data.current ?? null))
      .catch(() => setWeather(null));
  }, [weatherEnabled]);

  const upcomingEvents = useMemo(() => [...events]
    .filter(item => isEventActive(item.dateExpired))
    .sort((a, b) => (eventEndMs(a.dateExpired) || 0) - (eventEndMs(b.dateExpired) || 0))
    .slice(0, 6), [events]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return [
      ...churches.map(item => ({ ...item, kind: 'Church', path: '/admin/churches', searchable: item.name })),
      ...priests.map(item => ({ ...item, kind: 'Priest', path: '/admin/priests', searchable: item.name })),
      ...events.map(item => ({ ...item, kind: 'Event', path: '/admin/events', searchable: item.title })),
    ].filter(item => String(item.searchable ?? '').toLowerCase().includes(normalized)).slice(0, 10);
  }, [churches, events, priests, query]);

  const stats = [
    { label: 'Churches', value: churches.length, icon: Church, path: '/admin/churches' },
    { label: 'Priests', value: priests.length, icon: UserRound, path: '/admin/priests' },
    { label: 'Events', value: events.length, icon: CalendarDays, path: '/admin/events' },
    { label: 'Announcements', value: announcements.length, icon: Megaphone, path: '/admin/announcements' },
    { label: 'Year themes', value: yearThemes.length, icon: FileText, path: '/admin/yearof' },
  ];

  const currentBishop = bishops.find(item => item.isCurrent);
  const currentYear = yearThemes.find(item => item.isCurrent);
  const recentAlert = [...weatherLogs].sort((a, b) => Date.parse(String(b.date ?? b.createdAt ?? '')) - Date.parse(String(a.date ?? a.createdAt ?? '')))[0];

  return (
    <div className="admin-page">
      <AdminHeader title="Dashboard" description="A live overview of diocesan content, upcoming activity, maintenance state, and weather operations." action={<div className="admin-header-actions"><Button onClick={() => navigate('/admin/events')} className="gap-2"><Plus size={16} aria-hidden /> Add event</Button><Button variant="secondary" onClick={() => navigate('/admin/announcements')} className="gap-2"><Plus size={16} aria-hidden /> Add announcement</Button></div>} />

      <section className="admin-dashboard-search">
        <Search size={18} />
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search churches, events, or priests…" />
        {query ? <div className="admin-search-results">{results.length ? results.map(item => <button key={`${item.kind}-${item.id}`} onClick={() => navigate(item.path)}><span>{item.searchable}</span><small>{item.kind}</small></button>) : <p>No matches found.</p>}</div> : null}
      </section>

      <section className="admin-stat-grid">
        {stats.map(stat => {
          const Icon = stat.icon;
          return <button key={stat.label} className="admin-stat" onClick={() => navigate(stat.path)}><span><small>{stat.label}</small><strong>{stat.value}</strong></span><Icon size={20} /></button>;
        })}
      </section>

      <section className="admin-dashboard-grid">
        <div className="admin-table-section admin-dashboard-events">
          <div className="admin-section-heading"><div><p className="admin-eyebrow">Schedule</p><h2>Upcoming events</h2></div><button onClick={() => navigate('/admin/events')}>View all</button></div>
          <div className="admin-list">{upcomingEvents.length ? upcomingEvents.map(item => <div key={item.id}><span><strong>{item.title || 'Untitled event'}</strong><small>{formatDate(item.dateExpired)} · {String(item.description ?? '').slice(0, 90)}</small></span></div>) : <p className="admin-empty">No upcoming events.</p>}</div>
        </div>

        <div className="admin-dashboard-side">
          <button className={`admin-operation-card ${maintenance.enabled ? 'is-warning' : ''}`} onClick={() => navigate('/admin/maintenance')}><Wrench size={20} /><span><small>Maintenance mode</small><strong>{maintenance.enabled ? 'Enabled' : 'Inactive'}</strong><em>{maintenance.endAt ? `Ends ${formatDate(maintenance.endAt)}` : 'No scheduled downtime'}</em></span></button>
          {weatherEnabled ? <button className="admin-operation-card" onClick={() => navigate('/admin/weather')}><CloudSun size={20} /><span><small>Catarman weather</small><strong>{weather ? `${weather.temperature_2m}°C` : 'Unavailable'}</strong><em>{recentAlert ? `${recentAlert.severity} alert · ${recentAlert.region}` : 'No recent severe alerts'}</em></span></button> : null}
          <div className="admin-operation-card"><UserRound size={20} /><span><small>Current bishop</small><strong>{currentBishop?.name || 'Not selected'}</strong><em>{currentYear?.name || 'No active year theme'}</em></span></div>
        </div>
      </section>
    </div>
  );
}
