import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Activity, CalendarDays, Church, CloudSun, FileText, Gauge, HandHeart, Image,
  Megaphone, Radio, Settings, ShieldCheck, UserRound, UsersRound, Wrench,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { eventEndMs, formatDate, isEventActive, sortByDate, toDateInput, useRealtimeCollection } from '@/lib/firebase-data';
import type { RecordItem } from '@/types';

export { eventEndMs, formatDate, isEventActive, sortByDate, toDateInput, useRealtimeCollection };
export type { RecordItem };

const pageIcons: Record<string, LucideIcon> = {
  '/admin': Gauge,
  '/admin/priests': UserRound,
  '/admin/bishops': UsersRound,
  '/admin/churches': Church,
  '/admin/events': CalendarDays,
  '/admin/announcements': Megaphone,
  '/admin/streams': Radio,
  '/admin/heroes': Image,
  '/admin/yearof': FileText,
  '/admin/donations': HandHeart,
  '/admin/weather': CloudSun,
  '/admin/maintenance': Wrench,
  '/admin/logs': Activity,
  '/admin/settings': Settings,
  '/admin/account': ShieldCheck,
};

export function AdminHeader({
  eyebrow = 'Admin',
  title,
  description,
  action,
  icon,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
}) {
  const location = useLocation();
  const PageIcon = icon ?? pageIcons[location.pathname];

  return (
    <header className="admin-page-header">
      <div className="admin-page-headline">
        {PageIcon ? (
          <span className="admin-page-icon" aria-hidden="true">
            <PageIcon size={22} strokeWidth={1.8} />
          </span>
        ) : null}
        <div>
          <p className="admin-eyebrow">{eyebrow}</p>
          <h1 className="admin-page-title">{title}</h1>
          {description ? <p className="admin-page-description">{description}</p> : null}
        </div>
      </div>
      {action}
    </header>
  );
}

export function AdminField({
  label,
  children,
  className,
  required = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={cn('admin-field', className)}>
      <span>
        {label}
        {required ? <span className="admin-required" aria-hidden="true"> *</span> : null}
      </span>
      {children}
    </label>
  );
}