import { render } from '@mantine-tests/core';
import React, { useRef } from 'react';
import { useStickyShadow } from './use-sticky-shadow';

function Host({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLTableElement | null>(null);
  useStickyShadow({ tableRef: ref, enabled });
  return (
    // The wrapper has overflow-x: scroll so the hook attaches its scroll
    // listener here instead of on `window`.
    <div data-testid="scroller" style={{ overflowX: 'scroll', width: 200 }}>
      <table ref={ref} data-testid="table">
        <tbody>
          <tr>
            <td style={{ width: 1000 }}>wide cell</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

describe('useStickyShadow', () => {
  it('writes initial 0 opacity values when the table is not yet scrolled', () => {
    const { getByTestId } = render(<Host />);
    const table = getByTestId('table') as HTMLElement;
    // The hook runs an initial update on mount (synchronous, not via rAF).
    expect(table.style.getPropertyValue('--lvt-shadow-left-opacity')).toBe('0');
    expect(table.style.getPropertyValue('--lvt-shadow-right-opacity')).toBe('0');
  });

  it('does nothing when `enabled` is false', () => {
    const { getByTestId } = render(<Host enabled={false} />);
    const table = getByTestId('table') as HTMLElement;
    // Hook bails early; no CSS variables are written.
    expect(table.style.getPropertyValue('--lvt-shadow-left-opacity')).toBe('');
    expect(table.style.getPropertyValue('--lvt-shadow-right-opacity')).toBe('');
  });
});
