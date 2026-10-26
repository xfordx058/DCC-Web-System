import { useCallback, useEffect, useState } from 'react';
import { db, onValue, ref } from '@/db/firebase';
import type { RecordItem } from '@/types';

export interface CollectionResult {
  items: RecordItem[];
  loading: boolean;
  error: boolean;
}

export function useRealtimeCollection(path: string): CollectionResult {
  const [items, setItems] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, path),
      snapshot => {
        const value = snapshot.val() ?? {};
        const next = Object.entries(value).map(([id, item]) =>
          item && typeof item === 'object'
            ? { id, ...(item as Record<string, any>) }
            : { id, value: item }
        );
        setItems(next);
        setError(false);
        setLoading(false);
      },
      () => {
        setError(true);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [path]);

  return { items, loading, error };
}

export function useRealtimeRecord<T = RecordItem>(path: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, path),
      snapshot => {
        setData(snapshot.exists() ? (snapshot.val() as T) : null);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsubscribe;
  }, [path]);

  return { data, loading };
}

export function useStableCallback<T extends (...args: any[]) => any>(fn: T): T {
  return useCallback(fn, [fn]);
}

export function eventEndMs(value: unknown) {
  if (!value) return NaN;
  const raw = String(value);
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T23:59:59.999` : raw);
  return date.getTime();
}

export function isEventActive(value: unknown) {
  const end = eventEndMs(value);
  return Number.isNaN(end) || end >= Date.now();
}

export function formatDate(value: unknown) {
  if (!value) return '—';
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
}

export function toDateInput(value: unknown) {
  if (!value) return '';
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value).slice(0, 10) : date.toISOString().slice(0, 10);
}

export function sortByDate(items: RecordItem[], keys: string[]) {
  return [...items].sort((left, right) => {
    const leftValue = keys.map(key => left[key]).find(Boolean);
    const rightValue = keys.map(key => right[key]).find(Boolean);
    return (Date.parse(String(rightValue ?? '')) || 0) - (Date.parse(String(leftValue ?? '')) || 0);
  });
}