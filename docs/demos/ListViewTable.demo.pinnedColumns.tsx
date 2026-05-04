import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { dataFilesExtended } from './data-files-extended';

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: 200,
    sticky: 'left' as const,
  },
  { key: 'kind', title: 'Kind', sortable: true, width: 140 },
  { key: 'size', title: 'Size', sortable: true, width: 120 },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    width: 180,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
  {
    key: 'extra1',
    title: 'Owner',
    width: 150,
    renderCell: () => <Text size="sm">Jamie Chen</Text>,
  },
  {
    key: 'extra2',
    title: 'Tags',
    width: 150,
    renderCell: () => <Text size="sm">draft · final</Text>,
  },
  {
    key: 'extra3',
    title: 'Project',
    width: 180,
    renderCell: () => <Text size="sm">Acme Q3 launch</Text>,
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 110,
    sticky: 'right' as const,
    textAlign: 'center' as const,
    renderCell: () => (
      <Badge variant="filled" color="blue">
        Open
      </Badge>
    ),
  },
];

function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={dataFilesExtended}
      rowKey="id"
      withTableBorder
      borderRadius="md"
      withColumnBorders
      highlightOnHover
      scrollProps={{ minWidth: 1300 }}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
import { data } from './data';

const columns = [
  // Pin the leftmost column to the left edge
  { key: 'name',     title: 'Name',     width: 200, sticky: 'left' },
  { key: 'kind',     title: 'Kind',     width: 140 },
  { key: 'size',     title: 'Size',     width: 120 },
  { key: 'modified', title: 'Modified', width: 180 },
  { key: 'extra1',   title: 'Owner',    width: 150 },
  { key: 'extra2',   title: 'Tags',     width: 150 },
  { key: 'extra3',   title: 'Project',  width: 180 },
  // Pin the rightmost column to the right edge
  {
    key: 'actions',
    title: 'Actions',
    width: 110,
    sticky: 'right',
    textAlign: 'center',
    renderCell: () => <Badge variant="filled" color="blue">Open</Badge>,
  },
];

function Demo() {
  return (
    // Built-in scroll wrapper with a fixed outer border + border-radius —
    // no need to wrap in Table.ScrollContainer.
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      borderRadius="md"
      withColumnBorders
      highlightOnHover
      scrollProps={{ minWidth: 1300 }}
    />
  );
}
`;

export const pinnedColumns: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
