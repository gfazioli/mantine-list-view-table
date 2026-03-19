import React, { useCallback, useState } from 'react';

export interface UseKeyboardNavigationOptions {
  enabled: boolean;
  rowCount: number;
  onFocusedRowChange?: (index: number | null) => void;
  onActivateRow?: (index: number) => void;
  onSelectRow?: (index: number, event: React.KeyboardEvent) => void;
  onSelectAll?: () => void;
}

export interface UseKeyboardNavigationReturn {
  focusedRowIndex: number | null;
  setFocusedRowIndex: (index: number | null) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export function useKeyboardNavigation({
  enabled,
  rowCount,
  onFocusedRowChange,
  onActivateRow,
  onSelectRow,
  onSelectAll,
}: UseKeyboardNavigationOptions): UseKeyboardNavigationReturn {
  const [focusedRowIndex, setFocusedRowIndexState] = useState<number | null>(null);

  const setFocusedRowIndex = useCallback(
    (index: number | null) => {
      setFocusedRowIndexState(index);
      onFocusedRowChange?.(index);
    },
    [onFocusedRowChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!enabled || rowCount === 0) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          const next = focusedRowIndex === null ? 0 : Math.min(focusedRowIndex + 1, rowCount - 1);
          setFocusedRowIndex(next);
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          const prev = focusedRowIndex === null ? 0 : Math.max(focusedRowIndex - 1, 0);
          setFocusedRowIndex(prev);
          break;
        }
        case 'Home': {
          event.preventDefault();
          setFocusedRowIndex(0);
          break;
        }
        case 'End': {
          event.preventDefault();
          setFocusedRowIndex(rowCount - 1);
          break;
        }
        case 'Enter': {
          if (focusedRowIndex !== null) {
            event.preventDefault();
            onActivateRow?.(focusedRowIndex);
          }
          break;
        }
        case ' ': {
          if (focusedRowIndex !== null) {
            event.preventDefault();
            onSelectRow?.(focusedRowIndex, event);
          }
          break;
        }
        case 'a':
        case 'A': {
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault();
            onSelectAll?.();
          }
          break;
        }
      }
    },
    [
      enabled,
      rowCount,
      focusedRowIndex,
      setFocusedRowIndex,
      onActivateRow,
      onSelectRow,
      onSelectAll,
    ]
  );

  return {
    focusedRowIndex,
    setFocusedRowIndex,
    handleKeyDown,
  };
}
