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
 * resolved `stickyHeaderOffset`: when they match (within a 1px
 * tolerance) the header is stuck. This is reliable across both modes:
 * sticky-to-page (no `scrollProps`) and sticky-to-internal-viewport
 * (with `scrollProps.maxHeight`), because the rect is always relative
 * to the viewport while the offset is page-relative or
 * scroller-relative depending on the sticky containing block — both
 * collapse to the same numeric `top` when stuck.
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
      // sticky offset. While unstuck (page not yet scrolled enough) the
      // top is below the offset; once sticky releases at the bottom of
      // its containing block, the top moves up past the offset.
      const stuck = Math.abs(rect.top - offsetN) < 1;
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
