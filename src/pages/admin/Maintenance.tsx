import { FormEvent, useEffect, useState } from 'react';
import { ExternalLink, Plus, Save } from 'lucide-react';
import { AdminField, AdminHeader, formatDate, useRealtimeCollection, type RecordItem } from '@/components/admin/AdminPrimitives';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts/ToastContext';
import { db, onValue, push, ref, remove, set } from '@/db/firebase';
import { recordActivity, useActivityLogs } from '@/lib/activity-log';
import type { MaintenanceConfig } from '@/types';

const defaults: MaintenanceConfig = {
  enabled: false,
  message: 'The website is temporarily unavailable while scheduled maintenance is completed.',
  reason: '',
  startAt: '',
  endAt: '',
  contactEmail: 'diocesecatarman@gmail.com',
  contactPhone: '',
  supportLink: '',
  countdownEnabled: true,
  template: 'minimal',
};

type StatusBanner = { tone: 'active' | 'scheduled' | 'off'; label: string; note: string };

function statusFor(config: MaintenanceConfig, now: number): StatusBanner {
  if (!config.enabled) {
    return { tone: 'off', label: 'Maintenance mode is off', note: 'The public site is available to all visitors.' };
  }

  const start = config.startAt ? Date.parse(config.startAt) : Number.NaN;
  const end = config.endAt ? Date.parse(config.endAt) : Number.NaN;

  if (!Number.isNaN(start) && now < start) {
    return {
      tone: 'scheduled',
      label: 'Maintenance mode is scheduled',
      note: `It starts on ${new Date(start).toLocaleString('en-PH')}. Visitors can reach the site until then.`,
    };
  }
  if (!Number.isNaN(end) && now > end) {
    return {
      tone: 'off',
      label: 'The maintenance window has ended',
      note: 'Update the schedule or save again to keep the site in maintenance mode.',
    };
  }

  return {
    tone: 'active',
    label: 'Maintenance mode is active',
    note: 'Signed-in administrators bypass this screen. Open Live preview, or visit the site in a signed-out browser window, to see what visitors see.',
  };
}

