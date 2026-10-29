import { ReactNode, useEffect, useMemo, useState } from 'react';
import { db, onValue, ref } from '@/db/firebase';
import { useAdminAccess } from '@/lib/admins';
import { useRealtimeValue } from '@/lib/firebase-data';
import { Spinner } from '@/components/ui/states';
import { safeHttpUrl, safeMailto, safeTel } from '@/lib/urls';
import diocesanSeal from '../../../assets/dioces-of-catarman.png';

type MaintenanceConfig = {
  enabled?: boolean | string;
  message?: string;
  reason?: string;
  startAt?: string;
  endAt?: string;
  contactEmail?: string;
  contactPhone?: string;
  supportLink?: string;
  countdownEnabled?: boolean;
  template?: string;
};

function isEnabled(value: MaintenanceConfig['enabled']) {
  return value === true || String(value).toLowerCase() === 'true';
}

function isWithinSchedule(config: MaintenanceConfig) {
  if (!isEnabled(config.enabled)) return false;
  const now = Date.now();
  const start = config.startAt ? Date.parse(config.startAt) : 0;
  const end = config.endAt ? Date.parse(config.endAt) : Number.POSITIVE_INFINITY;
  return now >= (Number.isNaN(start) ? 0 : start) && now <= (Number.isNaN(end) ? Number.POSITIVE_INFINITY : end);
}

function GateBoot({ label }: { label: string }) {
  return (
    <main className="maintenance-screen" aria-busy="true" aria-live="polite">
      <div className="maintenance-mark">DCC</div>
      <p className="admin-eyebrow">Diocese of Catarman</p>
      <div className="maintenance-boot">
        <Spinner label={label} />
        <span>{label}</span>
      </div>
    </main>
  );
}

function GateUnavailable({ onRetry }: { onRetry: () => void | Promise<void> }) {
  return (
    <main className="maintenance-screen" role="alert">
      <div className="maintenance-mark">DCC</div>
      <p className="admin-eyebrow">Diocese of Catarman</p>
      <h1>We can’t check site availability right now.</h1>
      <p>Please try again in a moment. If the problem continues, contact the diocese office.</p>
      <button type="button" className="ui-btn ui-btn-secondary" onClick={() => void onRetry()}>
        Try again
      </button>
    </main>
  );
}

