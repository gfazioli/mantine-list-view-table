import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Table, Text } from '@mantine/core';
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
    width: 200,
    sticky: true, // This column will remain visible during horizontal scroll
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 150,
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
    width: 120,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 180,
  },
  {
    key: 'extra1',
    title: 'Extra Column 1',
    width: 150,
    renderCell: () => <Text size="sm">Extra content 1</Text>,
  },
  {
    key: 'extra2',
    title: 'Extra Column 2',
    width: 150,
    renderCell: () => <Text size="sm">Extra content 2</Text>,
  },
  {
    key: 'extra3',
    title: 'Extra Column 3',
    width: 150,
    renderCell: () => <Text size="sm">Extra content 3</Text>,
  },
];

function Demo() {
  return (
    <Table.ScrollContainer minWidth={1200}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        enableColumnResizing={false}
      />
    </Table.ScrollContainer>
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Table, Text } from '@mantine/core';
import { data, columns } from './data';

function Demo() {
  return (
    <Table.ScrollContainer minWidth={1200}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        withTableBorder
        withColumnBorders
        highlightOnHover
        enableColumnResizing={false}
      />
    </Table.ScrollContainer>
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
    width: 200,
    sticky: true, // This column will remain visible during horizontal scroll
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 150, // Fixed width for horizontal scrolling
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
    width: 120, // Fixed width for horizontal scrolling
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 180, // Fixed width for horizontal scrolling
  },
  {
    key: 'extra1',
    title: 'Extra Column 1',
    width: 150, // Additional column to force horizontal scrolling
    renderCell: () => <Text size="sm">Extra content 1</Text>,
  },
  {
    key: 'extra2',
    title: 'Extra Column 2',
    width: 150, // Additional column to force horizontal scrolling
    renderCell: () => <Text size="sm">Extra content 2</Text>,
  },
  {
    key: 'extra3',
    title: 'Extra Column 3',
    width: 150, // Additional column to force horizontal scrolling
    renderCell: () => <Text size="sm">Extra content 3</Text>,
  },
];
`;

export const scrollContainerWithSticky: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
