import { useCallback, useMemo, useState } from 'react';
import type { ListViewTableColumn } from '../types';

export interface UseColumnVisibilityOptions {
  columns: ListViewTableColumn[];
  hiddenColumns?: string[];
  defaultHiddenColumns?: string[];
  onHiddenColumnsChange?: (keys: string[]) => void;
}

export interface UseColumnVisibilityReturn {
  visibleColumns: ListViewTableColumn[];
  hiddenColumnKeys: Set<string>;
  toggleColumn: (key: string) => void;
  showAllColumns: () => void;
}

export function useColumnVisibility({
  columns,
  hiddenColumns,
  defaultHiddenColumns,
  onHiddenColumnsChange,
}: UseColumnVisibilityOptions): UseColumnVisibilityReturn {
  const [internalHiddenKeys, setInternalHiddenKeys] = useState<Set<string>>(
    new Set(defaultHiddenColumns ?? [])
  );

  const isControlled = hiddenColumns !== undefined;
  const currentHiddenKeys = useMemo(
    () => (isControlled ? new Set(hiddenColumns) : internalHiddenKeys),
    [isControlled, hiddenColumns, internalHiddenKeys]
  );

  const visibleColumns = useMemo(
    () => columns.filter((col) => !col.hidden && !currentHiddenKeys.has(col.key as string)),
    [columns, currentHiddenKeys]
  );

  const updateHidden = useCallback(
    (newKeys: Set<string>) => {
      if (!isControlled) {
        setInternalHiddenKeys(newKeys);
      }
      onHiddenColumnsChange?.(Array.from(newKeys));
    },
    [isControlled, onHiddenColumnsChange]
  );

  const toggleColumn = useCallback(
    (key: string) => {
      const newKeys = new Set(currentHiddenKeys);
      if (newKeys.has(key)) {
        newKeys.delete(key);
      } else {
        newKeys.add(key);
      }
      updateHidden(newKeys);
    },
    [currentHiddenKeys, updateHidden]
  );

  const showAllColumns = useCallback(() => {
    updateHidden(new Set<string>());
  }, [updateHidden]);

  return {
    visibleColumns,
    hiddenColumnKeys: currentHiddenKeys,
    toggleColumn,
    showAllColumns,
  };
}
