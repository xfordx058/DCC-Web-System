import { Suspense, useEffect, useState, type FormEvent } from 'react';
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DIOCESE_SEAL_URL, DIOCESE_NAME } from '@/lib/brand';
import { AdminPageSkeleton } from '@/components/ui/skeleton';
import Tooltip from '@/components/ui/Tooltip';
import SmartImage from '@/components/ui/SmartImage';
import {
  Activity, Bell, CalendarDays, ChevronsLeft, ChevronsRight, Church, CloudSun, ExternalLink,
  FileText, Gauge, HandHeart, Image, Megaphone, Menu, Settings, ShieldCheck, UserRound,
  UsersRound, Wrench, Radio, Search,
} from 'lucide-react';

const navGroups: { label: string; items: { to: string; label: string; icon: typeof Gauge; end?: boolean }[] }[] = [
  {
    label: 'Overview',
    items: [
      { to: '/admin', label: 'Dashboard', icon: Gauge, end: true },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/priests', label: 'Priests', icon: UserRound },
      { to: '/admin/bishops', label: 'Bishops', icon: UsersRound },
      { to: '/admin/churches', label: 'Churches', icon: Church },
      { to: '/admin/events', label: 'Events', icon: CalendarDays },
      { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
      { to: '/admin/streams', label: 'Live Streams', icon: Radio },
      { to: '/admin/heroes', label: 'Homepage Heroes', icon: Image },
      { to: '/admin/yearof', label: 'Year Of', icon: FileText },
      { to: '/admin/donations', label: 'Donations', icon: HandHeart },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin/weather', label: 'Weather', icon: CloudSun },
      { to: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
      { to: '/admin/logs', label: 'Logs', icon: Activity },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: Settings },
      { to: '/admin/account', label: 'Account', icon: ShieldCheck },
    ],
  },
];

const COLLAPSE_KEY = 'dcc-admin-sidebar-collapsed';

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(COLLAPSE_KEY) === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState(() => new URLSearchParams(location.search).get('search') ?? '');

  useEffect(() => {
    window.localStorage.setItem(COLLAPSE_KEY, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setGlobalSearch(new URLSearchParams(location.search).get('search') ?? '');
  }, [location.search]);

  function submitGlobalSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = globalSearch.trim();
    navigate(term ? `/admin?search=${encodeURIComponent(term)}` : '/admin');
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const toggleLabel = collapsed ? 'Expand sidebar' : 'Collapse sidebar';

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}${mobileOpen ? ' is-mobile-open' : ''}`}>
      <a href="#admin-main" className="skip-link">Skip to admin content</a>
      <aside className="admin-sidebar" aria-label="Administration">
        <div className="admin-brand">
          <div className="admin-brand-main">
            <SmartImage className="admin-brand-logo" src={DIOCESE_SEAL_URL} alt={`${DIOCESE_NAME} seal`} loading="eager" />
            <div className="admin-brand-text">
              <strong>Diocese of Catarman</strong>
              <small>Admin Portal</small>
            </div>
          </div>
          <button
            type="button"
            className="admin-sidebar-toggle"
            onClick={() => setCollapsed(value => !value)}
            aria-label={toggleLabel}
          >
            {collapsed ? <ChevronsRight size={18} aria-hidden /> : <ChevronsLeft size={18} aria-hidden />}
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          {navGroups.map(group => (
            <div key={group.label} className="admin-nav-group">
              <p className="admin-nav-label">{group.label}</p>
              {group.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    title={item.label}
                    className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  >
                    <Icon size={17} aria-hidden />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-user" title={user?.displayName || user?.email || 'Administrator'}>
          <span aria-hidden="true">{(user?.displayName || user?.email || 'A').slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{user?.displayName || 'Administrator'}</strong>
            <small>{user?.email}</small>
          </div>
        </div>
      </aside>

      {mobileOpen ? (
        <button type="button" className="admin-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
      ) : null}

      <div className="admin-workspace">
        <header className="admin-mobile-header">
          <Tooltip label="Open navigation">
            <button
              type="button"
              className="admin-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} aria-hidden />
            </button>
          </Tooltip>
          <strong>{DIOCESE_NAME}</strong>
          <Link to="/" className="inline-flex items-center gap-1.5">Public site <ExternalLink size={13} aria-hidden /></Link>
        </header>
        <header className="admin-topbar">
          <form className="admin-topbar-search" role="search" onSubmit={submitGlobalSearch}>
            <Search size={17} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search churches, events, or priests"
              placeholder="Search churches, events, or priests…"
              value={globalSearch}
              onChange={event => setGlobalSearch(event.target.value)}
            />
            <button type="submit" aria-label="Search admin content"><Search size={16} aria-hidden="true" /></button>
          </form>
          <div className="admin-topbar-actions">
            <Link to="/admin/logs" className="admin-topbar-icon" aria-label="View notifications and activity" title="Activity and notifications">
              <Bell size={18} aria-hidden="true" />
            </Link>
            <Link to="/admin/account" className="admin-topbar-profile">
              <span aria-hidden="true">{(user?.displayName || user?.email || 'A').slice(0, 1).toUpperCase()}</span>
              <strong>{user?.displayName || 'Profile'}</strong>
            </Link>
          </div>
        </header>
        <main id="admin-main" tabIndex={-1} className="admin-main">
          <Suspense fallback={<AdminPageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
