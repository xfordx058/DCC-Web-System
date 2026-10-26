import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  /** Milliseconds before auto-dismiss. Errors default to 6s, others to 4s. */
  duration?: number;
}

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string, options?: ToastOptions) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const MAX_VISIBLE = 4;

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<number, number>());

  const clearTimer = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id: number) => {
      clearTimer(id);
      setToasts(current => current.filter(item => item.id !== id));
    },
    [clearTimer]
  );

  const startTimer = useCallback(
    (id: number, duration: number) => {
      clearTimer(id);
      timers.current.set(id, window.setTimeout(() => dismiss(id), duration));
    },
    [clearTimer, dismiss]
  );

  const toast = useCallback(
    (type: ToastType, message: string, options?: ToastOptions) => {
      const id = ++nextId;
      const duration = options?.duration ?? (type === 'error' ? 6000 : 4200);
      setToasts(current => [...current.slice(-(MAX_VISIBLE - 1)), { id, type, message, duration }]);
      startTimer(id, duration);
    },
    [startTimer]
  );

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach(timer => window.clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" role="region" aria-label="Notifications">
        {toasts.map(item => {
          const Icon = icons[item.type];
          return (
            <div
              key={item.id}
              className={`toast toast-${item.type}`}
              role={item.type === 'error' ? 'alert' : 'status'}
              aria-live={item.type === 'error' ? 'assertive' : 'polite'}
              aria-atomic="true"
              onMouseEnter={() => clearTimer(item.id)}
              onMouseLeave={() => startTimer(item.id, item.duration)}
              onFocusCapture={() => clearTimer(item.id)}
              onBlurCapture={() => startTimer(item.id, item.duration)}
            >
              <Icon size={17} className="toast-icon" aria-hidden="true" />
              <p className="toast-message">{item.message}</p>
              <button type="button" className="toast-close" onClick={() => dismiss(item.id)} aria-label="Dismiss notification">
                <X size={14} aria-hidden="true" />
              </button>
              <span
                className="toast-progress"
                aria-hidden="true"
                style={{ animationDuration: `${item.duration}ms` }}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
