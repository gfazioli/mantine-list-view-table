import { ListViewTable, type ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { MantineDemo } from '@mantinex/demo';
import { dataFilesWithDescription } from './data-files-with-description';

const data = dataFilesWithDescription;

const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (Header: noWrap, Cell: wrap)',
    sortable: true,
    // Header: noWrap keeps the title on one line
    noWrap: true,
    ellipsis: false,
    // Cell: override to allow wrapping with ellipsis
    cellStyle: {
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'description',
    title: 'Description (Header: ellipsis, Cell: wrap)',
    sortable: true,
    // Header: truncated with ellipsis
    ellipsis: true,
    noWrap: true,
    // Cell: normal wrapping, no truncation
    cellStyle: {
      whiteSpace: 'normal',
      textOverflow: 'clip',
      overflow: 'visible',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'modified',
    title: 'Modified (dynamic cellStyle)',
    sortable: true,
    ellipsis: true,
    noWrap: true,
    // Dynamic cell background based on data
    cellStyle: (record: any) => ({
      backgroundColor:
        record.type === 'folder' ? 'var(--mantine-color-blue-0)' : 'var(--mantine-color-gray-0)',
      fontWeight: record.type === 'folder' ? 600 : 400,
      padding: '8px 12px',
      borderRadius: '4px',
    }),
  },
];

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      enableColumnResizing
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data, columns } from './data';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      enableColumnResizing
    />
  );
}
`;

const dataCode = `export const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width',
    type: 'folder',
    modified: '2024-06-01',
    description: 'This is a very long description that demonstrates how text can be truncated differently in header vs cell.',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated.md',
    type: 'file',
    modified: '2024-06-02',
    description: 'A comprehensive guide explaining features and functionality with detailed examples.',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    modified: '2024-06-03',
    description: 'Configuration file for project dependencies',
  },
  {
    id: 4,
    name: 'src',
    type: 'folder',
    modified: '2024-06-04',
    description: 'Source code directory containing all TypeScript files and components',
  },
];
`;

const columnsCode = `
import type { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';

export const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (Header: noWrap, Cell: wrap)',
    sortable: true,
    noWrap: true,
    ellipsis: false,
    cellStyle: {
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'description',
    title: 'Description (Header: ellipsis, Cell: wrap)',
    sortable: true,
    ellipsis: true,
    noWrap: true,
    cellStyle: {
      whiteSpace: 'normal',
      textOverflow: 'clip',
      overflow: 'visible',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'modified',
    title: 'Modified (dynamic cellStyle)',
    sortable: true,
    ellipsis: true,
    noWrap: true,
    cellStyle: (record) => ({
      backgroundColor:
        record.type === 'folder' ? 'var(--mantine-color-blue-0)' : 'var(--mantine-color-gray-0)',
      fontWeight: record.type === 'folder' ? 600 : 400,
      padding: '8px 12px',
      borderRadius: '4px',
    }),
  },
];
`;

export const cellStyleDifferences: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
