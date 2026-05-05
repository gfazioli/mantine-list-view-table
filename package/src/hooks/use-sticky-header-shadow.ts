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
 * Detection differs by scroll container:
 *
 * - **Page-scrolled** (no fixed-height container): the thead is at its
 *   natural position until the page scrolls enough to engage sticky.
 *   The hook compares `thead.getBoundingClientRect().top` to
 *   `stickyHeaderOffset` — they only match once sticky takes over.
 * - **Container-scrolled** (Mantine `ScrollArea`,
 *   `scrollProps.maxHeight`, or any custom scroller): the thead's
 *   natural position already coincides with the sticky position
 *   (because the table starts at the top of the viewport), so a
 *   position check would always be true. Instead the hook checks
 *   `scroller.scrollTop > 0` — i.e., the user has actually scrolled
 *   content underneath the thead. This mirrors the visual cue users
 *   expect: the shadow only appears once there is content to "hide
 *   behind" the header.
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
      let stuck: boolean;
      if (isWindow) {
        // Page-scrolled mode: rely on the thead's viewport position to
        // detect when sticky has taken over. Before the page scrolls
        // far enough, `thead.top > resolvedOffset`; once stuck, they
        // match. We read the resolved sticky offset from
        // `getComputedStyle(thead).top` — this is always in pixels,
        // regardless of whether the user supplied a number, `'2rem'`,
        // `'1em'`, or any other CSS length to `stickyHeaderOffset`.
        const resolvedOffset = parseFloat(getComputedStyle(thead).top) || 0;
        const rectTop = thead.getBoundingClientRect().top;
        stuck = Math.abs(rectTop - resolvedOffset) < 1;
      } else {
        // Container-scrolled mode: the thead is permanently at the top
        // of the viewport, so the only useful signal is "has the user
        // scrolled the inner content?". `scrollTop > 0` means there is
        // content currently hidden above the thead.
        stuck = (scroller as HTMLElement).scrollTop > 0;
      }
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
