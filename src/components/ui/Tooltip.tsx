import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement } from 'react';
import { cn } from '@/lib/utils';

type TooltipProps = {
  /** Short description, also used as the accessible description. */
  label: string;
  children: ReactElement;
  side?: 'top' | 'bottom';
  className?: string;
  delay?: number;
};

/**
 * Lightweight tooltip for icon-only controls.
 *
 * Opens on hover and on keyboard focus, closes on Escape, and wires the text as
 * the trigger's accessible description while open. CSS handles positioning so
 * there is no layout shift and nothing is clipped by overflow containers.
 */
export function Tooltip({ label, children, side = 'top', className, delay = 180 }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const show = () => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    clearTimer();
    setOpen(false);
  };

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
        'aria-describedby': open ? id : undefined,
      })
    : children;

  return (
    <span
      className={cn('ui-tooltip-wrap', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          hide();
        }
      }}
    >
      {trigger}
      <span id={id} role="tooltip" className={`ui-tooltip is-${side}${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {label}
      </span>
    </span>
  );
}

export default Tooltip;
