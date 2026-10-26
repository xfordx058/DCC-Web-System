import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import AdminCrudPage, { formatDate } from '@/components/admin/AdminCrudPage';
import { AdminHeader } from '@/components/admin/AdminPrimitives';
import DonationMethodsPanel from '@/components/admin/DonationMethodsPanel';
import { Button } from '@/components/ui/button';

const currency = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

type Tab = 'methods' | 'records';

const tabs: { id: Tab; label: string }[] = [
  { id: 'methods', label: 'Payment methods' },
  { id: 'records', label: 'Donation records' },
];

export default function AdminDonations() {
  const [tab, setTab] = useState<Tab>('methods');

  return (
    <div className="admin-page">
      <AdminHeader
        title="Donations"
        description="Configure the payment methods published on the public donation page, and keep received donation records organized for internal diocesan administration."
        action={
          <Button variant="secondary" asChild className="gap-1.5">
            <Link to="/donations" target="_blank" rel="noopener noreferrer">
              View public page <ExternalLink size={14} aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="admin-tabs" role="tablist" aria-label="Donation sections">
        {tabs.map(item => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`donations-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`donations-panel-${item.id}`}
            className={`admin-tab${tab === item.id ? ' is-active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`donations-panel-${tab}`}
        aria-labelledby={`donations-tab-${tab}`}
        className="admin-tabpanel"
      >
        {tab === 'methods' ? (
          <DonationMethodsPanel />
        ) : (
          <AdminCrudPage
            hideHeader
            logSource="Donations"
            path="donations"
            title="Donations"
            description="Record donations and keep references organized for internal diocesan administration."
            itemName="Donation"
            initialValues={{ date: new Date().toISOString().slice(0, 10), status: 'received' }}
            fields={[
              { key: 'donorName', label: 'Donor name', required: true },
              { key: 'amount', label: 'Amount', type: 'number', required: true },
              { key: 'date', label: 'Date received', type: 'date', required: true },
              { key: 'method', label: 'Payment method', type: 'select', options: [
                { label: 'Cash', value: 'cash' },
                { label: 'Bank transfer', value: 'bank-transfer' },
                { label: 'Online payment', value: 'online' },
                { label: 'Other', value: 'other' },
              ] },
              { key: 'reference', label: 'Reference or receipt number' },
              { key: 'status', label: 'Status', type: 'select', required: true, options: [
                { label: 'Received', value: 'received' },
                { label: 'Pending', value: 'pending' },
                { label: 'Reconciled', value: 'reconciled' },
              ] },
              { key: 'notes', label: 'Notes', type: 'textarea' },
            ]}
            columns={[
              { key: 'donorName', label: 'Donor' },
              { key: 'amount', label: 'Amount', render: item => currency.format(Number(item.amount ?? 0)) },
              { key: 'date', label: 'Date', render: item => formatDate(item.date) },
              { key: 'method', label: 'Method', render: item => String(item.method || '?').replace(/-/g, ' ') },
              { key: 'reference', label: 'Reference', render: item => item.reference || '?' },
              { key: 'status', label: 'Status', render: item => <span className={`admin-status ${item.status === 'received' || item.status === 'reconciled' ? 'is-active' : ''}`}>{item.status || 'Pending'}</span> },
            ]}
            sort={items => [...items].sort((left, right) => (Date.parse(String(right.date ?? '')) || 0) - (Date.parse(String(left.date ?? '')) || 0))}
          />
        )}
      </div>
    </div>
  );
}
