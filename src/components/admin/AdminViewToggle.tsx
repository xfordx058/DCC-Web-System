import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';

export type AdminViewMode = 'list' | 'grid';

function readPreference(key: string): AdminViewMode {
  try {
    return window.localStorage.getItem(`dcc-admin-view:${key}`) === 'grid' ? 'grid' : 'list';
  } catch {
    return 'list';
  }
}

export function useAdminViewPreference(key: string) {
  const [mode, setMode] = useState<AdminViewMode>(() => readPreference(key));
  function updateMode(value: AdminViewMode) {
    setMode(value);
    try {
      window.localStorage.setItem(`dcc-admin-view:${key}`, value);
    } catch {
      // The selected view still works for this page if storage is unavailable.
    }
  }
  return { mode, updateMode };
}

export function AdminViewToggle({ mode, onChange }: { mode: AdminViewMode; onChange: (mode: AdminViewMode) => void }) {
  return (
    <div className="admin-view-toggle" role="group" aria-label="Choose record view">
      <button type="button" aria-label="List view" aria-pressed={mode === 'list'} onClick={() => onChange('list')}>
        <List size={16} aria-hidden />
        <span>List</span>
      </button>
      <button type="button" aria-label="Grid view" aria-pressed={mode === 'grid'} onClick={() => onChange('grid')}>
        <LayoutGrid size={16} aria-hidden />
        <span>Grid</span>
      </button>
    </div>
  );
}
