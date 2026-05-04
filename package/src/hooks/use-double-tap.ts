import { useCallback, useRef } from 'react';

export interface UseDoubleTapOptions {
  /** Callback fired when a double-tap is detected (touch only) */
  onDoubleTap: () => void;
  /** Maximum delay between the two taps in ms (default: 300) */
  delay?: number;
  /** Maximum movement between the two taps in px to still count as a double-tap (default: 24) */
  threshold?: number;
}

export interface UseDoubleTapReturn {
  onPointerDown: (event: React.PointerEvent) => void;
}

/**
 * Detects a touch double-tap on a single element by measuring the time and
 * spatial distance between two consecutive `pointerdown` events of type
 * `'touch'`. Mouse and pen pointers are ignored — desktop relies on the
 * native `onDoubleClick` event, which is reliable in non-touch browsers.
 *
 * Pairs naturally with `useLongPress`: both hooks read `pointerdown` only
 * for `pointerType === 'touch'`, so a single resize handle can wire both
 * (e.g., long-press to start a drag, double-tap to auto-fit).
 */
export function useDoubleTap({
  onDoubleTap,
  delay = 300,
  threshold = 24,
}: UseDoubleTapOptions): UseDoubleTapReturn {
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (event.pointerType !== 'touch') {
        return;
      }

      const now = Date.now();
      const { clientX: x, clientY: y } = event;
      const previous = lastTapRef.current;

      if (previous && now - previous.time <= delay) {
        const dx = x - previous.x;
        const dy = y - previous.y;
        if (Math.sqrt(dx * dx + dy * dy) <= threshold) {
          lastTapRef.current = null;
          // Suppress any synthetic click/zoom that the browser might still emit
          event.preventDefault();
          onDoubleTap();
          return;
        }
      }

      lastTapRef.current = { time: now, x, y };
    },
    [onDoubleTap, delay, threshold]
  );

  return { onPointerDown };
}
