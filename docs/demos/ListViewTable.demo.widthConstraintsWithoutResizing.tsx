import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { dataFilesExtended } from './data-files-extended';

const data = dataFilesExtended;

const columns = [
  {
    key: 'name',
    title: 'Name (Auto)',
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
    title: 'Modified (Fixed 250px)',
    textAlign: 'right' as const,
    width: 250, // Fixed width at 250px
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
`;

const columnsCode = `import { Badge } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name (Auto)',
    // No width specified - uses auto width
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
    textAlign: 'right',    
    width: 250, // Fixed width at 250px
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
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
