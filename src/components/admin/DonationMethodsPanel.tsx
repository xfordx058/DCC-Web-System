import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Banknote, Pencil, Plus, Smartphone, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminField, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { AdminModal } from '@/components/admin/AdminModal';
import { useToast } from '@/contexts/ToastContext';
import { recordActivity } from '@/lib/activity-log';
import {
  db,
  getDownloadURL,
  push,
  ref,
  remove,
  set,
  storage,
  storageRef,
  update,
  uploadBytesResumable,
} from '@/db/firebase';
import {
  donationMethodIcon,
  donationMethodTypeOptions,
  donationTypeLabel,
  normalizeDonationMethod,
  sortDonationMethods,
} from '@/lib/donations';
import type { DonationMethod, DonationMethodType } from '@/types';

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
  const { items, loading, error } = useRealtimeCollection('donationOptions');
  const { toast } = useToast();

  const [query, setQuery] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<DonationMethod | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const qrPreview = useMemo(() => (qrFile ? URL.createObjectURL(qrFile) : ''), [qrFile]);

  useEffect(() => {
    if (!qrPreview) return;
    return () => URL.revokeObjectURL(qrPreview);
  }, [qrPreview]);

  const methods = useMemo(
    () => sortDonationMethods(items.map(item => normalizeDonationMethod(item.id, item))),
    [items]
  );

  const visibleMethods = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return methods;
    return methods.filter(method =>
      [method.name, method.type, donationTypeLabel(method.type), method.accountName, method.accountNumber, method.instructions]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [methods, query]);

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
    if (qrFile && !qrFile.type.startsWith('image/')) return 'The QR code upload must be an image file.';
    return null;
  }

  async function uploadQr(id: string, file: File) {
    const uploadRef = storageRef(storage, `donationOptions/${id}/${file.name}`);
    const task = uploadBytesResumable(uploadRef, file);
    await new Promise<void>((resolve, reject) => {
      task.on('state_changed', undefined, reject, () => resolve());
    });
    return getDownloadURL(uploadRef);
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
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
      toast('error', 'Unable to save the payment method. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleEnabled(method: DonationMethod) {
    try {
      await update(ref(db, `donationOptions/${method.id}`), {
        enabled: !method.enabled,
        updatedAt: new Date().toISOString(),
      });
      void recordActivity({
        source: 'Donations',
        action: method.enabled ? 'Hid payment method' : 'Enabled payment method',
        details: method.name,
      });
      toast(
        'success',
        method.enabled
          ? `${method.name} hidden from the public donation page.`
          : `${method.name} is now visible on the public donation page.`
      );
    } catch (error) {
      console.error('Toggle payment method failed', error);
      toast('error', 'Unable to update the payment method. Please try again.');
    }
  }

  async function handleDelete(method: DonationMethod) {
    if (!window.confirm(`Delete ${method.name}? This removes it from the public donation page.`)) return;
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
    }
  }

  return (
    <>
      <div className="admin-toolbar">
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search payment methods…" />
        <span>{visibleMethods.length} methods</span>
        <Button type="button" onClick={openAdd} className="gap-2">
          <Plus size={16} aria-hidden />
          Add payment method
        </Button>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-empty">Loading payment methods…</p>
        ) : error ? (
          <p className="admin-error">Unable to load payment methods from the database. Please refresh the page and try again.</p>
        ) : visibleMethods.length === 0 ? (
          <p className="admin-empty">
            {methods.length === 0
              ? 'No payment methods yet. Add a bank account or e-wallet to publish it on the public donation page.'
              : 'No payment methods match your search.'}
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Payment method</th>
                <th>Account details</th>
                <th>QR code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleMethods.map(method => (
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
                      <img className="admin-thumbnail admin-qr-thumb" src={method.qrImage} alt={`${method.name} QR code`} />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <span className={`admin-status${method.enabled ? ' is-active' : ''}`}>
                      {method.enabled ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" onClick={() => openEdit(method)}>Edit</button>
                      <button type="button" onClick={() => toggleEnabled(method)}>
                        {method.enabled ? 'Disable' : 'Enable'}
                      </button>
                      <button type="button" onClick={() => handleDelete(method)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
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
            <Button type="button" variant="secondary" onClick={closeForm}>Cancel</Button>
            <Button type="submit" form="donation-method-form" disabled={saving}>
              {saving ? 'Saving…' : 'Save payment method'}
            </Button>
          </>
        }
      >
        <form id="donation-method-form" onSubmit={handleSave} className="admin-form-grid">
          <AdminField label="Payment method type">
            <select required value={form.type} onChange={event => setField('type', event.target.value)}>
              <option value="">Select…</option>
              {donationMethodTypeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </AdminField>

          <AdminField label="Method name">
            <input
              required
              value={form.name}
              placeholder="e.g. BDO, BPI, Metrobank, GCash, Maya"
              onChange={event => setField('name', event.target.value)}
            />
          </AdminField>

          <AdminField label="Account name">
            <input
              required
              value={form.accountName}
              placeholder="e.g. Diocese of Catarman"
              onChange={event => setField('accountName', event.target.value)}
            />
          </AdminField>

          <AdminField label="Account number">
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
            <input
              type="file"
              accept="image/*"
              onChange={event => setQrFile(event.target.files?.[0] ?? null)}
            />
            {(qrPreview || editing?.qrImage) ? (
              <img
                className="admin-method-qr-preview"
                src={qrPreview || editing?.qrImage}
                alt="QR code preview"
              />
            ) : null}
            <small className="admin-hint">
              {editing?.qrImage && !qrFile
                ? 'A QR code is already uploaded. Choose a file to replace it.'
                : 'Upload the GCash, Maya, or bank QR code shown to donors.'}
            </small>
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
