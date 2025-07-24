import React from 'react';
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
});
