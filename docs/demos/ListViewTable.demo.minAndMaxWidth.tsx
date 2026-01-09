import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { dataFilesExtended, dataFilesExtendedCode } from './data-files-extended';

const data = dataFilesExtended;

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: 50, // Too small, will be adjusted to minWidth
    minWidth: 150,
    maxWidth: 300,
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 500, // Too large, will be adjusted to maxWidth
    minWidth: 80,
    maxWidth: 120,
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
    width: 130, // Perfect, within min and max
    minWidth: 120,
    maxWidth: 150,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    textAlign: 'right' as const,
    minWidth: 120,
    maxWidth: 400, // Auto width, should respect both constraints
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
      enableColumnResizing
      onColumnResize={(columnKey, width) => {
        console.log(\`Column '\${columnKey}' resized to: \${width}px\`);
      }}
    />
  );
}
`;

const columnsCode = `import { Badge } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    minWidth: 150, // Minimum width of 150px
    maxWidth: 300, // Maximum width of 300px
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
    minWidth: 100, // Minimum width of 100px
    maxWidth: 180, // Maximum width of 180px
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
    minWidth: 80, // Minimum width of 80px
    maxWidth: 150, // Maximum width of 150px
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    textAlign: 'right',
    width: 120,
    minWidth: 100, // Minimum width of 100px
    maxWidth: 200, // Maximum width of 200px
  },
];
`;

export const minAndMaxWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
