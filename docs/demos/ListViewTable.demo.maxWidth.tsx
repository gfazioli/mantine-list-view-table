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
    width: 400, // Large initial width
    maxWidth: 250, // But maximum width of 250px (will override width)
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 200, // Large initial width
    maxWidth: 120, // But maximum width of 120px (will override width)
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
    maxWidth: 180, // Maximum width of 180px (auto width)
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    textAlign: 'right' as const,
    width: 100, // This is within maxWidth, so will be kept
    maxWidth: 200, // Maximum width of 200px
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
    width: 400, // Large initial width
    maxWidth: 250, // But maximum width of 250px (will override width)
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 200, // Large initial width
    maxWidth: 120, // But maximum width of 120px (will override width)
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
    maxWidth: 180, // Maximum width of 180px (auto width)
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    textAlign: 'right',
    width: 100, // This is within maxWidth, so will be kept
    maxWidth: 200, // Maximum width of 200px
  },
];
`;

export const maxWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataFilesExtendedCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
