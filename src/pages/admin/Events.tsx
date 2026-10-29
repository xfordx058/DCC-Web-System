import AdminCrudPage, { formatDate } from '@/components/admin/AdminCrudPage';
import { eventStartMs, getEventStatus } from '@/lib/firebase-data';
import SmartImage from '@/components/ui/SmartImage';

export default function AdminEvents() {
  return (
    <AdminCrudPage
      path="events"
      title="Events Management"
      description="Create upcoming diocesan events and retain expired entries for administrative history."
      itemName="Event"
      imageKey="image"
      storageFolder="events"
      fields={[
        { key: 'title', label: 'Event title', required: true, section: 'Event details' },
        { key: 'description', label: 'Description', type: 'textarea', required: true, section: 'Event details' },
        { key: 'image', label: 'Event image', type: 'file', section: 'Event details' },
        { key: 'eventDate', label: 'Event date', type: 'date', required: true, section: 'Schedule', hint: 'The day the event begins.' },
        { key: 'dateExpired', label: 'End date (optional)', type: 'date', section: 'Schedule', hint: 'Add this for multi-day events. Leave empty for a one-day event.' },
      ]}
      columns={[
        { key: 'image', label: 'Image', render: item => item.image || item.image_url ? <SmartImage src={String(item.image || item.image_url)} alt="" className="admin-thumbnail" /> : <span>?</span> },
        { key: 'title', label: 'Event title' },
        { key: 'description', label: 'Description', render: item => <span className="admin-clamp">{item.description || '?'}</span> },
        { key: 'eventDate', label: 'Event date', render: item => formatDate(item.eventDate || item.dateExpired) },
        { key: 'dateExpired', label: 'End date', render: item => item.dateExpired && item.dateExpired !== item.eventDate ? formatDate(item.dateExpired) : '—' },
        { key: 'status', label: 'Status', render: item => {
          const status = getEventStatus(item);
          return <span className={`admin-status ${status !== 'past' ? 'is-active' : ''}`}>{status === 'past' ? 'Past' : status === 'upcoming' ? 'Upcoming' : 'Ongoing'}</span>;
        } },
      ]}
      sort={items => [...items].sort((a, b) => (eventStartMs(a.eventDate || a.dateExpired) || 0) - (eventStartMs(b.eventDate || b.dateExpired) || 0))}
      validate={form => form.dateExpired && form.eventDate && String(form.dateExpired) < String(form.eventDate)
        ? 'The end date must be the same as or later than the event date.'
        : null}
    />
  );
}
