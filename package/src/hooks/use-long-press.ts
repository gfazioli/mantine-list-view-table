import { useCallback, useRef } from 'react';

export interface UseLongPressOptions {
  /** Callback fired when a long-press is detected (touch only) */
  onLongPress: (x: number, y: number) => void;
  /** Delay in ms before the long-press fires (default: 500) */
  delay?: number;
  /** Movement threshold in px to cancel the long-press (default: 10) */
  threshold?: number;
}

export interface UseLongPressReturn {
  onPointerDown: (event: React.PointerEvent) => void;
  onPointerMove: (event: React.PointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}

export function useLongPress({
  onLongPress,
  delay = 500,
  threshold = 10,
}: UseLongPressOptions): UseLongPressReturn {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startPosRef.current = null;
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      // Only activate for touch input
      if (event.pointerType !== 'touch') {
        return;
      }

      const { clientX, clientY } = event;
      startPosRef.current = { x: clientX, y: clientY };

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        startPosRef.current = null;
        // Haptic feedback (Android — no-ops silently on iOS)
        navigator.vibrate?.(50);
        onLongPress(clientX, clientY);
      }, delay);
    },
    [onLongPress, delay]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!startPosRef.current || timerRef.current === null) {
        return;
      }
      const dx = event.clientX - startPosRef.current.x;
      const dy = event.clientY - startPosRef.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > threshold) {
        cancel();
      }
    },
    [threshold, cancel]
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: cancel,
    onPointerCancel: cancel,
  };
}
