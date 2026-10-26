import { useMemo } from 'react';
import { useRealtimeCollection } from '@/lib/firebase-data';
import type { DonationMethod, DonationMethodType } from '@/types';

const VALID_TYPES: string[] = ['bank', 'ewallet', 'other'];

export const donationMethodTypeOptions: { label: string; value: DonationMethodType }[] = [
  { label: 'Bank Transfer', value: 'bank' },
  { label: 'E-Wallet', value: 'ewallet' },
  { label: 'Other', value: 'other' },
];

export function donationTypeLabel(type: string) {
  return donationMethodTypeOptions.find(option => option.value === type)?.label ?? 'Payment method';
}

function readBoolean(value: unknown, fallback: boolean) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value === 'string') {
    return !['false', '0', 'no', 'off'].includes(value.trim().toLowerCase());
  }
  return Boolean(value);
}

function inferType(name: string, icon: string): DonationMethodType {
  const haystack = `${name} ${icon}`.toLowerCase();
  if (/(bank|bdo|bpi|metrobank|landbank|security|china\s?bank|unionbank|\bubp\b|rural|coop|payroll|savings|current account)/.test(haystack)) {
    return 'bank';
  }
  if (/(gcash|paymaya|maya|wallet|smartphone|mobile|e-?wallet|grab|payrq|coins\.ph)/.test(haystack)) {
    return 'ewallet';
  }
  return 'other';
}

export function donationMethodIcon(type: string, name: string) {
  if (type === 'bank') return 'banknote';
  if (type === 'ewallet') return /maya|wallet/i.test(name) ? 'wallet' : 'smartphone';
  return 'wallet';
}

export function normalizeDonationMethod(id: string, raw: Record<string, any>): DonationMethod {
  const name = String(raw.name ?? raw.title ?? raw.label ?? 'Donation method');
  const storedIcon = String(raw.icon ?? raw.icon_name ?? raw.iconName ?? '');
  const storedType = String(raw.type ?? '');
  const type = (VALID_TYPES.includes(storedType) ? storedType : inferType(name, storedIcon)) as DonationMethodType;

  return {
    id,
    type,
    name,
    accountName: String(raw.accountName ?? raw.account_name ?? raw.accountHolder ?? ''),
    accountNumber: String(raw.accountNumber ?? raw.account_number ?? raw.accountNo ?? ''),
    instructions: String(raw.instructions ?? raw.paymentInstructions ?? raw.payment_instructions ?? ''),
    description: String(raw.description ?? raw.desc ?? ''),
    qrImage: String(raw.qrImage ?? raw.qr_image_url ?? raw.qrImageUrl ?? raw.qrCode ?? ''),
    icon: storedIcon || donationMethodIcon(type, name),
    enabled: readBoolean(raw.enabled, raw.active !== false),
    displayOrder: Number(raw.displayOrder ?? raw.display_order ?? raw.order ?? 0) || 0,
  };
}

export function sortDonationMethods(methods: DonationMethod[]) {
  return [...methods].sort(
    (left, right) => left.displayOrder - right.displayOrder || left.name.localeCompare(right.name)
  );
}

export function useDonationMethods(activeOnly = false): { methods: DonationMethod[]; loading: boolean; error: boolean; refetch: () => Promise<void> } {
  const { items, loading, error, refetch } = useRealtimeCollection('donationOptions');

  const methods = useMemo(() => {
    const normalized = items.map(item => normalizeDonationMethod(item.id, item));
    const visible = activeOnly ? normalized.filter(method => method.enabled) : normalized;
    return sortDonationMethods(visible);
  }, [items, activeOnly]);

  return { methods, loading, error, refetch };
}
