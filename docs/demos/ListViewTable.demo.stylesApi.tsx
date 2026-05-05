import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { ListViewTableStylesApi } from '../styles-api/ListViewTable.styles-api';

const data = [
  { id: 1, name: 'File.txt', kind: 'Text Document', size: '12 KB', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', kind: 'PNG Image', size: '2 MB', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', kind: 'MPEG-4 Movie', size: '125 MB', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', kind: 'PDF Document', size: '500 KB', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', kind: 'ZIP Archive', size: '1.5 GB', modified: '2024-06-05' },
  {
    id: 6,
    name: 'Spreadsheet.xlsx',
    kind: 'Excel Spreadsheet',
    size: '300 KB',
    modified: '2024-06-06',
  },
  { id: 7, name: 'Presentation.pptx', kind: 'PowerPoint', size: '2 MB', modified: '2024-06-07' },
];

// Enabling the full feature set so every Styles API selector / modifier
// listed below is actually rendered: `dragHandle` (column reordering),
// `resizeHandle` (column resizing), `stickyColumn` /
// `stickyHeaderColumn` (a pinned column), `scrollViewport`
// (`scrollProps` wrapper), `selectedRow` and `focusedRow` (selection +
// keyboard navigation), `header` drop shadow (`stickyHeader`).
const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: 220,
    sticky: 'left' as const,
    renderCell: (row: any) => (
      <Stack gap={0}>
        <Text size="sm" fw={500}>
          {row.name}
        </Text>
        <Text size="xs" c="dimmed">
          {row.kind}
        </Text>
      </Stack>
    ),
  },
  { key: 'kind', title: 'Kind', sortable: true, width: 220 },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const, width: 200 },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    width: 220,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

const code = `
import { ListViewTable } from "@gfazioli/mantine-list-view-table";
import { Badge, Stack, Text } from '@mantine/core';
import { data } from './data';

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: 220,
    sticky: 'left',
    renderCell: (row) => (
      <Stack gap={0}>
        <Text size="sm" fw={500}>{row.name}</Text>
        <Text size="xs" c="dimmed">{row.kind}</Text>
      </Stack>
    ),
  },
  { key: 'kind', title: 'Kind', sortable: true, width: 220 },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right', width: 200 },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    width: 220,
    renderCell: (row) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo() {
  return (
      <ListViewTable{{props}}
        columns={columns}
        data={data}
        rowKey="id"
        withTableBorder
        borderRadius="md"
        highlightOnHover
        stickyHeader
        selectionMode="multiple"
        enableColumnReordering
        enableColumnResizing
        scrollProps={{ minWidth: 800, maxHeight: 320 }}
      />
  );
}
`;

function Demo(props: any) {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      withTableBorder
      borderRadius="md"
      highlightOnHover
      stickyHeader
      selectionMode="multiple"
      enableColumnReordering
      enableColumnResizing
      scrollProps={{ minWidth: 800, maxHeight: 320 }}
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: ListViewTableStylesApi,
  component: Demo,
  code,
};
