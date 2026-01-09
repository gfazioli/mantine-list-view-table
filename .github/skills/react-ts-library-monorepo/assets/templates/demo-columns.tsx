import { Badge } from '@mantine/core';

/**
 * Demo columns file
 *
 * Define table columns for demos with consistent formatting and rendering.
 * Export both the actual columns and the code string for documentation.
 */

export interface ColumnDefinition {
  accessor: string;
  title: string;
  textAlign?: 'left' | 'center' | 'right';
  width?: number | string;
  render?: (value: any) => React.ReactNode;
}

// Code string for documentation
export const columnsCode = `
import { Badge } from '@mantine/core';

export const columns = [
  {
    accessor: 'name',
    title: 'Name',
    width: 200,
  },
  {
    accessor: 'description',
    title: 'Description',
  },
  {
    accessor: 'value',
    title: 'Value',
    textAlign: 'right' as const,
    width: 100,
  },
  {
    accessor: 'status',
    title: 'Status',
    width: 120,
    render: (status: string) => (
      <Badge
        color={status === 'active' ? 'green' : status === 'inactive' ? 'gray' : 'yellow'}
        variant="light"
      >
        {status}
      </Badge>
    ),
  },
];
`;

// Actual columns
export const columns: ColumnDefinition[] = [
  {
    accessor: 'name',
    title: 'Name',
    width: 200,
  },
  {
    accessor: 'description',
    title: 'Description',
  },
  {
    accessor: 'value',
    title: 'Value',
    textAlign: 'right' as const,
    width: 100,
  },
  {
    accessor: 'status',
    title: 'Status',
    width: 120,
    render: (status: string) => (
      <Badge
        color={status === 'active' ? 'green' : status === 'inactive' ? 'gray' : 'yellow'}
        variant="light"
      >
        {status}
      </Badge>
    ),
  },
];
