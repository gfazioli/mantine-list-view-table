import { useCallback, useEffect, useRef, useState } from 'react';
import type { ListViewTableColumn } from '../types';

/**
 * Resolve a size value to CSS string.
 * - number → "Xpx"
 * - string → as-is ("50%", "20rem", "clamp(...)")
 * - undefined → undefined
 */
function resolveSize(value?: number | string): string | undefined {
  if (value == null) {
    return undefined;
  }
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

/** Parse a size value to a numeric pixel value for resize constraints. */
function parseSizeToPixels(value?: number | string, fallback?: number): number | undefined {
  if (value == null) {
    return fallback;
  }
  if (typeof value === 'number') {
    return value;
  }
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

export interface UseColumnResizeOptions {
  columns: ListViewTableColumn[];
  visibleColumns: ListViewTableColumn[];
  enableColumnResizing: boolean;
  onColumnResize?: (columnKey: string, width: number) => void;
  withColumnBorders?: boolean;
}

export interface UseColumnResizeReturn {
  columnWidths: Record<string, number>;
  isResizeActive: boolean;
  getColumnStyle: (col: ListViewTableColumn, idx: number) => React.CSSProperties;
  handleResizeStart: (index: number, event: React.MouseEvent) => void;
  handleResizeDoubleClick: (index: number) => void;
  resetColumnWidths: () => void;
  tableRef: React.RefObject<HTMLTableElement | null>;
}

export function useColumnResize({
  visibleColumns,
  onColumnResize,
}: UseColumnResizeOptions): UseColumnResizeReturn {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [isResizeActive, setIsResizeActive] = useState(false);
  const tableRef = useRef<HTMLTableElement | null>(null);
  // Bug #1 fix: Track resize cleanup function for unmount
  const resizeCleanupRef = useRef<(() => void) | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resizeCleanupRef.current?.();
    };
  }, []);

  /** Snapshot all column widths from the DOM */
  const snapshotColumnWidths = useCallback((): Record<string, number> => {
    const widths: Record<string, number> = {};
    if (!tableRef.current) {
      return widths;
    }

    const headerCells = tableRef.current.querySelectorAll('thead th');
    visibleColumns.forEach((column, index) => {
      const cell = headerCells[index];
      if (cell) {
        widths[column.key as string] = Math.round(cell.getBoundingClientRect().width);
      }
    });
    return widths;
  }, [visibleColumns]);

  const getColumnStyle = useCallback(
    (col: ListViewTableColumn, _idx: number): React.CSSProperties => {
      if (isResizeActive && columnWidths[col.key as string]) {
        // Pixel mode — after first resize
        return {
          width: `${columnWidths[col.key as string]}px`,
          minWidth: resolveSize(col.minWidth),
          maxWidth: resolveSize(col.maxWidth),
        };
      }
      // Declarative mode — pure CSS, no conversion
      return {
        width: resolveSize(col.width),
        minWidth: resolveSize(col.minWidth),
        maxWidth: resolveSize(col.maxWidth),
      };
    },
    [isResizeActive, columnWidths]
  );

  const handleResizeStart = useCallback(
    (index: number, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      // On first resize, snapshot all widths and enter pixel mode
      let currentWidths = columnWidths;
      if (!isResizeActive) {
        currentWidths = snapshotColumnWidths();
        setColumnWidths(currentWidths);
        setIsResizeActive(true);
      }

      const startX = event.clientX;
      const column = visibleColumns[index];
      const startWidth =
        currentWidths[column.key as string] ||
        (event.currentTarget.closest('th')?.offsetWidth ?? 100);

      const minWidth = parseSizeToPixels(column.minWidth, 50)!;
      const maxWidth = parseSizeToPixels(column.maxWidth, Infinity)!;

      const handleMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + diff));

        setColumnWidths((prev) => ({ ...prev, [column.key as string]: newWidth }));
        onColumnResize?.(column.key as string, newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        resizeCleanupRef.current = null;
      };

      // Bug #1 fix: Store cleanup ref
      resizeCleanupRef.current = handleMouseUp;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [columnWidths, isResizeActive, visibleColumns, snapshotColumnWidths, onColumnResize]
  );

  /** Double-click: auto-fit column to content */
  const handleResizeDoubleClick = useCallback(
    (index: number) => {
      if (!tableRef.current) {
        return;
      }

      const column = visibleColumns[index];
      const colKey = column.key as string;

      // Measure max content width for this column
      const cells = tableRef.current.querySelectorAll(`td[data-column-key="${colKey}"]`);
      const headerCell = tableRef.current.querySelector(`th[data-column-key="${colKey}"]`);

      let maxContentWidth = 0;

      cells.forEach((cell) => {
        // Temporarily remove width constraint to measure natural content width
        const el = cell as HTMLElement;
        const origWidth = el.style.width;
        el.style.width = 'auto';
        maxContentWidth = Math.max(maxContentWidth, el.scrollWidth);
        el.style.width = origWidth;
      });

      if (headerCell) {
        const el = headerCell as HTMLElement;
        const origWidth = el.style.width;
        el.style.width = 'auto';
        maxContentWidth = Math.max(maxContentWidth, el.scrollWidth);
        el.style.width = origWidth;
      }

      if (maxContentWidth > 0) {
        const minW = parseSizeToPixels(column.minWidth, 50)!;
        const maxW = parseSizeToPixels(column.maxWidth, Infinity)!;
        const fitWidth = Math.max(minW, Math.min(maxW, maxContentWidth + 16)); // +16 for padding

        if (!isResizeActive) {
          const widths = snapshotColumnWidths();
          widths[colKey] = fitWidth;
          setColumnWidths(widths);
          setIsResizeActive(true);
        } else {
          setColumnWidths((prev) => ({ ...prev, [colKey]: fitWidth }));
        }

        onColumnResize?.(colKey, fitWidth);
      }
    },
    [visibleColumns, isResizeActive, snapshotColumnWidths, onColumnResize]
  );

  /** Reset to declarative mode */
  const resetColumnWidths = useCallback(() => {
    setColumnWidths({});
    setIsResizeActive(false);
  }, []);

  return {
    columnWidths,
    isResizeActive,
    getColumnStyle,
    handleResizeStart,
    handleResizeDoubleClick,
    resetColumnWidths,
    tableRef,
  };
}
