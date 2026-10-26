import { ReactNode, useEffect, useMemo, useState } from 'react';
import { db, onValue, ref } from '@/db/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeValue } from '@/lib/firebase-data';
import { Spinner } from '@/components/ui/states';
import { safeHttpUrl, safeMailto, safeTel } from '@/lib/urls';

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
    <main className="maintenance-screen">
      <div className="maintenance-mark">DCC</div>
      <p className="admin-eyebrow">Diocese of Catarman</p>
      <h1>We’ll be back shortly.</h1>
      <p>{config.message || 'The website is temporarily unavailable while scheduled maintenance is completed.'}</p>
      {showCountdown ? (
        <div className="maintenance-countdown" aria-label="Estimated time remaining">
          <span><strong>{hours}</strong>Hours</span>
          <span><strong>{minutes}</strong>Minutes</span>
          <span><strong>{seconds}</strong>Seconds</span>
        </div>
      ) : null}
      <p className="maintenance-contact">
        Questions?{' '}
        {emailHref ? <a href={emailHref}>{email}</a> : email}
        {config.contactPhone ? (
          <>
            {' · '}
            {phoneHref ? <a href={phoneHref}>{config.contactPhone}</a> : config.contactPhone}
          </>
        ) : null}
      </p>
      {supportHref ? (
        <a className="maintenance-support" href={supportHref} target="_blank" rel="noopener noreferrer">
          Support information
        </a>
      ) : null}
    </main>
  );
}

export default function MaintenanceGate({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const configResult = useRealtimeValue<Record<string, unknown>>('maintenanceMode/config', {});
  const config = configResult.value as MaintenanceConfig;
  const configLoaded = !configResult.loading;

  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [whitelistLoaded, setWhitelistLoaded] = useState(false);
  const [clientIp, setClientIp] = useState('');
  const [ipCheckComplete, setIpCheckComplete] = useState(false);

  const preview =
    new URLSearchParams(window.location.search).get('maintenance-preview') === '1' && Boolean(user);
  const maintenanceActive = configLoaded && isWithinSchedule(config);
  const needsAccessCheck = maintenanceActive && !user && !preview;

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
  }, [needsAccessCheck]);

  const allowedByIp = useMemo(
    () => whitelistLoaded && ipCheckComplete && Boolean(clientIp) && whitelist.includes(clientIp),
    [clientIp, ipCheckComplete, whitelist, whitelistLoaded]
  );

  if (preview) return <>{children}</>;
  if (user) return <>{children}</>;
  if (authLoading) return maintenanceActive ? <GateBoot label="Checking site availability…" /> : <>{children}</>;
  if (!configLoaded) return <>{children}</>;
  if (!maintenanceActive) return <>{children}</>;
  if (!whitelistLoaded || (whitelist.length > 0 && !ipCheckComplete)) {
    return <GateBoot label="Checking access…" />;
  }
  if (allowedByIp) return <>{children}</>;
  return <MaintenanceScreen config={config} />;
}
