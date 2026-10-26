import { memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ExternalLink, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import LazyIframe from '@/components/ui/LazyIframe';
import SmartImage from '@/components/ui/SmartImage';
import { PublicPageSkeleton } from '@/components/ui/skeleton';
import { useCurrentMinute } from '@/lib/weather';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { DIOCESE_SEAL_URL } from '@/lib/brand';

const routeNavItems = [
  { label: 'LATEST', to: '/announcements' },
  { label: 'EVENTS', to: '/events' },
  { label: 'PARISHES', to: '/parishes' },
  { label: 'CLERGY', to: '/clergy' },
  { label: 'DONATE', to: '/donations' },
  { label: 'CONTACT', to: '/contact' },
];

const sectionNavItems = [
  { label: 'VISION', hash: '#vision' },
  { label: 'MISSION', hash: '#mission' },
];

function formatSectionTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Isolated clock: only this node re-renders each minute instead of the whole
 * public layout (and its realtime collections) every second.
 */
const HeaderClock = memo(function HeaderClock() {
  const now = useCurrentMinute();
  return (
    <p className="site-meta">
      <time dateTime={now.toISOString()}>{formatSectionTime(now)}</time>
    </p>
  );
});

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  const location = useLocation();
  const { items: announcements } = useRealtimeCollection('announcements');

  const mainRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const initialRender = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (location.hash) {
      const timer = window.setTimeout(() => {
        const target = document.getElementById(location.hash.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  // Move keyboard focus to the main region on client-side navigation so screen
  // reader and keyboard users are not left at the top of the old page.
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (location.hash) return;
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const featuredAnnouncement = useMemo(() => announcements
    .filter(item => item.active !== false && String(item.status ?? 'active').toLowerCase() !== 'inactive')
    .sort((a, b) => (Date.parse(String(b.publishedDate ?? b.createdAt ?? '')) || 0) - (Date.parse(String(a.publishedDate ?? a.createdAt ?? '')) || 0))[0], [announcements]);

  const announcementText = announcementDismissed
    ? null
    : (featuredAnnouncement?.title || featuredAnnouncement?.content || 'Welcome \u2014 To our newly redesigned website');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <a href="#main" className="skip-link">Skip to content</a>

      {announcementText ? (
        <div className="announcement-bar" role="region" aria-label="Announcement">
          <span title={announcementText}>{announcementText}</span>
          <button
            type="button"
            className="announcement-close"
            aria-label="Dismiss announcement"
            onClick={() => setAnnouncementDismissed(true)}
          >
            <X size={14} aria-hidden />
          </button>
        </div>
      ) : null}

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="inner">
          <Link to="/" className="site-brand" aria-label="Diocese of Catarman home">
            <SmartImage
              className="site-logo-img"
              src={DIOCESE_SEAL_URL}
              alt="Diocese of Catarman seal"
              loading="eager"
              fetchPriority="high"
            />
            <span className="site-brand-col">
              <p className="site-wordmark">Diocese of Catarman</p>
              <p className="site-subtitle">Northern Samar, Philippines</p>
            </span>
          </Link>

          <div className="header-right">
            <HeaderClock />

            <nav className="nav-list" aria-label="Main navigation">
              {routeNavItems.map(item => (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {item.label}
                </NavLink>
              ))}
              {sectionNavItems.map(item => (
                <Link key={item.hash} to={`/${item.hash}`} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              className="mobile-menu-btn"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="public-mobile-nav"
              onClick={() => setMobileOpen(open => !open)}
            >
              {mobileOpen ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav
            id="public-mobile-nav"
            ref={panelRef}
            className="mobile-nav-panel"
            aria-label="Mobile navigation"
          >
            {routeNavItems.map(item => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
            {sectionNavItems.map(item => (
              <Link key={item.hash} to={`/${item.hash}`} onClick={() => setMobileOpen(false)} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="main" ref={mainRef} className="py-6 md:py-8" tabIndex={-1}>
        <div className="container-1200">
          <Suspense fallback={<PublicPageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      <footer id="contact" role="contentinfo" className="site-footer">
        <div className="container-1200 footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-brand" aria-label="Diocese of Catarman home">
              <SmartImage src={DIOCESE_SEAL_URL} alt="Diocese of Catarman seal" fallbackLabel="Diocese of Catarman seal" />
              <span><strong>Diocese of Catarman</strong><small>Northern Samar, Philippines</small></span>
            </Link>
            <p className="footer-intro">Stay connected with the life and work of the Diocese.</p>
            <nav className="footer-explore-links" aria-label="Explore the website">
              <Link to="/parishes">Parishes</Link>
              <Link to="/events">Events</Link>
              <Link to="/announcements">Latest updates</Link>
            </nav>
          </div>

          <div className="footer-col">
            <p className="footer-heading">Contact</p>
            <nav className="footer-links" aria-label="Contact details">
              <a href="tel:+63907679132"><Phone size={15} aria-hidden="true" /><span>+63 09076-79132 <small>(TM)</small></span></a>
              <a href="tel:+63907663961"><Phone size={15} aria-hidden="true" /><span>+63 09076-63961 <small>(TNT)</small></span></a>
              <a href="mailto:diocesecatarman@gmail.com"><Mail size={15} aria-hidden="true" /><span>diocesecatarman@gmail.com</span></a>
            </nav>
          </div>

          <div className="footer-col">
            <p className="footer-heading">Address</p>
            <div className="footer-location-card">
              <p className="footer-blurb footer-address">
                <MapPin size={16} aria-hidden="true" />
                <span><strong>Our Lady of the Annunciation Cathedral</strong><small>DCC Cathedral Compound,<br />Catarman, Northern Samar</small></span>
              </p>
            <div className="footer-map">
              <LazyIframe
                src="https://www.google.com/maps?q=12.4986944%2C124.6365&z=16&output=embed"
                title="Catarman Cathedral map"
              />
            </div>
              <a className="footer-map-link" href="https://www.google.com/maps/search/?api=1&query=12.4986944%2C124.6365" target="_blank" rel="noopener noreferrer">
                Open in Google Maps <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <span>Copyright {'\u00A9'} {new Date().getFullYear()} DCC {'\u007C'} Powered by RBMDev</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
