import { useEffect, useState } from 'react';
import { CloudSun, LogOut, Moon, Save, Sun } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminPrimitives';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { db, onValue, ref, set } from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';

type Settings = { theme: 'light' | 'dark'; weatherEnabled: boolean };

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <label className="admin-switch">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
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
  const [settings, setSettings] = useState<Settings>({ theme: 'light', weatherEnabled: true });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => onValue(ref(db, 'settings'), snapshot => {
    const next = { theme: 'light', weatherEnabled: true, ...(snapshot.val() ?? {}) } as Settings;
    setSettings(next);
    document.documentElement.classList.toggle('dark', next.theme === 'dark');
  }), []);

  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      await set(ref(db, 'settings'), settings);
      document.documentElement.classList.toggle('dark', settings.theme === 'dark');
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
      toast('success', 'Settings saved.');
      void recordActivity({
        source: 'Settings',
        action: 'Updated site settings',
        details: `Dark mode ${settings.theme === 'dark' ? 'on' : 'off'} · Weather widget ${settings.weatherEnabled ? 'on' : 'off'}`,
      });
    } catch (error) {
      console.error(error);
      toast('error', 'Unable to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <AdminHeader title="Settings" description="Control appearance, dashboard weather visibility, and the current admin session." />
      <section className="admin-settings-card">
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
        <div className="admin-form-actions admin-settings-actions">
          <Button onClick={() => void save()} disabled={saving} className="gap-2">
            <Save size={16} aria-hidden />
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
