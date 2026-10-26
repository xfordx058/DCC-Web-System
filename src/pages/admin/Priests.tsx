import { useDeferredValue, useEffect, useMemo, useRef, useState, FormEvent } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { db, ref, set, update, remove, push } from '@/db/firebase';
import { Button } from '@/components/ui/button';
import { AdminField, AdminHeader, useRealtimeCollection } from '@/components/admin/AdminPrimitives';
import { AdminModal } from '@/components/admin/AdminModal';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { EmptyState, ErrorState, Spinner } from '@/components/ui/states';
import { SkeletonTable } from '@/components/ui/skeleton';
import { useToast } from '@/contexts/ToastContext';
import { recordActivity } from '@/lib/activity-log';
import { uploadImage } from '@/lib/uploads';
import type { Priest } from '@/types';
import SmartImage from '@/components/ui/SmartImage';
import { useLocation, useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

export default function AdminPriests() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items: priestItems, loading, error, refetch } = useRealtimeCollection('priests');
  const { items: churchItems } = useRealtimeCollection('churches');
  const { toast } = useToast();
  const { confirm, confirmDialog } = useConfirm();

  const [queryText, setQueryText] = useState('');
  const deferredQuery = useDeferredValue(queryText);
  const [assignmentFilter, setAssignmentFilter] = useState('');
  const [page, setPage] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Priest>({ status: 'active' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [busyId, setBusyId] = useState('');
  const initialFormRef = useRef<Priest>({ status: 'active' });

  const priests = useMemo(
    () =>
      (priestItems as Priest[])
        .slice()
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''))),
    [priestItems]
  );

  const parishes = useMemo(
    () =>
      churchItems
        .map(item => ({ id: item.id, name: String(item.name || item.id) }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [churchItems]
  );

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return priests.filter(p => {
      if (assignmentFilter && p.assignment !== assignmentFilter) return false;
      if (!q) return true;
      return (
        String(p.name || '').toLowerCase().includes(q) ||
        String(p.biography || '').toLowerCase().includes(q) ||
        String(p.assignment || '').toLowerCase().includes(q)
      );
    });
  }, [priests, deferredQuery, assignmentFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  useEffect(() => {
    if (page > pageCount - 1) setPage(0);
  }, [page, pageCount]);

  useEffect(() => {
    if (!imageFile) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function openAdd() {
    const initial = { status: 'active' };
    initialFormRef.current = initial;
    setForm(initial);
    setImageFile(null);
    setUploadPercent(0);
    setIsEditing(true);
  }

  useEffect(() => {
    if (location.state?.openCreate !== true) return;
    openAdd();
    navigate(location.pathname, { replace: true, state: null });
  }, [location.key, location.pathname, location.state, navigate]);

  function openEdit(p: Priest) {
    initialFormRef.current = p;
    setForm(p);
    setImageFile(null);
    setUploadPercent(0);
    setIsEditing(true);
  }
  function resetForm() {
    setIsEditing(false);
    setForm({ status: 'active' });
    initialFormRef.current = { status: 'active' };
    setImageFile(null);
    setUploadPercent(0);
  }

  async function closeForm() {
    if (saving) return;
    if ((imageFile || JSON.stringify(form) !== JSON.stringify(initialFormRef.current)) && !(await confirm({
      title: 'Discard unsaved changes?',
      description: 'Your priest edits will be lost if you close this form.',
      confirmLabel: 'Discard changes',
      tone: 'default',
    }))) return;
    resetForm();
  }

  function assignmentName(assignment?: string) {
    if (!assignment) return 'Unassigned';
    return parishes.find(x => x.id === assignment)?.name || assignment;
  }

  async function handleSave(e?: FormEvent) {
    e?.preventDefault();
    if (saving) return;
    setSaving(true);
    setUploadPercent(0);
    try {
      if (form.id) {
        const data: any = { ...form };
        delete data.id;
        if (imageFile) {
          data.photo = await uploadImage('priests', form.id, imageFile, setUploadPercent);
        }
        await update(ref(db, `priests/${form.id}`), data);
      } else {
        const newRef = push(ref(db, 'priests'));
        const id = newRef.key as string;
        const data: any = { ...(form || {}) };
        if (imageFile) {
          data.photo = await uploadImage('priests', id, imageFile, setUploadPercent);
        }
        await set(ref(db, `priests/${id}`), data);
      }
      void recordActivity({
        source: 'Content',
        action: form.id ? 'Updated Priest' : 'Created Priest',
        details: String(form.name || [form.firstName, form.lastName].filter(Boolean).join(' ') || ''),
      });
      toast('success', `Priest ${form.id ? 'updated' : 'created'}.`);
      resetForm();
    } catch (err) {
      console.error('Save priest failed', err);
      toast('error', err instanceof Error ? err.message : 'Unable to save the priest. Please try again.');
    } finally {
      setSaving(false);
      setUploadPercent(0);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    const record = priests.find(priest => priest.id === id);
    const approved = await confirm({
      title: 'Delete this priest?',
      description: `${record?.name || 'This priest'} will be removed from the clergy directory. This action cannot be undone.`,
      confirmLabel: 'Delete priest',
    });
    if (!approved) return;

    setBusyId(id);
    try {
      await remove(ref(db, `priests/${id}`));
      void recordActivity({
        source: 'Content',
        action: 'Deleted Priest',
        details: String(record?.name || [record?.firstName, record?.lastName].filter(Boolean).join(' ') || ''),
      });
      toast('success', 'Priest deleted.');
    } catch (err) {
      console.error('Delete failed', err);
      toast('error', 'Unable to delete the priest. Please try again.');
    } finally {
      setBusyId('');
    }
  }

  const start = safePage * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);
  const filtering = Boolean(queryText.trim() || assignmentFilter);

  return (
    <div className="admin-page">
      <AdminHeader
        title="Priests Management"
        description="Manage priests and their assignments. Public lists update instantly as changes are saved."
        action={
          <Button onClick={openAdd} className="gap-2">
            <Plus size={16} aria-hidden />
            Add Priest
          </Button>
        }
      />

      <div className="admin-toolbar">
        <div className="admin-search-field">
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={queryText}
            onChange={e => {
              setQueryText(e.target.value);
              setPage(0);
            }}
            placeholder="Search priests…"
            aria-label="Search priests"
          />
        </div>
        <select
          value={assignmentFilter}
          aria-label="Filter by assignment"
          onChange={e => {
            setAssignmentFilter(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All assignments</option>
          {parishes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <span aria-live="polite">{loading ? 'Loading…' : `${filtered.length} priests`}</span>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <SkeletonTable columns={5} />
        ) : error ? (
          <ErrorState
            title="Unable to load priests"
            description="The clergy directory could not be reached. Try loading it again."
            onRetry={() => void refetch()}
            compact
          />
        ) : pageItems.length === 0 ? (
          <EmptyState
            icon={filtering ? Search : Plus}
            title={filtering ? 'No priests match your filters' : 'No priests yet'}
            description={filtering ? 'Try another search term or clear the assignment filter.' : 'Add the first priest to the clergy directory.'}
            action={
              filtering ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQueryText('');
                    setAssignmentFilter('');
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button onClick={openAdd} className="gap-2">
                  <Plus size={16} aria-hidden />
                  Add Priest
                </Button>
              )
            }
          />
        ) : (
          <table className="admin-table" aria-label="Priests">
            <thead>
              <tr>
                <th scope="col">Priest</th>
                <th scope="col">Ordained</th>
                <th scope="col">Assignment</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-table-media">
                      {p.photo ? <SmartImage className="admin-thumbnail" src={p.photo} alt="" /> : null}
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td>{p.ordinationYear || '—'}</td>
                  <td>{assignmentName(p.assignment)}</td>
                  <td><span className={`admin-status ${p.status === 'inactive' ? '' : 'is-active'}`}>{p.status === 'inactive' ? 'Inactive' : 'Active'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" onClick={() => openEdit(p)} aria-label={`Edit ${p.name || 'priest'}`}>
                        <Pencil size={14} aria-hidden />
                        <span className="admin-action-text">Edit</span>
                      </button>
                      <button
                        type="button"
                        className="is-danger"
                        onClick={() => void handleDelete(p.id)}
                        disabled={busyId === p.id}
                        aria-label={`Delete ${p.name || 'priest'}`}
                      >
                        <Trash2 size={14} aria-hidden />
                        <span className="admin-action-text">{busyId === p.id ? 'Deleting…' : 'Delete'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && !error && filtered.length > PAGE_SIZE ? (
        <div className="admin-pagination">
          <span>Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div className="admin-pagination-controls">
            <Button variant="secondary" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={safePage === 0}>Previous</Button>
            <span>Page {safePage + 1} of {pageCount}</span>
            <Button variant="secondary" onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))} disabled={safePage >= pageCount - 1}>Next</Button>
          </div>
        </div>
      ) : null}

      <AdminModal
        open={isEditing}
        onClose={closeForm}
        className="admin-crud-editor-modal"
        eyebrow={form.id ? 'Edit record' : 'New record'}
        title={form.id ? `Edit ${form.name || 'priest'}` : 'Add priest'}
        description="Record the priest's assignment, ordination year, and biography."
        icon={form.id ? <Pencil size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeForm} disabled={saving}>Cancel</Button>
            <Button type="submit" form="priest-editor-form" disabled={saving} aria-busy={saving}>
              {saving ? <Spinner className="mr-2" label="Saving" /> : null}
              {saving ? (uploadPercent > 0 ? `Uploading ${uploadPercent}%` : 'Saving…') : 'Save changes'}
            </Button>
          </>
        }
      >
        <form id="priest-editor-form" onSubmit={handleSave} className="admin-form-grid">
          <div className="admin-form-section-heading"><h3>Priest information</h3><span /></div>
          <AdminField label="Name" required>
            <input required value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </AdminField>
          <AdminField label="Ordination Year">
            <input inputMode="numeric" value={String(form.ordinationYear || '')} onChange={e => setForm(f => ({ ...f, ordinationYear: e.target.value }))} />
          </AdminField>
          <AdminField label="Assignment (church)">
            <select value={form.assignment || ''} onChange={e => setForm(f => ({ ...f, assignment: e.target.value }))}>
              <option value="">Unassigned</option>
              {parishes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </AdminField>
          <AdminField label="Status">
            <select value={form.status || 'active'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </AdminField>
          <div className="admin-form-section-heading"><h3>Biography &amp; portrait</h3><span /></div>
          <AdminField label="Biography" className="admin-field-full">
            <textarea value={form.biography || ''} onChange={e => setForm(f => ({ ...f, biography: e.target.value }))} />
          </AdminField>
          <AdminField label="Photo">
            <div className="admin-upload">
              {preview || form.photo ? (
                <SmartImage className="admin-upload-preview is-portrait" src={preview || form.photo} alt="Priest photo preview" loading="eager" />
              ) : null}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                aria-describedby="priest-photo-hint"
              />
              <small id="priest-photo-hint" className="admin-hint">PNG, JPG, WebP, GIF, or AVIF · up to 5 MB.</small>
            </div>
          </AdminField>
        </form>
      </AdminModal>
      {confirmDialog}
    </div>
  );
}
