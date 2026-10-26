import { memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Banknote, ChevronLeft, ChevronRight, Menu, Smartphone, Wallet, X } from 'lucide-react';
import LazyIframe from '@/components/ui/LazyIframe';
import SmartImage from '@/components/ui/SmartImage';
import { PublicPageSkeleton, Skeleton } from '@/components/ui/skeleton';
import { useCurrentMinute } from '@/lib/weather';
import { useRealtimeCollection } from '@/lib/firebase-data';
import { useDonationMethods } from '@/lib/donations';
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

function donationIcon(name: string) {
  const iconClass = 'donation-icon';
  switch (name?.toLowerCase()) {
    case 'wallet':
      return <Wallet size={16} className={iconClass} aria-hidden />;
    case 'banknote':
      return <Banknote size={16} className={iconClass} aria-hidden />;
    default:
      return <Smartphone size={16} className={iconClass} aria-hidden />;
  }
}

function DonationCard() {
  const { methods, loading, error, refetch } = useDonationMethods(true);
  const [index, setIndex] = useState(0);

  const activeIndex = Math.min(index, Math.max(methods.length - 1, 0));
  const active = methods[activeIndex];

  const goTo = (next: number) => {
    if (!methods.length) return;
    setIndex((next + methods.length) % methods.length);
  };

  if (!active) {
    return (
      <div className="donation-card">
        <h4 className="donation-title">Support Our Mission</h4>
        <p className="donation-sub">Scan QR code to donate</p>
        {loading ? (
          <div className="donation-card-skeleton" role="status" aria-label="Loading donation options">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-28 w-28" />
            <Skeleton className="h-3 w-full" />
            <span className="sr-only">Loading donation options…</span>
          </div>
        ) : (
          <>
            <p className="donation-desc">
              {error
                ? 'Donation options are unavailable right now. Please try again shortly.'
                : 'Donation options will be listed here soon.'}
            </p>
            {error ? (
              <button type="button" className="donation-retry" onClick={() => void refetch()}>
                Try again
              </button>
            ) : null}
          </>
        )}
        <p className="donation-note">
          <Link to="/donations">View the donation page</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="donation-card">
      <h4 className="donation-title">Support Our Mission</h4>
      <p className="donation-sub">Scan QR code to donate</p>
      <span className="donation-type">
        {donationIcon(active.icon || active.name)}
        {active.name}
      </span>
      {active.qrImage ? (
        <div className="donation-qr">
          <SmartImage src={active.qrImage} alt={`${active.name} QR code`} fallbackLabel={`${active.name} QR code unavailable`} />
        </div>
      ) : null}
      <p className="donation-desc">{active.description || (active.accountNumber ? `Account: ${active.accountNumber}` : '')}</p>
      <div className="donation-controls">
        <button type="button" className="donation-arrow" aria-label="Previous donation option" onClick={() => goTo(activeIndex - 1)}>
          <ChevronLeft size={14} />
        </button>
        <div className="donation-dots">
          {methods.map((method, methodIndex) => (
            <button
              key={method.id}
              type="button"
              className="donation-dot"
              aria-label={`Show ${method.name}`}
              aria-current={methodIndex === activeIndex}
              onClick={() => setIndex(methodIndex)}
            />
          ))}
        </div>
        <button type="button" className="donation-arrow" aria-label="Next donation option" onClick={() => goTo(activeIndex + 1)}>
          <ChevronRight size={14} />
        </button>
      </div>
      <p className="donation-note">
        <Link to="/donations">View all ways to give</Link>
        <br />
        Or contact us directly at
        <br />
        <a href="mailto:diocesecatarman@gmail.com">diocesecatarman@gmail.com</a>
      </p>
    </div>
  );
}

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
          </div>

          <div className="footer-col">
            <p className="footer-heading">Contact</p>
            <nav className="footer-links" aria-label="Contact details">
              <a href="tel:+63907679132">+63 09076-79132 (TM)</a>
              <a href="tel:+63907663961">+63 09076-63961 (TNT)</a>
              <a href="mailto:diocesecatarman@gmail.com">diocesecatarman@gmail.com</a>
            </nav>
          </div>

          <div className="footer-col">
            <p className="footer-heading">Address</p>
            <p className="footer-blurb">DCC Cathedral Compound,<br />Catarman, Northern Samar</p>
            <div className="footer-map">
              <LazyIframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.1397457927727!2d125.12647767463297!3d12.490314191585706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33f4ba10a91c8f53%3A0x6d499d2a1b3a91f!2sCatarman%20Cathedral!5e0!3m2!1sen!2sph!4v1716174935720!5m2!1sen!2sph"
                title="Catarman Cathedral map"
              />
            </div>
          </div>

          <div className="footer-col">
            <DonationCard />
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
