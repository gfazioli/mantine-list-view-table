import { useCallback, useMemo, useState } from 'react';
import type { ListViewTableSortDirection, ListViewTableSortStatus } from '../types';

// Helper function to get nested value via dot-notation path
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

export interface UseSortingOptions<T> {
  data: T[];
  sortStatus?: ListViewTableSortStatus;
  onSort?: (sortStatus: ListViewTableSortStatus) => void;
}

export interface UseSortingReturn<T> {
  sortedData: T[];
  effectiveSortStatus: ListViewTableSortStatus | undefined;
  handleSort: (columnKey: string) => void;
}

export function useSorting<T>({
  data,
  sortStatus,
  onSort,
}: UseSortingOptions<T>): UseSortingReturn<T> {
  const [internalSortStatus, setInternalSortStatus] = useState<ListViewTableSortStatus | undefined>(
    undefined
  );

  // Fix Bug #5: When sortStatus is provided (controlled), data is returned as-is.
  // The parent is responsible for sorting.
  const isControlled = sortStatus !== undefined && onSort !== undefined;
  const effectiveSortStatus = isControlled ? sortStatus : internalSortStatus;

  const handleSort = useCallback(
    (columnKey: string) => {
      const newDirection: ListViewTableSortDirection =
        effectiveSortStatus?.columnKey === columnKey && effectiveSortStatus.direction === 'asc'
          ? 'desc'
          : 'asc';
      const newSortStatus = { columnKey, direction: newDirection };

      if (onSort) {
        onSort(newSortStatus);
      }

      if (!isControlled) {
        setInternalSortStatus(newSortStatus);
      }
    },
    [onSort, effectiveSortStatus, isControlled]
  );

  const sortedData = useMemo(() => {
    // When controlled, return data as-is — parent handles sorting
    if (isControlled) {
      return data;
    }

    if (!effectiveSortStatus) {
      return data;
    }

    const { columnKey, direction } = effectiveSortStatus;
    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, columnKey);
      const bValue = getNestedValue(b, columnKey);

      if (aValue === null || aValue === undefined) {
        return 1;
      }
      if (bValue === null || bValue === undefined) {
        return -1;
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, effectiveSortStatus, isControlled]);

  return { sortedData, effectiveSortStatus, handleSort };
}
