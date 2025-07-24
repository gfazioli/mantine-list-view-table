import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, RingProgress, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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
  // Custom loading component as React element
  const customLoader = (
    <Stack align="center" gap="md">
      <RingProgress size={80} thickness={6} sections={[{ value: 10, color: 'grape' }]} />
      <Text size="sm" c="dimmed">
        Loading files from server...
      </Text>
    </Stack>
  );

  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingComponent={customLoader}
    />
  );
}

const code = `
import React from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Text, Stack, RingProgress } from '@mantine/core';
import { columns } from './data';

function Demo() {
  // Custom loading component as React element
  const customLoader = (
    <Stack align="center" gap="md">
      <RingProgress
        size={80}
        thickness={6}
        sections={[{ value: 100, color: 'grape' }]}
      />
      <Text size="sm" c="dimmed">
        Loading files from server...
      </Text>
    </Stack>
  );

  return (
    <ListViewTable
      columns={columns}
      data={[]}
      rowKey="id"
      height={400}
      withTableBorder
      loading
      loadingComponent={customLoader}
    />
  );
}
`;

const dataCode = `
export const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
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

export const customLoadingElement: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
};
