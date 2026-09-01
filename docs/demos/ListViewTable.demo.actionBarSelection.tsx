import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { ActionBar, Badge, Button, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';
import { data } from './data-files';

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'size', title: 'Size', sortable: true, textAlign: 'right' as const },
  {
    key: 'modified',
    title: 'Modified',
    sortable: true,
    renderCell: (row: any) => <Badge variant="light">{row.modified}</Badge>,
  },
];

function Demo() {
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  return (
    <>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        selectionMode="multiple"
        selectedRows={selected}
        onSelectionChange={(keys, rows) => {
          setSelected(keys);
          setRecords(rows);
        }}
        withColumnBorders
        withRowBorders
      />

      <ActionBar opened={selected.length > 0} onClose={() => setSelected([])} shadow="md">
        <Text size="sm" fw={500}>
          {selected.length} selected
        </Text>
        <Text size="sm" c="dimmed" maw={240} truncate="end">
          {records.map((row) => row.name).join(', ')}
        </Text>
        <ActionBar.Divider />
        <Button variant="default" size="compact-sm">
          Download
        </Button>
        <Button variant="default" size="compact-sm">
          Move
        </Button>
        <Button variant="default" size="compact-sm">
          Delete
        </Button>
        <ActionBar.CloseButton />
      </ActionBar>
    </>
  );
}

const code = `
import { useState } from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { ActionBar, Button, Text } from '@mantine/core';
import { columns } from './columns';
import { data } from './data';

function Demo() {
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  return (
    <>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        selectionMode="multiple"
        selectedRows={selected}
        onSelectionChange={(keys, rows) => {
          setSelected(keys);
          setRecords(rows);
        }}
        withColumnBorders
        withRowBorders
      />

      <ActionBar opened={selected.length > 0} onClose={() => setSelected([])} shadow="md">
        <Text size="sm" fw={500}>
          {selected.length} selected
        </Text>
        <Text size="sm" c="dimmed" maw={240} truncate="end">
          {records.map((row) => row.name).join(', ')}
        </Text>
        <ActionBar.Divider />
        <Button variant="default" size="compact-sm">
          Download
        </Button>
        <Button variant="default" size="compact-sm">
          Move
        </Button>
        <Button variant="default" size="compact-sm">
          Delete
        </Button>
        <ActionBar.CloseButton />
      </ActionBar>
    </>
  );
}
`;

export const actionBarSelection: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
