import { useState } from 'react';
import { Banknote, Check, Copy, Mail, Phone, Smartphone, Wallet } from 'lucide-react';
import { useDonationMethods, donationTypeLabel } from '@/lib/donations';
import { useToast } from '@/contexts/ToastContext';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState, ErrorState } from '@/components/ui/states';
import SmartImage from '@/components/ui/SmartImage';
import type { DonationMethod } from '@/types';

function methodIcon(method: DonationMethod) {
  if (method.icon === 'banknote' || (method.type === 'bank' && method.icon !== 'wallet')) {
    return <Banknote size={18} aria-hidden />;
  }
  if (method.icon === 'wallet' || method.type === 'other') return <Wallet size={18} aria-hidden />;
  return <Smartphone size={18} aria-hidden />;
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', 'true');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  document.execCommand('copy');
  document.body.removeChild(field);
}

export default function Donations() {
  const { methods, loading, error, refetch } = useDonationMethods(true);
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(method: DonationMethod) {
    try {
      await copyText(method.accountNumber);
      setCopiedId(method.id);
      window.setTimeout(() => setCopiedId(current => (current === method.id ? null : current)), 2000);
      toast('success', 'Account number copied to the clipboard.');
    } catch (err) {
      console.error('Copy account number failed', err);
      toast('error', 'Unable to copy automatically. Select the account number and copy it manually.');
    }
  }

  return (
    <div className="public-page-stack">
      <header className="public-page-heading">
        <p className="admin-eyebrow">Support the Diocese</p>
        <h1>Donations</h1>
        <p>
          Your generosity sustains the pastoral programs, parish communities, and charitable outreach of the Diocese of
          Catarman. Choose a payment method below and follow the instructions to send your donation.
        </p>
      </header>

      {loading ? (
        <section className="donation-method-grid" aria-label="Loading payment methods">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="donation-method-card" key={index} aria-hidden="true">
              <div className="skeleton-card-body">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </section>
      ) : error ? (
        <ErrorState
          title="Unable to load payment methods"
          description="We could not reach the donation settings right now. Please try again, or email diocesecatarman@gmail.com for assistance."
          onRetry={() => void refetch()}
        />
      ) : methods.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No payment methods available yet"
          description="The Diocese has not published any donation channels at the moment. Please check back soon."
          action={
            <a href="mailto:diocesecatarman@gmail.com" className="ui-btn ui-btn-secondary">
              Email the Diocese
            </a>
          }
        />
      ) : (
        <section className="donation-method-grid" aria-label="Available payment methods">
          {methods.map(method => (
            <article className="donation-method-card" key={method.id}>
              <header className="donation-method-head">
                <span className="donation-method-icon" aria-hidden>{methodIcon(method)}</span>
                <div className="donation-method-heading">
                  <span className="donation-method-type">{donationTypeLabel(method.type)}</span>
                  <h2>{method.name}</h2>
                </div>
              </header>

              {method.qrImage ? (
                <div className="donation-method-qr">
                  <SmartImage
                    src={method.qrImage}
                    alt={`${method.name} QR code`}
                    fallbackLabel={`${method.name} QR code unavailable`}
                  />
                </div>
              ) : null}

              {method.description ? <p className="donation-method-desc">{method.description}</p> : null}

              <dl className="donation-method-details">
                {method.accountName ? (
                  <div>
                    <dt>Account name</dt>
                    <dd>{method.accountName}</dd>
                  </div>
                ) : null}
                {method.accountNumber ? (
                  <div>
                    <dt>Account number</dt>
                    <dd>
                      <span className="donation-method-number">{method.accountNumber}</span>
                      <button
                        type="button"
                        className="donation-copy-btn"
                        aria-label={`Copy ${method.name} account number`}
                        onClick={() => handleCopy(method)}
                      >
                        {copiedId === method.id ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                        <span aria-live="polite">{copiedId === method.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </dd>
                  </div>
                ) : null}
              </dl>

              {method.instructions ? (
                <div className="donation-method-steps">
                  <p className="donation-method-steps-title">How to donate</p>
                  <p className="donation-method-instructions">{method.instructions}</p>
                </div>
              ) : null}
            </article>
          ))}
        </section>
      )}

      <section className="donation-guidance">
        <div className="public-content-card">
          <p className="admin-eyebrow">Need help?</p>
          <h2>Contact the Diocese</h2>
          <p>
            After sending your donation, keep your reference number or screenshot so our team can confirm your gift.
            For questions about giving, reach us at{' '}
            <a href="mailto:diocesecatarman@gmail.com">diocesecatarman@gmail.com</a>.
          </p>
          <ul className="donation-contact-list">
            <li><Mail size={15} aria-hidden /> <a href="mailto:diocesecatarman@gmail.com">diocesecatarman@gmail.com</a></li>
            <li><Phone size={15} aria-hidden /> <a href="tel:+63907679132">+63 09076-79132 (TM)</a></li>
            <li><Phone size={15} aria-hidden /> <a href="tel:+63907663961">+63 09076-63961 (TNT)</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
