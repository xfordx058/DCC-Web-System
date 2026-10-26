import { FormEvent, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Banknote, Eye, EyeOff, Pencil, Plus, Search, Smartphone, Trash2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminField, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { AdminModal } from '@/components/admin/AdminModal';
import { useToast } from '@/contexts/ToastContext';
import { recordActivity } from '@/lib/activity-log';
import { db, getDownloadURL, push, ref, remove, set, storage, storageRef, update, uploadBytesResumable } from '@/db/firebase';
import {
  donationMethodIcon,
  donationMethodTypeOptions,
  donationTypeLabel,
  normalizeDonationMethod,
  sortDonationMethods,
} from '@/lib/donations';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, Spinner } from '@/components/ui/states';
import { validateImageFile } from '@/lib/uploads';
import type { DonationMethod, DonationMethodType } from '@/types';
import SmartImage from '@/components/ui/SmartImage';

type FormState = {
  type: string;
  name: string;
  accountName: string;
  accountNumber: string;
  instructions: string;
  description: string;
  displayOrder: string;
  enabled: boolean;
};

const emptyForm: FormState = {
  type: '',
  name: '',
  accountName: '',
  accountNumber: '',
  instructions: '',
  description: '',
  displayOrder: '',
  enabled: true,
};

function toFormState(method: DonationMethod | null, nextOrder: number): FormState {
  if (!method) return { ...emptyForm, displayOrder: String(nextOrder) };
  return {
    type: method.type,
    name: method.name,
    accountName: method.accountName,
    accountNumber: method.accountNumber,
    instructions: method.instructions,
    description: method.description,
    displayOrder: String(method.displayOrder),
    enabled: method.enabled,
  };
}

function typeIcon(method: DonationMethod) {
  if (method.icon === 'banknote' || (method.type === 'bank' && method.icon !== 'wallet')) {
    return <Banknote size={16} aria-hidden />;
  }
  if (method.icon === 'wallet' || method.type === 'other') return <Wallet size={16} aria-hidden />;
  return <Smartphone size={16} aria-hidden />;
}

