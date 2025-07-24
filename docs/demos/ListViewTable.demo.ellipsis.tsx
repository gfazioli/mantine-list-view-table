import { ListViewTable, type ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width',
    type: 'folder',
    size: '--',
    modified: '2024-06-01',
    kind: 'Folder',
    description:
      'This is a very long description that demonstrates how text can be truncated with ellipsis when the column is too narrow to fit all the content.',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown',
    description:
      'A comprehensive guide explaining all the features and functionality of this component library with detailed examples and use cases.',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
    description: 'Configuration file',
  },
  {
    id: 4,
    name: 'src',
    type: 'folder',
    size: '--',
    modified: '2024-06-04',
    kind: 'Folder',
    description: 'Source code directory containing all TypeScript files and components',
  },
  {
    id: 5,
    name: 'my_vacation_photos_from_summer_2024_trip_to_europe_including_italy_france_and_spain.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image',
    description: 'High resolution image file containing memories from vacation',
  },
];

const columns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    width: 180,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: true, // Prevent text wrapping
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400} title={record.name}>
        {record.name}
      </Text>
    ),
  },
  {
    key: 'description',
    title: 'Description (ellipsis only)',
    sortable: true,
    width: 200,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: true,
    renderCell: (record: any) => (
      <Text size="sm" c="dimmed" title={record.description}>
        {record.description}
      </Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind (noWrap only)',
    sortable: true,
    width: 120,
    ellipsis: false, // Disable ellipsis
    noWrap: true, // Prevent text wrapping but allow cut-off
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size (default)',
    sortable: true,
    textAlign: 'right' as const,
    width: 80,
    // Default behavior: no ellipsis, wrapping allowed
  },
  {
    key: 'modified',
    title: 'Modified (ellipsis)',
    sortable: true,
    width: 100,
    ellipsis: true,
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
import { Badge, Text } from '@mantine/core';
import [ data, columns ] from './data';

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

const dataCode = `
export const data = [
  {
    id: 1,
    name: 'Very long document name that would normally overflow the column width',
    type: 'folder',
    size: '--',
    modified: '2024-06-01',
    kind: 'Folder',
    description: 'This is a very long description that demonstrates how text can be truncated with ellipsis when the column is too narrow to fit all the content.',
  },
  {
    id: 2,
    name: 'README_with_extremely_long_filename_that_should_be_truncated.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown',
    description: 'A comprehensive guide explaining all the features and functionality of this component library with detailed examples and use cases.',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
    description: 'Configuration file',
  },
  {
    id: 4,
    name: 'src',
    type: 'folder',
    size: '--',
    modified: '2024-06-04',
    kind: 'Folder',
    description: 'Source code directory containing all TypeScript files and components',
  },
  {
    id: 5,
    name: 'my_vacation_photos_from_summer_2024_trip_to_europe_including_italy_france_and_spain.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image',
    description: 'High resolution image file containing memories from vacation',
  },
];

export const columns = [
  {
    key: 'name',
    title: 'Name (ellipsis + noWrap)',
    sortable: true,
    width: 180,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: true, // Prevent text wrapping
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400} title={record.name}>
        {record.name}
      </Text>
    ),
  },
  {
    key: 'description',
    title: 'Description (ellipsis only)',
    sortable: true,
    width: 200,
    ellipsis: true, // Enable text truncation with ellipsis
    noWrap: false, // Allow text wrapping (default)
    renderCell: (record: any) => (
      <Text size="sm" c="dimmed" title={record.description}>
        {record.description}
      </Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind (noWrap only)',
    sortable: true,
    width: 120,
    ellipsis: false, // Disable ellipsis
    noWrap: true, // Prevent text wrapping but allow cut-off
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size (default)',
    sortable: true,
    textAlign: 'right',
    width: 80,
    // Default behavior: no ellipsis, wrapping allowed
  },
  {
    key: 'modified',
    title: 'Modified (ellipsis)',
    sortable: true,
    width: 100,
    ellipsis: true,
  },
];
`;

export const ellipsis: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
