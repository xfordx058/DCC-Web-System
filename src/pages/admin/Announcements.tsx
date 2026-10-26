import AdminCrudPage, { formatDate } from '@/components/admin/AdminCrudPage';

export default function AdminAnnouncements() {
  return (
    <AdminCrudPage
      path="announcements"
      title="Announcements Management"
      description="Publish timely notices and control which announcements appear on the public website."
      itemName="Announcement"
      initialValues={{ active: true, publishedDate: new Date().toISOString().slice(0, 10) }}
      fields={[
        { key: 'title', label: 'Title', required: true, section: 'Announcement details' },
        { key: 'content', label: 'Content', type: 'textarea', required: true, section: 'Announcement details' },
        { key: 'publishedDate', label: 'Published date', type: 'date', required: true, section: 'Publishing' },
        { key: 'active', label: 'Active on public website', type: 'checkbox', section: 'Publishing' },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'content', label: 'Content', render: item => <span className="admin-clamp">{item.content || '?'}</span> },
        { key: 'publishedDate', label: 'Published', render: item => formatDate(item.publishedDate) },
        { key: 'active', label: 'Status', render: item => <span className={`admin-status ${item.active ? 'is-active' : ''}`}>{item.active ? 'Active' : 'Inactive'}</span> },
      ]}
      sort={items => [...items].sort((a, b) => (Date.parse(String(b.publishedDate ?? '')) || 0) - (Date.parse(String(a.publishedDate ?? '')) || 0))}
    />
  );
}
