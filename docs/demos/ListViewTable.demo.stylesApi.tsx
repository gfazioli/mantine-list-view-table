import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { ListViewTableStylesApi } from '../styles-api/ListViewTable.styles-api';

const data = [
  { id: 1, name: 'File.txt', kind: 'Text Document', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', kind: 'PNG Image', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', kind: 'MPEG-4 Movie', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', kind: 'PDF Document', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', kind: 'ZIP Archive', modified: '2024-06-05' },
  { id: 6, name: 'Spreadsheet.xlsx', kind: 'Excel Spreadsheet', modified: '2024-06-06' },
  { id: 7, name: 'Presentation.pptx', kind: 'PowerPoint', modified: '2024-06-07' },
  { id: 8, name: 'Audio.mp3', kind: 'MP3 Audio', modified: '2024-06-08' },
  { id: 9, name: 'Script.js', kind: 'JavaScript File', modified: '2024-06-09' },
];

// Two columns are enough to exercise the bulk of the Styles API
// selectors listed below: a sticky-left first column (renders
// `stickyColumn` / `stickyHeaderColumn`) plus a regular column with a
// custom `renderCell`. Reordering renders `dragHandle`,
// multi-selection plus keyboard nav exercise `selectedRow` /
// `focusedRow`, and `scrollProps.maxHeight` puts the table inside a
// vertical `scrollViewport` so the `header` drop shadow can engage on
// scroll. Column resizing is intentionally *not* enabled here:
// Chromium ignores explicit `<th>` widths on `position: sticky` cells
// under `table-layout: fixed`, so the resize handle doesn't reflect
// the dragged width on this configuration. The other resize-focused
// demos (`Resize Mode`, `Auto-Fit Columns`, `Configurator`) cover the
// `resizeHandle` selector instead.
const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
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
    sticky: 'left',
    renderCell: (row) => (
      <Stack gap={0}>
        <Text size="sm" fw={500}>{row.name}</Text>
        <Text size="xs" c="dimmed">{row.kind}</Text>
      </Stack>
    ),
  },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
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
        scrollProps={{ maxHeight: 280 }}
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
      scrollProps={{ maxHeight: 280 }}
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
