import { useCallback, useEffect, useRef, useState } from 'react';
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
  /**
   * Unified pointer-event drag entry point. Wired on the drag handle's
   * `onPointerDown` for mouse, touch, and pen — replaces the previous
   * HTML5 DnD path that did not work reliably on mobile browsers.
   */
  handleColumnDragStart: (index: number, event: React.PointerEvent) => void;
}

/** Drag activation threshold in pixels — distinguishes click from drag */
const DRAG_THRESHOLD = 5;

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

  // ─── Unified pointer-event drag (mouse, touch, pen) ─────────────────

  const dragStateRef = useRef<{
    fromIndex: number;
    startX: number;
    startY: number;
    activated: boolean;
    ghostOffsetX: number;
    ghostOffsetY: number;
    /**
     * The header row of the table where the drag started — captured at
     * pointerdown via `event.currentTarget.closest('tr')`. All later DOM
     * lookups (ghost source, geometric fallback) MUST be scoped to this row.
     * A bare `document.querySelector('th[data-column-key="..."]')` returns
     * the first match across the whole page, which on a page with multiple
     * `ListViewTable` instances is almost always the wrong `<th>`.
     */
    headerRow: HTMLElement | null;
  } | null>(null);

  // Always-fresh access to columns inside document-level listeners
  const internalColumnsRef = useRef<ListViewTableColumn[]>(columns);
  internalColumnsRef.current = internalColumns;

  // Mirror of `dragOverColumn` in a ref so `finish()` can read the current
  // drop target synchronously, without putting side effects inside a setState
  // updater (React StrictMode replays updaters for purity checks, and any
  // side effect inside would run multiple times — that previously caused the
  // reorder to be applied twice per drop).
  const dragOverColumnRef = useRef<number | null>(null);

  const ghostRef = useRef<HTMLElement | null>(null);

  const cleanupRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      ghostRef.current?.remove();
    };
  }, []);

  const handleColumnDragStart = useCallback(
    (index: number, event: React.PointerEvent) => {
      if (!enableColumnReordering) {
        return;
      }

      // Ignore non-primary mouse buttons (right-click, middle-click)
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      // Re-entry guard: if a previous drag is still in flight (multi-touch,
      // a second pointerdown landing on a different handle, or any other
      // case where pointerup hasn't fired yet), tear down the previous
      // listeners and body style changes before starting the new drag.
      cleanupRef.current?.();

      event.preventDefault();
      event.stopPropagation();

      // Scope every later DOM lookup to the header row of the table where the
      // drag started. `event.currentTarget` is the drag handle the consumer
      // wired our handler to; its closest `<tr>` is the header row.
      const handleEl = event.currentTarget as HTMLElement | null;
      const headerRow = handleEl?.closest('tr') as HTMLElement | null;

      dragStateRef.current = {
        fromIndex: index,
        startX: event.clientX,
        startY: event.clientY,
        activated: false,
        ghostOffsetX: 0,
        ghostOffsetY: 0,
        headerRow,
      };

      // Suppress text selection / native gestures while the drag is active.
      // Touch browsers in particular start a selection on long touch-and-drag
      // unless `user-select` is locked down on the document.
      const previousUserSelect = document.body.style.userSelect;
      const previousWebkitUserSelect = (document.body.style as any).webkitUserSelect as
        | string
        | undefined;
      const previousCursor = document.body.style.cursor;
      document.body.style.userSelect = 'none';
      (document.body.style as any).webkitUserSelect = 'none';
      document.body.style.cursor = 'grabbing';

      const handlePointerMove = (e: PointerEvent) => {
        const state = dragStateRef.current;
        if (!state) {
          return;
        }

        // Defer activation until the pointer has moved past the threshold.
        // This lets a click on the handle pass through without starting a drag.
        if (!state.activated) {
          const dx = e.clientX - state.startX;
          const dy = e.clientY - state.startY;
          if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) {
            return;
          }
          state.activated = true;
          setDraggedColumn(state.fromIndex);

          // Create a ghost element from the source header cell — scoped to
          // the header row of THIS table, not a global document query.
          const cols = internalColumnsRef.current;
          const sourceKey = String(cols[state.fromIndex]?.key);
          const sourceTh =
            state.headerRow?.querySelector(`th[data-column-key="${sourceKey}"]`) ?? null;
          if (sourceTh) {
            const rect = sourceTh.getBoundingClientRect();
            state.ghostOffsetX = state.startX - rect.left;
            state.ghostOffsetY = state.startY - rect.top;

            const ghost = sourceTh.cloneNode(true) as HTMLElement;
            ghost.style.cssText = [
              'position: fixed',
              'pointer-events: none',
              'z-index: 9999',
              'opacity: 0.85',
              'box-shadow: 0 4px 12px rgba(0,0,0,0.15)',
              `width: ${rect.width}px`,
              `height: ${rect.height}px`,
              `left: ${e.clientX - state.ghostOffsetX}px`,
              `top: ${e.clientY - state.ghostOffsetY}px`,
              'transition: none',
              'will-change: left, top',
            ].join(';');
            document.body.appendChild(ghost);
            ghostRef.current = ghost;
          }
        }

        // Track the ghost to the pointer.
        if (ghostRef.current && state.activated) {
          ghostRef.current.style.left = `${e.clientX - state.ghostOffsetX}px`;
          ghostRef.current.style.top = `${e.clientY - state.ghostOffsetY}px`;
        }

        // Resolve the column under the pointer.
        // Primary: elementFromPoint (ghost has `pointer-events: none`).
        // Fallback: when the pointer is past the leftmost or rightmost header
        // edge, target the first/last column geometrically — otherwise dropping
        // before the first or after the last column would never commit because
        // elementFromPoint returns nothing usable outside the header row.
        let overIndex: number | null = null;
        const elementUnderPointer = document.elementFromPoint(e.clientX, e.clientY);
        const cols = internalColumnsRef.current;
        const columnKey = elementUnderPointer
          ?.closest('th[data-column-key]')
          ?.getAttribute('data-column-key');
        if (columnKey) {
          const idx = cols.findIndex((col) => (col.key as string) === columnKey);
          if (idx !== -1) {
            overIndex = idx;
          }
        }

        if (overIndex === null && state.headerRow) {
          // Geometric fallback — scoped to the captured header row only,
          // never a global document query (which would pick up `<th>` nodes
          // from sibling demos on the same page).
          const ths = Array.from(
            state.headerRow.querySelectorAll('th[data-column-key]')
          ) as HTMLElement[];
          if (ths.length > 0) {
            const firstRect = ths[0].getBoundingClientRect();
            const lastRect = ths[ths.length - 1].getBoundingClientRect();
            if (e.clientX < firstRect.left) {
              overIndex = 0;
            } else if (e.clientX > lastRect.right) {
              overIndex = ths.length - 1;
            }
          }
        }

        const next = overIndex !== null && overIndex !== state.fromIndex ? overIndex : null;
        if (dragOverColumnRef.current !== next) {
          dragOverColumnRef.current = next;
          setDragOverColumn(next);
        }
      };

      const finish = (commit: boolean) => {
        const state = dragStateRef.current;

        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('pointercancel', handlePointerCancel);
        document.removeEventListener('keydown', handleKeyDown);
        cleanupRef.current = null;
        dragStateRef.current = null;

        document.body.style.userSelect = previousUserSelect;
        (document.body.style as any).webkitUserSelect = previousWebkitUserSelect ?? '';
        document.body.style.cursor = previousCursor;

        ghostRef.current?.remove();
        ghostRef.current = null;

        // Read the latest drop target from the ref — NEVER from a setState
        // updater. React StrictMode (and concurrent rendering) intentionally
        // replays setState updaters to surface impure logic, which would
        // cause `setInternalColumns` (called inside) to run multiple times
        // and apply the reorder more than once.
        const currentOver = dragOverColumnRef.current;
        dragOverColumnRef.current = null;

        if (commit && state?.activated && currentOver !== null && state.fromIndex !== currentOver) {
          if (onColumnReorder) {
            onColumnReorder(state.fromIndex, currentOver);
          } else if (enableColumnReordering) {
            setInternalColumns((prev) => {
              const newColumns = [...prev];
              const [moved] = newColumns.splice(state.fromIndex, 1);
              newColumns.splice(currentOver, 0, moved);
              return newColumns;
            });
          }
        }

        setDragOverColumn(null);
        setDraggedColumn(null);
      };

      const handlePointerUp = () => finish(true);
      const handlePointerCancel = () => finish(false);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          finish(false);
        }
      };

      cleanupRef.current = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('pointercancel', handlePointerCancel);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.userSelect = previousUserSelect;
        (document.body.style as any).webkitUserSelect = previousWebkitUserSelect ?? '';
        document.body.style.cursor = previousCursor;
        ghostRef.current?.remove();
        ghostRef.current = null;
      };
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('pointercancel', handlePointerCancel);
      document.addEventListener('keydown', handleKeyDown);
    },
    [enableColumnReordering, onColumnReorder]
  );

  // Use internal columns when the consumer is not controlling reordering
  const effectiveColumns = enableColumnReordering && !onColumnReorder ? internalColumns : columns;

  return {
    effectiveColumns,
    draggedColumn,
    dragOverColumn,
    handleColumnDragStart,
  };
}
