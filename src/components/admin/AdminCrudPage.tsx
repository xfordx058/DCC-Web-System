import { FormEvent, useMemo, useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
import { AdminField, AdminHeader, formatDate, type RecordItem, useRealtimeCollection } from './AdminPrimitives';
import { AdminModal } from './AdminModal';
import { db, getDownloadURL, push, ref, remove, set, storage, storageRef, update, uploadBytesResumable } from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';

type Option = { label: string; value: string };

function recordLabel(item: Record<string, any>): string {
  const label = item?.name ?? item?.title ?? item?.donorName ?? item?.email ?? '';
  return String(label).trim();
}

type Field = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'date' | 'number' | 'checkbox' | 'select' | 'file';
  required?: boolean;
  options?: Option[];
  placeholder?: string;
};

type Column = {
  key: string;
  label: string;
  render?: (item: RecordItem) => ReactNode;
};

type Props = {
  path: string;
  title: string;
  description: string;
  itemName: string;
  fields: Field[];
  columns: Column[];
  initialValues?: Record<string, any>;
  imageKey?: string;
  storageFolder?: string;
  exclusiveBooleanKey?: string;
  sort?: (items: RecordItem[]) => RecordItem[];
  hideHeader?: boolean;
  logSource?: string;
};

export default function AdminCrudPage({
  path,
  title,
  description,
  itemName,
  fields,
  columns,
  initialValues = {},
  imageKey,
  storageFolder,
  exclusiveBooleanKey,
  sort,
  hideHeader = false,
  logSource = 'Content',
}: Props) {
  const { items, loading } = useRealtimeCollection(path);
  const [query, setQuery] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [form, setForm] = useState<Record<string, any>>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = sort ? sort(items) : items;
    if (!normalized) return source;
    return source.filter(item => JSON.stringify(item).toLowerCase().includes(normalized));
  }, [items, query, sort]);

  function openAdd() {
    setEditing(null);
    setForm(initialValues);
    setFile(null);
    setEditorOpen(true);
  }

  function openEdit(item: RecordItem) {
    setEditing(item);
    setForm(item);
    setFile(null);
    setEditorOpen(true);
  }

  function closeForm() {
    setEditing(null);
    setForm(initialValues);
    setFile(null);
    setEditorOpen(false);
  }

  async function uploadImage(id: string) {
    if (!file || !storageFolder) return undefined;
    const uploadRef = storageRef(storage, `${storageFolder}/${id}/${file.name}`);
    const task = uploadBytesResumable(uploadRef, file);
    await new Promise<void>((resolve, reject) => {
      task.on('state_changed', undefined, reject, () => resolve());
    });
    return getDownloadURL(uploadRef);
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const id = editing?.id ?? push(ref(db, path)).key;
      if (!id) throw new Error('Unable to create record ID.');
      const data = { ...form };
      delete data.id;
      if (imageKey && file) data[imageKey] = await uploadImage(id);

      if (exclusiveBooleanKey && data[exclusiveBooleanKey]) {
        const updates = Object.fromEntries(
          items.filter(item => item.id !== id).map(item => [`${item.id}/${exclusiveBooleanKey}`, false])
        );
        if (Object.keys(updates).length) await update(ref(db, path), updates);
      }

      if (editing) await update(ref(db, `${path}/${id}`), data);
      else await set(ref(db, `${path}/${id}`), data);
      void recordActivity({
        source: logSource,
        action: `${editing ? 'Updated' : 'Created'} ${itemName}`,
        details: recordLabel(data),
      });
      closeForm();
    } catch (error) {
      console.error(error);
      window.alert(`Unable to save ${itemName.toLowerCase()}.`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: RecordItem) {
    if (!window.confirm(`Delete ${item.name || item.title || `this ${itemName.toLowerCase()}`}?`)) return;
    await remove(ref(db, `${path}/${item.id}`));
    void recordActivity({
      source: logSource,
      action: `Deleted ${itemName}`,
      details: recordLabel(item),
    });
  }

  return (
    <div className="admin-page">
      {!hideHeader && (
        <AdminHeader
          title={title}
          description={description}
          action={
            <Button onClick={openAdd} className="gap-2">
              <Plus size={16} aria-hidden />
              Add {itemName}
            </Button>
          }
        />
      )}

      <div className="admin-toolbar">
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder={`Search ${title.toLowerCase()}…`} />
        <span>{visibleItems.length} records</span>
        {hideHeader ? (
          <Button onClick={openAdd} className="gap-2">
            <Plus size={16} aria-hidden />
            Add {itemName}
          </Button>
        ) : null}
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : visibleItems.length === 0 ? (
          <p className="admin-empty">No records found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map(column => <th key={column.key}>{column.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map(item => (
                <tr key={item.id}>
                  {columns.map(column => (
                    <td key={column.key}>{column.render ? column.render(item) : String(item[column.key] ?? '—')}</td>
                  ))}
                  <td>
                    <div className="admin-actions">
                      <button onClick={() => openEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminModal
        open={editorOpen}
        onClose={closeForm}
        eyebrow={editing ? 'Edit record' : 'New record'}
        title={editing ? `Edit ${itemName}` : `Add ${itemName}`}
        description={description}
        icon={editing ? <Pencil size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeForm}>Cancel</Button>
            <Button type="submit" form="crud-editor-form" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
          </>
        }
      >
        <form id="crud-editor-form" onSubmit={handleSave} className="admin-form-grid">
          {fields.map(field => {
            const value = form[field.key];
            if (field.type === 'checkbox') {
              return (
                <label key={field.key} className="admin-checkbox">
                  <input type="checkbox" checked={Boolean(value)} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.checked }))} />
                  <span>{field.label}</span>
                </label>
              );
            }
            if (field.type === 'file') {
              return (
                <AdminField key={field.key} label={field.label}>
                  <input type="file" accept="image/*" onChange={event => setFile(event.target.files?.[0] ?? null)} />
                </AdminField>
              );
            }
            if (field.type === 'textarea') {
              return (
                <AdminField key={field.key} label={field.label}>
                  <textarea required={field.required} value={value ?? ''} placeholder={field.placeholder} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))} />
                </AdminField>
              );
            }
            if (field.type === 'select') {
              return (
                <AdminField key={field.key} label={field.label}>
                  <select required={field.required} value={value ?? ''} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))}>
                    <option value="">Select…</option>
                    {field.options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </AdminField>
              );
            }
            return (
              <AdminField key={field.key} label={field.label}>
                <input
                  type={field.type ?? 'text'}
                  required={field.required}
                  value={field.type === 'date' ? String(value ?? '').slice(0, 10) : value ?? ''}
                  placeholder={field.placeholder}
                  onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))}
                />
              </AdminField>
            );
          })}
        </form>
      </AdminModal>
    </div>
  );
}

export { formatDate };
