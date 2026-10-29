import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ExternalLink, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react';
import { AdminField, AdminHeader, useRealtimeCollection, type RecordItem } from '@/components/admin/AdminPrimitives';
import { Button } from '@/components/ui/button';
import { useToast } from '@/contexts/ToastContext';
import { db, push, ref, remove, set } from '@/db/firebase';
import { recordActivity, useActivityLogs } from '@/lib/activity-log';
import { useRealtimeValue } from '@/lib/firebase-data';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { SkeletonList } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, Spinner } from '@/components/ui/states';
import { safeHttpUrl } from '@/lib/urls';
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

const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

type StatusBanner = { tone: 'active' | 'scheduled' | 'off'; label: string; note: string };

function formatTimestamp(value: unknown) {
  if (!value) return '—';
  const date = new Date(String(value));
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' });
}

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
  const { confirm, confirmDialog } = useConfirm();
  const {
    value: remoteConfig,
    loading: configLoading,
    error: configError,
    refetch: refetchConfig,
  } = useRealtimeValue<Record<string, unknown>>('maintenanceMode/config', {});
  const [draft, setDraft] = useState<MaintenanceConfig | null>(null);
  const [ipAddress, setIpAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [addingIp, setAddingIp] = useState(false);
  const [removingId, setRemovingId] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const { items: whitelist, loading: whitelistLoading, error: whitelistError, refetch: refetchWhitelist } =
    useRealtimeCollection('whitelistedIPs');
  const { logs, loading: logsLoading } = useActivityLogs();

  const config = useMemo<MaintenanceConfig>(
    () => draft ?? { ...defaults, ...(remoteConfig as Partial<MaintenanceConfig>) },
    [draft, remoteConfig]
  );

  const maintenanceLogs = logs.filter(item => item.source === 'Maintenance');
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const status = statusFor(config, now);
  const hasUnsavedDraft = draft !== null;

  function update(patch: Partial<MaintenanceConfig>) {
    setDraft(current => ({ ...(current ?? { ...defaults, ...(remoteConfig as Partial<MaintenanceConfig>) }), ...patch }));
  }

  async function saveConfiguration(event: FormEvent) {
    event.preventDefault();
    if (saving || configLoading) return;
    if (config.supportLink && !safeHttpUrl(config.supportLink)) {
      toast('error', 'The support link must start with http:// or https://.');
      return;
    }
    const start = config.startAt ? Date.parse(config.startAt) : Number.NaN;
    const end = config.endAt ? Date.parse(config.endAt) : Number.NaN;
    if (!Number.isNaN(start) && !Number.isNaN(end) && end <= start) {
      toast('error', 'The estimated end time must be after the start time.');
      return;
    }
    setSaving(true);
    try {
      await set(ref(db, 'maintenanceMode/config'), config);
      await recordActivity({
        source: 'Maintenance',
        action: config.enabled ? 'Maintenance enabled or updated' : 'Maintenance disabled or updated',
        details: config.reason,
      });
      setDraft(null);
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
    if (!value || addingIp) return;
    if (!IPV4.test(value)) {
      toast('error', 'Enter a valid IPv4 address, e.g. 203.0.113.10.');
      return;
    }
    setAddingIp(true);
    try {
      const itemRef = push(ref(db, 'whitelistedIPs'));
      await set(itemRef, value);
      setIpAddress('');
      await recordActivity({ source: 'Maintenance', action: `Whitelisted IP ${value}`, details: value });
      toast('success', 'IP address added to the whitelist.');
    } catch (error) {
      console.error('Add whitelist IP failed', error);
      toast('error', 'Unable to add the IP address. Please try again.');
    } finally {
      setAddingIp(false);
    }
  }

  function ipValue(item: RecordItem) {
    return String(item.value ?? item[String(Object.keys(item).find(key => key !== 'id') ?? '')] ?? '');
  }

  async function removeIp(item: RecordItem) {
    const value = ipValue(item);
    const approved = await confirm({
      title: 'Remove this IP address?',
      description: `${value || 'This address'} will no longer bypass the maintenance screen.`,
      confirmLabel: 'Remove IP',
    });
    if (!approved) return;

    setRemovingId(item.id);
    try {
      await remove(ref(db, `whitelistedIPs/${item.id}`));
      toast('success', 'IP address removed from the whitelist.');
      void recordActivity({ source: 'Maintenance', action: `Removed whitelisted IP ${value}`, details: value });
    } catch (error) {
      console.error('Remove whitelist IP failed', error);
      toast('error', 'Unable to remove the IP address. Please try again.');
    } finally {
      setRemovingId('');
    }
  }

  return (
    <div className="admin-page">
      {confirmDialog}
      <AdminHeader
        title="Maintenance Mode"
        description="Schedule downtime, customize the public message, whitelist trusted addresses, and review the action history."
        action={
          <Button
            variant="secondary"
            onClick={() => window.open('/?maintenance-preview=1', '_blank', 'noopener,noreferrer')}
            className="gap-2"
          >
            <ExternalLink size={16} aria-hidden /> Live preview
          </Button>
        }
      />

      <div className={`admin-callout is-${status.tone}`} role="status">
        <strong>{configLoading ? 'Loading maintenance status…' : status.label}</strong>
        <span>{configLoading ? 'Fetching the saved maintenance configuration.' : status.note}</span>
      </div>

      {configError ? (
        <ErrorState
          compact
          title="Unable to load the maintenance configuration"
          description="Saving is disabled until the current settings load, so you do not overwrite them by accident."
          onRetry={() => void refetchConfig()}
        />
      ) : null}

      <form onSubmit={saveConfiguration} className="admin-editor admin-maintenance-form" aria-busy={saving}>
        <label className="maintenance-toggle">
          <input
            type="checkbox"
            checked={config.enabled}
            disabled={configLoading && !hasUnsavedDraft}
            onChange={event => update({ enabled: event.target.checked })}
          />
          <span>
            <strong>{config.enabled ? 'Maintenance mode enabled' : 'Maintenance mode disabled'}</strong>
            <small>Activation follows the configured schedule below.</small>
          </span>
        </label>
        <div className="admin-form-grid">
          <AdminField label="Public message" className="admin-field-full">
            <textarea
              value={config.message ?? ''}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ message: event.target.value })}
            />
          </AdminField>
          <AdminField label="Maintenance reason" className="admin-field-full">
            <textarea
              value={config.reason ?? ''}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ reason: event.target.value })}
            />
            <small className="admin-hint">Recorded in the activity log for future reference.</small>
          </AdminField>
          <AdminField label="Start time">
            <input
              type="datetime-local"
              value={config.startAt ?? ''}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ startAt: event.target.value })}
            />
          </AdminField>
          <AdminField label="Estimated end time">
            <input
              type="datetime-local"
              value={config.endAt ?? ''}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ endAt: event.target.value })}
            />
          </AdminField>
          <AdminField label="Contact email">
            <input
              type="email"
              value={config.contactEmail ?? ''}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ contactEmail: event.target.value })}
            />
          </AdminField>
          <AdminField label="Contact phone">
            <input
              type="tel"
              value={config.contactPhone ?? ''}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ contactPhone: event.target.value })}
            />
          </AdminField>
          <AdminField label="Support link">
            <input
              type="url"
              value={config.supportLink ?? ''}
              placeholder="https://…"
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ supportLink: event.target.value })}
            />
            <small className="admin-hint">Only http:// and https:// links are accepted.</small>
          </AdminField>
          <AdminField label="Page template">
            <select
              value={config.template ?? 'minimal'}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ template: event.target.value })}
            >
              <option value="minimal">Minimal</option>
              <option value="centered">Centered notice</option>
            </select>
          </AdminField>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={Boolean(config.countdownEnabled)}
              disabled={configLoading && !hasUnsavedDraft}
              onChange={event => update({ countdownEnabled: event.target.checked })}
            />
            <span>Display countdown timer</span>
          </label>
          <div className="admin-form-actions">
            <Button type="submit" disabled={saving || configLoading} className="gap-2" aria-busy={saving}>
              {saving ? <Spinner label="Saving maintenance configuration" /> : <Save size={16} aria-hidden />}
              {saving ? 'Saving…' : 'Save configuration'}
            </Button>
            {hasUnsavedDraft ? <span className="admin-form-message">Unsaved changes</span> : null}
          </div>
        </div>
      </form>

      <section className="admin-split-grid">
        <div className="admin-table-section">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Access control</p>
              <h2>Whitelisted IPs</h2>
            </div>
            <span className="admin-count-pill" aria-live="polite">{whitelist.length} addresses</span>
          </div>
          <form onSubmit={addIp} className="admin-inline-form">
            <input
              value={ipAddress}
              onChange={event => setIpAddress(event.target.value)}
              placeholder="203.0.113.10"
              aria-label="IP address to whitelist"
              inputMode="decimal"
            />
            <Button type="submit" className="gap-2" disabled={addingIp} aria-busy={addingIp}>
              {addingIp ? <Spinner label="Adding IP address" /> : <Plus size={16} aria-hidden />}
              {addingIp ? 'Adding…' : 'Add IP'}
            </Button>
          </form>
          <p className="admin-hint">
            Client-side IP checks deter accidental lockouts but are not a security boundary. Enforce access in Firebase
            rules or a server function.
          </p>
          {whitelistLoading ? (
            <SkeletonList rows={3} />
          ) : whitelistError ? (
            <ErrorState compact description="The whitelist could not be loaded." onRetry={() => void refetchWhitelist()} />
          ) : whitelist.length ? (
            <div className="admin-list">
              {whitelist.map(item => (
                <div key={item.id}>
                  <span className="admin-ip-value"><ShieldCheck size={14} aria-hidden /> {ipValue(item)}</span>
                  <button
                    type="button"
                    onClick={() => void removeIp(item)}
                    disabled={removingId === item.id}
                    aria-label={`Remove ${ipValue(item)} from the whitelist`}
                    className="admin-link-danger"
                  >
                    <Trash2 size={13} aria-hidden /> {removingId === item.id ? 'Removing…' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              compact
              icon={ShieldCheck}
              title="No IP addresses whitelisted"
              description="Visitors from these addresses would still see the maintenance screen."
            />
          )}
        </div>

        <div className="admin-table-section">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">Audit trail</p>
              <h2>Activity log</h2>
            </div>
          </div>
          {logsLoading ? (
            <SkeletonList rows={3} />
          ) : maintenanceLogs.length ? (
            <div className="admin-list">
              {maintenanceLogs.slice(0, 12).map(item => (
                <div key={item.id}>
                  <span>
                    <strong>{item.action}</strong>
                    <small>{item.admin} · {formatTimestamp(item.createdAt)}</small>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              compact
              icon={Save}
              title="No maintenance actions yet"
              description="Saving the configuration or changing the whitelist records an entry here."
            />
          )}
        </div>
      </section>
    </div>
  );
}
