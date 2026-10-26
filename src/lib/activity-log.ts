import { useMemo } from 'react';
import { auth, db, push, ref, set } from '@/db/firebase';
import { useRealtimeCollection } from '@/lib/firebase-data';

export type ActivitySource =
  | 'Account'
  | 'Authentication'
  | 'Content'
  | 'Donations'
  | 'Maintenance'
  | 'Settings'
  | 'Weather';

export type ActivitySeverity = 'info' | 'success' | 'warning' | 'error';

export type ActivityLogEntry = {
  id: string;
  createdAt: string;
  source: ActivitySource | string;
  action: string;
  admin: string;
  details: string;
  severity: ActivitySeverity | string;
};

type RecordActivityInput = {
  source: ActivitySource | string;
  action: string;
  details?: string;
  severity?: ActivitySeverity | string;
};

function asRecord(item: Record<string, any>): Record<string, any> {
  return item && typeof item === 'object' ? item : {};
}

/**
 * Writes an entry to the unified `activityLogs` collection.
 * Never throws so logging can never break the action being recorded.
 */
export async function recordActivity({ source, action, details = '', severity = 'info' }: RecordActivityInput): Promise<void> {
  try {
    const entry = {
      source,
      action,
      details,
      severity,
      admin: auth.currentUser?.email || auth.currentUser?.displayName || 'Administrator',
      createdAt: new Date().toISOString(),
    };
    await set(push(ref(db, 'activityLogs')), entry);
  } catch (error) {
    console.error('Unable to record activity log', error);
  }
}

/**
 * Merges the unified `activityLogs` collection with the legacy
 * `maintenanceLogs` and `weatherEventLogs` collections so historic
 * entries stay visible after the move to unified logging.
 */
export function useActivityLogs(): {
  logs: ActivityLogEntry[];
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>;
} {
  const activity = useRealtimeCollection('activityLogs');
  const maintenance = useRealtimeCollection('maintenanceLogs');
  const weather = useRealtimeCollection('weatherEventLogs');

  const logs = useMemo(() => {
    const combined: ActivityLogEntry[] = [
      ...activity.items.map(item => {
        const data = asRecord(item);
        return {
          id: String(item.id),
          createdAt: String(data.createdAt ?? ''),
          source: String(data.source ?? 'Account'),
          action: String(data.action ?? 'Recorded activity'),
          admin: String(data.admin ?? 'Administrator'),
          details: String(data.details ?? ''),
          severity: String(data.severity ?? 'info'),
        };
      }),
      ...maintenance.items.map(item => {
        const data = asRecord(item);
        return {
          id: `maintenance-${item.id}`,
          createdAt: String(data.createdAt ?? data.date ?? ''),
          source: 'Maintenance',
          action: String(data.action ?? 'Maintenance activity'),
          admin: String(data.admin ?? 'Administrator'),
          details: String(data.reason ?? ''),
          severity: 'info',
        };
      }),
      ...weather.items.map(item => {
        const data = asRecord(item);
        return {
          id: `weather-${item.id}`,
          createdAt: String(data.createdAt ?? data.date ?? ''),
          source: 'Weather',
          action: String(data.eventType ?? 'Weather event'),
          admin: String(data.region ?? 'Catarman'),
          details: String(data.description ?? ''),
          severity: String(data.severity ?? 'info'),
        };
      }),
    ];

    return combined.sort((left, right) => (Date.parse(right.createdAt) || 0) - (Date.parse(left.createdAt) || 0));
  }, [activity.items, maintenance.items, weather.items]);

  return {
    logs,
    loading: activity.loading || maintenance.loading || weather.loading,
    error: activity.error || maintenance.error || weather.error,
    refetch: async () => {
      await Promise.all([activity.refetch(), maintenance.refetch(), weather.refetch()]);
    },
  };
}
