import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, ScrollArea, Text } from '@mantine/core';
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
  {
    id: 6,
    name: 'video.mp4',
    type: 'file',
    size: '12.5 MB',
    modified: '2024-06-06',
    kind: 'Video',
  },
  {
    id: 7,
    name: 'archive.zip',
    type: 'file',
    size: '3.4 MB',
    modified: '2024-06-07',
    kind: 'ZIP Archive',
  },
  { id: 8, name: 'Downloads', type: 'folder', size: '--', modified: '2024-06-08', kind: 'Folder' },
  {
    id: 9,
    name: 'notes.txt',
    type: 'file',
    size: '1.2 KB',
    modified: '2024-06-09',
    kind: 'Text File',
  },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
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
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];

function Demo() {
  return (
    <ScrollArea h={250}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        stickyHeader
        onRowClick={(record) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', record.name);
        }}
      />
    </ScrollArea>
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, ScrollArea, Text } from '@mantine/core';
import [ data, columns ] from './data';

function Demo() {
  return (
    <ScrollArea h={250}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        stickyHeader
        onRowClick={(record) => {
          console.log('Clicked:', record.name);
        }}
      />
    </ScrollArea>
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
  { id: 6, name: 'video.mp4', type: 'file', size: '12.5 MB', modified: '2024-06-06', kind: 'Video' },
  { id: 7, name: 'archive.zip', type: 'file', size: '3.4 MB', modified: '2024-06-07', kind: 'ZIP Archive' },
  { id: 8, name: 'Downloads', type: 'folder', size: '--', modified: '2024-06-08', kind: 'Folder' },
  { id: 9, name: 'notes.txt', type: 'file', size: '1.2 KB', modified: '2024-06-09', kind: 'Text File' },
];

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
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
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];
`;

export const scrollArea: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
