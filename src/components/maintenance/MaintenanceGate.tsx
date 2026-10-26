import { ReactNode, useEffect, useMemo, useState } from 'react';
import { db, onValue, ref } from '@/db/firebase';
import { useAuth } from '@/contexts/AuthContext';

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

function MaintenanceScreen({ config }: { config: MaintenanceConfig }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = config.endAt ? Math.max(0, Date.parse(config.endAt) - now) : 0;
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <main className="maintenance-screen">
      <div className="maintenance-mark">DCC</div>
      <p className="admin-eyebrow">Diocese of Catarman</p>
      <h1>We’ll be back shortly.</h1>
      <p>{config.message || 'The website is temporarily unavailable while scheduled maintenance is completed.'}</p>
      {config.endAt && config.countdownEnabled !== false ? (
        <div className="maintenance-countdown" aria-label="Estimated time remaining">
          <span><strong>{hours}</strong>Hours</span>
          <span><strong>{minutes}</strong>Minutes</span>
          <span><strong>{seconds}</strong>Seconds</span>
        </div>
      ) : null}
      <p className="maintenance-contact">Questions? {config.contactEmail || 'diocesecatarman@gmail.com'}{config.contactPhone ? ` ? ${config.contactPhone}` : ''}</p>
      {config.supportLink ? <a className="maintenance-support" href={config.supportLink}>Support information</a> : null}
    </main>
  );
}

export default function MaintenanceGate({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [config, setConfig] = useState<MaintenanceConfig>({});
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [clientIp, setClientIp] = useState('');
  const [configLoaded, setConfigLoaded] = useState(false);
  const [whitelistLoaded, setWhitelistLoaded] = useState(false);
  const [ipCheckComplete, setIpCheckComplete] = useState(false);
  const preview = new URLSearchParams(window.location.search).get('maintenance-preview') === '1' && Boolean(user);

  useEffect(() => onValue(ref(db, 'maintenanceMode/config'), snapshot => {
    setConfig(snapshot.val() ?? {});
    setConfigLoaded(true);
  }), []);
  useEffect(() => onValue(ref(db, 'whitelistedIPs'), snapshot => {
    const value = snapshot.val() ?? {};
    setWhitelist(Object.values(value).map(String));
    setWhitelistLoaded(true);
  }), []);
  useEffect(() => {
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
  }, []);

  const blocked = useMemo(
    () => preview || (
      configLoaded && whitelistLoaded &&
      isWithinSchedule(config) && !user &&
      (
        !whitelist.length ||
        (ipCheckComplete && !whitelist.includes(clientIp))
      )
    ),
    [clientIp, config, configLoaded, ipCheckComplete, preview, user, whitelist, whitelistLoaded]
  );

  if (authLoading && !preview) return <>{children}</>;
  return blocked ? <MaintenanceScreen config={config} /> : children;
}
