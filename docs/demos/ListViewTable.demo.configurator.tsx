import { ListViewTable, ListViewTableProps } from '@gfazioli/mantine-list-view-table';
import { Badge, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    // Multi-line content to make verticalAlign visible
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
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

const columnsCode = `import { Badge, Stack, Text } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    renderCell: (row: any) => (
      <Stack gap={0}>
        <Text size="sm" fw={500}>{row.name}</Text>
        <Text size="xs" c="dimmed">{row.kind}</Text>
      </Stack>
    ),
  },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];`;

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
  { id: 8, name: 'Audio.mp3', kind: 'MP3 Audio', size: '5 MB', modified: '2024-06-08' },
  { id: 9, name: 'Script.js', kind: 'JavaScript File', size: '15 KB', modified: '2024-06-09' },
];

const dataCode = `
export const data = [
  { id: 1, name: 'File.txt', kind: 'Text Document', size: '12 KB', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', kind: 'PNG Image', size: '2 MB', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', kind: 'MPEG-4 Movie', size: '125 MB', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', kind: 'PDF Document', size: '500 KB', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', kind: 'ZIP Archive', size: '1.5 GB', modified: '2024-06-05' },
  { id: 6, name: 'Spreadsheet.xlsx', kind: 'Excel Spreadsheet', size: '300 KB', modified: '2024-06-06' },
  { id: 7, name: 'Presentation.pptx', kind: 'PowerPoint', size: '2 MB', modified: '2024-06-07' },
  { id: 8, name: 'Audio.mp3', kind: 'MP3 Audio', size: '5 MB', modified: '2024-06-08' },
  { id: 9, name: 'Script.js', kind: 'JavaScript File', size: '15 KB', modified: '2024-06-09' },
];`;

function Demo(props: Omit<ListViewTableProps, 'columns' | 'data'>) {
  // Convert empty string from configurator select to undefined
  const { selectionMode, ...rest } = props;
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      selectionMode={selectionMode || undefined}
      onRowClick={(row) => {
        // eslint-disable-next-line no-console
        console.log('Clicked:', row.name);
      }}
      {...rest}
    />
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { data } from './data';
import { columns } from './columns';


function Demo() {
  return (
    <ListViewTable{{props}}
      columns={columns}
      data={data}
      rowKey="id"
      onRowClick={(row) => console.log('Clicked:', row.name)}
    />
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
  controls: [
    {
      prop: 'withTableBorder',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withColumnBorders',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withRowBorders',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'striped',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'highlightOnHover',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'noWrap',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'tabularNums',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'enableColumnReordering',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'enableColumnResizing',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'resizeMode',
      type: 'select',
      data: [
        { value: 'standard', label: 'standard' },
        { value: 'finder', label: 'finder' },
      ],
      initialValue: 'standard',
      libraryValue: 'standard',
    },
    {
      prop: 'horizontalSpacing',
      type: 'select',
      data: [
        { value: 'xs', label: 'xs' },
        { value: 'sm', label: 'sm' },
        { value: 'md', label: 'md' },
        { value: 'lg', label: 'lg' },
        { value: 'xl', label: 'xl' },
      ],
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'verticalSpacing',
      type: 'select',
      data: [
        { value: 'xs', label: 'xs' },
        { value: 'sm', label: 'sm' },
        { value: 'md', label: 'md' },
        { value: 'lg', label: 'lg' },
        { value: 'xl', label: 'xl' },
      ],
      initialValue: 'xs',
      libraryValue: 'xs',
    },
    {
      prop: 'verticalAlign',
      type: 'select',
      data: [
        { value: 'top', label: 'top' },
        { value: 'middle', label: 'middle' },
        { value: 'bottom', label: 'bottom' },
      ],
      initialValue: 'middle',
      libraryValue: 'middle',
    },
    {
      prop: 'selectionMode',
      type: 'select',
      data: [
        { value: '', label: 'none' },
        { value: 'single', label: 'single' },
        { value: 'multiple', label: 'multiple' },
      ],
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'stripedColor',
      type: 'color',
      initialValue: '',
      libraryValue: '',
    },
  ],
};
