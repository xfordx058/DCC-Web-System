import AdminCrudPage from '@/components/admin/AdminCrudPage';
import SmartImage from '@/components/ui/SmartImage';

export default function AdminHeroes() {
  return (
    <AdminCrudPage
      path="heroes"
      title="Homepage Heroes"
      description="Manage the restrained homepage messages and background images shown in the public hero rotation."
      itemName="Hero slide"
      initialValues={{ active: true, order: 1 }}
      imageKey="image"
      storageFolder="heroes"
      fields={[
        { key: 'title', label: 'Title', required: true, placeholder: 'Diocese of Catarman', section: 'Slide content' },
        { key: 'subtitle', label: 'Subtitle', required: true, placeholder: 'Serving Faith Through Digital Connection', section: 'Slide content' },
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
