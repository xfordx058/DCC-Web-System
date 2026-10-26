import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function AdminModal({ open, onClose, eyebrow = 'Record', title, description, icon, footer, className, children }: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={value => { if (!value) onClose(); }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="admin-modal-overlay" />
        <DialogPrimitive.Content className={cn('admin-modal', className)}>
          <header className="admin-modal-head">
            {icon ? <span className="admin-modal-icon" aria-hidden>{icon}</span> : null}
            <div className="admin-modal-heading">
              {eyebrow ? <p className="admin-eyebrow">{eyebrow}</p> : null}
              <DialogPrimitive.Title className="admin-modal-title">{title}</DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close className="admin-modal-close" aria-label="Close dialog">
              <X size={18} aria-hidden />
            </DialogPrimitive.Close>
          </header>
          <div className="admin-modal-body">
            <DialogPrimitive.Description className="admin-modal-desc">
              {description ?? `${title}. Fill in the record details below, then save to update it.`}
            </DialogPrimitive.Description>
            {children}
          </div>
          {footer ? <footer className="admin-modal-foot">{footer}</footer> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default AdminModal;
