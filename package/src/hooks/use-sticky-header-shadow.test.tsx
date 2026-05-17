import { render } from '@mantine-tests/core';
import React, { useRef } from 'react';
import { useStickyHeaderShadow } from './use-sticky-header-shadow';

function Host({
  enabled = true,
  initialScrollTop = 0,
}: {
  enabled?: boolean;
  initialScrollTop?: number;
}) {
  const ref = useRef<HTMLTableElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  // Pre-set `scrollTop` on the scroller *before* the hook's effect
  // runs by attaching a `useRef` callback. The hook reads `scrollTop`
  // synchronously inside its initial `update()`, so this lets us seed
  // the container-scrolled detection branch deterministically.
  const seedScroll = (el: HTMLDivElement | null) => {
    scrollerRef.current = el;
    if (el && initialScrollTop) {
      el.scrollTop = initialScrollTop;
    }
  };
  useStickyHeaderShadow({ tableRef: ref, enabled });
  return (
    <div ref={seedScroll} data-testid="scroller" style={{ overflowY: 'auto', height: 100 }}>
      <table ref={ref} data-testid="table">
        <thead>
          <tr>
            <th>H</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>row</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

describe('useStickyHeaderShadow', () => {
  it('writes initial 0 opacity when nothing has been scrolled', () => {
    const { getByTestId } = render(<Host />);
    const table = getByTestId('table') as HTMLElement;
    expect(table.style.getPropertyValue('--lvt-header-shadow-opacity')).toBe('0');
  });

  it('does nothing when `enabled` is false', () => {
    const { getByTestId } = render(<Host enabled={false} />);
    const table = getByTestId('table') as HTMLElement;
    expect(table.style.getPropertyValue('--lvt-header-shadow-opacity')).toBe('');
  });

  it('writes 1 in container-scrolled mode when the scroller already has scrollTop > 0', () => {
    // Container-scrolled branch: the hook checks `scroller.scrollTop`
    // (not the thead position), so a non-zero initial scrollTop should
    // produce an immediate `1`.
    const { getByTestId } = render(<Host initialScrollTop={50} />);
    const table = getByTestId('table') as HTMLElement;
    expect(table.style.getPropertyValue('--lvt-header-shadow-opacity')).toBe('1');
  });
});
