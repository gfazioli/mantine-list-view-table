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
    minWidth: 200, // Minimum width of 200px
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
    textAlign: 'right' as const,
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
    minWidth: 200, // Minimum width of 200px
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
    textAlign: 'right',
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
    { fileName: 'data.ts', code: dataFilesExtendedCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
