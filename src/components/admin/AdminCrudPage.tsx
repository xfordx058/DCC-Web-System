import { FormEvent, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ImagePlus, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { AdminField, AdminHeader, formatDate, type RecordItem, useRealtimeCollection } from './AdminPrimitives';
import { AdminModal } from './AdminModal';
import { db, push, ref, remove, set, update } from '@/db/firebase';
import { recordActivity } from '@/lib/activity-log';
import { useToast } from '@/contexts/ToastContext';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { SkeletonTable } from '@/components/ui/skeleton';
import { EmptyState, ErrorState, Spinner } from '@/components/ui/states';
import { uploadImage } from '@/lib/uploads';
import SmartImage from '@/components/ui/SmartImage';

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
  section?: string;
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

const PAGE_SIZE = 10;

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
  const location = useLocation();
  const navigate = useNavigate();
  const { items, loading, error, refetch } = useRealtimeCollection(path);
  const { toast } = useToast();
  const { confirm, confirmDialog } = useConfirm();

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [page, setPage] = useState(0);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [form, setForm] = useState<Record<string, any>>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const searchIndex = useMemo(
    () => items.map(item => ({ item, haystack: JSON.stringify(item).toLowerCase() })),
    [items]
  );

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const matches = normalized ? searchIndex.filter(entry => entry.haystack.includes(normalized)).map(entry => entry.item) : items;
    return sort ? sort(matches) : matches;
  }, [items, deferredQuery, searchIndex, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    if (page > pageCount - 1) setPage(0);
  }, [page, pageCount]);

  useEffect(() => {
    if (location.state?.openCreate !== true) return;
    setEditing(null);
    setForm(initialValues);
    setFile(null);
    setUploadPercent(0);
    setEditorOpen(true);
    navigate(location.pathname, { replace: true, state: null });
  }, [initialValues, location.key, location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!file) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function openAdd() {
    setEditing(null);
    setForm(initialValues);
    setFile(null);
    setUploadPercent(0);
    setEditorOpen(true);
  }

  function openEdit(item: RecordItem) {
    setEditing(item);
    setForm(item);
    setFile(null);
    setUploadPercent(0);
    setEditorOpen(true);
  }

  function resetForm() {
    setEditing(null);
    setForm(initialValues);
    setFile(null);
    setUploadPercent(0);
    setEditorOpen(false);
  }

  async function closeForm() {
    if (saving) return;
    const original = editing ?? initialValues;
    const dirty = file !== null || JSON.stringify(form) !== JSON.stringify(original);
    if (dirty) {
      const discard = await confirm({
        title: 'Discard unsaved changes?',
        description: 'Your edits will be lost if you close this form.',
        confirmLabel: 'Discard changes',
        tone: 'default',
      });
      if (!discard) return;
    }
    resetForm();
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setUploadPercent(0);
    try {
      const id = editing?.id ?? push(ref(db, path)).key;
      if (!id) throw new Error('Unable to create record ID.');
      const data = { ...form };
      delete data.id;
      if (imageKey && file) {
        if (!storageFolder) throw new Error('Image storage is not configured for this section.');
        data[imageKey] = await uploadImage(storageFolder, id, file, setUploadPercent);
      }

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
      toast('success', `${itemName} ${editing ? 'updated' : 'created'} successfully.`);
      resetForm();
    } catch (caught) {
      console.error(caught);
      toast('error', caught instanceof Error ? caught.message : `Unable to save ${itemName.toLowerCase()}. Please try again.`);
    } finally {
      setSaving(false);
      setUploadPercent(0);
    }
  }

  async function handleDelete(item: RecordItem) {
    const label = recordLabel(item) || `this ${itemName.toLowerCase()}`;
    const approved = await confirm({
      title: `Delete ${itemName.toLowerCase()}?`,
      description: `${label} will be permanently removed. This action cannot be undone.`,
      confirmLabel: 'Delete',
    });
    if (!approved) return;

    setDeletingId(item.id);
    try {
      await remove(ref(db, `${path}/${item.id}`));
      void recordActivity({
        source: logSource,
        action: `Deleted ${itemName}`,
        details: recordLabel(item),
      });
      toast('success', `${itemName} deleted.`);
    } catch (caught) {
      console.error(caught);
      toast('error', `Unable to delete ${itemName.toLowerCase()}. Please try again.`);
    } finally {
      setDeletingId(null);
    }
  }

  const isFiltering = query.trim().length > 0;

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
        <div className="admin-search-field">
          <Search size={16} aria-hidden />
          <input
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setPage(0);
            }}
            placeholder={`Search ${title.toLowerCase().replace(' management', '')}…`}
            aria-label={`Search ${title}`}
            type="search"
          />
        </div>
        <span aria-live="polite">{visibleCountLabel(loading, filtered.length, items.length, isFiltering)}</span>
        {hideHeader ? (
          <Button onClick={openAdd} className="gap-2">
            <Plus size={16} aria-hidden />
            Add {itemName}
          </Button>
        ) : null}
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <SkeletonTable columns={columns.length + 1} />
        ) : error ? (
          <ErrorState
            title={`Unable to load ${itemName.toLowerCase()} records`}
            description="The database could not be reached. Your changes are safe — try loading the list again."
            onRetry={() => void refetch()}
            compact
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={isFiltering ? `No ${itemName.toLowerCase()} matches “${query.trim()}”` : `No ${itemName.toLowerCase()} records yet`}
            description={
              isFiltering
                ? 'Try a different search term, or clear the search to see every record.'
                : `Add the first ${itemName.toLowerCase()} to publish it on the website.`
            }
            icon={isFiltering ? Search : Plus}
            action={
              isFiltering ? (
                <Button variant="secondary" onClick={() => setQuery('')}>
                  Clear search
                </Button>
              ) : (
                <Button onClick={openAdd} className="gap-2">
                  <Plus size={16} aria-hidden />
                  Add {itemName}
                </Button>
              )
            }
          />
        ) : (
          <table className="admin-table" aria-label={`${title} records`}>
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.key} scope="col">{column.label}</th>
                ))}
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(item => {
                const label = recordLabel(item) || `this ${itemName.toLowerCase()}`;
                return (
                  <tr key={item.id}>
                    {columns.map(column => (
                      <td key={column.key}>{column.render ? column.render(item) : String(item[column.key] ?? '—')}</td>
                    ))}
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => openEdit(item)} aria-label={`Edit ${label}`}>
                          <Pencil size={14} aria-hidden />
                          <span className="admin-action-text">Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(item)}
                          disabled={deletingId === item.id}
                          aria-label={`Delete ${label}`}
                          className="is-danger"
                        >
                          <Trash2 size={14} aria-hidden />
                          <span className="admin-action-text">{deletingId === item.id ? 'Deleting…' : 'Delete'}</span>
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

      {!loading && !error && filtered.length > PAGE_SIZE ? (
        <div className="admin-pagination">
          <span>
            Showing {safePage * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE + PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="admin-pagination-controls">
            <Button variant="secondary" onClick={() => setPage(Math.max(0, safePage - 1))} disabled={safePage === 0}>
              Previous
            </Button>
            <span>Page {safePage + 1} of {pageCount}</span>
            <Button variant="secondary" onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))} disabled={safePage >= pageCount - 1}>
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <AdminModal
        open={editorOpen}
        onClose={closeForm}
        className="admin-crud-editor-modal"
        eyebrow={editing ? 'Edit record' : 'New record'}
        title={editing ? `Edit ${itemName}` : `Add ${itemName}`}
        description={description}
        icon={editing ? <Pencil size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeForm} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" form="crud-editor-form" disabled={saving} aria-busy={saving}>
              {saving ? <Spinner className="mr-2" label="Saving" /> : null}
              {saving ? (uploadPercent > 0 ? `Uploading ${uploadPercent}%` : 'Saving…') : editing ? 'Save changes' : `Create ${itemName}`}
            </Button>
          </>
        }
      >
        <form id="crud-editor-form" onSubmit={handleSave} className="admin-form-grid admin-crud-form">
          {fields.map((field, index) => {
            const value = form[field.key];
            let control: ReactNode;
            if (field.type === 'checkbox') {
              control = (
                <label className="admin-checkbox">
                  <input type="checkbox" checked={Boolean(value)} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.checked }))} />
                  <span>{field.label}</span>
                </label>
              );
            } else if (field.type === 'file') {
              const currentImage = imageKey ? form[imageKey] : undefined;
              control = (
                <AdminField label={field.label}>
                  <div className="admin-upload">
                    {preview || currentImage ? (
                      <SmartImage className="admin-upload-preview" src={preview || currentImage} alt="Selected image preview" loading="eager" />
                    ) : (
                      <span className="admin-upload-placeholder" aria-hidden="true">
                        <ImagePlus size={18} />
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                      onChange={event => setFile(event.target.files?.[0] ?? null)}
                      aria-describedby={`${field.key}-hint`}
                    />
                    <small id={`${field.key}-hint`} className="admin-hint">
                      PNG, JPG, WebP, GIF, or AVIF · up to 5 MB.
                    </small>
                  </div>
                </AdminField>
              );
            } else if (field.type === 'textarea') {
              control = (
                <AdminField label={field.label} required={field.required} className="admin-field-full">
                  <textarea required={field.required} value={value ?? ''} placeholder={field.placeholder} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))} />
                </AdminField>
              );
            } else if (field.type === 'select') {
              control = (
                <AdminField label={field.label} required={field.required}>
                  <select required={field.required} value={value ?? ''} onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))}>
                    <option value="">Select…</option>
                    {field.options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </AdminField>
              );
            } else {
              control = (
                <AdminField label={field.label} required={field.required}>
                <input
                  type={field.type ?? 'text'}
                  required={field.required}
                  value={field.type === 'date' ? String(value ?? '').slice(0, 10) : value ?? ''}
                  placeholder={field.placeholder}
                  onChange={event => setForm(current => ({ ...current, [field.key]: event.target.value }))}
                />
                </AdminField>
              );
            }
            return (
              <Fragment key={field.key}>
                {field.section && field.section !== fields[index - 1]?.section ? (
                  <div className="admin-form-section-heading"><h3>{field.section}</h3><span /></div>
                ) : null}
                {control}
              </Fragment>
            );
          })}
        </form>
      </AdminModal>
      {confirmDialog}
    </div>
  );
}

function visibleCountLabel(loading: boolean, visible: number, total: number, filtering: boolean) {
  if (loading) return 'Loading…';
  if (filtering) return `${visible} of ${total} match`;
  return visible === 1 ? '1 record' : `${visible} records`;
}

export { formatDate };
