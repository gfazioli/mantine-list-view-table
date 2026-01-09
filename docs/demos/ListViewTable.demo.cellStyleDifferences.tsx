import { ListViewTable, type ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width and require truncation with ellipsis',
    type: 'folder',
    size: '--',
    modified: '2024-06-01',
    kind: 'Folder',
    description:
      'This is a very long description that demonstrates how text can be truncated with ellipsis when the column is too narrow to fit all the content. The header and cell can have different text wrapping behavior.',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated_differently_in_header_vs_cell.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown Document',
    description:
      'A comprehensive guide explaining all the features and functionality of this component library with detailed examples and use cases that span multiple lines.',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
    description: 'Configuration file for project dependencies',
  },
  {
    id: 4,
    name: 'src',
    type: 'folder',
    size: '--',
    modified: '2024-06-04',
    kind: 'Folder',
    description:
      'Source code directory containing all TypeScript files and components for the application',
  },
  {
    id: 5,
    name: 'my_vacation_photos_from_summer_2024_trip_to_europe_including_italy_france_and_spain_with_beautiful_landscapes.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image File',
    description:
      'High resolution image file containing memories from vacation with detailed metadata',
  },
];

const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (Header: noWrap, Cell: wrap with ellipsis)',
    sortable: true,
    width: 200,
    // Header styling: TH will have noWrap to prevent header text wrapping
    noWrap: true, // This applies to TH header
    ellipsis: false, // No ellipsis in header
    // Cell styling: TD will allow wrapping but with ellipsis for overflow
    cellStyle: {
      whiteSpace: 'normal', // Override noWrap for TD cells - allow wrapping
      textOverflow: 'ellipsis', // Add ellipsis for TD cells
      overflow: 'hidden',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'description',
    title: 'Description (Header: ellipsis, Cell: normal wrap)',
    sortable: true,
    width: 220,
    // Header styling: TH will have ellipsis and noWrap
    ellipsis: true,
    noWrap: true,
    // Cell styling: TD will allow normal text wrapping without ellipsis
    cellStyle: {
      whiteSpace: 'normal', // Allow text wrapping in cells
      textOverflow: 'clip', // No ellipsis in cells
      overflow: 'visible',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'kind',
    title: 'Kind (Header: wrap, Cell: noWrap + ellipsis)',
    sortable: true,
    width: 140,
    // Header styling: TH will allow wrapping
    noWrap: false,
    ellipsis: false,
    // Cell styling: TD will have noWrap and ellipsis
    cellStyle: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    renderCell: (record: any) => (
      <Badge
        variant="light"
        color={record.type === 'folder' ? 'blue' : 'gray'}
        size="sm"
        style={{ maxWidth: '100%' }}
        title={record.kind}
      >
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size (Same style for header and cell)',
    sortable: true,
    textAlign: 'right' as const,
    width: 100,
    // Both header and cell use the same default styling
    noWrap: true,
    ellipsis: true,
  },
  {
    key: 'modified',
    title: 'Modified (Custom cell background)',
    sortable: true,
    width: 120,
    ellipsis: true,
    noWrap: true,
    // Cell styling: Add background color and padding
    cellStyle: (record: any) => ({
      backgroundColor:
        record.type === 'folder' ? 'var(--mantine-color-blue-0)' : 'var(--mantine-color-gray-0)',
      fontWeight: record.type === 'folder' ? 600 : 400,
      padding: '8px 12px',
      borderRadius: '4px',
      margin: '2px 0',
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
      onColumnResize={(columnKey, width) => {
        // eslint-disable-next-line no-console
        console.log(`Column '${columnKey}' resized to: ${width}px`);
      }}
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
      onColumnResize={(columnKey, width) => {
        console.log(\`Column '\${columnKey}' resized to: \${width}px\`);
      }}
    />
  );
}
`;

const dataCode = `export const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width and require truncation with ellipsis',
    type: 'folder',
    size: '--',
    modified: '2024-06-01',
    kind: 'Folder',
    description:
      'This is a very long description that demonstrates how text can be truncated with ellipsis when the column is too narrow to fit all the content. The header and cell can have different text wrapping behavior.',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated_differently_in_header_vs_cell.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown Document',
    description:
      'A comprehensive guide explaining all the features and functionality of this component library with detailed examples and use cases that span multiple lines.',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
    description: 'Configuration file for project dependencies',
  },
  {
    id: 4,
    name: 'src',
    type: 'folder',
    size: '--',
    modified: '2024-06-04',
    kind: 'Folder',
    description:
      'Source code directory containing all TypeScript files and components for the application',
  },
  {
    id: 5,
    name: 'my_vacation_photos_from_summer_2024_trip_to_europe_including_italy_france_and_spain_with_beautiful_landscapes.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image File',
    description:
      'High resolution image file containing memories from vacation with detailed metadata',
  },
];

`;

const columnsCode = `
import type { ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';

export const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (Header: noWrap, Cell: wrap with ellipsis)',
    sortable: true,
    width: 200,
    // Header styling: TH will have noWrap to prevent header text wrapping
    noWrap: true, // This applies to TH header
    ellipsis: false, // No ellipsis in header
    // Cell styling: TD will allow wrapping but with ellipsis for overflow
    cellStyle: {
      whiteSpace: 'normal', // Override noWrap for TD cells - allow wrapping
      textOverflow: 'ellipsis', // Add ellipsis for TD cells
      overflow: 'hidden',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'description',
    title: 'Description (Header: ellipsis, Cell: normal wrap)',
    sortable: true,
    width: 220,
    // Header styling: TH will have ellipsis and noWrap
    ellipsis: true,
    noWrap: true,
    // Cell styling: TD will allow normal text wrapping without ellipsis
    cellStyle: {
      whiteSpace: 'normal', // Allow text wrapping in cells
      textOverflow: 'clip', // No ellipsis in cells
      overflow: 'visible',
      lineHeight: '1.2em',
    },
  },
  {
    key: 'kind',
    title: 'Kind (Header: wrap, Cell: noWrap + ellipsis)',
    sortable: true,
    width: 140,
    // Header styling: TH will allow wrapping
    noWrap: false,
    ellipsis: false,
    // Cell styling: TD will have noWrap and ellipsis
    cellStyle: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    renderCell: (record: any) => (
      <Badge
        variant="light"
        color={record.type === 'folder' ? 'blue' : 'gray'}
        size="sm"
        style={{ maxWidth: '100%' }}
        title={record.kind}
      >
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size (Same style for header and cell)',
    sortable: true,
    textAlign: 'right' as const,
    width: 100,
    // Both header and cell use the same default styling
    noWrap: true,
    ellipsis: true,
  },
  {
    key: 'modified',
    title: 'Modified (Custom cell background)',
    sortable: true,
    width: 120,
    ellipsis: true,
    noWrap: true,
    // Cell styling: Add background color and padding
    cellStyle: (record: any) => ({
      backgroundColor:
        record.type === 'folder' ? 'var(--mantine-color-blue-0)' : 'var(--mantine-color-gray-0)',
      fontWeight: record.type === 'folder' ? 600 : 400,
      padding: '8px 12px',
      borderRadius: '4px',
      margin: '2px 0',
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
  ],
};
