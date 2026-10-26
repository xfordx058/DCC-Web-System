import { useCallback, useState, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'default';
};

type PendingConfirm = ConfirmOptions & { resolve: (value: boolean) => void };

/**
 * Promise-based confirmation dialog built on Radix so focus is trapped,
 * Escape cancels, and the dialog is announced correctly.
 *
 *   const { confirm, confirmDialog } = useConfirm();
 *   if (!(await confirm({ title: 'Delete event?' }))) return;
 */
export function useConfirm() {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const confirm = useCallback(
    (options: ConfirmOptions) => new Promise<boolean>(resolve => setPending({ ...options, resolve })),
    []
  );

  const settle = useCallback(
    (value: boolean) => {
      setPending(current => {
        current?.resolve(value);
        return null;
      });
    },
    []
  );

  const tone = pending?.tone ?? 'danger';

  const confirmDialog: ReactNode = (
    <DialogPrimitive.Root
      open={Boolean(pending)}
      onOpenChange={next => {
        if (!next) settle(false);
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="admin-modal-overlay" />
        <DialogPrimitive.Content className="admin-modal ui-confirm">
          <div className={cn('ui-confirm-icon', `is-${tone}`)} aria-hidden="true">
            <AlertTriangle size={20} />
          </div>
          <DialogPrimitive.Title className="admin-modal-title">{pending?.title ?? 'Are you sure?'}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="ui-confirm-text">
            {pending?.description ?? 'This action cannot be undone.'}
          </DialogPrimitive.Description>
          <div className="admin-modal-foot ui-confirm-actions">
            <button
              type="button"
              className="ui-btn ui-btn-secondary"
              autoFocus
              onClick={() => settle(false)}
            >
              {pending?.cancelLabel ?? 'Cancel'}
            </button>
            <button
              type="button"
              className={cn('ui-btn', tone === 'danger' ? 'ui-btn-danger' : 'ui-btn-primary')}
              onClick={() => settle(true)}
            >
              {pending?.confirmLabel ?? 'Confirm'}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );

  return { confirm, confirmDialog };
}
