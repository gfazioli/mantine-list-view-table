import { ListViewTable, ListViewTableProps } from '@gfazioli/mantine-list-view-table';
import { Badge, Center, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = [
  { id: 1, name: 'File.txt', size: '12 KB', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', size: '2 MB', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', size: '125 MB', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', size: '500 KB', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', size: '1.5 GB', modified: '2024-06-05' },
  { id: 6, name: 'Spreadsheet.xlsx', size: '300 KB', modified: '2024-06-06' },
  { id: 7, name: 'Presentation.pptx', size: '2 MB', modified: '2024-06-07' },
  { id: 8, name: 'Audio.mp3', size: '5 MB', modified: '2024-06-08' },
  { id: 9, name: 'Script.js', size: '15 KB', modified: '2024-06-09' },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    renderCell: (row: any) => <Text fw={500}>{row.name}</Text>,
  },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo(props: Omit<ListViewTableProps, 'columns' | 'data'>) {
  return (
    <Center w={520}>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        onRowClick={(row) => {
          // eslint-disable-next-line no-console
          console.log('Clicked:', row.name);
        }}
        {...props}
      />
    </Center>
  );
}

const code = `
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
import [data, columns] from './data';


function Demo() {
  return (
    <ListViewTable
      columns={columns}
      data={data}
      rowKey="id"
      onRowClick={(row) => console.log('Clicked:', row.name)}
      {{props}}
    />
  );
}
`;

const dataCode = `
export const data = [
  { id: 1, name: 'File.txt', size: '12 KB', modified: '2024-06-01' },
  { id: 2, name: 'Image.png', size: '2 MB', modified: '2024-06-02' },
  { id: 3, name: 'Video.mp4', size: '125 MB', modified: '2024-06-03' },
  { id: 4, name: 'Document.pdf', size: '500 KB', modified: '2024-06-04' },
  { id: 5, name: 'Archive.zip', size: '1.5 GB', modified: '2024-06-05' },
  { id: 6, name: 'Spreadsheet.xlsx', size: '300 KB', modified: '2024-06-06' },
  { id: 7, name: 'Presentation.pptx', size: '2 MB', modified: '2024-06-07' },
  { id: 8, name: 'Audio.mp3', size: '5 MB', modified: '2024-06-08' },
  { id: 9, name: 'Script.js', size: '15 KB', modified: '2024-06-09' },
];

export const columns = [
  { 
    key: 'name', 
    title: 'Name', 
    sortable: true,
    renderCell: (row) => <Text fw={500}>{row.name}</Text>
  },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' },
  { 
    key: 'modified', 
    title: 'Modified', 
    sortable: true,
    renderCell: (row) => <Badge variant="light">{row.modified}</Badge>
  },
];
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
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
      prop: 'enableColumnReordering',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'enableColumnResizing',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
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
      prop: 'height',
      type: 'number',
      initialValue: 400,
      libraryValue: 'auto',
      min: 200,
      max: 800,
      step: 50,
    },
    {
      prop: 'stripedColor',
      type: 'color',
      initialValue: '#f0f0f0',
      libraryValue: '#f0f0f0',
    },
  ],
};
