import AdminCrudPage from '@/components/admin/AdminCrudPage';

export default function AdminYearOf() {
  return (
    <AdminCrudPage
      path="yearOf"
      title="Year Of Management"
      description="Manage annual pastoral themes and designate the single theme shown publicly."
      itemName="Year Theme"
      initialValues={{ isCurrent: false }}
      imageKey="image"
      storageFolder="year-of"
      exclusiveBooleanKey="isCurrent"
      fields={[
        { key: 'name', label: 'Year name', required: true, placeholder: 'Year of Hope' },
        { key: 'description', label: 'Description', type: 'textarea', required: true },
        { key: 'imageUpload', label: 'Background image', type: 'file' },
        { key: 'isCurrent', label: 'Set as current theme', type: 'checkbox' },
      ]}
      columns={[
        { key: 'image', label: 'Image', render: item => item.image ? <img src={item.image} alt="" className="admin-thumbnail" /> : <span>?</span> },
        { key: 'name', label: 'Year name' },
        { key: 'description', label: 'Description', render: item => <span className="admin-clamp">{item.description || '?'}</span> },
        { key: 'isCurrent', label: 'Status', render: item => <span className={`admin-status ${item.isCurrent ? 'is-active' : ''}`}>{item.isCurrent ? 'Current' : 'Archived'}</span> },
      ]}
      sort={items => [...items].sort((a, b) => Number(b.isCurrent) - Number(a.isCurrent) || String(b.name ?? '').localeCompare(String(a.name ?? '')))}
    />
  );
}
