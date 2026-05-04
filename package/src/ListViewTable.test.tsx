import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '@mantine-tests/core';
import { ListViewTable } from './ListViewTable';

interface TestData {
  id: number;
  name: string;
  value: string;
}

const testData: TestData[] = [
  { id: 1, name: 'Item 1', value: 'Value 1' },
  { id: 2, name: 'Item 2', value: 'Value 2' },
  { id: 3, name: 'Item 3', value: 'Value 3' },
];

const testColumns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'value', title: 'Value', sortable: false },
];

describe('ListViewTable', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ListViewTable columns={testColumns as any} data={testData} rowKey="id" height={300} />
    );
    expect(container).toBeTruthy();
  });

  it('displays column headers', () => {
    render(<ListViewTable columns={testColumns as any} data={testData} rowKey="id" height={300} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  it('displays data rows', () => {
    render(<ListViewTable columns={testColumns as any} data={testData} rowKey="id" height={300} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(
      <ListViewTable
        columns={testColumns as any}
        data={[]}
        rowKey="id"
        height={300}
        emptyText="No items found"
      />
    );

    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('shows custom empty state component when no data', () => {
    const CustomEmptyState = () => (
      <div data-testid="custom-empty-state">
        <h3>No Data Available</h3>
        <p>Try adding some items or check back later.</p>
      </div>
    );

    render(
      <ListViewTable
        columns={testColumns as any}
        data={[]}
        rowKey="id"
        height={300}
        emptyText={<CustomEmptyState />}
      />
    );

    expect(screen.getByTestId('custom-empty-state')).toBeInTheDocument();
    expect(screen.getByText('No Data Available')).toBeInTheDocument();
    expect(screen.getByText('Try adding some items or check back later.')).toBeInTheDocument();
  });

  it('shows JSX element as empty state when no data', () => {
    const emptyStateElement = (
      <div data-testid="jsx-empty-state">
        <strong>Empty!</strong>
        <span>No records to display</span>
      </div>
    );

    render(
      <ListViewTable
        columns={testColumns as any}
        data={[]}
        rowKey="id"
        height={300}
        emptyText={emptyStateElement}
      />
    );

    expect(screen.getByTestId('jsx-empty-state')).toBeInTheDocument();
    expect(screen.getByText('Empty!')).toBeInTheDocument();
    expect(screen.getByText('No records to display')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        loading
      />
    );

    // Check if loader is present
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom loadingProps to Loader', () => {
    render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        loading
        loadingProps={{ size: 'xl', color: 'red' }}
      />
    );
    // Loader should have custom props
    expect(screen.getByRole('status').querySelector('.mantine-Loader-root')).toBeTruthy();
  });

  it('renders custom loadingComponent (element)', () => {
    render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        loading
        loadingComponent={<div data-testid="custom-loader">Custom Loading...</div>}
      />
    );
    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
  });

  it('renders custom loadingComponent (function)', () => {
    const CustomLoader = (props: any) => (
      <div data-testid="custom-fn-loader">Loading {props.text}</div>
    );
    render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        loading
        loadingComponent={CustomLoader}
        loadingProps={{ text: 'with function' }}
      />
    );
    expect(screen.getByTestId('custom-fn-loader')).toHaveTextContent('Loading with function');
  });

  // === Bug regression tests ===

  it('does not crash with vertical variant and fewer than 2 columns', () => {
    const singleColumn = [{ key: 'name', title: 'Name' }];
    const { container } = render(
      <ListViewTable
        columns={singleColumn as any}
        data={testData}
        rowKey="id"
        height={300}
        tableProps={{ variant: 'vertical' }}
      />
    );
    expect(container).toBeTruthy();
    expect(screen.getByText('Vertical variant requires at least 2 columns')).toBeInTheDocument();
  });

  it('does not sort data internally when sortStatus is controlled externally', () => {
    const sortedByNameDesc = [...testData].sort((a, b) => b.name.localeCompare(a.name));

    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={sortedByNameDesc}
        rowKey="id"
        height={300}
        sortStatus={{ columnKey: 'name', direction: 'desc' }}
        onSort={() => {}}
      />
    );

    // Data should be rendered in the exact order provided (not re-sorted)
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).toHaveTextContent('Item 3');
    expect(rows[1]).toHaveTextContent('Item 2');
    expect(rows[2]).toHaveTextContent('Item 1');
  });

  it('defaults enableColumnReordering and enableColumnResizing to false', () => {
    const { container } = render(
      <ListViewTable columns={testColumns as any} data={testData} rowKey="id" height={300} />
    );

    // No drag handles should be present
    expect(container.querySelector('.mantine-ListViewTable-dragHandle')).toBeNull();
    // No resize handles should be present
    expect(container.querySelector('.mantine-ListViewTable-resizeHandle')).toBeNull();
  });

  // === Row Selection tests ===

  it('renders clickable rows when selectionMode is set', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        selectionMode="single"
      />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
    expect(rows[0]).toHaveStyle({ cursor: 'pointer' });
  });

  it('calls onSelectionChange on row click', () => {
    const onSelectionChange = jest.fn();

    render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      />
    );

    const rows = screen.getAllByRole('row');
    // rows[0] is the header row, rows[1] is first data row
    fireEvent.click(rows[1]);
    expect(onSelectionChange).toHaveBeenCalledWith([1], expect.any(Array));
  });

  it('supports controlled selection', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        selectionMode="multiple"
        selectedRows={[1, 3]}
      />
    );

    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0]).toHaveAttribute('data-selected', 'true');
    expect(rows[1]).not.toHaveAttribute('data-selected');
    expect(rows[2]).toHaveAttribute('data-selected', 'true');
  });

  // === Column Visibility tests ===

  it('hides columns based on hiddenColumns prop', () => {
    render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        hiddenColumns={['value']}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.queryByText('Value')).toBeNull();
  });

  it('toggles column visibility', () => {
    const onHiddenColumnsChange = jest.fn();

    const { rerender } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        hiddenColumns={[]}
        onHiddenColumnsChange={onHiddenColumnsChange}
      />
    );

    // Both columns visible
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();

    // Re-render with value column hidden
    rerender(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        hiddenColumns={['value']}
        onHiddenColumnsChange={onHiddenColumnsChange}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.queryByText('Value')).toBeNull();
  });

  // === Keyboard Navigation tests ===

  it('renders with keyboard navigation support when selectionMode is set', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        selectionMode="multiple"
        enableKeyboardNavigation
      />
    );

    // The component root should be focusable for keyboard navigation
    const root = container.querySelector('[tabindex="0"]');
    expect(root).toBeTruthy();
  });

  it('does not have tabindex when keyboard navigation is disabled', () => {
    const { container } = render(
      <ListViewTable columns={testColumns as any} data={testData} rowKey="id" height={300} />
    );

    const focusable = container.querySelector('[tabindex="0"]');
    expect(focusable).toBeNull();
  });

  // === tableProps pass-through ===

  it('passes additional props via tableProps', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={300}
        tableProps={{ 'data-testid': 'inner-table' } as any}
      />
    );

    expect(container.querySelector('[data-testid="inner-table"]')).toBeTruthy();
  });

  // === Responsive Props tests ===

  it('renders with responsive height prop (object)', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={{ base: 200, sm: 300, md: 400 }}
      />
    );
    // Should render a <style> tag with CSS variables from ListViewTableMediaVariables
    const styleTags = container.querySelectorAll('style');
    const styleContent = Array.from(styleTags)
      .map((s) => s.textContent)
      .join('');
    expect(styleContent).toContain('--list-view-height');
  });

  it('renders with responsive font and spacing props', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        horizontalSpacing={{ base: 'xs', md: 'sm' }}
        verticalSpacing={{ base: 'xs', md: 'sm' }}
        headerTitleFontSize={{ base: 'xs', md: 'sm' }}
        cellFontSize={{ base: 'xs', md: 'sm' }}
        cellFontWeight={{ base: 400, lg: 500 }}
      />
    );
    const styleTags = container.querySelectorAll('style');
    const styleContent = Array.from(styleTags)
      .map((s) => s.textContent)
      .join('');
    expect(styleContent).toContain('--list-view-horizontal-spacing');
    expect(styleContent).toContain('--list-view-cell-font-size');
  });

  it('renders with scalar (non-responsive) props without errors', () => {
    const { container } = render(
      <ListViewTable
        columns={testColumns as any}
        data={testData}
        rowKey="id"
        height={400}
        width="100%"
        horizontalSpacing="md"
        verticalSpacing="sm"
        headerTitleFontSize="sm"
        cellFontSize="xs"
      />
    );
    expect(container.querySelector('table')).toBeTruthy();
  });

  describe('pinned columns', () => {
    const pinnedColumns = [
      { key: 'name', title: 'Name', sticky: 'left' as const },
      { key: 'value', title: 'Value' },
      { key: 'tags', title: 'Tags' },
      { key: 'actions', title: 'Actions', sticky: 'right' as const },
    ];

    const pinnedData = [
      { id: 1, name: 'A', value: 'v1', tags: 't1', actions: 'open' },
      { id: 2, name: 'B', value: 'v2', tags: 't2', actions: 'open' },
    ];

    it('attaches data-sticky-side="left" to columns with sticky="left"', () => {
      const { container } = render(
        <ListViewTable columns={pinnedColumns as any} data={pinnedData} rowKey="id" />
      );
      const leftHeader = container.querySelector('th[data-column-key="name"]');
      expect(leftHeader?.getAttribute('data-sticky-side')).toBe('left');
    });

    it('attaches data-sticky-side="right" to columns with sticky="right"', () => {
      const { container } = render(
        <ListViewTable columns={pinnedColumns as any} data={pinnedData} rowKey="id" />
      );
      const rightHeader = container.querySelector('th[data-column-key="actions"]');
      expect(rightHeader?.getAttribute('data-sticky-side')).toBe('right');
    });

    it('treats sticky=true as sticky="left" for backward compatibility', () => {
      const cols = [
        { key: 'name', title: 'Name', sticky: true },
        { key: 'value', title: 'Value' },
      ];
      const { container } = render(
        <ListViewTable columns={cols as any} data={pinnedData} rowKey="id" />
      );
      const header = container.querySelector('th[data-column-key="name"]');
      expect(header?.getAttribute('data-sticky-side')).toBe('left');
    });

    it('renders the shadow span only on the last sticky-left and first sticky-right columns', () => {
      const { container } = render(
        <ListViewTable columns={pinnedColumns as any} data={pinnedData} rowKey="id" />
      );
      // Only one shadow per side per row (header + body × 2 rows = 3 of each side)
      const leftShadows = container.querySelectorAll('[data-side="left"]');
      const rightShadows = container.querySelectorAll('[data-side="right"]');
      // 1 header + 2 body rows = 3 each
      expect(leftShadows.length).toBe(3);
      expect(rightShadows.length).toBe(3);
    });

    it('does not render shadows when no column is sticky', () => {
      const { container } = render(
        <ListViewTable columns={testColumns as any} data={testData} rowKey="id" />
      );
      expect(container.querySelectorAll('[data-side="left"]').length).toBe(0);
      expect(container.querySelectorAll('[data-side="right"]').length).toBe(0);
    });
  });
});
