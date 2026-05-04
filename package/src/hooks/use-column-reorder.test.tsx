import React from 'react';
import { act } from '@testing-library/react';
import { render } from '@mantine-tests/core';
import { useColumnReorder } from './use-column-reorder';

const COLUMNS = [
  { key: 'a', title: 'A' },
  { key: 'b', title: 'B' },
  { key: 'c', title: 'C' },
];

interface HostProps {
  onReorder?: (from: number, to: number) => void;
  enabled?: boolean;
}

function Host({ onReorder, enabled = true }: HostProps) {
  const { handleColumnDragStart } = useColumnReorder({
    columns: COLUMNS,
    enableColumnReordering: enabled,
    onColumnReorder: onReorder,
  });
  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map((col, index) => (
            <th
              key={col.key}
              data-column-key={col.key}
              data-testid={`th-${col.key}`}
              style={{ width: 100 }}
            >
              <button
                type="button"
                data-testid={`handle-${col.key}`}
                onPointerDown={(e) => handleColumnDragStart(index, e)}
              >
                {col.title}
              </button>
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
}

function firePointerDown(target: Element, x: number, y: number, pointerType = 'mouse') {
  const event: any = new Event('pointerdown', { bubbles: true, cancelable: true });
  event.pointerType = pointerType;
  event.button = 0;
  event.clientX = x;
  event.clientY = y;
  target.dispatchEvent(event);
  return event;
}

function fireDocPointerEvent(type: string, x: number, y: number) {
  const event: any = new Event(type, { bubbles: true, cancelable: true });
  event.clientX = x;
  event.clientY = y;
  document.dispatchEvent(event);
  return event;
}

function mockElementFromPoint(targetByCoord: (x: number, y: number) => Element | null) {
  const real = document.elementFromPoint;
  document.elementFromPoint = ((x: number, y: number) => targetByCoord(x, y)) as any;
  return () => {
    document.elementFromPoint = real;
  };
}

describe('useColumnReorder', () => {
  afterEach(() => {
    // Remove any leftover ghost element
    document.querySelectorAll('th[data-column-key]').forEach((el) => {
      if (el.parentElement === document.body) {
        el.remove();
      }
    });
  });

  // Scope queries to the table inside the test container so the cloned ghost
  // element appended to document.body does not match.
  const findTh = (key: string) => document.querySelector(`table th[data-column-key="${key}"]`)!;

  it('reorders columns on a complete pointer drag (mouse)', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    const restore = mockElementFromPoint((x) => {
      if (x < 100) {
        return findTh('a');
      }
      if (x < 200) {
        return findTh('b');
      }
      return findTh('c');
    });

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 250, 10); // moves into th-c bucket
    });
    act(() => {
      fireDocPointerEvent('pointerup', 250, 10);
    });

    restore();
    expect(onReorder).toHaveBeenCalledWith(0, 2);
  });

  it('does not activate drag if movement is below threshold', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 12, 11); // < 5px
    });
    act(() => {
      fireDocPointerEvent('pointerup', 12, 11);
    });

    expect(onReorder).not.toHaveBeenCalled();
  });

  it('does nothing when drop target is the source column', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    const restore = mockElementFromPoint(() => findTh('a'));

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 30, 10); // moves but stays over th-a
    });
    act(() => {
      fireDocPointerEvent('pointerup', 30, 10);
    });

    restore();
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('Escape cancels an in-flight drag without reordering', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    const restore = mockElementFromPoint(() => findTh('c'));

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 250, 10);
    });
    act(() => {
      const e: any = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      document.dispatchEvent(e);
    });

    expect(onReorder).not.toHaveBeenCalled();

    // A subsequent pointerup must not retroactively commit the cancelled drag
    act(() => {
      fireDocPointerEvent('pointerup', 250, 10);
    });
    expect(onReorder).not.toHaveBeenCalled();

    restore();
  });

  it('reorders on touch pointer drag (same path as mouse)', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    const restore = mockElementFromPoint(() => findTh('b'));

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10, 'touch');
    });
    act(() => {
      fireDocPointerEvent('pointermove', 150, 10);
    });
    act(() => {
      fireDocPointerEvent('pointerup', 150, 10);
    });

    restore();
    expect(onReorder).toHaveBeenCalledWith(0, 1);
  });

  it('uses geometric fallback to drop past the rightmost column', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    // Mock bounding rects so the geometric fallback can identify edges
    Object.defineProperty(findTh('a'), 'getBoundingClientRect', {
      value: () => ({ left: 0, right: 100, top: 0, bottom: 30 }),
    });
    Object.defineProperty(findTh('b'), 'getBoundingClientRect', {
      value: () => ({ left: 100, right: 200, top: 0, bottom: 30 }),
    });
    Object.defineProperty(findTh('c'), 'getBoundingClientRect', {
      value: () => ({ left: 200, right: 300, top: 0, bottom: 30 }),
    });

    // elementFromPoint returns null when the pointer is past the table —
    // simulating the real-browser behavior at the table edges.
    const restore = mockElementFromPoint(() => null);

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 400, 10); // past the right edge
    });
    act(() => {
      fireDocPointerEvent('pointerup', 400, 10);
    });

    restore();
    expect(onReorder).toHaveBeenCalledWith(0, 2);
  });

  it('uses geometric fallback to drop past the leftmost column', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    Object.defineProperty(findTh('a'), 'getBoundingClientRect', {
      value: () => ({ left: 0, right: 100, top: 0, bottom: 30 }),
    });
    Object.defineProperty(findTh('b'), 'getBoundingClientRect', {
      value: () => ({ left: 100, right: 200, top: 0, bottom: 30 }),
    });
    Object.defineProperty(findTh('c'), 'getBoundingClientRect', {
      value: () => ({ left: 200, right: 300, top: 0, bottom: 30 }),
    });

    const restore = mockElementFromPoint(() => null);

    act(() => {
      firePointerDown(getByTestId('handle-c'), 250, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', -20, 10); // past the left edge
    });
    act(() => {
      fireDocPointerEvent('pointerup', -20, 10);
    });

    restore();
    expect(onReorder).toHaveBeenCalledWith(2, 0);
  });

  it('locks document.body.userSelect during drag and restores on finish', () => {
    document.body.style.userSelect = 'auto';
    const { getByTestId } = render(<Host />);

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    expect(document.body.style.userSelect).toBe('none');
    expect(document.body.style.cursor).toBe('grabbing');

    act(() => {
      fireDocPointerEvent('pointerup', 10, 10);
    });
    expect(document.body.style.userSelect).toBe('auto');
    expect(document.body.style.cursor).toBe('');
  });

  it('scopes ghost source and geometric fallback to the table where the drag started', () => {
    // Two tables on the page sharing the same column keys. Dragging in the
    // second table must not pick up <th> nodes from the first table.
    function TwoTablesHost({ onReorder }: { onReorder: (f: number, t: number) => void }) {
      const first = useColumnReorder({
        columns: COLUMNS,
        enableColumnReordering: true,
      });
      const second = useColumnReorder({
        columns: COLUMNS,
        enableColumnReordering: true,
        onColumnReorder: onReorder,
      });
      return (
        <>
          <table data-testid="table-first">
            <thead>
              <tr>
                {COLUMNS.map((col, index) => (
                  <th key={col.key} data-column-key={col.key}>
                    <button
                      type="button"
                      data-testid={`first-handle-${col.key}`}
                      onPointerDown={(e) => first.handleColumnDragStart(index, e)}
                    >
                      {col.title}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <table data-testid="table-second">
            <thead>
              <tr>
                {COLUMNS.map((col, index) => (
                  <th key={col.key} data-column-key={col.key}>
                    <button
                      type="button"
                      data-testid={`second-handle-${col.key}`}
                      onPointerDown={(e) => second.handleColumnDragStart(index, e)}
                    >
                      {col.title}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </>
      );
    }

    const onReorder = jest.fn();
    const { getByTestId } = render(<TwoTablesHost onReorder={onReorder} />);
    const secondTable = getByTestId('table-second');

    // Drag handle 0 in the SECOND table to past the rightmost column,
    // mocked via getBoundingClientRect on the second table's <th> nodes only.
    const secondThs = Array.from(
      secondTable.querySelectorAll('th[data-column-key]')
    ) as HTMLElement[];
    secondThs.forEach((th, i) => {
      Object.defineProperty(th, 'getBoundingClientRect', {
        value: () => ({ left: i * 100, right: (i + 1) * 100, top: 0, bottom: 30 }),
      });
    });

    // First table's <th> nodes — if the hook ever queries the document
    // globally, it would hit these. Place them at impossible coordinates
    // so a regression would mis-target the wrong column.
    Array.from(getByTestId('table-first').querySelectorAll('th[data-column-key]')).forEach(
      (th, i) => {
        Object.defineProperty(th, 'getBoundingClientRect', {
          value: () => ({ left: 9000 + i * 100, right: 9000 + (i + 1) * 100, top: 0, bottom: 30 }),
        });
      }
    );

    const restore = mockElementFromPoint(() => null);

    act(() => {
      firePointerDown(getByTestId('second-handle-a'), 10, 10);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 350, 10); // past second-table right edge
    });
    act(() => {
      fireDocPointerEvent('pointerup', 350, 10);
    });

    restore();
    expect(onReorder).toHaveBeenCalledWith(0, 2);
  });

  it('cleans up the previous drag if a new pointerdown lands while one is in flight', () => {
    // Multi-touch / overlapping drags: the second pointerdown must tear down
    // the first set of document listeners and body styles before starting fresh.
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    const restore = mockElementFromPoint(() => findTh('c'));

    act(() => {
      firePointerDown(getByTestId('handle-a'), 10, 10);
    });
    // First drag started — body styles should be locked
    expect(document.body.style.userSelect).toBe('none');
    expect(document.body.style.cursor).toBe('grabbing');

    // A second pointerdown lands while the first is still active. The hook
    // must clean up the first drag before starting the second.
    act(() => {
      firePointerDown(getByTestId('handle-b'), 10, 10);
    });
    // Body styles still locked — but for the new drag, not the old one
    expect(document.body.style.userSelect).toBe('none');

    act(() => {
      fireDocPointerEvent('pointermove', 250, 10);
      fireDocPointerEvent('pointerup', 250, 10);
    });

    // Only ONE reorder fires (from the second drag, source index 1)
    expect(onReorder).toHaveBeenCalledTimes(1);
    expect(onReorder).toHaveBeenCalledWith(1, 2);

    // Body styles are no longer in the "drag lock" state
    expect(document.body.style.userSelect).not.toBe('none');
    expect(document.body.style.cursor).not.toBe('grabbing');

    restore();
  });

  it('ignores right-click (mouse button !== 0)', () => {
    const onReorder = jest.fn();
    const { getByTestId } = render(<Host onReorder={onReorder} />);

    act(() => {
      const event: any = new Event('pointerdown', { bubbles: true, cancelable: true });
      event.pointerType = 'mouse';
      event.button = 2; // right-click
      event.clientX = 10;
      event.clientY = 10;
      getByTestId('handle-a').dispatchEvent(event);
    });
    act(() => {
      fireDocPointerEvent('pointermove', 250, 10);
      fireDocPointerEvent('pointerup', 250, 10);
    });

    expect(onReorder).not.toHaveBeenCalled();
  });
});
