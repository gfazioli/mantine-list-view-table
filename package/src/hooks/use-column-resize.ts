import { useCallback, useEffect, useRef, useState } from 'react';
import type { ListViewTableColumn, ListViewTableResizeMode } from '../types';

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
  visibleColumns: ListViewTableColumn[];
  resizeMode?: ListViewTableResizeMode;
  onColumnResize?: (columnKey: string, width: number) => void;
}

export interface UseColumnResizeReturn {
  columnWidths: Record<string, number>;
  isResizeActive: boolean;
  getColumnStyle: (col: ListViewTableColumn, idx: number) => React.CSSProperties;
  getTableStyle: () => React.CSSProperties;
  handleResizeStart: (index: number, event: React.PointerEvent) => void;
  handleResizeDoubleClick: (index: number) => void;
  resetColumnWidths: () => void;
  tableRef: React.RefObject<HTMLTableElement | null>;
}

export function useColumnResize({
  visibleColumns,
  resizeMode = 'standard',
  onColumnResize,
}: UseColumnResizeOptions): UseColumnResizeReturn {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [isResizeActive, setIsResizeActive] = useState(false);
  const [tableWidth, setTableWidth] = useState<number>(0);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const resizeCleanupRef = useRef<(() => void) | null>(null);

  // Refs to always access the latest values in callbacks without stale closures
  const columnWidthsRef = useRef<Record<string, number>>({});
  columnWidthsRef.current = columnWidths;
  const isResizeActiveRef = useRef(false);
  isResizeActiveRef.current = isResizeActive;

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

    // Capture the real table width before switching to fixed layout
    setTableWidth(Math.round(tableRef.current.getBoundingClientRect().width));

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
        return {
          width: `${columnWidths[col.key as string]}px`,
          minWidth: resolveSize(col.minWidth),
          maxWidth: resolveSize(col.maxWidth),
        };
      }
      return {
        width: resolveSize(col.width),
        minWidth: resolveSize(col.minWidth),
        maxWidth: resolveSize(col.maxWidth),
      };
    },
    [isResizeActive, columnWidths]
  );

  /**
   * In Finder mode, the table must NOT be constrained to 100% width —
   * it should be exactly the sum of all column widths so it can grow/shrink freely.
   * In Standard mode, width: 100% is fine since total width is preserved.
   */
  const getTableStyle = useCallback((): React.CSSProperties => {
    if (!isResizeActive) {
      return {};
    }
    if (resizeMode === 'finder') {
      // Finder: table grows/shrinks freely — use sum of column widths
      const totalWidth = visibleColumns.reduce((sum, col) => {
        const w = columnWidths[col.key as string];
        return sum + (w || 0);
      }, 0);
      if (totalWidth > 0) {
        return { width: `${totalWidth}px`, minWidth: `${totalWidth}px` };
      }
      return {};
    }
    // Standard: lock to original container width to prevent browser redistribution
    if (tableWidth > 0) {
      return { width: `${tableWidth}px` };
    }
    return {};
  }, [isResizeActive, resizeMode, visibleColumns, columnWidths, tableWidth]);

  const handleResizeStart = useCallback(
    (index: number, event: React.PointerEvent) => {
      // Skip if this pointerdown is part of a double-click (detail >= 2)
      if (event.detail >= 2) {
        return;
      }

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
      const leftColumn = visibleColumns[index];
      const leftKey = leftColumn.key as string;
      const leftStartWidth =
        currentWidths[leftKey] || (event.currentTarget.closest('th')?.offsetWidth ?? 100);
      const leftMin = parseSizeToPixels(leftColumn.minWidth, 50)!;
      const leftMax = parseSizeToPixels(leftColumn.maxWidth, Infinity)!;

      // Standard mode: also track the right neighbor
      const rightColumn = index < visibleColumns.length - 1 ? visibleColumns[index + 1] : null;
      const rightKey = rightColumn ? (rightColumn.key as string) : null;
      const rightStartWidth = rightColumn && rightKey ? currentWidths[rightKey] || 100 : 0;
      const rightMin = rightColumn ? parseSizeToPixels(rightColumn.minWidth, 50)! : 0;
      const rightMax = rightColumn ? parseSizeToPixels(rightColumn.maxWidth, Infinity)! : Infinity;

      const handlePointerMove = (e: PointerEvent) => {
        const diff = e.clientX - startX;

        if (resizeMode === 'standard' && rightColumn && rightKey) {
          // === STANDARD MODE ===
          // Trade width between left and right columns, total stays fixed.
          // Clamp left column
          let newLeftWidth = Math.max(leftMin, Math.min(leftMax, leftStartWidth + diff));
          // The right column absorbs the inverse delta
          let newRightWidth = rightStartWidth - (newLeftWidth - leftStartWidth);

          // Clamp right column — if it hits min/max, push back onto left
          if (newRightWidth < rightMin) {
            newRightWidth = rightMin;
            newLeftWidth = leftStartWidth + rightStartWidth - rightMin;
            newLeftWidth = Math.max(leftMin, Math.min(leftMax, newLeftWidth));
          } else if (newRightWidth > rightMax) {
            newRightWidth = rightMax;
            newLeftWidth = leftStartWidth + rightStartWidth - rightMax;
            newLeftWidth = Math.max(leftMin, Math.min(leftMax, newLeftWidth));
          }

          setColumnWidths((prev) => ({
            ...prev,
            [leftKey]: newLeftWidth,
            [rightKey]: newRightWidth,
          }));
          onColumnResize?.(leftKey, newLeftWidth);
          onColumnResize?.(rightKey, newRightWidth);
        } else {
          // === FINDER MODE ===
          // Only the left column changes; the table grows/shrinks freely.
          const newWidth = Math.max(leftMin, Math.min(leftMax, leftStartWidth + diff));

          setColumnWidths((prev) => ({ ...prev, [leftKey]: newWidth }));
          onColumnResize?.(leftKey, newWidth);
        }
      };

      const cleanup = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', cleanup);
        document.removeEventListener('pointercancel', cleanup);
        resizeCleanupRef.current = null;
      };

      resizeCleanupRef.current = cleanup;
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', cleanup);
      document.addEventListener('pointercancel', cleanup);
    },
    [columnWidths, isResizeActive, visibleColumns, resizeMode, snapshotColumnWidths, onColumnResize]
  );

  /** Double-click: auto-fit column to content */
  const handleResizeDoubleClick = useCallback(
    (index: number) => {
      if (!tableRef.current) {
        return;
      }

      const column = visibleColumns[index];
      const colKey = column.key as string;

      // Measure max content width using off-screen clones.
      // In table-layout:auto, scrollWidth on a cell returns the rendered width
      // (with browser space distribution), not the minimum content width.
      // Cloning cells as inline-block outside the table gives accurate measurements.
      const cells = tableRef.current.querySelectorAll(`td[data-column-key="${colKey}"]`);
      const headerCell = tableRef.current.querySelector(`th[data-column-key="${colKey}"]`);

      let maxContentWidth = 0;

      const measurer = document.createElement('div');
      measurer.style.cssText =
        'position:absolute;visibility:hidden;pointer-events:none;top:-9999px;left:-9999px;';
      document.body.appendChild(measurer);

      const measureCell = (cell: Element) => {
        const clone = cell.cloneNode(true) as HTMLElement;
        const computed = getComputedStyle(cell);
        clone.style.cssText = `display:inline-block;width:auto;white-space:nowrap;padding:${computed.padding};font:${computed.font};box-sizing:${computed.boxSizing};`;
        measurer.appendChild(clone);
        maxContentWidth = Math.max(maxContentWidth, clone.offsetWidth);
        measurer.removeChild(clone);
      };

      cells.forEach(measureCell);
      if (headerCell) {
        measureCell(headerCell);
      }

      document.body.removeChild(measurer);

      if (maxContentWidth > 0) {
        const minW = parseSizeToPixels(column.minWidth, 50)!;
        const maxW = parseSizeToPixels(column.maxWidth, Infinity)!;
        let fitWidth = Math.max(minW, Math.min(maxW, maxContentWidth + 2));

        // Use refs to always get the latest values (avoids stale closures)
        let currentWidths = columnWidthsRef.current;
        if (!isResizeActiveRef.current) {
          currentWidths = snapshotColumnWidths();
          setIsResizeActive(true);
        }

        const oldWidth = currentWidths[colKey] || fitWidth;
        const delta = fitWidth - oldWidth;

        if (resizeMode === 'standard' && index < visibleColumns.length - 1) {
          // Compensate the adjacent column so total width stays constant
          const rightColumn = visibleColumns[index + 1];
          const rightKey = rightColumn.key as string;
          const rightOldWidth = currentWidths[rightKey] || 100;
          const rightMin = parseSizeToPixels(rightColumn.minWidth, 50)!;
          const rightMax = parseSizeToPixels(rightColumn.maxWidth, Infinity)!;

          let rightNewWidth = rightOldWidth - delta;

          // Clamp right column — push back onto left if needed
          if (rightNewWidth < rightMin) {
            rightNewWidth = rightMin;
            fitWidth = oldWidth + (rightOldWidth - rightMin);
            fitWidth = Math.max(minW, Math.min(maxW, fitWidth));
          } else if (rightNewWidth > rightMax) {
            rightNewWidth = rightMax;
            fitWidth = oldWidth + (rightOldWidth - rightMax);
            fitWidth = Math.max(minW, Math.min(maxW, fitWidth));
          }

          setColumnWidths({ ...currentWidths, [colKey]: fitWidth, [rightKey]: rightNewWidth });
          onColumnResize?.(colKey, fitWidth);
          onColumnResize?.(rightKey, rightNewWidth);
        } else {
          // Finder mode or last column: only adjust the target column
          setColumnWidths({ ...currentWidths, [colKey]: fitWidth });
          onColumnResize?.(colKey, fitWidth);
        }
      }
    },
    [visibleColumns, resizeMode, snapshotColumnWidths, onColumnResize]
  );

  /** Reset to declarative mode */
  const resetColumnWidths = useCallback(() => {
    setColumnWidths({});
    setIsResizeActive(false);
    setTableWidth(0);
  }, []);

  return {
    columnWidths,
    isResizeActive,
    getColumnStyle,
    getTableStyle,
    handleResizeStart,
    handleResizeDoubleClick,
    resetColumnWidths,
    tableRef,
  };
}
