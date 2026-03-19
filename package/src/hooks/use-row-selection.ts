import { useCallback, useMemo, useRef, useState } from 'react';
import type { ListViewTableSelectionMode } from '../types';

export interface UseRowSelectionOptions<T> {
  data: T[];
  getRowKey: (record: T, index: number) => React.Key;
  selectionMode?: ListViewTableSelectionMode;
  selectedRows?: React.Key[];
  defaultSelectedRows?: React.Key[];
  onSelectionChange?: (selectedKeys: React.Key[], records: T[]) => void;
}

export interface UseRowSelectionReturn {
  selectedKeys: Set<React.Key>;
  lastSelectedIndex: number | null;
  handleRowClick: (index: number, event: React.MouseEvent) => void;
  isSelected: (key: React.Key) => boolean;
  selectAll: () => void;
  clearSelection: () => void;
}

export function useRowSelection<T>({
  data,
  getRowKey,
  selectionMode,
  selectedRows,
  defaultSelectedRows,
  onSelectionChange,
}: UseRowSelectionOptions<T>): UseRowSelectionReturn {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<React.Key>>(
    new Set(defaultSelectedRows ?? [])
  );
  const lastSelectedIndexRef = useRef<number | null>(null);

  const isControlled = selectedRows !== undefined;
  const currentKeys = useMemo(
    () => (isControlled ? new Set(selectedRows) : internalSelectedKeys),
    [isControlled, selectedRows, internalSelectedKeys]
  );

  const updateSelection = useCallback(
    (newKeys: Set<React.Key>) => {
      if (!isControlled) {
        setInternalSelectedKeys(newKeys);
      }
      const keysArray = Array.from(newKeys);
      const records = data.filter((record, index) => newKeys.has(getRowKey(record, index)));
      onSelectionChange?.(keysArray, records);
    },
    [isControlled, data, getRowKey, onSelectionChange]
  );

  const handleRowClick = useCallback(
    (index: number, event: React.MouseEvent) => {
      if (!selectionMode) {
        return;
      }

      const key = getRowKey(data[index], index);

      if (selectionMode === 'single') {
        const newKeys = new Set<React.Key>([key]);
        lastSelectedIndexRef.current = index;
        updateSelection(newKeys);
        return;
      }

      // Multiple selection mode
      const isMeta = event.metaKey || event.ctrlKey;
      const isShift = event.shiftKey;

      if (isShift && lastSelectedIndexRef.current !== null) {
        // Range select
        const start = Math.min(lastSelectedIndexRef.current, index);
        const end = Math.max(lastSelectedIndexRef.current, index);
        const newKeys = new Set(currentKeys);
        for (let i = start; i <= end; i++) {
          newKeys.add(getRowKey(data[i], i));
        }
        updateSelection(newKeys);
      } else if (isMeta) {
        // Toggle individual
        const newKeys = new Set(currentKeys);
        if (newKeys.has(key)) {
          newKeys.delete(key);
        } else {
          newKeys.add(key);
        }
        lastSelectedIndexRef.current = index;
        updateSelection(newKeys);
      } else {
        // Simple click — select only this row
        const newKeys = new Set<React.Key>([key]);
        lastSelectedIndexRef.current = index;
        updateSelection(newKeys);
      }
    },
    [selectionMode, data, getRowKey, currentKeys, updateSelection]
  );

  const isSelected = useCallback((key: React.Key) => currentKeys.has(key), [currentKeys]);

  const selectAll = useCallback(() => {
    if (selectionMode !== 'multiple') {
      return;
    }
    const allKeys = new Set<React.Key>(data.map((record, index) => getRowKey(record, index)));
    updateSelection(allKeys);
  }, [selectionMode, data, getRowKey, updateSelection]);

  const clearSelection = useCallback(() => {
    updateSelection(new Set<React.Key>());
  }, [updateSelection]);

  return {
    selectedKeys: currentKeys,
    lastSelectedIndex: lastSelectedIndexRef.current,
    handleRowClick,
    isSelected,
    selectAll,
    clearSelection,
  };
}
