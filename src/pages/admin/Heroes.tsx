import AdminCrudPage from '@/components/admin/AdminCrudPage';
import SmartImage from '@/components/ui/SmartImage';

export default function AdminHeroes() {
  return (
    <AdminCrudPage
      path="heroes"
      title="Homepage Heroes"
      description="Manage homepage hero slides. Titles and subtitles are optional when you want to show an image by itself."
      itemName="Hero slide"
      initialValues={{ active: true, order: 1 }}
      imageKey="image"
      storageFolder="heroes"
      fields={[
        { key: 'title', label: 'Title', placeholder: 'Optional', section: 'Slide content' },
        { key: 'subtitle', label: 'Subtitle', placeholder: 'Optional' },
        { key: 'caption', label: 'Supporting text', type: 'textarea', section: 'Slide content' },
        { key: 'order', label: 'Display order', type: 'number', required: true, section: 'Display settings' },
        { key: 'active', label: 'Active on public website', type: 'checkbox', section: 'Display settings' },
        { key: 'image', label: 'Background image', type: 'file', section: 'Display settings' },
      ]}
      columns={[
        { key: 'image', label: 'Image', render: item => item.image ? <SmartImage className="admin-thumbnail" src={String(item.image)} alt="" /> : '?' },
        { key: 'title', label: 'Title' },
        { key: 'subtitle', label: 'Subtitle' },
        { key: 'order', label: 'Order' },
        { key: 'active', label: 'Status', render: item => <span className={`admin-status ${item.active !== false ? 'is-active' : ''}`}>{item.active !== false ? 'Active' : 'Inactive'}</span> },
      ]}
      sort={items => [...items].sort((left, right) => Number(left.order ?? 0) - Number(right.order ?? 0))}
    />
  );
}
