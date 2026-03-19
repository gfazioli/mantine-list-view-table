import { useCallback, useEffect, useState } from 'react';
import type { ListViewTableColumn } from '../types';

export interface UseColumnReorderOptions {
  columns: ListViewTableColumn[];
  enableColumnReordering: boolean;
  onColumnReorder?: (fromIndex: number, toIndex: number) => void;
}

export interface UseColumnReorderReturn {
  effectiveColumns: ListViewTableColumn[];
  draggedColumn: number | null;
  dragOverColumn: number | null;
  handleColumnDragStart: (index: number, event: React.DragEvent) => void;
  handleColumnDragOver: (index: number, event: React.DragEvent) => void;
  handleColumnDragLeave: () => void;
  handleColumnDrop: (toIndex: number, event: React.DragEvent) => void;
  handleColumnDragEnd: () => void;
}

export function useColumnReorder({
  columns,
  enableColumnReordering,
  onColumnReorder,
}: UseColumnReorderOptions): UseColumnReorderReturn {
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const [internalColumns, setInternalColumns] = useState<ListViewTableColumn[]>(columns);

  // Reset internal columns if columns prop changes
  useEffect(() => {
    setInternalColumns(columns);
  }, [columns]);

  const handleColumnDragStart = useCallback((index: number, event: React.DragEvent) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', index.toString());
    setDraggedColumn(index);
  }, []);

  const handleColumnDragOver = useCallback((index: number, event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverColumn(index);
  }, []);

  const handleColumnDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleColumnDrop = useCallback(
    (toIndex: number, event: React.DragEvent) => {
      event.preventDefault();
      if (draggedColumn !== null && draggedColumn !== toIndex) {
        if (onColumnReorder) {
          onColumnReorder(draggedColumn, toIndex);
        } else if (enableColumnReordering) {
          setInternalColumns((prev) => {
            const newColumns = [...prev];
            const [moved] = newColumns.splice(draggedColumn, 1);
            newColumns.splice(toIndex, 0, moved);
            return newColumns;
          });
        }
      }
      setDraggedColumn(null);
      setDragOverColumn(null);
    },
    [draggedColumn, onColumnReorder, enableColumnReordering]
  );

  const handleColumnDragEnd = useCallback(() => {
    setDraggedColumn(null);
    setDragOverColumn(null);
  }, []);

  // Use internal columns if managing reorder internally
  const effectiveColumns = enableColumnReordering && !onColumnReorder ? internalColumns : columns;

  return {
    effectiveColumns,
    draggedColumn,
    dragOverColumn,
    handleColumnDragStart,
    handleColumnDragOver,
    handleColumnDragLeave,
    handleColumnDrop,
    handleColumnDragEnd,
  };
}
