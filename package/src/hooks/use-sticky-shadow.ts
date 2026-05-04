import { useEffect } from 'react';

export interface UseStickyShadowOptions {
  /** Ref to the table element that will receive the CSS variables */
  tableRef: React.RefObject<HTMLElement | null>;
  /** Skip the effect entirely when the table has no sticky columns */
  enabled?: boolean;
}

function findHorizontalScrollAncestor(el: HTMLElement): HTMLElement | Window {
  let cur: HTMLElement | null = el.parentElement;
  while (cur) {
    const cs = getComputedStyle(cur);
    // Any non-`visible` horizontal overflow makes the element a scroll
    // boundary. We accept `hidden` too because Mantine's `ScrollArea`
    // viewport — the actual element whose `scrollLeft` changes when the
    // user drags the custom scrollbar — uses `overflow-x: hidden` while
    // still being programmatically scrollable. We must not skip it.
    if (cs.overflowX !== 'visible') {
      return cur;
    }
    cur = cur.parentElement;
  }
  return window;
}

/**
 * Drives the gradient shadow on pinned (sticky) columns.
 *
 * On every horizontal scroll of the closest scrollable ancestor (or the
 * window if none), writes two CSS custom properties on the table root:
 *
 * - `--lvt-shadow-left-opacity`: `1` when there is content scrolled past
 *   the left edge, `0` otherwise.
 * - `--lvt-shadow-right-opacity`: `1` when there is content extending
 *   beyond the right edge, `0` otherwise.
 *
 * The CSS pseudo-elements on `.stickyColumn[data-sticky-shadow]` read
 * these variables to fade their gradient in and out — no React re-renders
 * on scroll. Updates are throttled via `requestAnimationFrame`.
 *
 * RTL: `scrollLeft` is negative on modern browsers under `direction: rtl`,
 * so the absolute value is used and the meaning of "left" / "right"
 * flips with the writing direction (handled at the CSS layer via
 * `[dir="rtl"]` rules — the hook just reports the magnitude).
 */
export function useStickyShadow({ tableRef, enabled = true }: UseStickyShadowOptions): void {
  useEffect(() => {
    const table = tableRef.current;
    if (!enabled || !table) {
      return;
    }

    const scroller = findHorizontalScrollAncestor(table);
    const isWindow = scroller === window;

    let rafId: number | null = null;
    let lastLeft = -1;
    let lastRight = -1;

    const update = () => {
      rafId = null;

      let scrollLeft: number;
      let scrollWidth: number;
      let clientWidth: number;

      if (isWindow) {
        scrollLeft = window.scrollX;
        scrollWidth = document.documentElement.scrollWidth;
        clientWidth = window.innerWidth;
      } else {
        const el = scroller as HTMLElement;
        scrollLeft = el.scrollLeft;
        scrollWidth = el.scrollWidth;
        clientWidth = el.clientWidth;
      }

      const absScrollLeft = Math.abs(scrollLeft);
      const remaining = scrollWidth - clientWidth - absScrollLeft;
      // 1px tolerance for sub-pixel rounding (browsers often report fractional widths)
      const left = absScrollLeft > 1 ? 1 : 0;
      const right = remaining > 1 ? 1 : 0;

      // Skip setProperty calls when the value is unchanged — scroll events can
      // fire 60+ times per second and DOM writes are not free.
      if (left !== lastLeft) {
        table.style.setProperty('--lvt-shadow-left-opacity', String(left));
        lastLeft = left;
      }
      if (right !== lastRight) {
        table.style.setProperty('--lvt-shadow-right-opacity', String(right));
        lastRight = right;
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) {
        return;
      }
      rafId = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // ResizeObserver catches the cases where the scroll container or the
    // table itself changes size after mount (Mantine ScrollArea's viewport
    // settles asynchronously, font loading reflows, parent layout changes,
    // column resizing, etc.) — none of which fire a `scroll` or window
    // `resize` event, so without this the opacities stay at their initial
    // mount-time values when they were wrong.
    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        onScrollOrResize();
      });
      resizeObserver.observe(table);
      if (!isWindow) {
        resizeObserver.observe(scroller as HTMLElement);
      }
    }

    return () => {
      scroller.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      resizeObserver?.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [tableRef, enabled]);
}
