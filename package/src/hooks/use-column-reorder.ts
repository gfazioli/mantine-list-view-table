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
  // HTML5 DnD handlers (desktop)
  handleColumnDragStart: (index: number, event: React.DragEvent) => void;
  handleColumnDragOver: (index: number, event: React.DragEvent) => void;
  handleColumnDragLeave: () => void;
  handleColumnDrop: (toIndex: number, event: React.DragEvent) => void;
  handleColumnDragEnd: () => void;
  // Pointer handler (touch fallback)
  handleDragHandlePointerDown: (index: number, event: React.PointerEvent) => void;
}

/** Drag activation threshold in pixels — prevents accidental drags on touch */
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

  // ─── HTML5 DnD handlers (desktop) — identical to master ─────────────

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

  // ─── Pointer-based drag (touch only) ────────────────────────────────

  const dragStateRef = useRef<{
    fromIndex: number;
    startX: number;
    startY: number;
    activated: boolean;
    ghostOffsetX: number;
    ghostOffsetY: number;
  } | null>(null);

  // Ref to always access latest columns inside document-level listeners
  const internalColumnsRef = useRef<ListViewTableColumn[]>(columns);
  internalColumnsRef.current = internalColumns;

  const ghostRef = useRef<HTMLElement | null>(null);

  const cleanupRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      ghostRef.current?.remove();
    };
  }, []);

  const handleDragHandlePointerDown = useCallback(
    (index: number, event: React.PointerEvent) => {
      // Only activate for touch — on desktop, HTML5 DnD handles everything
      if (event.pointerType !== 'touch' || !enableColumnReordering) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      dragStateRef.current = {
        fromIndex: index,
        startX: event.clientX,
        startY: event.clientY,
        activated: false,
        ghostOffsetX: 0,
        ghostOffsetY: 0,
      };

      const handlePointerMove = (e: PointerEvent) => {
        const state = dragStateRef.current;
        if (!state) {
          return;
        }

        // Check drag threshold before activating
        if (!state.activated) {
          const dx = e.clientX - state.startX;
          const dy = e.clientY - state.startY;
          if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) {
            return;
          }
          state.activated = true;
          setDraggedColumn(state.fromIndex);

          // Create ghost element from the source header cell
          const cols = internalColumnsRef.current;
          const sourceTh = document.querySelector(
            `th[data-column-key="${String(cols[state.fromIndex]?.key)}"]`
          );
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

        // Move ghost element
        if (ghostRef.current && state.activated) {
          ghostRef.current.style.left = `${e.clientX - state.ghostOffsetX}px`;
          ghostRef.current.style.top = `${e.clientY - state.ghostOffsetY}px`;
        }

        // Find which header cell the pointer is currently over
        const elementUnderPointer = document.elementFromPoint(e.clientX, e.clientY);
        if (elementUnderPointer) {
          const th = elementUnderPointer.closest('th[data-column-key]');
          if (th) {
            const columnKey = th.getAttribute('data-column-key');
            const cols = internalColumnsRef.current;
            const overIndex = cols.findIndex((col) => (col.key as string) === columnKey);
            if (overIndex !== -1 && overIndex !== state.fromIndex) {
              setDragOverColumn(overIndex);
            } else {
              setDragOverColumn(null);
            }
          } else {
            setDragOverColumn(null);
          }
        }
      };

      const handlePointerEnd = () => {
        const state = dragStateRef.current;

        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerEnd);
        document.removeEventListener('pointercancel', handlePointerEnd);
        cleanupRef.current = null;
        dragStateRef.current = null;

        ghostRef.current?.remove();
        ghostRef.current = null;

        // Use setState callback to access latest dragOverColumn
        setDragOverColumn((currentOver) => {
          if (state?.activated && currentOver !== null && state.fromIndex !== currentOver) {
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
          return null;
        });

        setDraggedColumn(null);
      };

      cleanupRef.current = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerEnd);
        document.removeEventListener('pointercancel', handlePointerEnd);
        ghostRef.current?.remove();
        ghostRef.current = null;
      };
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerEnd);
      document.addEventListener('pointercancel', handlePointerEnd);
    },
    [enableColumnReordering, onColumnReorder]
  );

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
    handleDragHandlePointerDown,
  };
}
