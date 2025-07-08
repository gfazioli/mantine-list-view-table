import React from 'react';
import { ListViewTable, ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const data = [
  { id: 1, name: 'Documents', type: 'folder', size: '--', modified: '2024-06-01', kind: 'Folder' },
  {
    id: 2,
    name: 'README.md',
    type: 'file',
    size: '2.1 KB',
    modified: '2024-06-02',
    kind: 'Markdown',
  },
  {
    id: 3,
    name: 'package.json',
    type: 'file',
    size: '1.8 KB',
    modified: '2024-06-03',
    kind: 'JSON',
  },
  { id: 4, name: 'src', type: 'folder', size: '--', modified: '2024-06-04', kind: 'Folder' },
  {
    id: 5,
    name: 'image.png',
    type: 'file',
    size: '45.2 KB',
    modified: '2024-06-05',
    kind: 'PNG Image',
  },
];

const initialColumns: ListViewTableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    sticky: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
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
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];

function Demo() {
  const [currentColumns, setCurrentColumns] = React.useState(initialColumns);

  const handleColumnReorder = (fromIndex: number, toIndex: number) => {
    const newColumns = [...currentColumns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setCurrentColumns(newColumns);
    console.log('Column reordered from', fromIndex, 'to', toIndex);
  };

  const handleColumnResize = (columnKey: string, width: number) => {
    console.log('Column resized:', columnKey, 'to width:', width);
  };

  return (
    <ListViewTable
      columns={currentColumns}
      data={data}
      rowKey="id"
      withTableBorder
      highlightOnHover
      enableColumnReordering
      enableColumnResizing
      onColumnReorder={handleColumnReorder}
      onColumnResize={handleColumnResize}
      onRowClick={(record) => {
        console.log('Clicked:', record.name);
      }}
    />
  );
}

const code = `
import { ListViewTable, ListViewTableColumn } from '@gfazioli/mantine-list-view-table';
import { Badge, Text } from '@mantine/core';
import React from 'react';
import [ data, initialColumns ] from './data';

function Demo() {
  const [currentColumns, setCurrentColumns] = React.useState(initialColumns);

  const handleColumnReorder = (fromIndex: number, toIndex: number) => {
    const newColumns = [...currentColumns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    setCurrentColumns(newColumns);
    console.log('Column reordered from', fromIndex, 'to', toIndex);
  };

  const handleColumnResize = (columnKey: string, width: number) => {
    console.log('Column resized:', columnKey, 'to width:', width);
  };

  return (
    <ListViewTable
      columns={currentColumns}
      data={data}
      rowKey="id"
      withTableBorder
      highlightOnHover
      enableColumnReordering
      enableColumnResizing
      onColumnReorder={handleColumnReorder}
      onColumnResize={handleColumnResize}
      onRowClick={(record) => {
        console.log('Clicked:', record.name);
      }}
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

export const initialColumns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    sticky: true,
    renderCell: (record: any) => (
      <Text fw={record.type === 'folder' ? 600 : 400}>{record.name}</Text>
    ),
  },
  {
    key: 'kind',
    title: 'Kind',
    sortable: true,
    width: 120,
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
    width: 180,
  },
  {
    key: 'modified',
    title: 'Date Modified',
    sortable: true,
    width: 120,
  },
];
`;

export const externalReorderingAndResizing: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
