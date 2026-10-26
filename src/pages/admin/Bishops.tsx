import AdminCrudPage from '@/components/admin/AdminCrudPage';

export default function AdminBishops() {
  return (
    <AdminCrudPage
      path="bishops"
      title="Bishops Management"
      description="Maintain episcopal profiles and choose the bishop currently serving the Diocese."
      itemName="Bishop"
      initialValues={{ isCurrent: false }}
      imageKey="image"
      storageFolder="bishops"
      exclusiveBooleanKey="isCurrent"
      fields={[
        { key: 'name', label: 'Name', required: true },
        { key: 'yearInstalled', label: 'Year installed', type: 'number', required: true },
        { key: 'imageUpload', label: 'Portrait image', type: 'file' },
        { key: 'isCurrent', label: 'Mark as current bishop', type: 'checkbox' },
      ]}
      columns={[
        { key: 'image', label: 'Portrait', render: item => item.image ? <img src={item.image} alt="" className="admin-thumbnail" /> : <span>?</span> },
        { key: 'name', label: 'Name' },
        { key: 'yearInstalled', label: 'Year installed' },
        { key: 'isCurrent', label: 'Current', render: item => <span className={`admin-status ${item.isCurrent ? 'is-active' : ''}`}>{item.isCurrent ? 'Current' : 'Previous'}</span> },
      ]}
      sort={items => [...items].sort((a, b) => Number(b.isCurrent) - Number(a.isCurrent) || String(a.name ?? '').localeCompare(String(b.name ?? '')))}
    />
  );
}