function MaintenanceScreen({ config }: { config: MaintenanceConfig }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = config.endAt ? Math.max(0, Date.parse(config.endAt) - now) : 0;
  const showCountdown = Boolean(config.endAt) && remaining > 0 && config.countdownEnabled !== false;
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  const email = config.contactEmail || 'diocesecatarman@gmail.com';
  const emailHref = safeMailto(email);
  const phoneHref = safeTel(config.contactPhone);
  const supportHref = safeHttpUrl(config.supportLink);

  return (
    <main className={`maintenance-screen is-${config.template === 'minimal' ? 'minimal' : 'centered'}`}>
      <div className="maintenance-card">
        <header className="maintenance-brand">
          <span className="maintenance-logo-frame">
            <img src={diocesanSeal} alt="Diocese of Catarman seal" />
          </span>
          <span className="maintenance-brand-copy">
            <strong>Diocese of Catarman</strong>
            <small>Northern Samar · Philippines</small>
          </span>
        </header>
        <div className="maintenance-rule" aria-hidden="true"><span /></div>
        <p className="maintenance-kicker"><span aria-hidden="true" /> TEMPORARY MAINTENANCE</p>
        <h1>We’ll be back shortly.</h1>
        <p className="maintenance-message">{config.message || 'The website is temporarily unavailable while scheduled maintenance is completed.'}</p>
        {config.reason ? <p className="maintenance-reason">{config.reason}</p> : null}
        {showCountdown ? (
          <div className="maintenance-countdown" aria-label="Estimated time remaining">
            <span><strong>{hours}</strong><small>Hours</small></span>
            <span><strong>{minutes}</strong><small>Minutes</small></span>
            <span><strong>{seconds}</strong><small>Seconds</small></span>
          </div>
        ) : null}
        <footer className="maintenance-footer">
          <p className="maintenance-contact">
            <span>Need assistance?</span>
            {emailHref ? <a href={emailHref}>{email}</a> : <span>{email}</span>}
            {config.contactPhone ? <>{' · '}{phoneHref ? <a href={phoneHref}>{config.contactPhone}</a> : config.contactPhone}</> : null}
          </p>
          {supportHref ? (
            <a className="maintenance-support" href={supportHref} target="_blank" rel="noopener noreferrer">
              Visit support information <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </footer>
      </div>
      <p className="maintenance-thanks">Thank you for your patience and understanding.</p>
    </main>
  );
}

export default function MaintenanceGate({ children }: { children: ReactNode }) {
  const {
    isAdmin,
    loading: adminLoading,
    error: adminError,
    refetch: refetchAdmin,
  } = useAdminAccess();
  const configResult = useRealtimeValue<Record<string, unknown>>('maintenanceMode/config', {});
  const config = configResult.value as MaintenanceConfig;
  const configLoaded = !configResult.loading;
  const configError = configResult.error;

  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [whitelistLoaded, setWhitelistLoaded] = useState(false);
  const [clientIp, setClientIp] = useState('');
  const [ipCheckComplete, setIpCheckComplete] = useState(false);

  const preview =
    new URLSearchParams(window.location.search).get('maintenance-preview') === '1' && isAdmin;
  const maintenanceActive = configLoaded && !configError && isWithinSchedule(config);
  const needsAccessCheck = maintenanceActive && !adminLoading && !isAdmin && !preview;

  // Only read the whitelist and call the IP service when a maintenance window is
  // actually active for a signed-out visitor. This avoids leaking the list on
  // every page load and removes a third-party request from the normal path.
  useEffect(() => {
    if (!needsAccessCheck) {
      setWhitelist([]);
      setWhitelistLoaded(false);
      return;
    }

    const stop = onValue(
      ref(db, 'whitelistedIPs'),
      snapshot => {
        const value = snapshot.val() ?? {};
        setWhitelist(Object.values(value).map(String));
        setWhitelistLoaded(true);
      },
      () => {
        // If rules deny anonymous reads, treat the whitelist as empty and keep
        // the maintenance screen up (fail closed).
        setWhitelist([]);
        setWhitelistLoaded(true);
      }
    );

    return stop;
  }, [needsAccessCheck]);

  useEffect(() => {
    if (!needsAccessCheck) {
      setIpCheckComplete(false);
      return;
    }

    // No allowlisted addresses means there is nothing to look up. Skipping the
    // third-party request keeps the normal maintenance path fast and private.
    if (!whitelistLoaded || whitelist.length === 0) {
      setIpCheckComplete(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 5000);
    fetch('https://api.ipify.org?format=json', { signal: controller.signal })
      .then(response => response.json())
      .then(data => setClientIp(String(data.ip ?? '')))
      .catch(() => setClientIp(''))
      .finally(() => {
        window.clearTimeout(timer);
        setIpCheckComplete(true);
      });

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [needsAccessCheck, whitelist.length, whitelistLoaded]);

  const allowedByIp = useMemo(
    () => whitelistLoaded && ipCheckComplete && Boolean(clientIp) && whitelist.includes(clientIp),
    [clientIp, ipCheckComplete, whitelist, whitelistLoaded]
  );

  // Never render public content until the maintenance state is known. A failed
  // read is treated as unavailable rather than as permission to browse.
  if (configError) return <GateUnavailable onRetry={() => configResult.refetch()} />;
  if (!configLoaded) return <GateBoot label="Checking site availability…" />;
  // Preview is an explicit admin request and must show the maintenance page
  // even when the saved window is disabled or scheduled for a later time.
  if (preview) return <MaintenanceScreen config={config} />;
  if (!maintenanceActive) return <>{children}</>;
  if (adminError) return <GateUnavailable onRetry={refetchAdmin} />;
  if (adminLoading) return <GateBoot label="Checking access…" />;

  // Only registered administrators bypass the maintenance screen. Being signed
  // in is not enough.
  if (isAdmin) return <>{children}</>;
  if (!whitelistLoaded || (whitelist.length > 0 && !ipCheckComplete)) {
    return <GateBoot label="Checking access…" />;
  }
  if (allowedByIp) return <>{children}</>;
  return <MaintenanceScreen config={config} />;
}
