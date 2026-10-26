import { useEffect, useMemo, useState, FormEvent } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { db, ref, onValue, set, update, remove, push, storage, storageRef, uploadBytesResumable, getDownloadURL } from '@/db/firebase';
import { Button } from '@/components/ui/button';
import { AdminField, AdminHeader } from '@/components/admin/AdminPrimitives';
import { AdminModal } from '@/components/admin/AdminModal';
import { recordActivity } from '@/lib/activity-log';
import type { Church, Priest } from '@/types';

export default function AdminChurches() {
  const [churches, setChurches] = useState<Church[]>([]);
  const [priests, setPriests] = useState<Priest[]>([]);
  const [loading, setLoading] = useState(true);

  const [queryText, setQueryText] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Church>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const r = ref(db, 'churches');
    const un = onValue(r, snap => {
      const val = snap.val() ?? {};
      const list = Object.entries(val).map(([id, data]) => ({ id, ...(data as any) }));
      list.sort((a: any, b: any) => String(a.name || '').localeCompare(String(b.name || '')));
      setChurches(list as Church[]);
      setLoading(false);
    });
    return () => un();
  }, []);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, 'priests'), snapshot => {
      const value = snapshot.val() ?? {};
      const list: Priest[] = Object.entries(value)
        .map(([id, data]) => ({ id, ...(data as Record<string, any>) }) as Priest)
        .sort((left, right) => String(left.name || `${left.firstName || ''} ${left.lastName || ''}`).localeCompare(String(right.name || `${right.firstName || ''} ${right.lastName || ''}`)));
      setPriests(list);
    });
    return () => unsubscribe();
  }, []);

  function priestName(priest: Priest) {
    return priest.name || `${priest.firstName || ''} ${priest.lastName || ''}`.trim() || priest.id;
  }

  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    if (!q) return churches;
    return churches.filter(c => {
      return (
        String(c.name || '').toLowerCase().includes(q) ||
        String(c.patronSaint || '').toLowerCase().includes(q) ||
        String(c.address || '').toLowerCase().includes(q)
      );
    });
  }, [churches, queryText]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => { if (page >= pageCount) setPage(0); }, [page, pageCount]);

  function openAdd() {
    setForm({ status: 'Parish' });
    setImageFile(null);
    setIsEditing(true);
  }

  function openEdit(ch: Church) {
    setForm(ch);
    setImageFile(null);
    setIsEditing(true);
  }

  function closeForm() {
    setIsEditing(false);
    setForm({});
    setImageFile(null);
  }

  async function uploadImageAndGetURL(id: string, file: File) {
    const sRef = storageRef(storage, `churches/${id}/${file.name}`);
    const uploadTask = uploadBytesResumable(sRef, file);
    return new Promise<string>((resolve, reject) => {
      uploadTask.on('state_changed', undefined, err => reject(err), async () => {
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
        const updateData = { ...form } as any;
        delete updateData.id;
        if (typeof updateData.assistantPriests === 'string') {
          updateData.assistantPriests = updateData.assistantPriests.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
        if (imageFile) {
          const url = await uploadImageAndGetURL(form.id, imageFile);
          updateData.image = url;
        }
        await update(ref(db, `churches/${form.id}`), updateData);
      } else {
        const newRef = push(ref(db, 'churches'));
        const id = newRef.key as string;
        const createData: any = { ...(form || {}) };
        createData.assistantPriests = Array.isArray(createData.assistantPriests)
          ? createData.assistantPriests
          : (createData.assistantPriests ? String(createData.assistantPriests).split(',').map((s: string) => s.trim()).filter(Boolean) : []);
        if (imageFile) {
          const url = await uploadImageAndGetURL(id, imageFile);
          createData.image = url;
        }
        await set(ref(db, `churches/${id}`), createData);
      }
      void recordActivity({
        source: 'Content',
        action: form.id ? 'Updated Church' : 'Created Church',
        details: String(form.name ?? ''),
      });
      closeForm();
    } catch (err) {
      console.error('Save church failed', err);
      alert('Save failed. See console for details.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return;
    if (!confirm('Delete this church? This cannot be undone.')) return;
    try {
      await remove(ref(db, `churches/${id}`));
      const label = churches.find(church => church.id === id);
      void recordActivity({
        source: 'Content',
        action: 'Deleted Church',
        details: String(label?.name ?? ''),
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
        title="Churches Management"
        description="Create, edit, and remove churches. Changes keep the public parish pages updated in real time."
        action={<Button onClick={openAdd}>Add Church</Button>}
      />

      <div className="admin-toolbar">
        <input value={queryText} onChange={e => setQueryText(e.target.value)} placeholder="Search churches…" />
        <span>{filtered.length} churches</span>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : pageItems.length === 0 ? (
          <p className="admin-empty">No churches found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Church</th>
                <th>Patron saint</th>
                <th>Status</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map(ch => (
                <tr key={ch.id}>
                  <td>
                    <div className="admin-table-media">
                      {ch.image ? <img className="admin-thumbnail" src={ch.image} alt="" /> : null}
                      <strong>{ch.name}</strong>
                    </div>
                  </td>
                  <td>{ch.patronSaint || '—'}</td>
                  <td><span className="admin-status">{ch.status || 'Parish'}</span></td>
                  <td>{ch.address || '—'}</td>
                  <td>
                    <div className="admin-actions">
                      <button onClick={() => openEdit(ch)}>Edit</button>
                      <button onClick={() => handleDelete(ch.id)}>Delete</button>
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
        title={form.id ? `Edit ${form.name || 'church'}` : 'Add church'}
        description="Manage the parish details, clergy assignments, and coordinates."
        icon={form.id ? <Pencil size={20} aria-hidden /> : <Plus size={20} aria-hidden />}
        footer={
          <>
            <Button type="button" variant="secondary" onClick={closeForm}>Cancel</Button>
            <Button type="submit" form="church-editor-form" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
          </>
        }
      >
          <form id="church-editor-form" onSubmit={handleSave} className="admin-form-grid">
            <AdminField label="Name">
              <input required value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </AdminField>
            <AdminField label="Patron Saint">
              <input value={form.patronSaint || ''} onChange={e => setForm(f => ({ ...f, patronSaint: e.target.value }))} />
            </AdminField>
            <AdminField label="Address">
              <input value={form.address || ''} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
            </AdminField>
            <AdminField label="Status">
              <select value={form.status || 'Parish'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option>Parish</option>
                <option>Mission Center</option>
              </select>
            </AdminField>
            <AdminField label="History" className="admin-field-full">
              <textarea value={form.history || ''} onChange={e => setForm(f => ({ ...f, history: e.target.value }))} />
            </AdminField>
            <AdminField label="Main Priest in-charge">
              <select value={form.mainPriestId || ''} onChange={e => setForm(f => ({ ...f, mainPriestId: e.target.value }))}>
                <option value="">Select priest</option>
                {priests.map(priest => <option key={priest.id} value={priest.id}>{priestName(priest)}</option>)}
              </select>
            </AdminField>
            <AdminField label="Assistant priests">
              <select
                multiple
                value={Array.isArray(form.assistantPriests) ? form.assistantPriests : String(form.assistantPriests || '').split(',').map(value => value.trim()).filter(Boolean)}
                onChange={event => setForm(f => ({ ...f, assistantPriests: Array.from(event.target.selectedOptions, option => option.value) }))}
              >
                {priests.map(priest => <option key={priest.id} value={priest.id}>{priestName(priest)}</option>)}
              </select>
              <small className="admin-hint">Hold Ctrl or Command to select multiple priests.</small>
            </AdminField>
            <AdminField label="Secretary">
              <input value={form.secretary || ''} onChange={e => setForm(f => ({ ...f, secretary: e.target.value }))} />
            </AdminField>
            <AdminField label="Coordinates (lat,lng)">
              <input value={typeof form.coordinates === 'string' ? form.coordinates : (form.coordinates ? `${form.coordinates.lat},${form.coordinates.lng}` : '')} onChange={e => setForm(f => ({ ...f, coordinates: e.target.value }))} />
            </AdminField>
            <AdminField label="Image">
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)} />
              {form.image ? <img src={form.image} alt="preview" className="admin-thumbnail" style={{ marginTop: '0.5rem', width: '96px', height: '64px' }} /> : null}
            </AdminField>
          </form>
      </AdminModal>
    </div>
  );
}
