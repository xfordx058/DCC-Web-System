import AdminCrudPage from '@/components/admin/AdminCrudPage';
import SmartImage from '@/components/ui/SmartImage';
import { BIRTHDAY_PATTERN } from '@/lib/birthdays';

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
        { key: 'name', label: 'Name', required: true, section: 'Bishop details' },
        { key: 'birthday', label: 'Birthday (MM-DD)', placeholder: 'MM-DD', pattern: BIRTHDAY_PATTERN, title: 'Enter the month and day as MM-DD.', inputMode: 'numeric', hint: 'Only the month and day are saved for recurring birthday notices.' },
        { key: 'yearInstalled', label: 'Year installed', type: 'number', required: true, section: 'Bishop details' },
        { key: 'imageUpload', label: 'Portrait image', type: 'file', section: 'Portrait & status' },
        { key: 'isCurrent', label: 'Mark as current bishop', type: 'checkbox', section: 'Portrait & status' },
      ]}
      columns={[
        { key: 'image', label: 'Portrait', render: item => item.image ? <SmartImage src={String(item.image)} alt="" className="admin-thumbnail" /> : <span>?</span> },
        { key: 'name', label: 'Name' },
        { key: 'yearInstalled', label: 'Year installed' },
        { key: 'isCurrent', label: 'Current', render: item => <span className={`admin-status ${item.isCurrent ? 'is-active' : ''}`}>{item.isCurrent ? 'Current' : 'Previous'}</span> },
      ]}
      sort={items => [...items].sort((a, b) => Number(b.isCurrent) - Number(a.isCurrent) || String(a.name ?? '').localeCompare(String(b.name ?? '')))}
    />
  );
}
