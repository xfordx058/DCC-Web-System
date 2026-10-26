import AdminCrudPage, { formatDate } from '@/components/admin/AdminCrudPage';
import { eventEndMs } from '@/lib/firebase-data';

export default function AdminEvents() {
  return (
    <AdminCrudPage
      path="events"
      title="Events Management"
      description="Create upcoming diocesan events and retain expired entries for administrative history."
      itemName="Event"
      fields={[
        { key: 'title', label: 'Event title', required: true },
        { key: 'description', label: 'Description', type: 'textarea', required: true },
        { key: 'dateExpired', label: 'End date', type: 'date', required: true },
      ]}
      columns={[
        { key: 'title', label: 'Event title' },
        { key: 'description', label: 'Description', render: item => <span className="admin-clamp">{item.description || '?'}</span> },
        { key: 'dateExpired', label: 'End date', render: item => formatDate(item.dateExpired) },
        { key: 'archive', label: 'Visibility', render: item => {
          const expired = item.dateExpired ? eventEndMs(item.dateExpired) < Date.now() : false;
          return <span className={`admin-status ${expired ? '' : 'is-active'}`}>{expired ? 'Archived' : 'Public'}</span>;
        } },
      ]}
      sort={items => [...items].sort((a, b) => (Date.parse(String(a.dateExpired ?? '')) || 0) - (Date.parse(String(b.dateExpired ?? '')) || 0))}
    />
  );
}
