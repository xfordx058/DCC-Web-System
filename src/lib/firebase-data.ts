import { useCallback, useEffect, useRef, useState } from 'react';
import { db, get, onValue, ref } from '@/db/firebase';
import type { RecordItem } from '@/types';

/**
 * Shared realtime cache.
 *
 * Every `onValue` subscription on the same path is multiplexed into a single
 * Firebase listener and served from a small cache, so navigating between pages
 * does not trigger a fresh read for data that is already in memory. Cached data
 * is shown immediately (stale-while-revalidate); the live listener keeps it
 * correct and `refetch` forces a fresh read after an error.
 */

const CACHE_TTL = 5 * 60_000;

type SnapshotState = {
  value: unknown;
  hasValue: boolean;
  error: boolean;
  updatedAt: number;
};

type Listener = (snapshot: SnapshotState) => void;

type Node = SnapshotState & {
  path: string;
  listeners: Set<Listener>;
  unsubscribe: (() => void) | null;
  idleTimer: number | null;
};

const nodes = new Map<string, Node>();

function peekNode(path: string): Node | undefined {
  return nodes.get(path);
}

function getNode(path: string): Node {
  const existing = nodes.get(path);
  if (existing) return existing;
  const created: Node = {
    path,
    value: undefined,
    hasValue: false,
    error: false,
    updatedAt: 0,
    listeners: new Set(),
    unsubscribe: null,
    idleTimer: null,
  };
  nodes.set(path, created);
  return created;
}

function publish(node: Node, next: Partial<SnapshotState> & { value: unknown }) {
  node.value = next.value;
  node.hasValue = next.hasValue ?? node.hasValue;
  node.error = next.error ?? false;
  node.updatedAt = Date.now();
  const snapshot: SnapshotState = {
    value: node.value,
    hasValue: node.hasValue,
    error: node.error,
    updatedAt: node.updatedAt,
  };
  node.listeners.forEach(listener => listener(snapshot));
}

function attach(node: Node) {
  if (node.unsubscribe) return;
  node.unsubscribe = onValue(
    ref(db, node.path),
    snapshot => publish(node, { value: snapshot.val(), hasValue: true, error: false }),
    () => publish(node, { value: node.value, error: true })
  );
}

function detach(node: Node) {
  node.unsubscribe?.();
  node.unsubscribe = null;
  expireWhenStale(node);
}

/** Keep detached values only until their cache TTL expires. */
function expireWhenStale(node: Node) {
  if (node.listeners.size > 0) return;
  const remaining = CACHE_TTL - (Date.now() - node.updatedAt);
  if (remaining <= 0) {
    if (nodes.get(node.path) === node) nodes.delete(node.path);
    return;
  }

  if (node.idleTimer !== null) window.clearTimeout(node.idleTimer);
  node.idleTimer = window.setTimeout(() => {
    node.idleTimer = null;
    expireWhenStale(node);
  }, remaining);
}

function release(node: Node) {
  if (node.listeners.size > 0) return;
  if (node.idleTimer !== null) window.clearTimeout(node.idleTimer);
  node.idleTimer = window.setTimeout(() => {
    node.idleTimer = null;
    if (node.listeners.size === 0) detach(node);
  }, CACHE_TTL);
}

function subscribe(path: string, listener: Listener): () => void {
  const node = getNode(path);
  if (node.idleTimer !== null) {
    window.clearTimeout(node.idleTimer);
    node.idleTimer = null;
  }
  node.listeners.add(listener);
  if (node.hasValue) {
    listener({
      value: node.value,
      hasValue: true,
      error: node.error,
      updatedAt: node.updatedAt,
    });
  }
  attach(node);
  return () => {
    node.listeners.delete(listener);
    release(node);
  };
}

/** Force a fresh read for a path, bypassing the cache. */
export async function refetchPath(path: string): Promise<void> {
  const node = getNode(path);
  try {
    const snapshot = await get(ref(db, path));
    publish(node, { value: snapshot.val(), hasValue: true, error: false });
  } catch {
    publish(node, { value: node.value, error: true });
  }
}

