import { useCallback, useEffect, useRef } from 'react';

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
  /** Whether a long-press was just triggered — use to suppress the next click */
  didLongPressRef: React.RefObject<boolean>;
}

export function useLongPress({
  onLongPress,
  delay = 500,
  threshold = 10,
}: UseLongPressOptions): UseLongPressReturn {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const didLongPressRef = useRef(false);

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startPosRef.current = null;
  }, []);

  // Cleanup on unmount to prevent firing on unmounted component
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      // Only activate for touch input
      if (event.pointerType !== 'touch') {
        return;
      }

      // Cancel any pending timer before starting a new one (multi-touch safety)
      cancel();
      didLongPressRef.current = false;

      const { clientX, clientY } = event;
      startPosRef.current = { x: clientX, y: clientY };

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        startPosRef.current = null;
        didLongPressRef.current = true;
        // Haptic feedback (Android — no-ops silently on iOS)
        if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          navigator.vibrate(50);
        }
        onLongPress(clientX, clientY);
      }, delay);
    },
    [onLongPress, delay, cancel]
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
    didLongPressRef,
  };
}
