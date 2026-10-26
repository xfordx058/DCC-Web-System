import AdminCrudPage from '@/components/admin/AdminCrudPage';
import { resolveStreamEmbed } from '@/lib/utils';
import SmartImage from '@/components/ui/SmartImage';

export default function AdminStreams() {
  return (
    <AdminCrudPage
      path="streams"
      title="Live Streams"
      description="Manage the live streams shown on the homepage and the public Live Streams page. Supports YouTube and Facebook links."
      itemName="Stream"
      initialValues={{ active: true, order: 1 }}
      fields={[
        { key: 'title', label: 'Title', required: true, placeholder: 'Catholic Church Catarman Northern Samar' },
        { key: 'url', label: 'YouTube or Facebook link / video ID', required: true, placeholder: 'https://www.youtube.com/watch?v=... or https://www.facebook.com/.../videos/...' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'order', label: 'Display order', type: 'number', required: true },
        { key: 'active', label: 'Active on public website', type: 'checkbox' },
      ]}
      columns={[
        { key: 'preview', label: 'Source', render: item => {
          const embed = resolveStreamEmbed(item.url);
          if (!embed) return '?';
          if (embed.poster) return <SmartImage className="admin-thumbnail" src={embed.poster} alt="" />;
          return <span className="admin-status is-active">{embed.provider === 'facebook' ? 'Facebook' : 'Link'}</span>;
        } },
        { key: 'title', label: 'Title' },
        { key: 'url', label: 'Link', render: item => <span className="admin-clamp">{item.url || '?'}</span> },
        { key: 'order', label: 'Order' },
        { key: 'active', label: 'Status', render: item => <span className={`admin-status ${item.active !== false ? 'is-active' : ''}`}>{item.active !== false ? 'Active' : 'Inactive'}</span> },
      ]}
      sort={items => [...items].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))}
    />
  );
}
