import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Banknote, ChevronLeft, ChevronRight, Menu, Smartphone, Wallet, X } from 'lucide-react';
import LazyIframe from '@/components/ui/LazyIframe';
import { useCurrentTime } from '@/lib/weather';
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

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5h1.4V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.1l4.2 5.6L17.5 3zm-1 16h1.6L7.6 4.7H5.9L16.5 19z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M21.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-.9C16 4.1 12 4.1 12 4.1s-4 0-6.8.2c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2.2 8.8 2.2 10.5v1.6c0 1.6.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.7 2.1.8 1.6.2 6.7.2 6.7.2s4 0 6.8-.2c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.6c0-1.6-.2-3.2-.2-3.2zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z" />
    </svg>
  );
}

function DonationCard() {
  const { methods, loading, error } = useDonationMethods(true);
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
        <p className="donation-desc">
          {loading
            ? 'Loading donation options…'
            : error
            ? 'Donation options are unavailable right now. Please try again shortly.'
            : 'Donation options will be listed here soon.'}
        </p>
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
          <img src={active.qrImage} alt={`${active.name} QR code`} loading="lazy" />
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
  const currentTime = useCurrentTime();
  const { items: announcements } = useRealtimeCollection('announcements');

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

  const formattedTime = useMemo(() => formatSectionTime(currentTime), [currentTime]);

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
          <span>{announcementText}</span>
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
            <img
              className="site-logo-img"
              src={DIOCESE_SEAL_URL}
              alt="Diocese of Catarman seal"
            />
            <span className="site-brand-col">
              <p className="site-wordmark">Diocese of Catarman</p>
              <p className="site-subtitle">Northern Samar, Philippines</p>
            </span>
          </Link>

          <div className="header-right">
            <p className="site-meta">{formattedTime}</p>

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
              className="mobile-menu-btn"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(open => !open)}
            >
              {mobileOpen ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="mobile-nav-panel" role="menu">
            {routeNavItems.map(item => (
              <NavLink key={item.to} to={item.to} role="menuitem" onClick={() => setMobileOpen(false)} className="nav-link">
                {item.label}
              </NavLink>
            ))}
            {sectionNavItems.map(item => (
              <Link key={item.hash} to={`/${item.hash}`} role="menuitem" onClick={() => setMobileOpen(false)} className="nav-link">
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <main id="main" className="py-6 md:py-8" tabIndex={-1}>
        <div className="container-1200">
          <Outlet />
        </div>
      </main>

      <footer id="contact" role="contentinfo" className="site-footer">
        <div className="container-1200 footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <img
                src={DIOCESE_SEAL_URL}
                alt="Diocese of Catarman seal"
              />
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
              <a href="#" aria-label="X" target="_blank" rel="noopener noreferrer"><XIcon /></a>
              <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>
            </div>
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
            <span>Copyright {'\u00A9'} 2026 DCC {'\u007C'} Powered by RBMDev</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
