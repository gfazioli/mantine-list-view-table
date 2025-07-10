import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = [
  { id: 1, name: 'Documents', type: 'folder', size: '--', modified: '2024-06-01', kind: 'Folder' },
  {
    id: 2,
    name: 'README.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
  },
  { id: 4, name: 'src', type: 'folder', size: '--', modified: '2024-06-04', kind: 'Folder' },
  {
    id: 5,
    name: 'image.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image',
  },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    minWidth: 200, // Minimum width of 200px
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 80, // Small initial width, but will be adjusted to minWidth
    minWidth: 150, // But minimum width of 150px (will override width)
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size',
    sortable: true,
    textAlign: 'right' as const,
    width: 60, // Very small initial width, but will be adjusted to minWidth
    minWidth: 150, // But minimum width of 150px (will override width)
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 300, // Large initial width, but will be adjusted to maxWidth
    maxWidth: 220, // Maximum width of 220px (will override width)
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
  { id: 1, name: 'Documents', type: 'folder', size: '--', modified: '2024-06-01', kind: 'Folder' },
  { id: 2, name: 'README.md', type: 'file', size: '2.1 KB', modified: '2024-06-02', kind: 'Markdown' },
  { id: 3, name: 'package.json', type: 'file', size: '1.8 KB', modified: '2024-06-03', kind: 'JSON' },
  { id: 4, name: 'src', type: 'folder', size: '--', modified: '2024-06-04', kind: 'Folder' },
  { id: 5, name: 'image.png', type: 'file', size: '45.2 KB', modified: '2024-06-05', kind: 'PNG Image' },
];

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    minWidth: 200, // Minimum width of 200px
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 80, // Small initial width, but will be adjusted to minWidth
    minWidth: 150, // But minimum width of 150px (will override width)
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size',
    sortable: true,
    textAlign: 'right',
    width: 60, // Very small initial width, but will be adjusted to minWidth
    minWidth: 150, // But minimum width of 150px (will override width)
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 300, // Large initial width, but will be adjusted to maxWidth
    maxWidth: 220, // Maximum width of 220px (will override width)
  },
];
`;

export const minWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
