import { useEffect, useState } from 'react';
import { CloudSun, Moon, Sun } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminPrimitives';
import { useToast } from '@/contexts/ToastContext';
import { db, ref, set } from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';
import { useRealtimeValue } from '@/lib/firebase-data';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, Spinner } from '@/components/ui/states';

type Settings = { theme: 'light' | 'dark'; weatherEnabled: boolean };

const defaultSettings: Settings = { theme: 'light', weatherEnabled: true };

function normalize(value: unknown): Settings {
  const record = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return {
    theme: record.theme === 'dark' ? 'dark' : record.theme === 'light' ? 'light' : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    weatherEnabled: record.weatherEnabled === undefined ? true : Boolean(record.weatherEnabled),
  };
}

function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label className="admin-switch">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={event => onChange(event.target.checked)}
      />
      <span className="admin-switch-track" aria-hidden="true">
        <span className="admin-switch-thumb" />
      </span>
    </label>
  );
}

export default function AdminSettings() {
  const { toast } = useToast();
  const { value: remote, loading, error, refetch } = useRealtimeValue<unknown>('settings', null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [savingSetting, setSavingSetting] = useState<keyof Settings | null>(null);

  useEffect(() => {
    if (loading) return;
    setSettings(normalize(remote));
  }, [loading, remote]);

  async function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    if (savingSetting || loading || error) return;
    const previousValue = settings[key];
    setSettings(current => ({ ...current, [key]: value }));
    if (key === 'theme') document.documentElement.classList.toggle('dark', value === 'dark');
    setSavingSetting(key);
    try {
      await set(ref(db, `settings/${key}`), value);
      const message = key === 'theme'
        ? `${value === 'dark' ? 'Dark' : 'Light'} mode applied.`
        : `Dashboard weather widget ${value ? 'enabled' : 'disabled'}.`;
      toast('success', message);
      void recordActivity({
        source: 'Settings',
        action: key === 'theme' ? 'Updated appearance setting' : 'Updated dashboard weather setting',
        details: key === 'theme' ? `${value} mode applied` : `Weather widget ${value ? 'enabled' : 'disabled'}`,
      });
    } catch (err) {
      console.error(err);
      setSettings(current => ({ ...current, [key]: previousValue }));
      if (key === 'theme') document.documentElement.classList.toggle('dark', previousValue === 'dark');
      toast('error', `Unable to apply ${key === 'theme' ? 'appearance' : 'dashboard weather'} setting. Please try again.`);
    } finally {
      setSavingSetting(null);
    }
  }

  return (
    <div className="admin-page">
      <AdminHeader title="Settings" description="Change the admin appearance and dashboard preferences. Updates apply and save automatically." />
      <section className="admin-settings-card" aria-busy={loading || Boolean(savingSetting)}>
        {error ? (
          <ErrorState
            compact
            title="Unable to load settings"
            description="The saved settings could not be reached. Check your connection and try again."
            onRetry={() => void refetch()}
          />
        ) : loading ? (
          <div className="settings-skeleton" role="status" aria-label="Loading settings">
            {Array.from({ length: 1 }).map((_, index) => (
              <div className="setting-row" key={index}>
                <div className="setting-main">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="settings-skeleton-copy">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-64 max-w-full" />
                  </div>
                </div>
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="setting-row">
              <div className="setting-main">
                <span className="setting-icon" aria-hidden="true">{settings.theme === 'dark' ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}</span>
                <div>
                  <strong>Appearance</strong>
                  <p>Switch between the light and dark admin appearance. Your choice is saved automatically.</p>
                </div>
              </div>
              <Toggle
                label="Dark mode"
                checked={settings.theme === 'dark'}
                disabled={Boolean(savingSetting) || loading || error}
                onChange={value => void updateSetting('theme', value ? 'dark' : 'light')}
              />
            </div>
            <div className="setting-row">
              <div className="setting-main">
                <span className="setting-icon" aria-hidden="true">
                  <CloudSun size={18} strokeWidth={1.8} />
                </span>
                <div>
                  <strong>Dashboard weather widget</strong>
                  <p>Show current Catarman weather and alert status on the dashboard.</p>
                </div>
              </div>
              <Toggle
                label="Dashboard weather widget"
                checked={settings.weatherEnabled}
                disabled={Boolean(savingSetting) || loading || error}
                onChange={value => void updateSetting('weatherEnabled', value)}
              />
            </div>
          </>
        )}
        <div className="admin-form-actions admin-settings-actions">
          <span className="settings-auto-feedback" role="status" aria-live="polite">
            {savingSetting ? <Spinner label="Applying setting" /> : null}
            {savingSetting === 'theme'
              ? `Applying ${settings.theme === 'dark' ? 'dark' : 'light'} mode…`
              : savingSetting === 'weatherEnabled'
                ? 'Updating dashboard weather…'
                : 'Changes apply and save automatically.'}
          </span>
        </div>
      </section>
    </div>
  );
}
