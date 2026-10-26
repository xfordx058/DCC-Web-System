import type { ReactNode } from 'react';
import { AlertTriangle, Inbox, RefreshCw, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Spinner({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return (
    <span className={cn('ui-spinner', className)} role="status">
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = Inbox,
  className,
  compact = false,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn('ui-state', compact && 'is-compact', className)} role="status">
      <span className="ui-state-icon" aria-hidden="true">
        <Icon size={20} />
      </span>
      <p className="ui-state-title">{title}</p>
      {description ? <p className="ui-state-text">{description}</p> : null}
      {action ? <div className="ui-state-action">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = 'Unable to load this content',
  description = 'Something went wrong while loading data. Check your connection and try again.',
  onRetry,
  retrying = false,
  action,
  className,
  compact = false,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void | Promise<void>;
  retrying?: boolean;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn('ui-state is-error', compact && 'is-compact', className)} role="alert">
      <span className="ui-state-icon" aria-hidden="true">
        <AlertTriangle size={20} />
      </span>
      <p className="ui-state-title">{title}</p>
      <p className="ui-state-text">{description}</p>
      {onRetry || action ? (
        <div className="ui-state-action">
          {onRetry ? (
            <button type="button" className="ui-retry-btn" onClick={() => void onRetry()} disabled={retrying}>
              <RefreshCw size={14} aria-hidden="true" />
              {retrying ? 'Trying again…' : 'Try again'}
            </button>
          ) : (
            action
          )}
        </div>
      ) : null}
    </div>
  );
}
