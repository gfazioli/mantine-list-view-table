import React from 'react';
import { ListViewTable, ListViewTableSortStatus } from '@gfazioli/mantine-list-view-table';
import { Badge } from '@mantine/core';
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

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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
  const [sortStatus, setSortStatus] = React.useState<ListViewTableSortStatus>({
    columnKey: 'name',
    direction: 'asc',
  });

  const sortedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortStatus.columnKey as keyof typeof a];
      const bValue = b[sortStatus.columnKey as keyof typeof b];

      if (sortStatus.direction === 'desc') {
        return String(bValue).localeCompare(String(aValue));
      }
      return String(aValue).localeCompare(String(bValue));
    });
    return sorted;
  }, [sortStatus]);

  return (
    <ListViewTable
      columns={columns}
      data={sortedData}
      rowKey="id"
      withTableBorder
      highlightOnHover
      sortStatus={sortStatus}
      onSort={setSortStatus}
    />
  );
}

const code = `
import React from 'react';
import { ListViewTable, ListViewTableSortStatus } from '@gfazioli/mantine-list-view-table';
import { data } from './data';
import { columns } from './columns';

function Demo() {
  const [sortStatus, setSortStatus] = React.useState<ListViewTableSortStatus>({
    columnKey: 'name',
    direction: 'asc',
  });

  const sortedData = React.useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortStatus.columnKey as keyof typeof a];
      const bValue = b[sortStatus.columnKey as keyof typeof b];

      if (sortStatus.direction === 'desc') {
        return String(bValue).localeCompare(String(aValue));
      }
      return String(aValue).localeCompare(String(bValue));
    });
    return sorted;
  }, [sortStatus]);

  return (
    <ListViewTable
      columns={columns}
      data={sortedData}
      rowKey="id"
      withTableBorder
      highlightOnHover
      sortStatus={sortStatus}
      onSort={setSortStatus}
    />
  );
}
`;

const dataCode = `export const data = [
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
`;

const columnsCode = `import { Badge } from '@mantine/core';

export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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
`;

export const externalSorting: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
    { fileName: 'columns.tsx', code: columnsCode, language: 'tsx' },
  ],
};
