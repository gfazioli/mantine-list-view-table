import { useState } from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Badge, Code, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
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
  const [selected, setSelected] = useState<React.Key[]>([1, 3]);

  return (
    <Stack>
      <Text size="sm">
        Selected: <Code>{JSON.stringify(selected)}</Code>
      </Text>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        selectionMode="multiple"
        selectedRows={selected}
        onSelectionChange={(keys) => setSelected(keys)}
        withColumnBorders
        withRowBorders
      />
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { ListViewTable } from '@gfazioli/mantine-list-view-table';
import { Code, Stack, Text } from '@mantine/core';
import { columns } from './columns';
import { data } from './data';

function Demo() {
  const [selected, setSelected] = useState<React.Key[]>([1, 3]);

  return (
    <Stack>
      <Text size="sm">
        Selected: <Code>{JSON.stringify(selected)}</Code>
      </Text>
      <ListViewTable
        columns={columns}
        data={data}
        rowKey="id"
        selectionMode="multiple"
        selectedRows={selected}
        onSelectionChange={(keys) => setSelected(keys)}
        withColumnBorders
        withRowBorders
      />
    </Stack>
  );
}
`;

export const controlledSelection: MantineDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};
