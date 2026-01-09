import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
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
  {
    id: 10,
    name: 'node_modules',
    type: 'folder',
    size: '--',
    modified: '2024-06-10',
    kind: 'Folder',
  },
  { id: 11, name: 'dist', type: 'folder', size: '--', modified: '2024-06-11', kind: 'Folder' },
  { id: 12, name: 'LICENSE', type: 'file', size: '1.1 KB', modified: '2024-06-12', kind: 'Text' },
  {
    id: 13,
    name: '.gitignore',
    type: 'file',
    size: '0.5 KB',
    modified: '2024-06-13',
    kind: 'Text',
  },
  {
    id: 14,
    name: 'tsconfig.json',
    type: 'file',
    size: '2.3 KB',
    modified: '2024-06-14',
    kind: 'JSON',
  },
  {
    id: 15,
    name: 'vite.config.ts',
    type: 'file',
    size: '1.9 KB',
    modified: '2024-06-15',
    kind: 'TypeScript',
  },
  {
    id: 16,
    name: 'eslint.config.js',
    type: 'file',
    size: '0.8 KB',
    modified: '2024-06-16',
    kind: 'JavaScript',
  },
  {
    id: 17,
    name: 'yarn.lock',
    type: 'file',
    size: '456.7 KB',
    modified: '2024-06-17',
    kind: 'Lock File',
  },
  {
    id: 18,
    name: 'pnpm-lock.yaml',
    type: 'file',
    size: '234.1 KB',
    modified: '2024-06-18',
    kind: 'Lock File',
  },
  {
    id: 19,
    name: 'rollup.config.js',
    type: 'file',
    size: '3.2 KB',
    modified: '2024-06-19',
    kind: 'JavaScript',
  },
  {
    id: 20,
    name: 'jest.config.js',
    type: 'file',
    size: '1.4 KB',
    modified: '2024-06-20',
    kind: 'JavaScript',
  },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      stickyHeader
      stickyHeaderOffset={60}
      onRowClick={(record) => {
        // eslint-disable-next-line no-console
        console.log('Clicked:', record.name);
      }}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data } from './data';
import { columns } from './columns';

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      withColumnBorders
      highlightOnHover
      stickyHeader
      stickyHeaderOffset={60}
      onRowClick={(record) => {
        console.log('Clicked:', record.name);
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
  { id: 6, name: 'video.mp4', type: 'file', size: '12.5 MB', modified: '2024-06-06', kind: 'Video' },
  { id: 7, name: 'archive.zip', type: 'file', size: '3.4 MB', modified: '2024-06-07', kind: 'ZIP Archive' },
  { id: 8, name: 'Downloads', type: 'folder', size: '--', modified: '2024-06-08', kind: 'Folder' },
  { id: 9, name: 'notes.txt', type: 'file', size: '1.2 KB', modified: '2024-06-09', kind: 'Text File' },
  { id: 10, name: 'node_modules', type: 'folder', size: '--', modified: '2024-06-10', kind: 'Folder' },
  { id: 11, name: 'dist', type: 'folder', size: '--', modified: '2024-06-11', kind: 'Folder' },
  { id: 12, name: 'LICENSE', type: 'file', size: '1.1 KB', modified: '2024-06-12', kind: 'Text' },
  { id: 13, name: '.gitignore', type: 'file', size: '0.5 KB', modified: '2024-06-13', kind: 'Text' },
  { id: 14, name: 'tsconfig.json', type: 'file', size: '2.3 KB', modified: '2024-06-14', kind: 'JSON' },
  { id: 15, name: 'vite.config.ts', type: 'file', size: '1.9 KB', modified: '2024-06-15', kind: 'TypeScript' },
  { id: 16, name: 'eslint.config.js', type: 'file', size: '0.8 KB', modified: '2024-06-16', kind: 'JavaScript' },
  { id: 17, name: 'yarn.lock', type: 'file', size: '456.7 KB', modified: '2024-06-17', kind: 'Lock File' },
  { id: 18, name: 'pnpm-lock.yaml', type: 'file', size: '234.1 KB', modified: '2024-06-18', kind: 'Lock File' },
  { id: 19, name: 'rollup.config.js', type: 'file', size: '3.2 KB', modified: '2024-06-19', kind: 'JavaScript' },
  { id: 20, name: 'jest.config.js', type: 'file', size: '1.4 KB', modified: '2024-06-20', kind: 'JavaScript' },
];
`;

const columnsCode = `import { Badge, Text } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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

export const stickyHeader: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
