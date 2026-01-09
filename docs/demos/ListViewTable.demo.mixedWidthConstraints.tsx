import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { dataFilesExtended, dataFilesExtendedCode } from './data-files-extended';

const data = dataFilesExtended;

const columns = [
  {
    key: 'name',
    title: 'Name (Auto)',
  },
  {
    key: 'kind',
    title: 'Kind (120px)',
    width: 120, // Fixed width at 120px
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
    title: 'Modified (200px)',
    textAlign: 'right' as const,
    width: 200, // Fixed width at 200px
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

const columnsCode = `import { Badge } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name (Auto)',
  },
  {
    key: 'kind',
    title: 'Kind (120px)',
    width: 120, // Fixed width at 120px
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
  },
  {
    key: 'modified',
    title: 'Modified (200px)',
    textAlign: 'right',
    width: 200, // Fixed width at 200px
  },
];
`;

export const mixedWidthConstraints: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
