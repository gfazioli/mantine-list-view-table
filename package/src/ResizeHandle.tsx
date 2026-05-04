import React, { useCallback } from 'react';
import { Box } from '@mantine/core';
import { useDoubleTap } from './hooks/use-double-tap';

interface ResizeHandleProps {
  index: number;
  onResizeStart: (index: number, event: React.PointerEvent) => void;
  onResizeDoubleClick: (index: number) => void;
  getStyles: () => { className?: string; style?: React.CSSProperties };
}

/**
 * Resize handle for a single column.
 *
 * Combines two interactions on the same hit area:
 * - **Drag** (mouse, touch, pen): `onPointerDown` starts the resize gesture
 * - **Auto-fit** (mouse): native `onDoubleClick` triggers `onResizeDoubleClick`
 * - **Auto-fit** (touch): a custom double-tap detector wired through
 *   `useDoubleTap` calls `onResizeDoubleClick` for two consecutive taps
 *   within ~300ms, since iOS Safari and many touch browsers do not emit
 *   reliable `dblclick` events on `pointerType === 'touch'`.
 *
 * The hook ignores non-touch pointers, so mouse double-clicks continue
 * through the native event path without interference.
 */
export function ResizeHandle({
  index,
  onResizeStart,
  onResizeDoubleClick,
  getStyles,
}: ResizeHandleProps) {
  const { onPointerDown: onTouchDoubleTapPointerDown } = useDoubleTap({
    onDoubleTap: useCallback(() => onResizeDoubleClick(index), [onResizeDoubleClick, index]),
  });

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      // Touch double-tap detector runs first; if it fires, it preventDefault's
      // and `onResizeStart` will see `event.defaultPrevented === true`.
      onTouchDoubleTapPointerDown(event);
      if (event.defaultPrevented) {
        return;
      }
      onResizeStart(index, event);
    },
    [onTouchDoubleTapPointerDown, onResizeStart, index]
  );

  return (
    <Box
      {...getStyles()}
      onPointerDown={handlePointerDown}
      onDoubleClick={() => onResizeDoubleClick(index)}
    />
  );
}