export default function AdminMaintenance() {
  const { toast } = useToast();
  const [config, setConfig] = useState<MaintenanceConfig>(defaults);
  const [ipAddress, setIpAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [, setTick] = useState(0);
  const { items: whitelist } = useRealtimeCollection('whitelistedIPs');
  const { logs } = useActivityLogs();

  const maintenanceLogs = logs.filter(item => item.source === 'Maintenance');

  useEffect(() => {
    const stop = onValue(ref(db, 'maintenanceMode/config'), snapshot => {
      setConfig({ ...defaults, ...(snapshot.val() ?? {}) });
    });
    return () => stop();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTick(value => value + 1), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const status = statusFor(config, Date.now());

  async function recordLog(action: string) {
    await recordActivity({ source: 'Maintenance', action, details: config.reason });
  }

  async function saveConfiguration(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await set(ref(db, 'maintenanceMode/config'), config);
      await recordLog(config.enabled ? 'Maintenance enabled or updated' : 'Maintenance disabled or updated');
      toast('success', config.enabled ? 'Maintenance configuration saved and enabled.' : 'Maintenance configuration saved.');
    } catch (error) {
      console.error('Save maintenance configuration failed', error);
      toast('error', 'Unable to save the maintenance configuration. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function addIp(event: FormEvent) {
    event.preventDefault();
    const value = ipAddress.trim();
    if (!value) return;
    try {
      const itemRef = push(ref(db, 'whitelistedIPs'));
      await set(itemRef, value);
      setIpAddress('');
      await recordActivity({ source: 'Maintenance', action: `Whitelisted IP ${value}`, details: value });
      toast('success', 'IP address added to the whitelist.');
    } catch (error) {
      console.error('Add whitelist IP failed', error);
      toast('error', 'Unable to add the IP address. Please try again.');
    }
  }

  async function removeIp(item: RecordItem) {
    const value = String(item.value ?? item[String(Object.keys(item).find(key => key !== 'id') ?? '')] ?? '');
    try {
      await remove(ref(db, `whitelistedIPs/${item.id}`));
      toast('success', 'IP address removed from the whitelist.');
      void recordActivity({ source: 'Maintenance', action: `Removed whitelisted IP ${value}`, details: value });
    } catch (error) {
      console.error('Remove whitelist IP failed', error);
      toast('error', 'Unable to remove the IP address. Please try again.');
    }
  }

  return (
    <div className="admin-page">
      <AdminHeader title="Maintenance Mode" description="Schedule downtime, customize the public message, whitelist trusted addresses, and review the action history." action={<Button variant="secondary" onClick={() => window.open('/?maintenance-preview=1', '_blank')} className="gap-2"><ExternalLink size={16} aria-hidden /> Live preview</Button>} />

      <div className={`admin-callout is-${status.tone}`} role="status">
        <strong>{status.label}</strong>
        <span>{status.note}</span>
      </div>

      <form onSubmit={saveConfiguration} className="admin-editor admin-maintenance-form">
        <label className="maintenance-toggle">
          <input type="checkbox" checked={config.enabled} onChange={event => setConfig(current => ({ ...current, enabled: event.target.checked }))} />
          <span><strong>{config.enabled ? 'Maintenance mode enabled' : 'Maintenance mode disabled'}</strong><small>Activation follows the configured schedule below.</small></span>
        </label>
        <div className="admin-form-grid">
          <AdminField label="Public message"><textarea value={config.message} onChange={event => setConfig(current => ({ ...current, message: event.target.value }))} /></AdminField>
          <AdminField label="Maintenance reason"><textarea value={config.reason} onChange={event => setConfig(current => ({ ...current, reason: event.target.value }))} /></AdminField>
          <AdminField label="Start time"><input type="datetime-local" value={config.startAt} onChange={event => setConfig(current => ({ ...current, startAt: event.target.value }))} /></AdminField>
          <AdminField label="Estimated end time"><input type="datetime-local" value={config.endAt} onChange={event => setConfig(current => ({ ...current, endAt: event.target.value }))} /></AdminField>
          <AdminField label="Contact email"><input type="email" value={config.contactEmail} onChange={event => setConfig(current => ({ ...current, contactEmail: event.target.value }))} /></AdminField>
          <AdminField label="Contact phone"><input value={config.contactPhone} onChange={event => setConfig(current => ({ ...current, contactPhone: event.target.value }))} /></AdminField>
          <AdminField label="Support link"><input type="url" value={config.supportLink} onChange={event => setConfig(current => ({ ...current, supportLink: event.target.value }))} /></AdminField>
          <AdminField label="Page template"><select value={config.template} onChange={event => setConfig(current => ({ ...current, template: event.target.value }))}><option value="minimal">Minimal</option><option value="centered">Centered notice</option></select></AdminField>
          <label className="admin-checkbox"><input type="checkbox" checked={config.countdownEnabled} onChange={event => setConfig(current => ({ ...current, countdownEnabled: event.target.checked }))} /><span>Display countdown timer</span></label>
          <div className="admin-form-actions"><Button type="submit" disabled={saving} className="gap-2"><Save size={16} aria-hidden /> {saving ? 'Saving…' : 'Save configuration'}</Button></div>
        </div>
      </form>

      <section className="admin-split-grid">
        <div className="admin-table-section">
          <div className="admin-section-heading"><div><p className="admin-eyebrow">Access control</p><h2>Whitelisted IPs</h2></div></div>
          <form onSubmit={addIp} className="admin-inline-form"><input value={ipAddress} onChange={event => setIpAddress(event.target.value)} placeholder="203.0.113.10" /><Button type="submit" className="gap-2"><Plus size={16} aria-hidden /> Add IP</Button></form>
          <div className="admin-list">{whitelist.length ? whitelist.map(item => <div key={item.id}><span>{String(item.value ?? item[String(Object.keys(item).find(key => key !== 'id') ?? '')] ?? '')}</span><button onClick={() => void removeIp(item)}>Remove</button></div>) : <p className="admin-empty">No IP addresses whitelisted.</p>}</div>
        </div>

        <div className="admin-table-section">
          <div className="admin-section-heading"><div><p className="admin-eyebrow">Audit trail</p><h2>Activity log</h2></div></div>
          <div className="admin-list">{maintenanceLogs.length ? maintenanceLogs.slice(0, 12).map(item => <div key={item.id}><span><strong>{item.action}</strong><small>{item.admin} · {formatDate(item.createdAt)}</small></span></div>) : <p className="admin-empty">No maintenance actions recorded.</p>}</div>
        </div>
      </section>
    </div>
  );
}