export default function DonationMethodsPanel() {
  const { items, loading, error, refetch } = useRealtimeCollection('donationOptions');
  const { toast } = useToast();
  const { confirm, confirmDialog } = useConfirm();

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<DonationMethod | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingIds, setPendingIds] = useState<Record<string, true>>({});
  const [optimisticEnabled, setOptimisticEnabled] = useState<Record<string, boolean>>({});

  const qrPreview = useMemo(() => (qrFile ? URL.createObjectURL(qrFile) : ''), [qrFile]);

  useEffect(() => {
    if (!qrPreview) return;
    return () => URL.revokeObjectURL(qrPreview);
  }, [qrPreview]);

  const baseMethods = useMemo(
    () => sortDonationMethods(items.map(item => normalizeDonationMethod(item.id, item))),
    [items]
  );

  // Drop optimistic overrides as soon as the realtime snapshot confirms them.
  useEffect(() => {
    setOptimisticEnabled(current => {
      const entries = Object.entries(current);
      if (!entries.length) return current;
      const next = { ...current };
      let dirty = false;
      for (const [id, value] of entries) {
        const stored = baseMethods.find(method => method.id === id);
        if (!stored || stored.enabled === value) {
          delete next[id];
          dirty = true;
        }
      }
      return dirty ? next : current;
    });
  }, [baseMethods]);

  const methods = useMemo(
    () =>
      baseMethods.map(method =>
        method.id in optimisticEnabled ? { ...method, enabled: optimisticEnabled[method.id] } : method
      ),
    [baseMethods, optimisticEnabled]
  );

  const visibleMethods = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) return methods;
    return methods.filter(method =>
      [method.name, method.type, donationTypeLabel(method.type), method.accountName, method.accountNumber, method.instructions]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [methods, deferredQuery]);

  function openAdd() {
    setEditing(null);
    setForm(toFormState(null, methods.length + 1));
    setQrFile(null);
    setEditorOpen(true);
  }

  function openEdit(method: DonationMethod) {
    setEditing(method);
    setForm(toFormState(method, method.displayOrder));
    setQrFile(null);
    setEditorOpen(true);
  }

  function closeForm() {
    setEditing(null);
    setForm(emptyForm);
    setQrFile(null);
    setEditorOpen(false);
  }

  function setField(key: keyof FormState, value: string | boolean) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function validate(): string | null {
    if (!donationMethodTypeOptions.some(option => option.value === form.type)) {
      return 'Select a payment method type (bank transfer, e-wallet, or other).';
    }
    if (!form.name.trim()) return 'Enter a name for the payment method (e.g. BDO, GCash, Maya).';
    if (!form.accountName.trim()) return 'Enter the account name for this payment method.';
    if (!form.accountNumber.trim()) return 'Enter the account number or mobile number.';
    return validateImageFile(qrFile);
  }

  async function uploadQr(id: string, file: File) {
    const invalid = validateImageFile(file);
    if (invalid) throw new Error(invalid);
    const uploadRef = storageRef(storage, `donationOptions/${id}/${file.name}`);
    const task = uploadBytesResumable(uploadRef, file);
    await new Promise<void>((resolve, reject) => {
      task.on('state_changed', undefined, reject, () => resolve());
    });
    return getDownloadURL(uploadRef);
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    const validationError = validate();
    if (validationError) {
      toast('error', validationError);
      return;
    }

    setSaving(true);
    try {
      const id = editing?.id ?? push(ref(db, 'donationOptions')).key;
      if (!id) throw new Error('Unable to create payment method ID.');

      const type = form.type as DonationMethodType;
      const name = form.name.trim();
      let qrImage = editing?.qrImage ?? '';
      if (qrFile) qrImage = await uploadQr(id, qrFile);

      const payload: Record<string, any> = {
        type,
        name,
        accountName: form.accountName.trim(),
        accountNumber: form.accountNumber.trim(),
        instructions: form.instructions.trim(),
        description: form.description.trim(),
        displayOrder: Number(form.displayOrder) || 0,
        enabled: form.enabled,
        qrImage,
        icon: donationMethodIcon(type, name),
        updatedAt: new Date().toISOString(),
      };
      if (!editing) payload.createdAt = payload.updatedAt;

      if (editing) await update(ref(db, `donationOptions/${id}`), payload);
      else await set(ref(db, `donationOptions/${id}`), payload);

      void recordActivity({
        source: 'Donations',
        action: editing ? 'Updated payment method' : 'Created payment method',
        details: name,
      });

      closeForm();
      toast(
        'success',
        editing
          ? `${name} updated. The public donation page now reflects the change.`
          : `${name} saved. It now appears on the public donation page.`
      );
    } catch (error) {
      console.error('Save payment method failed', error);
      toast('error', error instanceof Error && error.message ? error.message : 'Unable to save the payment method. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleEnabled(method: DonationMethod) {
    const next = !method.enabled;
    setOptimisticEnabled(current => ({ ...current, [method.id]: next }));
    setPendingIds(current => ({ ...current, [method.id]: true }));

    const clear = () =>
      setOptimisticEnabled(current => {
        const nextMap = { ...current };
        delete nextMap[method.id];
        return nextMap;
      });

    // Safety net: if the realtime snapshot never arrives, stop pretending.
    const failsafe = window.setTimeout(clear, 8000);

    try {
      await update(ref(db, `donationOptions/${method.id}`), {
        enabled: next,
        updatedAt: new Date().toISOString(),
      });
      void recordActivity({
        source: 'Donations',
        action: next ? 'Enabled payment method' : 'Hid payment method',
        details: method.name,
      });
      toast(
        'success',
        next
          ? `${method.name} is now visible on the public donation page.`
          : `${method.name} hidden from the public donation page.`
      );
    } catch (error) {
      console.error('Toggle payment method failed', error);
      clear();
      toast('error', 'Unable to update the payment method. Your change was reverted — please try again.');
    } finally {
      window.clearTimeout(failsafe);
      setPendingIds(current => {
        const nextMap = { ...current };
        delete nextMap[method.id];
        return nextMap;
      });
    }
  }

  async function handleDelete(method: DonationMethod) {
    const approved = await confirm({
      title: `Delete ${method.name}?`,
      description: 'This removes the payment method from the public donation page. This action cannot be undone.',
      confirmLabel: 'Delete method',
    });
    if (!approved) return;

    setPendingIds(current => ({ ...current, [method.id]: true }));
    try {
      await remove(ref(db, `donationOptions/${method.id}`));
      void recordActivity({
        source: 'Donations',
        action: 'Deleted payment method',
        details: method.name,
      });
      toast('success', `${method.name} removed from the donation settings.`);
    } catch (error) {
      console.error('Delete payment method failed', error);
      toast('error', 'Unable to delete the payment method. Please try again.');
    } finally {
      setPendingIds(current => {
        const nextMap = { ...current };
        delete nextMap[method.id];
        return nextMap;
      });
    }
  }

  const filtering = query.trim().length > 0;

  return (
    <>
      {confirmDialog}
      <div className="admin-toolbar">
        <div className="admin-search-field">
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search payment methods…"
            aria-label="Search payment methods"
          />
        </div>
        <span aria-live="polite">{loading ? 'Loading…' : `${visibleMethods.length} methods`}</span>
        <Button type="button" onClick={openAdd} className="gap-2">
          <Plus size={16} aria-hidden />
          Add payment method
        </Button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <SkeletonTable columns={5} />
        ) : error ? (
          <ErrorState
            title="Unable to load payment methods"
            description="The donation settings could not be reached. Check your connection and try again."
            onRetry={() => void refetch()}
            compact
          />
        ) : visibleMethods.length === 0 ? (
          <EmptyState
            icon={filtering ? Search : Plus}
            title={filtering ? `No methods match “${query.trim()}”` : 'No payment methods yet'}
            description={
              filtering
                ? 'Try a different search term.'
                : 'Add a bank account or e-wallet to publish it on the public donation page.'
            }
            action={
              filtering ? (
                <Button variant="secondary" onClick={() => setQuery('')}>Clear search</Button>
              ) : (
                <Button onClick={openAdd} className="gap-2">
                  <Plus size={16} aria-hidden />
                  Add payment method
                </Button>
              )
            }
          />
        ) : (
          <table className="admin-table" aria-label="Payment methods">
            <thead>
              <tr>
                <th scope="col">Payment method</th>
                <th scope="col">Account details</th>
                <th scope="col">QR code</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleMethods.map(method => {
                const busy = Boolean(pendingIds[method.id]);
                return (
                  <tr key={method.id}>
                    <td>
                      <div className="admin-table-media">
                        <span className="admin-method-icon" aria-hidden>{typeIcon(method)}</span>
                        <div className="admin-method-name">
                          <strong>{method.name}</strong>
                          <span className="admin-status">{donationTypeLabel(method.type)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="admin-method-account">
                        <span>{method.accountName || '—'}</span>
                        <small>{method.accountNumber || 'No account number provided'}</small>
                      </div>
                    </td>
                    <td>
                      {method.qrImage ? (
                        <SmartImage className="admin-thumbnail admin-qr-thumb" src={method.qrImage} alt={`${method.name} QR code`} fallbackLabel="QR code unavailable" />
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>
                      <span className={`admin-status${method.enabled ? ' is-active' : ''}`} aria-live="polite">
                        {method.enabled ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => openEdit(method)} aria-label={`Edit ${method.name}`}>
                          <Pencil size={14} aria-hidden />
                          <span className="admin-action-text">Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => void toggleEnabled(method)}
                          disabled={busy}
                          aria-label={`${method.enabled ? 'Hide' : 'Publish'} ${method.name}`}
                        >
                          {method.enabled ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />}
                          <span className="admin-action-text">{method.enabled ? 'Hide' : 'Publish'}</span>
                        </button>
                        <button
                          type="button"
                          className="is-danger"
                          onClick={() => void handleDelete(method)}
                          disabled={busy}
                          aria-label={`Delete ${method.name}`}
                        >
                          <Trash2 size={14} aria-hidden />
                          <span className="admin-action-text">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="admin-hint">
        Active payment methods are published instantly on the public donation page. Disabled methods stay hidden from
        public visitors until you enable them again.
      </p>

      <AdminModal
        open={editorOpen}
        onClose={closeForm}
        eyebrow={editing ? 'Edit payment method' : 'New payment method'}
        title={editing ? `Edit ${editing.name}` : 'Add payment method'}
        description="Configure the bank account or e-wallet details shown on the public donation page."
        icon={editing ? <Pencil size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeForm} disabled={saving}>Cancel</Button>
            <Button type="submit" form="donation-method-form" disabled={saving} aria-busy={saving}>
              {saving ? <Spinner className="mr-2" label="Saving" /> : null}
              {saving ? 'Saving…' : 'Save payment method'}
            </Button>
          </>
        }
      >
        <form id="donation-method-form" onSubmit={handleSave} className="admin-form-grid">
          <AdminField label="Payment method type" required>
            <select required value={form.type} onChange={event => setField('type', event.target.value)}>
              <option value="">Select…</option>
              {donationMethodTypeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </AdminField>

          <AdminField label="Method name" required>
            <input
              required
              value={form.name}
              placeholder="e.g. BDO, BPI, Metrobank, GCash, Maya"
              onChange={event => setField('name', event.target.value)}
            />
          </AdminField>

          <AdminField label="Account name" required>
            <input
              required
              value={form.accountName}
              placeholder="e.g. Diocese of Catarman"
              onChange={event => setField('accountName', event.target.value)}
            />
          </AdminField>

          <AdminField label="Account number" required>
            <input
              required
              value={form.accountNumber}
              placeholder="e.g. 0012-3456-7890 or 0917 123 4567"
              onChange={event => setField('accountNumber', event.target.value)}
            />
          </AdminField>

          <AdminField label="Short description" className="admin-field-full">
            <input
              value={form.description}
              placeholder="e.g. Fast, secure mobile donation"
              onChange={event => setField('description', event.target.value)}
            />
            <small className="admin-hint">One-line summary shown in the footer donation card.</small>
          </AdminField>

          <AdminField label="Payment instructions" className="admin-field-full">
            <textarea
              value={form.instructions}
              placeholder={'1. Open your bank or wallet app.\n2. Send the amount to the account above.\n3. Keep a screenshot of the confirmation.'}
              onChange={event => setField('instructions', event.target.value)}
            />
            <small className="admin-hint">Step-by-step guide shown below the account details on the public page.</small>
          </AdminField>

          <AdminField label="QR code or payment reference image">
            <div className="admin-upload">
              {qrPreview || editing?.qrImage ? (
                <SmartImage
                  className="admin-method-qr-preview"
                  src={qrPreview || editing?.qrImage}
                  alt="QR code preview"
                  loading="eager"
                />
              ) : null}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                onChange={event => setQrFile(event.target.files?.[0] ?? null)}
                aria-describedby="donation-qr-hint"
              />
              <small id="donation-qr-hint" className="admin-hint">
                {editing?.qrImage && !qrFile
                  ? 'A QR code is already uploaded. Choose a file to replace it. PNG, JPG, WebP, GIF, or AVIF · up to 5 MB.'
                  : 'Upload the GCash, Maya, or bank QR code shown to donors. PNG, JPG, WebP, GIF, or AVIF · up to 5 MB.'}
              </small>
            </div>
          </AdminField>

          <AdminField label="Display order">
            <input
              type="number"
              value={form.displayOrder}
              placeholder="e.g. 1"
              onChange={event => setField('displayOrder', event.target.value)}
            />
            <small className="admin-hint">Lower numbers appear first.</small>
          </AdminField>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={event => setField('enabled', event.target.checked)}
            />
            <span>Visible on the public donation page</span>
          </label>
        </form>
      </AdminModal>
    </>
  );
}
