import { useEffect, useRef, useState } from 'react';
import { CloudSun, LogOut, Moon, Save, Sun } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminPrimitives';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
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
    theme: record.theme === 'dark' ? 'dark' : 'light',
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
  const { logout } = useAuth();
  const { toast } = useToast();
  const { value: remote, loading, error, refetch } = useRealtimeValue<unknown>('settings', null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const hydrated = useRef(false);
  const savedTimer = useRef<number | null>(null);

  useEffect(() => {
    if (loading) return;
    const next = normalize(remote);
    document.documentElement.classList.toggle('dark', next.theme === 'dark');
    if (!hydrated.current) {
      hydrated.current = true;
      setSettings(next);
    }
    // Keep the local form in sync if another administrator saves changes.
    if (hydrated.current && !saving) setSettings(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, remote]);

  useEffect(
    () => () => {
      if (savedTimer.current !== null) window.clearTimeout(savedTimer.current);
    },
    []
  );

  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      await set(ref(db, 'settings'), settings);
      document.documentElement.classList.toggle('dark', settings.theme === 'dark');
      setSaved(true);
      if (savedTimer.current !== null) window.clearTimeout(savedTimer.current);
      savedTimer.current = window.setTimeout(() => setSaved(false), 1800);
      toast('success', 'Settings saved.');
      void recordActivity({
        source: 'Settings',
        action: 'Updated site settings',
        details: `Dark mode ${settings.theme === 'dark' ? 'on' : 'off'} · Weather widget ${settings.weatherEnabled ? 'on' : 'off'}`,
      });
    } catch (err) {
      console.error(err);
      toast('error', 'Unable to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <AdminHeader title="Settings" description="Control appearance, dashboard weather visibility, and the current admin session." />
      <section className="admin-settings-card" aria-busy={loading || saving}>
        {error ? (
          <ErrorState
            compact
            title="Unable to load settings"
            description="The saved settings could not be reached. You can retry or save new values."
            onRetry={() => void refetch()}
          />
        ) : loading ? (
          <div className="settings-skeleton" role="status" aria-label="Loading settings">
            {Array.from({ length: 2 }).map((_, index) => (
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
                <span className="setting-icon" aria-hidden="true">
                  {settings.theme === 'dark' ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}
                </span>
                <div>
                  <strong>Dark mode</strong>
                  <p>Use a darker neutral palette across the administration interface.</p>
                </div>
              </div>
              <Toggle
                label="Dark mode"
                checked={settings.theme === 'dark'}
                onChange={value => setSettings(current => ({ ...current, theme: value ? 'dark' : 'light' }))}
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
                onChange={value => setSettings(current => ({ ...current, weatherEnabled: value }))}
              />
            </div>
          </>
        )}
        <div className="admin-form-actions admin-settings-actions">
          <Button onClick={() => void save()} disabled={saving || loading} className="gap-2" aria-busy={saving}>
            {saving ? <Spinner label="Saving settings" /> : <Save size={16} aria-hidden />}
            {saving ? 'Saving…' : saved ? 'Saved' : 'Save settings'}
          </Button>
          <Button variant="secondary" onClick={() => void logout()} className="gap-2">
            <LogOut size={16} aria-hidden />
            Log out
          </Button>
        </div>
      </section>
    </div>
  );
}
