import { useEffect, useMemo, useState, FormEvent } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { db, ref, onValue, set, update, remove, push, storage, storageRef, uploadBytesResumable, getDownloadURL } from '@/db/firebase';
import { Button } from '@/components/ui/button';
import { AdminField, AdminHeader } from '@/components/admin/AdminPrimitives';
import { AdminModal } from '@/components/admin/AdminModal';
import { recordActivity } from '@/lib/activity-log';
import type { Priest } from '@/types';

export default function AdminPriests() {
  const [priests, setPriests] = useState<Priest[]>([]);
  const [loading, setLoading] = useState(true);

  const [queryText, setQueryText] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Priest>({ status: 'active' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [parishes, setParishes] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    const r = ref(db, 'priests');
    const unsub = onValue(r, snap => {
      const val = snap.val() ?? {};
      const list = Object.entries(val).map(([id, data]) => ({ id, ...(data as any) }));
      list.sort((a: any, b: any) => String(a.name || '').localeCompare(String(b.name || '')));
      setPriests(list as Priest[]);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const r = ref(db, 'churches');
    const unsub = onValue(r, snap => {
      const val = snap.val() ?? {};
      const list = Object.entries(val).map(([id, data]) => ({ id, name: (data as any).name || id }));
      list.sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)));
      setParishes(list as any);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return priests.filter(p => {
      if (assignmentFilter && p.assignment !== assignmentFilter) return false;
      if (!q) return true;
      return (
        String(p.name || '').toLowerCase().includes(q) ||
        String(p.biography || '').toLowerCase().includes(q) ||
        String(p.assignment || '').toLowerCase().includes(q)
      );
    });
  }, [priests, queryText, assignmentFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => { if (page >= pageCount) setPage(0); }, [page, pageCount]);

  function openAdd() { setForm({ status: 'active' }); setImageFile(null); setIsEditing(true); }
  function openEdit(p: Priest) { setForm(p); setImageFile(null); setIsEditing(true); }
  function closeForm() { setIsEditing(false); setForm({ status: 'active' }); setImageFile(null); }

  function assignmentName(assignment?: string) {
    if (!assignment) return 'Unassigned';
    return parishes.find(x => x.id === assignment)?.name || assignment;
  }

  async function uploadImageAndGetURL(id: string, file: File) {
    const sRef = storageRef(storage, `priests/${id}/${file.name}`);
    const task = uploadBytesResumable(sRef, file);
    return new Promise<string>((resolve, reject) => {
      task.on('state_changed', undefined, err => reject(err), async () => {
        const url = await getDownloadURL(sRef);
        resolve(url);
      });
    });
  }

  async function handleSave(e?: FormEvent) {
    e?.preventDefault();
    setSaving(true);
    try {
      if (form.id) {
        const data: any = { ...form };
        delete data.id;
        if (imageFile) {
          const url = await uploadImageAndGetURL(form.id, imageFile);
          data.photo = url;
        }
        await update(ref(db, `priests/${form.id}`), data);
      } else {
        const newRef = push(ref(db, 'priests'));
        const id = newRef.key as string;
        const data: any = { ...(form || {}) };
        if (imageFile) {
          const url = await uploadImageAndGetURL(id, imageFile);
          data.photo = url;
        }
        await set(ref(db, `priests/${id}`), data);
      }
      void recordActivity({
        source: 'Content',
        action: form.id ? 'Updated Priest' : 'Created Priest',
        details: String(form.name || [form.firstName, form.lastName].filter(Boolean).join(' ') || ''),
      });
      closeForm();
    } catch (err) {
      console.error('Save priest failed', err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!confirm('Delete this priest? This cannot be undone.')) return;
    try {
      await remove(ref(db, `priests/${id}`));
      const record = priests.find(priest => priest.id === id);
      void recordActivity({
        source: 'Content',
        action: 'Deleted Priest',
        details: String(record?.name || [record?.firstName, record?.lastName].filter(Boolean).join(' ') || ''),
      });
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed');
    }
  }

  const start = page * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <div className="admin-page">
      <AdminHeader
        title="Priests Management"
        description="Manage priests and their assignments. Public lists update instantly as changes are saved."
        action={<Button onClick={openAdd}>Add Priest</Button>}
      />

      <div className="admin-toolbar">
        <input value={queryText} onChange={e => setQueryText(e.target.value)} placeholder="Search priests…" />
        <select value={assignmentFilter} onChange={e => { setAssignmentFilter(e.target.value); setPage(0); }}>
          <option value="">All assignments</option>
          {parishes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <span>{filtered.length} priests</span>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : pageItems.length === 0 ? (
          <p className="admin-empty">No priests found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Priest</th>
                <th>Ordained</th>
                <th>Assignment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-table-media">
                      {p.photo ? <img className="admin-thumbnail" src={p.photo} alt="" /> : null}
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td>{p.ordinationYear || '—'}</td>
                  <td>{assignmentName(p.assignment)}</td>
                  <td><span className={`admin-status ${p.status === 'inactive' ? '' : 'is-active'}`}>{p.status === 'inactive' ? 'Inactive' : 'Active'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <button onClick={() => openEdit(p)}>Edit</button>
                      <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="admin-pagination">
          <span>Showing {start + 1}–{Math.min(start + pageSize, filtered.length)} of {filtered.length}</span>
          <div className="admin-pagination-controls">
            <Button variant="secondary" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
            <span>Page {page + 1} of {pageCount}</span>
            <Button variant="secondary" onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))} disabled={page >= pageCount - 1}>Next</Button>
          </div>
        </div>
      ) : null}

      <AdminModal
        open={isEditing}
        onClose={closeForm}
        eyebrow={form.id ? 'Edit record' : 'New record'}
        title={form.id ? `Edit ${form.name || 'priest'}` : 'Add priest'}
        description="Record the priest's assignment, ordination year, and biography."
        icon={form.id ? <Pencil size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeForm}>Cancel</Button>
            <Button type="submit" form="priest-editor-form" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
          </>
        }
      >
          <form id="priest-editor-form" onSubmit={handleSave} className="admin-form-grid">
            <AdminField label="Name">
              <input required value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </AdminField>
            <AdminField label="Ordination Year">
              <input value={String(form.ordinationYear || '')} onChange={e => setForm(f => ({ ...f, ordinationYear: e.target.value }))} />
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
            <AdminField label="Biography" className="admin-field-full">
              <textarea value={form.biography || ''} onChange={e => setForm(f => ({ ...f, biography: e.target.value }))} />
            </AdminField>
            <AdminField label="Photo">
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
              {form.photo ? <img src={form.photo} alt="preview" className="admin-thumbnail" style={{ marginTop: '0.5rem', width: '64px', height: '96px' }} /> : null}
            </AdminField>
          </form>
      </AdminModal>
    </div>
  );
}