export function toRecords(value: unknown): RecordItem[] {
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value as Record<string, unknown>).map(([id, item]) =>
    item && typeof item === 'object'
      ? { id, ...(item as Record<string, any>) }
      : { id, value: item }
  );
}

export interface CollectionResult {
  items: RecordItem[];
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

function collectionFrom(path: string) {
  const node = peekNode(path);
  return {
    path,
    items: node?.hasValue ? toRecords(node.value) : [],
    loading: !node?.hasValue && !node?.error,
    error: Boolean(node?.error),
  };
}

export function useRealtimeCollection(path: string): CollectionResult {
  const [state, setState] = useState(() => collectionFrom(path));
  const current = state.path === path ? state : collectionFrom(path);

  useEffect(() => {
    const unsubscribe = subscribe(path, snapshot => {
      setState({
        path,
        items: snapshot.hasValue ? toRecords(snapshot.value) : [],
        loading: !snapshot.hasValue && !snapshot.error,
        error: snapshot.error,
      });
    });
    return unsubscribe;
  }, [path]);

  const refetch = useCallback(() => refetchPath(path), [path]);

  return { items: current.items, loading: current.loading, error: current.error, refetch };
}

export interface RecordResult<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

export function useRealtimeRecord<T = RecordItem>(path: string): RecordResult<T> {
  const [state, setState] = useState(() => {
    const node = peekNode(path);
    return {
      path,
      data: (node?.hasValue ? ((node.value ?? null) as T | null) : null),
      loading: !node?.hasValue && !node?.error,
      error: Boolean(node?.error),
    };
  });
  const current = state.path === path ? state : { path, data: null as T | null, loading: true, error: false };

  useEffect(() => {
    const unsubscribe = subscribe(path, snapshot => {
      setState({
        path,
        data: snapshot.hasValue ? ((snapshot.value ?? null) as T | null) : null,
        loading: !snapshot.hasValue && !snapshot.error,
        error: snapshot.error,
      });
    });
    return unsubscribe;
  }, [path]);

  const refetch = useCallback(() => refetchPath(path), [path]);

  return { data: current.data, loading: current.loading, error: current.error, refetch };
}

/** Realtime value with a typed fallback — used for single settings records. */
export function useRealtimeValue<T>(path: string, fallback: T): { value: T; loading: boolean; error: boolean; refetch: () => Promise<void> } {
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  const [state, setState] = useState(() => {
    const node = peekNode(path);
    return {
      path,
      value: (node?.hasValue && node.value != null ? node.value : fallback) as T,
      loading: !node?.hasValue && !node?.error,
      error: Boolean(node?.error),
    };
  });
  const current = state.path === path ? state : { path, value: fallback, loading: true, error: false };

  useEffect(() => {
    const unsubscribe = subscribe(path, snapshot => {
      setState({
        path,
        value: (snapshot.hasValue && snapshot.value != null ? snapshot.value : fallbackRef.current) as T,
        loading: !snapshot.hasValue && !snapshot.error,
        error: snapshot.error,
      });
    });
    return unsubscribe;
  }, [path]);

  const refetch = useCallback(() => refetchPath(path), [path]);

  return { value: current.value, loading: current.loading, error: current.error, refetch };
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

export type EventRecord = { eventDate?: unknown; startDate?: unknown; dateExpired?: unknown; [key: string]: unknown };

export function eventStartMs(value: unknown) {
  if (!value) return NaN;
  const raw = String(value);
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T00:00:00` : raw).getTime();
}

export function getEventStartDate(event: EventRecord) {
  return event.eventDate || event.startDate || event.dateExpired;
}

export function getEventEndDate(event: EventRecord) {
  return event.dateExpired || event.eventDate || event.startDate;
}

export function getEventStatus(event: EventRecord): 'upcoming' | 'ongoing' | 'past' {
  const start = eventStartMs(getEventStartDate(event));
  const end = eventEndMs(getEventEndDate(event));
  const now = Date.now();
  if (!Number.isNaN(end) && end < now) return 'past';
  if (!Number.isNaN(start) && start > now) return 'upcoming';
  return 'ongoing';
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
