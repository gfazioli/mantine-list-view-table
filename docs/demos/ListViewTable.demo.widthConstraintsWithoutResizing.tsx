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
    title: 'Name (Auto)',
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind (Auto)',
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size (Auto)',
    textAlign: 'right' as const,
  },
  {
    key: 'modified',
    title: 'Modified (Fixed 100px)',
    width: 100, // Fixed width at 100px
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
      enableColumnReordering={false}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
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
      enableColumnReordering={false}
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
    title: 'Name (Auto)',
    // No width specified - uses auto width
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind (Auto)',
    // No width specified - uses auto width
    renderCell: (record: any) => (
      <Badge variant="light" color={record.type === 'folder' ? 'blue' : 'gray'} size="sm">
        {record.kind}
      </Badge>
    ),
  },
  {
    key: 'size',
    title: 'Size (Auto)',
    textAlign: 'right',
    // No width specified - uses auto width
  },
  {
    key: 'modified',
    title: 'Modified (Fixed 100px)',
    width: 100, // Fixed width at 100px
  },
];
`;

export const widthConstraintsWithoutResizing: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
