import { useEffect } from 'react';

export interface UseStickyHeaderShadowOptions {
  /** Ref to the table element that will receive the CSS variable */
  tableRef: React.RefObject<HTMLElement | null>;
  /** Skip the effect entirely when `stickyHeader` is not enabled */
  enabled?: boolean;
  /** Same value as `stickyHeaderOffset` on the component */
  offset?: number | string;
}

function findVerticalScrollAncestor(el: HTMLElement): HTMLElement | Window {
  let cur: HTMLElement | null = el.parentElement;
  while (cur) {
    const cs = getComputedStyle(cur);
    if (cs.overflowY !== 'visible') {
      return cur;
    }
    cur = cur.parentElement;
  }
  return window;
}

/**
 * Drives the drop-shadow that fades in below a `stickyHeader` thead while
 * the user is scrolling content underneath it.
 *
 * Writes a single CSS variable on the table root:
 *
 * - `--lvt-header-shadow-opacity`: `1` when the thead is currently
 *   "stuck" at `stickyHeaderOffset`, `0` while it sits in its natural
 *   position (or after sticky has released because the table itself
 *   has scrolled past).
 *
 * The CSS layer reads this variable to fade a soft `box-shadow` on the
 * `<thead>` — no React re-renders during scroll. Updates are throttled
 * via `requestAnimationFrame`.
 *
 * Detection compares `thead.getBoundingClientRect().top` to the
 * resolved sticky position. When the scroll ancestor is the page,
 * the sticky position is `stickyHeaderOffset` (in viewport coords).
 * When the scroll ancestor is an element (Mantine `ScrollArea`,
 * `scrollProps.maxHeight`, or any custom container), the sticky
 * position is `scrollerRect.top + stickyHeaderOffset`. The hook
 * normalizes both into the same comparison so the shadow fades in
 * regardless of which container the table is scrolling inside.
 */
export function useStickyHeaderShadow({
  tableRef,
  enabled = true,
  offset = 0,
}: UseStickyHeaderShadowOptions): void {
  useEffect(() => {
    const table = tableRef.current;
    if (!enabled || !table) {
      return;
    }

    const offsetN = typeof offset === 'number' ? offset : parseFloat(String(offset)) || 0;

    const scroller = findVerticalScrollAncestor(table);
    const isWindow = scroller === window;

    let rafId: number | null = null;
    let lastVal = -1;

    const update = () => {
      rafId = null;
      const thead = table.querySelector('thead') as HTMLElement | null;
      if (!thead) {
        return;
      }
      const rect = thead.getBoundingClientRect();
      // The thead is "stuck" when its top sits exactly at the resolved
      // sticky position. The sticky position is the offset relative to
      // the scroll containing block: the viewport itself when the
      // scroller is `window`, or the scroller's own top edge otherwise
      // (Mantine `ScrollArea`, `scrollProps.maxHeight`, etc.).
      const scrollerTop = isWindow ? 0 : (scroller as HTMLElement).getBoundingClientRect().top;
      const stickyTop = scrollerTop + offsetN;
      const stuck = Math.abs(rect.top - stickyTop) < 1;
      const val = stuck ? 1 : 0;
      if (val !== lastVal) {
        table.style.setProperty('--lvt-header-shadow-opacity', String(val));
        lastVal = val;
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
    if (!isWindow) {
      // Listen to window scroll too — when the wrapper has its own
      // overflow but its parent is also scrollable (or the user just
      // scrolls the page), we still need to recompute.
      window.addEventListener('scroll', onScrollOrResize, { passive: true });
    }
    window.addEventListener('resize', onScrollOrResize, { passive: true });

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
      if (!isWindow) {
        window.removeEventListener('scroll', onScrollOrResize);
      }
      window.removeEventListener('resize', onScrollOrResize);
      resizeObserver?.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [tableRef, enabled, offset]);
}
