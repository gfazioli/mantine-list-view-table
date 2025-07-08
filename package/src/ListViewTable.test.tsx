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
});
