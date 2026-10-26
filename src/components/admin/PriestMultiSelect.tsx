import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import type { Priest } from '@/types';

type Props = {
  priests: Priest[];
  value: string[];
  onChange: (value: string[]) => void;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  describedBy?: string;
};

function priestName(priest?: Priest) {
  return priest?.name || `${priest?.firstName || ''} ${priest?.lastName || ''}`.trim() || priest?.id || 'Unknown priest';
}

export function PriestMultiSelect({ priests, value, onChange, loading = false, error = false, onRetry, describedBy }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLInputElement | null>>([]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return normalized ? priests.filter(priest => priestName(priest).toLocaleLowerCase().includes(normalized)) : priests;
  }, [priests, query]);
  const selected = useMemo(() => new Set(value), [value]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  function toggle(id: string) {
    onChange(selected.has(id) ? value.filter(item => item !== id) : [...value, id]);
  }

  function openMenu() {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (!filtered.length) return;
      const nextIndex = event.key === 'ArrowDown'
        ? (activeIndex < 0 ? 0 : Math.min(activeIndex + 1, filtered.length - 1))
        : (activeIndex < 0 ? filtered.length - 1 : Math.max(activeIndex - 1, 0));
      setActiveIndex(nextIndex);
      requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus());
    }
  }

  function handleOptionKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      inputRef.current?.focus();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowDown'
      ? Math.min(index + 1, filtered.length - 1)
      : Math.max(index - 1, 0);
    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="priest-multi-select" ref={rootRef}>
      <div className="priest-multi-control" onClick={openMenu}>
        <Search size={16} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={event => { setQuery(event.target.value); setActiveIndex(-1); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search priests…"
          aria-label="Search assistant priests"
          aria-expanded={open}
          aria-controls="assistant-priest-options"
          aria-describedby={describedBy}
        />
        <button type="button" className="priest-multi-toggle" aria-label={open ? 'Close priest options' : 'Open priest options'} aria-expanded={open} onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); inputRef.current?.focus(); } }} onClick={event => { event.stopPropagation(); setOpen(value => !value); }}>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>

      {value.length ? (
        <ul className="priest-selected-chips" aria-label="Selected assistant priests">
          {value.map(id => {
            const priest = priests.find(item => item.id === id);
            const label = priest ? priestName(priest) : id;
            return (
              <li key={id}>
                <span>{label}</span>
                <button type="button" aria-label={`Remove ${label} assignment`} onClick={() => toggle(id)}><X size={13} aria-hidden="true" /></button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {open ? (
        <div className="priest-options" id="assistant-priest-options" role="group" aria-label="Assistant priest options">
          {loading ? <p role="status" className="priest-options-message">Loading priests…</p> : error ? (
            <div className="priest-options-message" role="alert"><span>Priest options could not be loaded.</span>{onRetry ? <button type="button" onClick={onRetry}>Try again</button> : null}</div>
          ) : filtered.length ? filtered.map((priest, index) => {
            const id = priest.id || '';
            if (!id) return null;
            return (
              <label className="priest-option" key={id}>
                <input
                  ref={element => { optionRefs.current[index] = element; }}
                  type="checkbox"
                  checked={selected.has(id)}
                  onChange={() => toggle(id)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={event => handleOptionKeyDown(event, index)}
                  aria-label={priestName(priest)}
                />
                <span className="priest-option-check" aria-hidden="true">{selected.has(id) ? <Check size={13} /> : null}</span>
                <span>{priestName(priest)}</span>
              </label>
            );
          }) : <p className="priest-options-message" role="status">No matching priests found.</p>}
        </div>
      ) : null}
    </div>
  );
}
